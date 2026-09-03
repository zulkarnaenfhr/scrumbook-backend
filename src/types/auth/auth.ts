export interface LoginRequest {
	email: string;
	password: string;
}

export interface AuthUser {
	id: string;
	username: string | null;
	email: string | null;
}

export interface LoginResponse {
	access_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: string;
	user: AuthUser;
}

export interface RefreshTokenRequest {
	refresh_token: string;
}

export interface RefreshTokenResponse {
	access_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: string;
}

export interface LogoutRequest {
	refresh_token: string;
}

/**
 * Shape of req.user once a request has passed the `authenticate` middleware.
 */
export interface AuthenticatedUser {
	id: string;
	email: string;
	role?: string;
	isSuperAdmin?: boolean;
}
