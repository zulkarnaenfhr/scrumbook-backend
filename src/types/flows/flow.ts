export interface Flow {
	id: string;
	node: Record<string, unknown>[] | null;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
	title: string;
	description: string | null;
	is_publish: boolean;
	edge: Record<string, unknown>[] | null;
	code: string;
	version: number | null;
	user_id: string;
	project_id: string;
}

export interface CreateFlowRequest {
	node?: Record<string, unknown>[];
	created_by: string;
	updated_by: string;
	title: string;
	description?: string;
	is_publish: boolean;
	edge?: Record<string, unknown>[];
	code: string;
	version?: number;
	user_id: string;
	project_id: string;
}

export interface UpdateFlowRequest {
	node?: Record<string, unknown>[];
	updated_by?: string;
	title?: string;
	description?: string;
	is_publish?: boolean;
	edge?: Record<string, unknown>[];
	code?: string;
	version?: number;
}
