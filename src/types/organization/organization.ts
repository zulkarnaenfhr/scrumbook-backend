export interface Organization {
	id: number;
	created_at: Date;
	name: string;
	description: string;
	created_by: string;
	updated_by: string;
	updated_at: Date;
	user_id: string;
}

export interface CreateOrganizationRequest {
	name: string;
	description: string;
}

export interface UpdateOrganizationRequest {
	name?: string;
	description?: string;
	updated_by?: string;
}
