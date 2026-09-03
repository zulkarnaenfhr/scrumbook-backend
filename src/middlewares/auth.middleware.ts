import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../models/base-response.js';
import { ERR_STATUS_UNAUTHORIZED, ERR_STATUS_FORBIDDEN, ERR_STATUS_ORGANIZATION_CONTEXT_MISSING } from '../static/static-response-error-messages.js';
import * as organizationMemberRepository from '../repositories/organization-members/organization-members.repository.js';
import * as projectRepository from '../repositories/projects/project.repository.js';
import * as taskRepository from '../repositories/tasks/task.repository.js';
import * as permissionRepository from '../repositories/permissions/permission.repository.js';
import * as userRepository from '../repositories/users/user.repository.js';
import { AuthenticatedUser } from '../types/auth/auth.js';

export interface AuthenticatedRequest extends Request {
	user?: AuthenticatedUser;
}

/**
 * Verifies the `Authorization: Bearer <token>` header and attaches the
 * decoded identity to `req.user`. Every protected route needs this first.
 */
export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	const header = req.headers.authorization;

	if (!header?.startsWith('Bearer ')) {
		return res.status(401).json(errorResponse(ERR_STATUS_UNAUTHORIZED.error_code, ERR_STATUS_UNAUTHORIZED.error_message.en, ERR_STATUS_UNAUTHORIZED.error_message.id));
	}

	const token = header.slice('Bearer '.length).trim();

	try {
		const payload = verifyToken(token);

		const role = await userRepository.findRoleNameById(payload.id);

		req.user = {
			id: payload.id,
			email: payload.email,
			role: role ?? undefined,
			isSuperAdmin: role === 'SUPER_ADMIN',
		};

		return next();
	} catch {
		return res.status(401).json(errorResponse(ERR_STATUS_UNAUTHORIZED.error_code, ERR_STATUS_UNAUTHORIZED.error_message.en, ERR_STATUS_UNAUTHORIZED.error_message.id));
	}
}



/**
 * Requires the authenticated user's application role to have the requested
 * permission. This answers WHAT the user is allowed to do; organization and
 * resource middleware still answer WHERE the user is allowed to do it.
 */
export function requirePermission(permission: string) {
	return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json(errorResponse(ERR_STATUS_UNAUTHORIZED.error_code, ERR_STATUS_UNAUTHORIZED.error_message.en, ERR_STATUS_UNAUTHORIZED.error_message.id));
		}

		try {
			const allowed = req.user.isSuperAdmin === true || await permissionRepository.userHasPermission(req.user.id, permission);

			if (!allowed) {
				return res.status(403).json(errorResponse(ERR_STATUS_FORBIDDEN.error_code, ERR_STATUS_FORBIDDEN.error_message.en, ERR_STATUS_FORBIDDEN.error_message.id));
			}

			return next();
		} catch (error) {
			console.error(error);
			return res.status(500).json(errorResponse('SCB500001', 'Internal Server Error', 'Terjadi Kesalahan Pada Server'));
		}
	};
}

type OrganizationIdResolver = (req: AuthenticatedRequest) => Promise<number | null>;

/**
 * Default resolution order for "which organization does this request belong to":
 *  1. `organization_id` in the request body (e.g. creating a project/member)
 *  2. `organizationId` route param (nested org-scoped GET routes)
 *  3. `project_id` in the request body (e.g. creating a task)
 *  4. the route's own `:id` param, interpreted based on which resource the
 *     router is mounted at (`/organizations`, `/projects`, `/tasks`)
 *
 * Resources that don't fit this shape (e.g. organization-member records,
 * which are looked up by their own id) should pass a custom resolver to
 * `authorizeOrganizationLevel` instead of relying on this default.
 */
async function defaultResolveOrganizationId(req: AuthenticatedRequest): Promise<number | null> {
	if (req.body?.organization_id) {
		return Number(req.body.organization_id);
	}

	if (req.params?.organizationId) {
		return Number(req.params.organizationId);
	}

	if (req.body?.project_id) {
		const project = await projectRepository.findById(String(req.body.project_id));
		return project ? Number(project.organization_id) : null;
	}

	const id = req.params?.id;
	

	if (id && req.baseUrl.includes('/organizations')) {
		return Number(id);
	}

	if (id && req.baseUrl.includes('/projects')) {
		const project = await projectRepository.findById(String(id));
		return project ? Number(project.organization_id) : null;
	}

	if (id && req.baseUrl.includes('/tasks')) {
		const task = await taskRepository.findById(String(id));

		if (!task?.project_id) {
			return null;
		}

		const project = await projectRepository.findById(String(task.project_id));
		return project ? Number(project.organization_id) : null;
	}

	return null;
}

/**
 * Looks up an organization_member row by its own id, for routes like
 * `PUT/DELETE /api/organization-members/:id` where `:id` is the membership
 * row, not the organization. Use as a custom resolver.
 */
export async function resolveOrganizationIdFromMemberId(req: AuthenticatedRequest): Promise<number | null> {
	const id = req.params?.id;

	if (!id) {
		return null;
	}

	const member = await organizationMemberRepository.findById(Number(id));

	return member ? Number(member.organization_id) : null;
}

/**
 * Requires the authenticated user to be a member of the relevant organization
 * with one of the allowed `organization_member.level` values (ADMIN / MEMBER
 * / VIEWER). Must run after `authenticate`.
 *
 * Usage:
 *   router.post('/', authenticate, authorizeOrganizationLevel(['ADMIN']), createProject);
 *   router.put('/:id', authenticate, authorizeOrganizationLevel(['ADMIN'], resolveOrganizationIdFromMemberId), updateOrganizationMember);
 */
export function authorizeOrganizationLevel(allowedLevels: string[], resolveOrganizationId: OrganizationIdResolver = defaultResolveOrganizationId) {
	return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json(errorResponse(ERR_STATUS_UNAUTHORIZED.error_code, ERR_STATUS_UNAUTHORIZED.error_message.en, ERR_STATUS_UNAUTHORIZED.error_message.id));
		}

		// SUPER_ADMIN is global and is not restricted by organization membership.
		if (req.user.isSuperAdmin === true) {
			return next();
		}

		try {
			const organizationId = await resolveOrganizationId(req);

			if (!organizationId) {
				return res
					.status(400)
					.json(errorResponse(ERR_STATUS_ORGANIZATION_CONTEXT_MISSING.error_code, ERR_STATUS_ORGANIZATION_CONTEXT_MISSING.error_message.en, ERR_STATUS_ORGANIZATION_CONTEXT_MISSING.error_message.id));
			}

			const membership = await organizationMemberRepository.findByOrganizationAndUser(organizationId, req.user.id);

			if (!membership || !allowedLevels.includes(membership.level)) {
				return res.status(403).json(errorResponse(ERR_STATUS_FORBIDDEN.error_code, ERR_STATUS_FORBIDDEN.error_message.en, ERR_STATUS_FORBIDDEN.error_message.id));
			}

			return next();
		} catch (error) {
			console.error(error);

			return res.status(500).json(errorResponse('SCB500001', 'Internal Server Error', 'Terjadi Kesalahan Pada Server'));
		}
	};
}
