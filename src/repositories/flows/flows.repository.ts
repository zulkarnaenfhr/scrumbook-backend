import { pool } from '../../config/database.js';
import { CreateFlowRequest, UpdateFlowRequest } from '../../types/flows/flow.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			node,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			description,
			is_publish,
			edge,
			code,
			version,
			user_id,
			project_id
		FROM scrum.flow
		ORDER BY created_at DESC
	`);

	return result.rows;
}

export async function findById(id: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			node,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			description,
			is_publish,
			edge,
			code,
			version,
			user_id,
			project_id
		FROM scrum.flow
		WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
}

export async function findByProjectId(projectId: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			node,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			description,
			is_publish,
			edge,
			code,
			version,
			user_id,
			project_id
		FROM scrum.flow
		WHERE project_id = $1
		ORDER BY created_at DESC
		`,
		[projectId],
	);

	return result.rows;
}

export async function findByUserId(userId: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			node,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			description,
			is_publish,
			edge,
			code,
			version,
			user_id,
			project_id
		FROM scrum.flow
		WHERE user_id = $1
		ORDER BY created_at DESC
		`,
		[userId],
	);

	return result.rows;
}

export async function create(data: CreateFlowRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.flow (
			node,
			created_by,
			updated_by,
			title,
			description,
			is_publish,
			edge,
			code,
			version,
			user_id,
			project_id
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
		RETURNING
			id,
			node,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			description,
			is_publish,
			edge,
			code,
			version,
			user_id,
			project_id
		`,
		[
			data.node ? JSON.stringify(data.node) : null,
			data.created_by,
			data.updated_by,
			data.title,
			data.description ?? null,
			data.is_publish,
			data.edge ? JSON.stringify(data.edge) : null,
			data.code,
			data.version ?? null,
			data.user_id,
			data.project_id,
		],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateFlowRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.flow
		SET
			node = COALESCE($1, node),
			updated_by = COALESCE($2, updated_by),
			title = COALESCE($3, title),
			description = COALESCE($4, description),
			is_publish = COALESCE($5, is_publish),
			edge = COALESCE($6, edge),
			code = COALESCE($7, code),
			version = COALESCE($8, version),
			updated_at = NOW()
		WHERE id = $9
		RETURNING
			id,
			node,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			description,
			is_publish,
			edge,
			code,
			version,
			user_id,
			project_id
		`,
		[data.node ? JSON.stringify(data.node) : null, data.updated_by ?? null, data.title ?? null, data.description ?? null, data.is_publish ?? null, data.edge ? JSON.stringify(data.edge) : null, data.code ?? null, data.version ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteFlow(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.flow
		WHERE id = $1
		RETURNING
			id,
			node,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			description,
			is_publish,
			edge,
			code,
			version,
			user_id,
			project_id
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
