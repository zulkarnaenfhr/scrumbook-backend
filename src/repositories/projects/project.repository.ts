import { pool } from '../../config/database.js';
import { CreateProjectRequest, UpdateProjectRequest } from '../../types/projects/projects.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			code,
			name,
			summary,
			target_start,
			target_end,
			target_implementation,
			priority,
			status,
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			no_release,
			business_unit,
			category,
			project_owner,
			organization_id,
			user_id
		FROM scrum.project
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
			name,
			summary,
			target_start,
			target_end,
			target_implementation,
			priority,
			status,
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			no_release,
			business_unit,
			category,
			project_owner,
			organization_id,
			user_id
		FROM scrum.project
		WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
}

export async function findByOrganizationId(organizationId: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			code,
			name,
			summary,
			target_start,
			target_end,
			target_implementation,
			priority,
			status,
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			no_release,
			business_unit,
			category,
			project_owner,
			organization_id,
			user_id
		FROM scrum.project
		WHERE organization_id = $1
		ORDER BY created_at DESC
		`,
		[organizationId],
	);

	return result.rows;
}

export async function create(data: CreateProjectRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.project (
			code,
			name,
			summary,
			target_start,
			target_end,
			target_implementation,
			priority,
			status,
			color,
			created_by,
			updated_by,
			no_release,
			business_unit,
			category,
			project_owner,
			organization_id,
			user_id
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
		RETURNING
			id,
			code,
			name,
			summary,
			target_start,
			target_end,
			target_implementation,
			priority,
			status,
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			no_release,
			business_unit,
			category,
			project_owner,
			organization_id,
			user_id
		`,
		[
			data.code,
			data.name,
			data.summary ?? null,
			data.target_start ?? null,
			data.target_end ?? null,
			data.target_implementation ?? null,
			data.priority,
			data.status,
			data.color ?? null,
			data.created_by,
			data.updated_by,
			data.no_release ?? null,
			data.business_unit ?? null,
			data.category ?? null,
			data.project_owner ?? null,
			data.organization_id,
			data.user_id,
		],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateProjectRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.project
		SET
			code = COALESCE($1, code),
			name = COALESCE($2, name),
			summary = COALESCE($3, summary),
			target_start = COALESCE($4, target_start),
			target_end = COALESCE($5, target_end),
			target_implementation = COALESCE($6, target_implementation),
			priority = COALESCE($7, priority),
			status = COALESCE($8, status),
			color = COALESCE($9, color),
			updated_by = COALESCE($10, updated_by),
			no_release = COALESCE($11, no_release),
			business_unit = COALESCE($12, business_unit),
			category = COALESCE($13, category),
			project_owner = COALESCE($14, project_owner),
			updated_at = NOW()
		WHERE id = $15
		RETURNING
			id,
			code,
			name,
			summary,
			target_start,
			target_end,
			target_implementation,
			priority,
			status,
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			no_release,
			business_unit,
			category,
			project_owner,
			organization_id,
			user_id
		`,
		[
			data.code ?? null,
			data.name ?? null,
			data.summary ?? null,
			data.target_start ?? null,
			data.target_end ?? null,
			data.target_implementation ?? null,
			data.priority ?? null,
			data.status ?? null,
			data.color ?? null,
			data.updated_by ?? null,
			data.no_release ?? null,
			data.business_unit ?? null,
			data.category ?? null,
			data.project_owner ?? null,
			id,
		],
	);

	return result.rows[0] ?? null;
}

export async function deleteProject(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.project
		WHERE id = $1
		RETURNING
			id,
			code,
			name,
			summary,
			target_start,
			target_end,
			target_implementation,
			priority,
			status,
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			no_release,
			business_unit,
			category,
			project_owner,
			organization_id,
			user_id
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
