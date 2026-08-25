export interface User {
	id: string;
	username: string | null;
	email: string | null;
	created_at: Date;
	updated_at: Date;
}

export interface CreateUserRequest {
	username?: string;
	email?: string;
}

export interface UpdateUserRequest {
	username?: string;
	email?: string;
}
