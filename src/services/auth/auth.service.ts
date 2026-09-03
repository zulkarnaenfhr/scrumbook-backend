import { logger } from '../../utils/logger.js';
import bcrypt from 'bcryptjs';
import * as userRepository from '../../repositories/users/user.repository.js';
import * as authRepository from '../../repositories/auth/auth.repository.js';
import { generateToken } from '../../utils/jwt.js';
import { generateRefreshTokenValue, hashToken } from '../../utils/token.js';
import { LoginRequest } from '../../types/auth/auth.js';

const ACCESS_TOKEN_EXPIRES_IN = '1h';
const REFRESH_TOKEN_TTL_DAYS = 7;

function refreshTokenExpiry(): Date {
	return new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);
}

async function issueTokenPair(user: { id: string; email: string }) {
	logger.debug('[auth] issueTokenPair called', { userId: user.id });
	const accessToken = generateToken({ id: user.id, email: user.email });

	const refreshTokenValue = generateRefreshTokenValue();

	await authRepository.createRefreshToken(user.id, hashToken(refreshTokenValue), refreshTokenExpiry());

	return { accessToken, refreshTokenValue };
}

export async function login(data: LoginRequest) {
	logger.debug('[auth] login called');
	const email = data.email.trim().toLowerCase();

	const user = await userRepository.findByEmailWithPassword(email);

	if (!user) {
		throw new Error('Invalid email or password');
	}

	const passwordValid = await bcrypt.compare(data.password, user.password_hash);

	if (!passwordValid) {
		throw new Error('Invalid email or password');
	}

	const { accessToken, refreshTokenValue } = await issueTokenPair(user);

	return {
		access_token: accessToken,
		refresh_token: refreshTokenValue,
		token_type: 'Bearer',
		expires_in: ACCESS_TOKEN_EXPIRES_IN,
		user: {
			id: user.id,
			username: user.username,
			email: user.email,
		},
	};
}

export async function refresh(refreshTokenValue: string) {
	logger.debug('[auth] refresh called');
	const value = refreshTokenValue?.trim();

	if (!value) {
		throw new Error('Refresh token is required');
	}

	const tokenHash = hashToken(value);
	const stored = await authRepository.findRefreshTokenByHash(tokenHash);

	if (!stored || stored.revoked_at || new Date(stored.expires_at) < new Date()) {
		throw new Error('Invalid or expired refresh token');
	}

	const user = await userRepository.findById(stored.user_id);

	if (!user) {
		throw new Error('Invalid or expired refresh token');
	}

	// Rotate the refresh token: issue a new pair, then revoke the one that was
	// just used and link it to its replacement (helps detect token re-use).
	const { accessToken, refreshTokenValue: newRefreshTokenValue } = await issueTokenPair(user);

	await authRepository.revokeRefreshToken(tokenHash, hashToken(newRefreshTokenValue));

	return {
		access_token: accessToken,
		refresh_token: newRefreshTokenValue,
		token_type: 'Bearer',
		expires_in: ACCESS_TOKEN_EXPIRES_IN,
	};
}

export async function logout(refreshTokenValue: string) {
	logger.debug('[auth] logout called');
	const value = refreshTokenValue?.trim();

	if (!value) {
		throw new Error('Refresh token is required');
	}

	await authRepository.revokeRefreshToken(hashToken(value));
}
