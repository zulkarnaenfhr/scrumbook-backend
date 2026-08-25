export interface Task {
	id: string;
	project_id: string | null;
	title: string;
	detail: string | null;
	user_id: string;
	target: Date | null;
	priority: string;
	created_by: string | null;
	updated_by: string | null;
	created_at: Date;
	updated_at: Date | null;
	status: string;
	timeline_id: string | null;
}

export interface CreateTaskRequest {
	project_id?: string;
	title: string;
	detail?: string;
	user_id: string;
	target?: Date;
	priority: string;
	created_by?: string;
	updated_by?: string;
	status: string;
	timeline_id?: string;
}

export interface UpdateTaskRequest {
	project_id?: string;
	title?: string;
	detail?: string;
	target?: Date;
	priority?: string;
	updated_by?: string;
	status?: string;
	timeline_id?: string;
}
