import { pool } from '../../config/database.js';
import { CreateAuditLogInput, AuditLogFilter } from '../../types/audit-logs/audit-log.js';

export async function create(data: CreateAuditLogInput) {
	const result = await pool.query(
		`
		INSERT INTO scrum.audit_logs (
			user_id,
			action,
			entity,
			entity_id,
			old_value,
			new_value
		)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING
			id,
			user_id,
			action,
			entity,
			entity_id,
			old_value,
			new_value,
			created_at
		`,
		[data.user_id, data.action, data.entity, String(data.entity_id), data.old_value ?? null, data.new_value ?? null],
	);

	return result.rows[0];
}

/**
 * Flexible lookup used by both "show me everything that happened to this
 * project" and "show me a global feed" style queries. All filters are
 * optional and combined with AND.
 */
export async function findAll(filter: AuditLogFilter = {}) {
	const conditions: string[] = [];
	const values: unknown[] = [];

	if (filter.entity) {
		values.push(filter.entity);
		conditions.push(`entity = $${values.length}`);
	}

	if (filter.entity_id) {
		values.push(filter.entity_id);
		conditions.push(`entity_id = $${values.length}`);
	}

	if (filter.user_id) {
		values.push(filter.user_id);
		conditions.push(`user_id = $${values.length}`);
	}

	if (filter.action) {
		values.push(filter.action);
		conditions.push(`action = $${values.length}`);
	}

	const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

	const limit = Math.min(filter.limit ?? 100, 500);
	values.push(limit);

	const result = await pool.query(
		`
		SELECT
			al.id,
			al.user_id,
			u.username AS user_name,
			al.action,
			al.entity,
			al.entity_id,
			al.old_value,
			al.new_value,
			al.created_at
		FROM scrum.audit_logs al
		LEFT JOIN scrum.users u ON u.id = al.user_id
		${whereClause}
		ORDER BY al.created_at DESC
		LIMIT $${values.length}
		`,
		values,
	);

	return result.rows;
}
