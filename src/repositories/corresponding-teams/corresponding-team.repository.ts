import { pool } from '../../config/database.js';
import { CreateCorrespondingTeamRequest, UpdateCorrespondingTeamRequest } from '../../types/corresponding-teams/corresponding-team.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			project_id,
			name,
			pic,
			description,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		FROM scrum.corresponding_team
		ORDER BY created_at DESC
	`);

	return result.rows;
}

export async function findById(id: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			project_id,
			name,
			pic,
			description,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		FROM scrum.corresponding_team
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
			project_id,
			name,
			pic,
			description,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		FROM scrum.corresponding_team
		WHERE project_id = $1
		ORDER BY created_at DESC
		`,
		[projectId],
	);

	return result.rows;
}

export async function create(data: CreateCorrespondingTeamRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.corresponding_team (
			project_id,
			name,
			pic,
			description,
			created_by,
			updated_by,
			code
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING
			id,
			project_id,
			name,
			pic,
			description,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		`,
		[data.project_id, data.name, data.pic ?? null, data.description ?? null, data.created_by, data.updated_by, data.code],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateCorrespondingTeamRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.corresponding_team
		SET
			name = COALESCE($1, name),
			pic = COALESCE($2, pic),
			description = COALESCE($3, description),
			updated_by = COALESCE($4, updated_by),
			code = COALESCE($5, code),
			updated_at = NOW()
		WHERE id = $6
		RETURNING
			id,
			project_id,
			name,
			pic,
			description,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		`,
		[data.name ?? null, data.pic ?? null, data.description ?? null, data.updated_by ?? null, data.code ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteCorrespondingTeam(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.corresponding_team
		WHERE id = $1
		RETURNING
			id,
			project_id,
			name,
			pic,
			description,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
