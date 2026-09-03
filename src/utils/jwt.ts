import jwt from 'jsonwebtoken';

function requireJwtSecret(): string {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error('JWT_SECRET is not configured');
	}

	return secret;
}

const JWT_SECRET: string = requireJwtSecret();

export interface JwtPayload {
	id: string;
	email: string;
}

export function generateToken(payload: JwtPayload): string {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: '1h',
	});
}

export function verifyToken(token: string): JwtPayload {
	return jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;
}
