export interface CorrespondingTeam {
	id: string;
	project_id: string;
	name: string;
	pic: string | null;
	description: string | null;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
	code: string;
}

export interface CreateCorrespondingTeamRequest {
	project_id: string;
	name: string;
	pic?: string;
	description?: string;
	created_by: string;
	updated_by: string;
	code: string;
}

export interface UpdateCorrespondingTeamRequest {
	name?: string;
	pic?: string;
	description?: string;
	updated_by?: string;
	code?: string;
}
