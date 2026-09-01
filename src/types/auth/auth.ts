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
	token_type: string;
	expires_in: string;
	user: AuthUser;
}
