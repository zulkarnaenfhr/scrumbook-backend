import { Response } from 'express';

import * as organizationMemberService from '../../services/organization-members/organization-members.service.js';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

import { successResponse, errorResponse } from '../../models/base-response.js';

import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';

export async function getOrganizationMembers(req: AuthenticatedRequest, res: Response) {
	try {
		const members = await organizationMemberService.getOrganizationMembers(req.user!.id, req.user!.isSuperAdmin);

		if (members.length === 0) {
			return res.status(400).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		return res.status(200).json(successResponse(members));
	} catch (error) {
		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getOrganizationMember(req: AuthenticatedRequest, res: Response) {
	try {
		const id = Number(req.params.id);

		if (!Number.isInteger(id) || id <= 0) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const member = await organizationMemberService.getOrganizationMemberById(id, req.user!.id, req.user!.isSuperAdmin);

		return res.status(200).json(successResponse(member));
	} catch (error) {
		if (error instanceof Error && error.message === 'Organization member not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getOrganizationMembersByOrganization(req: AuthenticatedRequest, res: Response) {
	try {
		const organizationId = Number(req.params.organizationId);

		if (!Number.isInteger(organizationId) || organizationId <= 0) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const members = await organizationMemberService.getMembersByOrganizationId(organizationId, req.user!.id, req.user!.isSuperAdmin);

		return res.status(200).json(successResponse(members));
	} catch (error) {
		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createOrganizationMember(req: AuthenticatedRequest, res: Response) {
	try {
		const { organization_id, user_id, level, created_by, updated_by, username } = req.body;

		if (!organization_id || !user_id?.trim() || !level?.trim() || !created_by?.trim() || !updated_by?.trim()) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const member = await organizationMemberService.createOrganizationMember(
			{
				organization_id,
				user_id,
				level,
				created_by,
				updated_by,
				username,
			},
			req.user?.id,
		);

		return res.status(201).json(successResponse(member));
	} catch (error) {
		if (error instanceof Error && error.message === 'User already belongs to organization') {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, 'User already belongs to organization', 'User sudah menjadi anggota organisasi'));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateOrganizationMember(req: AuthenticatedRequest, res: Response) {
	try {
		const id = Number(req.params.id);

		if (!Number.isInteger(id) || id <= 0) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const member = await organizationMemberService.updateOrganizationMember(id, req.body, req.user?.id, req.user?.isSuperAdmin);

		return res.status(200).json(successResponse(member));
	} catch (error) {
		if (error instanceof Error && error.message === 'Organization member not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteOrganizationMember(req: AuthenticatedRequest, res: Response) {
	try {
		const id = Number(req.params.id);

		if (!Number.isInteger(id) || id <= 0) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const result = await organizationMemberService.deleteOrganizationMember(id, req.user?.id, req.user?.isSuperAdmin);

		return res.status(200).json(successResponse(result));
	} catch (error) {
		if (error instanceof Error && error.message === 'Organization member not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
