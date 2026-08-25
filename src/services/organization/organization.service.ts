import * as organizationRepository from '../../repositories/organization/organtization.repository.js';

import * as userRepository from '../../repositories/users/user.repository.js';

import { CreateOrganizationRequest, UpdateOrganizationRequest } from '../../types/organization/organization.js';

export async function getOrganizations() {
	return organizationRepository.findAll();
}

export async function getOrganizationById(id: number) {
	const organization = await organizationRepository.findById(id);

	if (!organization) {
		throw new Error('Organization not found');
	}

	return organization;
}

export async function createOrganization(data: CreateOrganizationRequest) {
	const name = data.name?.trim();
	const description = data.description?.trim();
	const createdBy = data.created_by?.trim();
	const userId = data.user_id?.trim();

	if (!name || !description || !createdBy || !userId) {
		throw new Error('Required field missing');
	}

	// Check user exists
	const user = await userRepository.findById(userId);

	if (!user) {
		throw new Error('User not found');
	}

	// Check duplicate organization name
	const existingOrganization = await organizationRepository.findByName(name);

	if (existingOrganization) {
		throw new Error('Organization already exists');
	}

	return organizationRepository.create({
		name,
		description,
		created_by: createdBy,
		user_id: userId,
	});
}

export async function updateOrganization(id: number, data: UpdateOrganizationRequest) {
	const existingOrganization = await organizationRepository.findById(id);

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

	return organizationRepository.update(id, data);
}

export async function deleteOrganization(id: number) {
	const existingOrganization = await organizationRepository.findById(id);

	if (!existingOrganization) {
		throw new Error('Organization not found');
	}

	return organizationRepository.deleteOrganization(id);
}
