export interface User {
	id: string;
	username: string | null;
	email: string | null;
	password_hash: string;
	created_at: Date;
	updated_at: Date;
}

export interface CreateUserRequest {
	username: string;
	email: string;
	password: string;
}

export interface UpdateUserRequest {
	username?: string;
	email?: string;
	password?: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}
