import bcrypt from 'bcryptjs';
import * as userRepository from '../../repositories/users/user.repository.js';
import { CreateUserRequest, UpdateUserRequest } from '../../types/users/user.js';

export async function getUsers() {
	return userRepository.findAll();
}

export async function getUserById(id: string) {
	const user = await userRepository.findById(id);

	if (!user) {
		throw new Error('User not found');
	}

	return user;
}

export async function createUser(data: CreateUserRequest) {
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

	console.log('Creating user with data:', {
		username,
		email,
		passwordHash,
		role_id: data.role_id,
	});
	
	return userRepository.create({
		username,
		email,
		password: passwordHash,
		role_id: data.role_id,
	});
}

export async function updateUser(id: string, data: UpdateUserRequest) {
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

	return userRepository.update(id, data);
}

export async function deleteUser(id: string) {
	const existingUser = await userRepository.findById(id);

	if (!existingUser) {
		throw new Error('User not found');
	}

	return userRepository.deleteUser(id);
}
