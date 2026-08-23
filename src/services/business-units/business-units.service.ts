import * as businessUnitRepository from '../../repositories/business-units/business-units.repository.js';
import { CreateBusinessUnitRequest, UpdateBusinessUnitRequest } from '../../types/business-units/business-units.js';

export async function getBusinessUnits() {
	return businessUnitRepository.findAll();
}

export async function getBusinessUnitById(id: number) {
	const businessUnit = await businessUnitRepository.findById(id);

	if (!businessUnit) {
		throw new Error('Business unit not found');
	}

	return businessUnit;
}

export async function createBusinessUnit(data: CreateBusinessUnitRequest) {
	if (!data.name?.trim()) {
		throw new Error('Business unit name is required');
	}

	const name = data.name.trim();

	const existingBusinessUnit = await businessUnitRepository.findByName(name);

	if (existingBusinessUnit) {
		throw new Error('Business unit already exists');
	}

	return businessUnitRepository.create({
		name,
	});
}

export async function updateBusinessUnit(id: number, data: UpdateBusinessUnitRequest) {
	const existingBusinessUnit = await businessUnitRepository.findById(id);

	if (!existingBusinessUnit) {
		throw new Error('Business unit not found');
	}

	const updateData: UpdateBusinessUnitRequest = {
		...data,
	};

	if (updateData.name !== undefined) {
		if (!updateData.name.trim()) {
			throw new Error('Business unit name is required');
		}

		const name = updateData.name.trim();

		const existingByName = await businessUnitRepository.findByName(name);

		if (existingByName && existingByName.id !== id) {
			throw new Error('Business unit already exists');
		}

		updateData.name = name;
	}

	return businessUnitRepository.update(id, updateData);
}

export async function deleteBusinessUnit(id: number) {
	const existingBusinessUnit = await businessUnitRepository.findById(id);

	if (!existingBusinessUnit) {
		throw new Error('Business unit not found');
	}

	return businessUnitRepository.deactivate(id);
}
