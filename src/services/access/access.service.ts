import * as accessRepository from '../../repositories/access/access.repository.js';
import { CreateAccessRequest, UpdateAccessRequest } from '../../types/access/access.js';

export async function getAccessList() {
	return accessRepository.findAll();
}

export async function getAccessById(id: string) {
	const access = await accessRepository.findById(id);

	if (!access) {
		throw new Error('Access not found');
	}

	return access;
}

export async function getAccessByUserId(userId: string) {
	return accessRepository.findByUserId(userId);
}

export async function getAccessByItemAndType(itemId: string, type: string) {
	return accessRepository.findByItemAndType(itemId, type);
}

export async function createAccess(data: CreateAccessRequest) {
	const type = data.type?.trim();

	if (!data.item_id || !type || !data.user_id || data.view === undefined || data.create_permission === undefined || data.write === undefined || data.delete === undefined) {
		throw new Error('Required field missing');
	}

	const existingAccess = await accessRepository.findByUserItemAndType(data.user_id, data.item_id, type);

	if (existingAccess) {
		throw new Error('Access already exists');
	}

	return accessRepository.create({
		...data,
		type,
	});
}

export async function updateAccess(id: string, data: UpdateAccessRequest) {
	const existingAccess = await accessRepository.findById(id);

	if (!existingAccess) {
		throw new Error('Access not found');
	}

	if (data.username) {
		data.username = data.username.trim();
	}

	return accessRepository.update(id, data);
}

export async function deleteAccess(id: string) {
	const existingAccess = await accessRepository.findById(id);

	if (!existingAccess) {
		throw new Error('Access not found');
	}

	return accessRepository.deleteAccess(id);
}
