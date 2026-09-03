import crypto from 'crypto';

/**
 * Generates a cryptographically random opaque refresh token value.
 * This is what gets sent to the client — never store it as-is.
 */
export function generateRefreshTokenValue(): string {
	return crypto.randomBytes(40).toString('hex');
}

/**
 * One-way hash used to store/lookup refresh tokens in the database.
 * A DB read alone is never enough to impersonate a user.
 */
export function hashToken(token: string): string {
	return crypto.createHash('sha256').update(token).digest('hex');
}
