export interface ProjectConstraint {
	id: string;
	name: string;
	start: Date;
	status: string;
	detail: string | null;
	project_id: string;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
}

export interface CreateProjectConstraintRequest {
	name: string;
	start: Date;
	status: string;
	detail?: string;
	project_id: string;
	created_by: string;
	updated_by: string;
}

export interface UpdateProjectConstraintRequest {
	name?: string;
	start?: Date;
	status?: string;
	detail?: string;
	updated_by?: string;
}
