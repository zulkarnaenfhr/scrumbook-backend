export interface User {
	id: string;
	username: string | null;
	email: string | null;
	password_hash: string;
	role_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface CreateUserRequest {
	username: string;
	email: string;
	password: string;
	role_id?: number;
}

export interface UpdateUserRequest {
	username?: string;
	email?: string;
	password?: string;
	role_id?: number;
}

export interface LoginRequest {
	email: string;
	password: string;
}
