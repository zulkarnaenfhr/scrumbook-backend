export interface Changelog {
	id: string;
	code: string;
	project_id: string;
	log: string;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
}

export interface CreateChangelogRequest {
	code: string;
	project_id: string;
	log: string;
	created_by: string;
	updated_by: string;
}

export interface UpdateChangelogRequest {
	code?: string;
	log?: string;
	updated_by?: string;
}
