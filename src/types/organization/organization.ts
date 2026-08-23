export interface Organization {
	id: number;
	name: string;
	code: string | null;
	created_at: string;
	updated_at: string;
}

export interface CreateOrganizationRequest {
	name: string;
	code?: string;
}

export interface UpdateOrganizationRequest {
	name?: string;
	code?: string | null;
}
