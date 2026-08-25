export interface Project {
	id: string;
	code: string;
	name: string;
	summary: string | null;
	target_start: Date | null;
	target_end: Date | null;
	target_implementation: Date | null;
	priority: string;
	status: number;
	color: string | null;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
	no_release: string | null;
	business_unit: string | null;
	category: string | null;
	project_owner: string | null;
	organization_id: string;
	user_id: string;
}

export interface CreateProjectRequest {
	code: string;
	name: string;
	summary?: string;
	target_start?: Date;
	target_end?: Date;
	target_implementation?: Date;
	priority: string;
	status: number;
	color?: string;
	created_by: string;
	updated_by: string;
	no_release?: string;
	business_unit?: string;
	category?: string;
	project_owner?: string;
	organization_id: string;
	user_id: string;
}

export interface UpdateProjectRequest {
	code?: string;
	name?: string;
	summary?: string;
	target_start?: Date;
	target_end?: Date;
	target_implementation?: Date;
	priority?: string;
	status?: number;
	color?: string;
	updated_by?: string;
	no_release?: string;
	business_unit?: string;
	category?: string;
	project_owner?: string;
}
