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

	if (!email && !username) {
		throw new Error('Required field missing');
	}

	if (email) {
		const existingUser = await userRepository.findByEmail(email);

		if (existingUser) {
			throw new Error('Email already exists');
		}
	}

	return userRepository.create({
		username,
		email,
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
