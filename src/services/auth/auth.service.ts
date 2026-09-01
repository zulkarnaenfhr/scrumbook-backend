import bcrypt from 'bcryptjs';
import * as userRepository from '../../repositories/users/user.repository.js';
import { generateToken } from '../../utils/jwt.js';
import { LoginRequest } from '../../types/auth/auth.js';

export async function login(data: LoginRequest) {
	const email = data.email.trim().toLowerCase();

	const user = await userRepository.findByEmailWithPassword(email);

	if (!user) {
		throw new Error('Invalid email or password');
	}

	const passwordValid = await bcrypt.compare(data.password, user.password_hash);

	if (!passwordValid) {
		throw new Error('Invalid email or password');
	}

	const accessToken = generateToken({
		id: user.id,
		email: user.email,
	});

	return {
		access_token: accessToken,
		token_type: 'Bearer',
		expires_in: '1h',
		user: {
			id: user.id,
			username: user.username,
			email: user.email,
		},
	};
}
