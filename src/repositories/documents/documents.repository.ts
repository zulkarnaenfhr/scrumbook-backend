import { pool } from '../../config/database.js';
import { CreateDocumentRequest, UpdateDocumentRequest } from '../../types/documents/document.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			code,
			project_id,
			category,
			summary,
			content,
			type,
			url,
			version,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			user_id,
			is_redirect
		FROM scrum.document
		ORDER BY created_at DESC
	`);

	return result.rows;
}

export async function findById(id: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			code,
			project_id,
			category,
			summary,
			content,
			type,
			url,
			version,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			user_id,
			is_redirect
		FROM scrum.document
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
			code,
			project_id,
			category,
			summary,
			content,
			type,
			url,
			version,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			user_id,
			is_redirect
		FROM scrum.document
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
			code,
			project_id,
			category,
			summary,
			content,
			type,
			url,
			version,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			user_id,
			is_redirect
		FROM scrum.document
		WHERE user_id = $1
		ORDER BY created_at DESC
		`,
		[userId],
	);

	return result.rows;
}

export async function create(data: CreateDocumentRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.document (
			code,
			project_id,
			category,
			summary,
			content,
			type,
			url,
			version,
			created_by,
			updated_by,
			title,
			user_id,
			is_redirect
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
		RETURNING
			id,
			code,
			project_id,
			category,
			summary,
			content,
			type,
			url,
			version,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			user_id,
			is_redirect
		`,
		[
			data.code,
			data.project_id ?? null,
			data.category,
			data.summary ?? null,
			data.content ?? null,
			data.type,
			data.url ?? null,
			data.version ?? null,
			data.created_by,
			data.updated_by,
			data.title ?? null,
			data.user_id,
			data.is_redirect ?? false,
		],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateDocumentRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.document
		SET
			code = COALESCE($1, code),
			project_id = COALESCE($2, project_id),
			category = COALESCE($3, category),
			summary = COALESCE($4, summary),
			content = COALESCE($5, content),
			type = COALESCE($6, type),
			url = COALESCE($7, url),
			version = COALESCE($8, version),
			updated_by = COALESCE($9, updated_by),
			title = COALESCE($10, title),
			is_redirect = COALESCE($11, is_redirect),
			updated_at = NOW()
		WHERE id = $12
		RETURNING
			id,
			code,
			project_id,
			category,
			summary,
			content,
			type,
			url,
			version,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			user_id,
			is_redirect
		`,
		[
			data.code ?? null,
			data.project_id ?? null,
			data.category ?? null,
			data.summary ?? null,
			data.content ?? null,
			data.type ?? null,
			data.url ?? null,
			data.version ?? null,
			data.updated_by ?? null,
			data.title ?? null,
			data.is_redirect ?? null,
			id,
		],
	);

	return result.rows[0] ?? null;
}

export async function deleteDocument(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.document
		WHERE id = $1
		RETURNING
			id,
			code,
			project_id,
			category,
			summary,
			content,
			type,
			url,
			version,
			created_by,
			updated_by,
			created_at,
			updated_at,
			title,
			user_id,
			is_redirect
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
