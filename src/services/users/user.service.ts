import { logger } from '../../utils/logger.js';
import bcrypt from 'bcryptjs';
import * as userRepository from '../../repositories/users/user.repository.js';
import { CreateUserRequest, UpdateUserRequest } from '../../types/users/user.js';
import * as auditLogService from '../audit-logs/audit-log.service.js';
import * as roleRepository from '../../repositories/roles/role.repository.js';

const AUDIT_ENTITY = 'user';

export async function getUsers() {
	logger.debug('[user] getUsers called');
	return userRepository.findAll();
}

export async function getUserById(id: string) {
	logger.debug('[user] getUserById called', { id: id });
	const user = await userRepository.findById(id);

	if (!user) {
		throw new Error('User not found');
	}

	return user;
}

export async function createUser(data: CreateUserRequest) {
	logger.debug('[user] createUser called');
	const email = data.email?.trim().toLowerCase();
	const username = data.username?.trim();

	if (!email || !username || !data.password) {
		throw new Error('Required field missing');
	}

	if (await userRepository.findByEmail(email)) {
		throw new Error('Email already exists');
	}

	if (await userRepository.findByUsername(username)) {
		throw new Error('Username already exists');
	}

	const passwordHash = await bcrypt.hash(data.password, 10);

	// Public registration must never allow a caller to self-assign an elevated role.
	const viewerRole = await roleRepository.findByName('VIEWER');

	if (!viewerRole) {
		throw new Error('Default role not found');
	}

	const user = await userRepository.create({
		username,
		email,
		password: passwordHash,
		role_id: viewerRole.id,
	});

	// A brand-new account is its own actor — nobody else was logged in yet.
	await auditLogService.recordAuditLog({
		userId: user.id,
		action: 'CREATE',
		entity: AUDIT_ENTITY,
		entityId: user.id,
		after: user,
	});

	return user;
}

export async function updateUser(id: string, data: UpdateUserRequest, actorUserId?: string) {
	logger.debug('[user] updateUser called', { id: id, actorUserId: actorUserId });
	const existingUser = await userRepository.findById(id);

	if (!existingUser) {
		throw new Error('User not found');
	}

	if (data.email) {
		const email = data.email.trim().toLowerCase();

		const existingEmail = await userRepository.findByEmail(email);

		if (existingEmail && existingEmail.id !== id) {
			throw new Error('Email already exists');
		}

		data.email = email;
	}

	if (data.username) {
		data.username = data.username.trim();
	}

	const updatedUser = await userRepository.update(id, data);

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'UPDATE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingUser,
		after: updatedUser,
	});

	return updatedUser;
}

export async function deleteUser(id: string, actorUserId?: string) {
	logger.debug('[user] deleteUser called', { id: id, actorUserId: actorUserId });
	const existingUser = await userRepository.findById(id);

	if (!existingUser) {
		throw new Error('User not found');
	}

	const deletedUser = await userRepository.deleteUser(id);

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'DELETE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingUser,
	});

	return deletedUser;
}
