import * as userRepository from '../../repositories/users/user.repository.js';
import { CreateUserRequest, UpdateUserRequest } from '../../types/users/user.js';

export async function getUsers() {
	return userRepository.findAll();
}

export async function getUserByEmail(email: string) {
	const user = await userRepository.findByEmail(email);

	if (!user) {
		throw new Error('User not found');
	}

	return user;
}

export async function createUser(data: CreateUserRequest) {
	const email = data.email.trim().toLowerCase();
	const name = data.name.trim();
	const password_hash = data.password_hash.trim();

	const existingUser = await userRepository.findByEmail(email);

	if (existingUser) {
		throw new Error('Email already exists');
	}

	return userRepository.create({
		email,
		name,
		password_hash,
	});
}

export async function updateUser(email: string, data: UpdateUserRequest) {
	const existingUser = await userRepository.findByEmail(email);

	if (!existingUser) {
		throw new Error('User not found');
	}

	const updateData: UpdateUserRequest = {
		...data,
	};

	if (updateData.email) {
		const newEmail = updateData.email.trim().toLowerCase();

		const existingEmail = await userRepository.findByEmail(newEmail);

		if (existingEmail && existingEmail.email !== email) {
			throw new Error('Email already exists');
		}

		updateData.email = newEmail;
	}

	if (updateData.name) {
		updateData.name = updateData.name.trim();
	}

	return userRepository.update(email, updateData);
}

export async function deleteUser(email: string) {
	const existingUser = await userRepository.findByEmail(email);

	if (!existingUser) {
		throw new Error('User not found');
	}

	return userRepository.deactivate(email);
}
