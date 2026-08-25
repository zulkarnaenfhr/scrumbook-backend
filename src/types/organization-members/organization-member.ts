export interface OrganizationMember {
	id: number;
	created_at: string;
	organization_id: number;
	user_id: string;
	level: string;
	created_by: string;
	updated_by: string;
	updated_at: string;
	username?: string | null;
}

export interface CreateOrganizationMemberRequest {
	organization_id: number;
	user_id: string;
	level: string;
	created_by: string;
	updated_by: string;
	username?: string;
}

export interface UpdateOrganizationMemberRequest {
	level?: string;
	updated_by?: string;
	username?: string;
}
