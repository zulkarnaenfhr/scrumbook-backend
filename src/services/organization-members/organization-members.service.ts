import * as organizationMemberRepository from '../../repositories/organization-members/organization-members.repository.js';

import { CreateOrganizationMemberRequest, UpdateOrganizationMemberRequest } from '../../types/organization-members/organization-member.js';

export async function getOrganizationMembers() {
	return organizationMemberRepository.findAll();
}

export async function getOrganizationMemberById(id: number) {
	const member = await organizationMemberRepository.findById(id);

	if (!member) {
		throw new Error('Organization member not found');
	}

	return member;
}

export async function getMembersByOrganizationId(organizationId: number) {
	return organizationMemberRepository.findByOrganizationId(organizationId);
}

export async function getMembersByUserId(userId: string) {
	return organizationMemberRepository.findByUserId(userId);
}

export async function createOrganizationMember(data: CreateOrganizationMemberRequest) {
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

	return organizationMemberRepository.create({
		organization_id: data.organization_id,
		user_id: data.user_id.trim(),
		level: data.level.trim(),
		created_by: data.created_by.trim(),
		updated_by: data.updated_by.trim(),
		username: data.username?.trim(),
	});
}

export async function updateOrganizationMember(id: number, data: UpdateOrganizationMemberRequest) {
	const existingMember = await organizationMemberRepository.findById(id);

	if (!existingMember) {
		throw new Error('Organization member not found');
	}

	if (data.level !== undefined && !data.level.trim()) {
		throw new Error('Level is required');
	}

	return organizationMemberRepository.update(id, {
		level: data.level?.trim(),
		updated_by: data.updated_by?.trim(),
		username: data.username?.trim(),
	});
}

export async function deleteOrganizationMember(id: number) {
	const existingMember = await organizationMemberRepository.findById(id);

	if (!existingMember) {
		throw new Error('Organization member not found');
	}

	return organizationMemberRepository.remove(id);
}
