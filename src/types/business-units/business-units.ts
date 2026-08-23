export interface BusinessUnit {
	id: number;
	name: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface CreateBusinessUnitRequest {
	name: string;
}

export interface UpdateBusinessUnitRequest {
	name?: string;
	is_active?: boolean;
}
