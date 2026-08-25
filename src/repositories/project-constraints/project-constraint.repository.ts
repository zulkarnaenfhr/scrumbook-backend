import { pool } from '../../config/database.js';
import { CreateProjectConstraintRequest, UpdateProjectConstraintRequest } from '../../types/project-constraints/project-constraint.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			name,
			start,
			status,
			detail,
			project_id,
			created_by,
			updated_by,
			created_at,
			updated_at
		FROM scrum.project_constraint
		ORDER BY start ASC
	`);

	return result.rows;
}

export async function findById(id: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			name,
			start,
			status,
			detail,
			project_id,
			created_by,
			updated_by,
			created_at,
			updated_at
		FROM scrum.project_constraint
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
			name,
			start,
			status,
			detail,
			project_id,
			created_by,
			updated_by,
			created_at,
			updated_at
		FROM scrum.project_constraint
		WHERE project_id = $1
		ORDER BY start ASC
		`,
		[projectId],
	);

	return result.rows;
}

export async function create(data: CreateProjectConstraintRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.project_constraint (
			name,
			start,
			status,
			detail,
			project_id,
			created_by,
			updated_by
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING
			id,
			name,
			start,
			status,
			detail,
			project_id,
			created_by,
			updated_by,
			created_at,
			updated_at
		`,
		[data.name, data.start, data.status, data.detail ?? null, data.project_id, data.created_by, data.updated_by],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateProjectConstraintRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.project_constraint
		SET
			name = COALESCE($1, name),
			start = COALESCE($2, start),
			status = COALESCE($3, status),
			detail = COALESCE($4, detail),
			updated_by = COALESCE($5, updated_by),
			updated_at = NOW()
		WHERE id = $6
		RETURNING
			id,
			name,
			start,
			status,
			detail,
			project_id,
			created_by,
			updated_by,
			created_at,
			updated_at
		`,
		[data.name ?? null, data.start ?? null, data.status ?? null, data.detail ?? null, data.updated_by ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteProjectConstraint(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.project_constraint
		WHERE id = $1
		RETURNING
			id,
			name,
			start,
			status,
			detail,
			project_id,
			created_by,
			updated_by,
			created_at,
			updated_at
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
