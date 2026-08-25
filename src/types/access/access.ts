export interface Access {
	id: string;
	item_id: string;
	view: boolean;
	create_permission: boolean;
	write: boolean;
	delete: boolean;
	user_id: string;
	type: string;
	username: string;
	created_at: Date;
}

export interface CreateAccessRequest {
	item_id: string;
	view: boolean;
	create_permission: boolean;
	write: boolean;
	delete: boolean;
	user_id: string;
	type: string;
	username?: string;
}

export interface UpdateAccessRequest {
	view?: boolean;
	create_permission?: boolean;
	write?: boolean;
	delete?: boolean;
	username?: string;
}
