import { logger } from '../../utils/logger.js';
import * as organizationMemberRepository from '../../repositories/organization-members/organization-members.repository.js';

import { CreateOrganizationMemberRequest, UpdateOrganizationMemberRequest } from '../../types/organization-members/organization-member.js';
import * as auditLogService from '../audit-logs/audit-log.service.js';

const AUDIT_ENTITY = 'organization_member';

export async function getOrganizationMembers(userId: string, isSuperAdmin = false) {
	logger.debug('[organization-members] getOrganizationMembers called', { userId, isSuperAdmin });
	return isSuperAdmin ? organizationMemberRepository.findAll() : organizationMemberRepository.findAllByUserId(userId);
}

export async function getOrganizationMemberById(id: number, userId: string, isSuperAdmin = false) {
	logger.debug('[organization-members] getOrganizationMemberById called', { id, userId });
	const member = isSuperAdmin
		? await organizationMemberRepository.findById(id)
		: await organizationMemberRepository.findByIdForUser(id, userId);

	if (!member) {
		throw new Error('Organization member not found');
	}

	return member;
}

export async function getMembersByOrganizationId(organizationId: number, userId: string, isSuperAdmin = false) {
	logger.debug('[organization-members] getMembersByOrganizationId called', { organizationId, userId });
	return isSuperAdmin
		? organizationMemberRepository.findByOrganizationId(organizationId)
		: organizationMemberRepository.findByOrganizationIdForUser(organizationId, userId);
}

export async function getMembersByUserId(userId: string) {
	logger.debug('[organization-members] getMembersByUserId called', { userId: userId });
	return organizationMemberRepository.findByUserId(userId);
}

export async function createOrganizationMember(data: CreateOrganizationMemberRequest, actorUserId?: string) {
	logger.debug('[organization-members] createOrganizationMember called', { actorUserId: actorUserId });
	if (!data.organization_id) {
		throw new Error('Organization ID is required');
	}

	if (!data.user_id?.trim()) {
		throw new Error('User ID is required');
	}

	if (!data.level?.trim()) {
		throw new Error('Level is required');
	}

	if (!data.created_by?.trim()) {
		throw new Error('Created by is required');
	}

	if (!data.updated_by?.trim()) {
		throw new Error('Updated by is required');
	}

	const existingMember = await organizationMemberRepository.findByOrganizationAndUser(data.organization_id, data.user_id);

	if (existingMember) {
		throw new Error('User already belongs to organization');
	}

	const member = await organizationMemberRepository.create({
		organization_id: data.organization_id,
		user_id: data.user_id.trim(),
		level: data.level.trim(),
		created_by: data.created_by.trim(),
		updated_by: data.updated_by.trim(),
		username: data.username?.trim(),
	});

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'CREATE',
		entity: AUDIT_ENTITY,
		entityId: member.id,
		after: member,
	});

	return member;
}

export async function updateOrganizationMember(id: number, data: UpdateOrganizationMemberRequest, actorUserId?: string, isSuperAdmin = false) {
	logger.debug('[organization-members] updateOrganizationMember called', { id: id, actorUserId: actorUserId });
	const existingMember = actorUserId && !isSuperAdmin
		? await organizationMemberRepository.findByIdForUser(id, actorUserId)
		: await organizationMemberRepository.findById(id);

	if (!existingMember) {
		throw new Error('Organization member not found');
	}

	if (data.level !== undefined && !data.level.trim()) {
		throw new Error('Level is required');
	}

	const updatedMember = await organizationMemberRepository.update(id, {
		level: data.level?.trim(),
		updated_by: data.updated_by?.trim(),
		username: data.username?.trim(),
	});

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'UPDATE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingMember,
		after: updatedMember,
	});

	return updatedMember;
}

export async function deleteOrganizationMember(id: number, actorUserId?: string, isSuperAdmin = false) {
	logger.debug('[organization-members] deleteOrganizationMember called', { id: id, actorUserId: actorUserId });
	const existingMember = actorUserId && !isSuperAdmin
		? await organizationMemberRepository.findByIdForUser(id, actorUserId)
		: await organizationMemberRepository.findById(id);

	if (!existingMember) {
		throw new Error('Organization member not found');
	}

	const removedMember = await organizationMemberRepository.remove(id);

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'DELETE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingMember,
	});

	return removedMember;
}
