export interface Document {
	id: string;
	code: string;
	project_id: string | null;
	category: string;
	summary: string | null;
	content: string | null;
	type: string;
	url: string | null;
	version: number | null;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
	title: string | null;
	user_id: string;
	is_redirect: boolean;
}

export interface CreateDocumentRequest {
	code: string;
	project_id?: string;
	category: string;
	summary?: string;
	content?: string;
	type: string;
	url?: string;
	version?: number;
	created_by: string;
	updated_by: string;
	title?: string;
	user_id: string;
	is_redirect?: boolean;
}

export interface UpdateDocumentRequest {
	code?: string;
	project_id?: string;
	category?: string;
	summary?: string;
	content?: string;
	type?: string;
	url?: string;
	version?: number;
	updated_by?: string;
	title?: string;
	is_redirect?: boolean;
}
