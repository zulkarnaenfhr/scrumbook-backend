import * as organizationRepository from '../../repositories/organization/organtization.repository.js';
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
	if (!data.name?.trim()) {
		throw new Error('Organization name is required');
	}

	const name = data.name.trim();

	const existingOrganization = await organizationRepository.findByName(name);

	if (existingOrganization) {
		throw new Error('Organization already exists');
	}

	let code: string | undefined;

	if (data.code?.trim()) {
		code = data.code.trim().toUpperCase();

		const existingCode = await organizationRepository.findByCode(code);

		if (existingCode) {
			throw new Error('Organization code already exists');
		}
	}

	return organizationRepository.create({
		name,
		code,
	});
}

export async function updateOrganization(id: number, data: UpdateOrganizationRequest) {
	const existingOrganization = await organizationRepository.findById(id);

	if (!existingOrganization) {
		throw new Error('Organization not found');
	}

	const updateData: UpdateOrganizationRequest = {
		...data,
	};

	if (updateData.name !== undefined) {
		if (!updateData.name.trim()) {
			throw new Error('Organization name is required');
		}

		const name = updateData.name.trim();

		const existingName = await organizationRepository.findByName(name);

		if (existingName && existingName.id !== id) {
			throw new Error('Organization already exists');
		}

		updateData.name = name;
	}

	if (updateData.code !== undefined) {
		if (updateData.code === null) {
			updateData.code = null;
		} else {
			const code = updateData.code.trim().toUpperCase();

			const existingCode = await organizationRepository.findByCode(code);

			if (existingCode && existingCode.id !== id) {
				throw new Error('Organization code already exists');
			}

			updateData.code = code;
		}
	}

	return organizationRepository.update(id, updateData);
}

export async function deleteOrganization(id: number) {
	const existingOrganization = await organizationRepository.findById(id);

	if (!existingOrganization) {
		throw new Error('Organization not found');
	}

	return organizationRepository.deleteOrganization(id);
}
