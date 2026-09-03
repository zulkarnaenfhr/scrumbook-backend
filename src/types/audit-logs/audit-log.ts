export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';

export interface AuditLog {
	id: number;
	user_id: string | null;
	action: AuditAction;
	entity: string;
	entity_id: string;
	old_value: Record<string, unknown> | null;
	new_value: Record<string, unknown> | null;
	created_at: string;
}

export interface CreateAuditLogInput {
	user_id: string | null;
	action: AuditAction;
	entity: string;
	entity_id: string | number;
	old_value?: Record<string, unknown> | null;
	new_value?: Record<string, unknown> | null;
}

export interface AuditLogFilter {
	entity?: string;
	entity_id?: string;
	user_id?: string;
	action?: AuditAction;
	limit?: number;
}
