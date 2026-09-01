import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not configured');
}

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
	return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
