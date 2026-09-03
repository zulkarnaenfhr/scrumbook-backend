import { logger } from '../../utils/logger.js';
import * as accessRepository from '../../repositories/access/access.repository.js';
import { CreateAccessRequest, UpdateAccessRequest } from '../../types/access/access.js';

export async function getAccessList() {
	logger.debug('[access] getAccessList called');
	return accessRepository.findAll();
}

export async function getAccessById(id: string) {
	logger.debug('[access] getAccessById called', { id: id });
	const access = await accessRepository.findById(id);

	if (!access) {
		throw new Error('Access not found');
	}

	return access;
}

export async function getAccessByUserId(userId: string) {
	logger.debug('[access] getAccessByUserId called', { userId: userId });
	return accessRepository.findByUserId(userId);
}

export async function getAccessByItemAndType(itemId: string, type: string) {
	logger.debug('[access] getAccessByItemAndType called', { itemId: itemId, type: type });
	return accessRepository.findByItemAndType(itemId, type);
}

export async function createAccess(data: CreateAccessRequest) {
	logger.debug('[access] createAccess called');
	const type = data.type?.trim();

	if (!data.item_id || !type || !data.user_id || data.view === undefined || data.create_permission === undefined || data.write === undefined || data.delete === undefined) {
		throw new Error('Required field missing');
	}

	const existingAccess = await accessRepository.findByUserItemAndType(data.user_id, data.item_id, type);

	if (existingAccess) {
		throw new Error('Access already exists');
	}

	logger.debug('[access] repository create');

	return accessRepository.create({
		...data,
		type,
	});
}

export async function updateAccess(id: string, data: UpdateAccessRequest) {
	logger.debug('[access] updateAccess called', { id: id });
	const existingAccess = await accessRepository.findById(id);

	if (!existingAccess) {
		throw new Error('Access not found');
	}

	if (data.username) {
		data.username = data.username.trim();
	}

	logger.debug('[access] repository update');

	return accessRepository.update(id, data);
}

export async function deleteAccess(id: string) {
	logger.debug('[access] deleteAccess called', { id: id });
	const existingAccess = await accessRepository.findById(id);

	if (!existingAccess) {
		throw new Error('Access not found');
	}

	logger.debug('[access] repository deleteAccess');

	return accessRepository.deleteAccess(id);
}
