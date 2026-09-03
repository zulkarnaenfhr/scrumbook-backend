import { logger } from '../../utils/logger.js';
import * as organizationRepository from '../../repositories/organization/organtization.repository.js';

import * as userRepository from '../../repositories/users/user.repository.js';

import { CreateOrganizationRequest, UpdateOrganizationRequest } from '../../types/organization/organization.js';
import * as auditLogService from '../audit-logs/audit-log.service.js';

const AUDIT_ENTITY = 'organization';

export async function getOrganizations(userId: string, isSuperAdmin = false) {
	logger.debug('[organization] getOrganizations called', { userId, isSuperAdmin });
	return isSuperAdmin ? organizationRepository.findAll() : organizationRepository.findAllByUserId(userId);
}

export async function getOrganizationById(id: number, userId: string, isSuperAdmin = false) {
	logger.debug('[organization] getOrganizationById called', { id, userId, isSuperAdmin });
	const organization = isSuperAdmin
		? await organizationRepository.findById(id)
		: await organizationRepository.findByIdForUser(id, userId);

	if (!organization) {
		throw new Error('Organization not found');
	}

	return organization;
}

export async function createOrganization(data: CreateOrganizationRequest, actorUserId?: string) {
	logger.debug('[organization] createOrganization called', { actorUserId });

	if (!actorUserId) {
		throw new Error('Unauthorized');
	}

	const name = data.name?.trim();
	const description = data.description?.trim();

	if (!name || !description) {
		throw new Error('Required field missing');
	}

	const existingOrganization = await organizationRepository.findByName(name);

	if (existingOrganization) {
		throw new Error('Organization already exists');
	}

	const result = await organizationRepository.createWithOwner({
		name,
		description,
		actorUserId,
	});

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'CREATE',
		entity: AUDIT_ENTITY,
		entityId: result.organization.id,
		after: result.organization,
	});

	return result.organization;
}

export async function updateOrganization(id: number, data: UpdateOrganizationRequest, actorUserId?: string, isSuperAdmin = false) {
	logger.debug('[organization] updateOrganization called', { id: id, actorUserId: actorUserId });
	const existingOrganization = actorUserId && !isSuperAdmin
		? await organizationRepository.findByIdForUser(id, actorUserId)
		: await organizationRepository.findById(id);

	if (!existingOrganization) {
		throw new Error('Organization not found');
	}

	if (data.name) {
		data.name = data.name.trim();

		const existingOrganizationByName = await organizationRepository.findByName(data.name);

		if (existingOrganizationByName && existingOrganizationByName.id !== id) {
			throw new Error('Organization already exists');
		}
	}

	if (data.description) {
		data.description = data.description.trim();
	}

	if (data.updated_by) {
		data.updated_by = data.updated_by.trim();
	}

	const updatedOrganization = await organizationRepository.update(id, data);

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'UPDATE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingOrganization,
		after: updatedOrganization,
	});

	return updatedOrganization;
}

export async function deleteOrganization(id: number, actorUserId?: string, isSuperAdmin = false) {
	logger.debug('[organization] deleteOrganization called', { id: id, actorUserId: actorUserId });
	const existingOrganization = actorUserId && !isSuperAdmin
		? await organizationRepository.findByIdForUser(id, actorUserId)
		: await organizationRepository.findById(id);

	if (!existingOrganization) {
		throw new Error('Organization not found');
	}

	const deletedOrganization = await organizationRepository.deleteOrganization(id);

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'DELETE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingOrganization,
	});

	return deletedOrganization;
}
