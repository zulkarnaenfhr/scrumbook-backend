import { pool } from '../../config/database.js';
import { CreateChangelogRequest, UpdateChangelogRequest } from '../../types/changelogs/changelog.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			code,
			project_id,
			log,
			created_by,
			updated_by,
			created_at,
			updated_at
		FROM scrum.changelog
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
			log,
			created_by,
			updated_by,
			created_at,
			updated_at
		FROM scrum.changelog
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
			log,
			created_by,
			updated_by,
			created_at,
			updated_at
		FROM scrum.changelog
		WHERE project_id = $1
		ORDER BY created_at DESC
		`,
		[projectId],
	);

	return result.rows;
}

export async function create(data: CreateChangelogRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.changelog (
			code,
			project_id,
			log,
			created_by,
			updated_by
		)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING
			id,
			code,
			project_id,
			log,
			created_by,
			updated_by,
			created_at,
			updated_at
		`,
		[data.code, data.project_id, data.log, data.created_by, data.updated_by],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateChangelogRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.changelog
		SET
			code = COALESCE($1, code),
			log = COALESCE($2, log),
			updated_by = COALESCE($3, updated_by),
			updated_at = NOW()
		WHERE id = $4
		RETURNING
			id,
			code,
			project_id,
			log,
			created_by,
			updated_by,
			created_at,
			updated_at
		`,
		[data.code ?? null, data.log ?? null, data.updated_by ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteChangelog(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.changelog
		WHERE id = $1
		RETURNING
			id,
			code,
			project_id,
			log,
			created_by,
			updated_by,
			created_at,
			updated_at
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
