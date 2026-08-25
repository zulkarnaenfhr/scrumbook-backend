export interface Timeline {
	id: string;
	project_id: string;
	task: string;
	progress: number | null;
	start: Date;
	end: Date;
	color: string | null;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
	code: string;
}

export interface CreateTimelineRequest {
	project_id: string;
	task: string;
	progress?: number;
	start: Date;
	end: Date;
	color?: string;
	created_by: string;
	updated_by: string;
	code: string;
}

export interface UpdateTimelineRequest {
	task?: string;
	progress?: number;
	start?: Date;
	end?: Date;
	color?: string;
	updated_by?: string;
	code?: string;
}
