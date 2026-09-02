export interface Role {
	id: number;
	name: string;
	description: string | null;
	is_active: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface CreateRoleRequest {
	name: string;
	description?: string;
}

export interface UpdateRoleRequest {
	name?: string;
	description?: string;
	is_active?: boolean;
}
