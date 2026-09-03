import { pool } from '../../config/database.js';

export async function findUserByEmail(email: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			username,
			email,
			password_hash
		FROM scrum.users
		WHERE email = $1
	`,
		[email],
	);

	return result.rows[0] ?? null;
}

export async function createRefreshToken(userId: string, tokenHash: string, expiresAt: Date) {
	const result = await pool.query(
		`
		INSERT INTO scrum.refresh_tokens (
			user_id,
			token_hash,
			expires_at
		)
		VALUES ($1, $2, $3)
		RETURNING
			id,
			user_id,
			token_hash,
			expires_at,
			revoked_at,
			replaced_by_token_hash,
			created_at
		`,
		[userId, tokenHash, expiresAt],
	);

	return result.rows[0];
}

export async function findRefreshTokenByHash(tokenHash: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			user_id,
			token_hash,
			expires_at,
			revoked_at,
			replaced_by_token_hash,
			created_at
		FROM scrum.refresh_tokens
		WHERE token_hash = $1
		`,
		[tokenHash],
	);

	return result.rows[0] ?? null;
}

export async function revokeRefreshToken(tokenHash: string, replacedByTokenHash: string | null = null) {
	const result = await pool.query(
		`
		UPDATE scrum.refresh_tokens
		SET
			revoked_at = NOW(),
			replaced_by_token_hash = COALESCE($2, replaced_by_token_hash)
		WHERE token_hash = $1
		AND revoked_at IS NULL
		RETURNING id
		`,
		[tokenHash, replacedByTokenHash],
	);

	return result.rows[0] ?? null;
}

export async function revokeAllRefreshTokensForUser(userId: string) {
	await pool.query(
		`
		UPDATE scrum.refresh_tokens
		SET revoked_at = NOW()
		WHERE user_id = $1
		AND revoked_at IS NULL
		`,
		[userId],
	);
}
