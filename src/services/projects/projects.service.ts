import { logger } from '../../utils/logger.js';
import * as projectRepository from '../../repositories/projects/project.repository.js';
import { CreateProjectRequest, UpdateProjectRequest } from '../../types/projects/projects.js';
import * as auditLogService from '../audit-logs/audit-log.service.js';

const AUDIT_ENTITY = 'project';

export async function getProjects(userId: string, isSuperAdmin = false) {
	logger.debug('[projects] getProjects called', { userId, isSuperAdmin });
	return isSuperAdmin ? projectRepository.findAll() : projectRepository.findAllByUserId(userId);
}

export async function getProjectById(id: string, userId: string, isSuperAdmin = false) {
	logger.debug('[projects] getProjectById called', { id, userId, isSuperAdmin });
	const project = isSuperAdmin
		? await projectRepository.findById(id)
		: await projectRepository.findByIdForUser(id, userId);

	if (!project) {
		throw new Error('Project not found');
	}

	return project;
}

export async function getProjectsByOrganizationId(organizationId: string) {
	logger.debug('[projects] getProjectsByOrganizationId called', { organizationId: organizationId });
	return projectRepository.findByOrganizationId(organizationId);
}

export async function createProject(data: CreateProjectRequest, actorUserId?: string) {
	logger.debug('[projects] createProject called', { actorUserId: actorUserId });
	const code = data.code?.trim();
	const name = data.name?.trim();
	const priority = data.priority?.trim();

	if (!code || !name || !priority || data.status === undefined || !data.organization_id || !data.user_id) {
		throw new Error('Required field missing');
	}

	const project = await projectRepository.create({
		...data,
		code,
		name,
		priority,
	});

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'CREATE',
		entity: AUDIT_ENTITY,
		entityId: project.id,
		after: project,
	});

	return project;
}

export async function updateProject(id: string, data: UpdateProjectRequest, actorUserId?: string) {
	logger.debug('[projects] updateProject called', { id: id, actorUserId: actorUserId });
	const existingProject = await projectRepository.findById(id);

	if (!existingProject) {
		throw new Error('Project not found');
	}

	if (data.code) {
		data.code = data.code.trim();
	}

	if (data.name) {
		data.name = data.name.trim();
	}

	if (data.priority) {
		data.priority = data.priority.trim();
	}

	const updatedProject = await projectRepository.update(id, data);

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'UPDATE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingProject,
		after: updatedProject,
	});

	return updatedProject;
}

export async function deleteProject(id: string, actorUserId?: string) {
	logger.debug('[projects] deleteProject called', { id: id, actorUserId: actorUserId });
	const existingProject = await projectRepository.findById(id);

	if (!existingProject) {
		throw new Error('Project not found');
	}

	const deletedProject = await projectRepository.deleteProject(id);

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'DELETE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingProject,
	});

	return deletedProject;
}
