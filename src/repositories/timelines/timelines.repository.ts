import { pool } from '../../config/database.js';
import { CreateTimelineRequest, UpdateTimelineRequest } from '../../types/timelines/timeline.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			project_id,
			task,
			progress,
			start,
			"end",
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		FROM scrum.timeline
		ORDER BY start ASC
	`);

	return result.rows;
}

export async function findById(id: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			project_id,
			task,
			progress,
			start,
			"end",
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		FROM scrum.timeline
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
			task,
			progress,
			start,
			"end",
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		FROM scrum.timeline
		WHERE project_id = $1
		ORDER BY start ASC
		`,
		[projectId],
	);

	return result.rows;
}

export async function create(data: CreateTimelineRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.timeline (
			project_id,
			task,
			progress,
			start,
			"end",
			color,
			created_by,
			updated_by,
			code
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING
			id,
			project_id,
			task,
			progress,
			start,
			"end",
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		`,
		[data.project_id, data.task, data.progress ?? null, data.start, data.end, data.color ?? null, data.created_by, data.updated_by, data.code],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateTimelineRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.timeline
		SET
			task = COALESCE($1, task),
			progress = COALESCE($2, progress),
			start = COALESCE($3, start),
			"end" = COALESCE($4, "end"),
			color = COALESCE($5, color),
			updated_by = COALESCE($6, updated_by),
			code = COALESCE($7, code),
			updated_at = NOW()
		WHERE id = $8
		RETURNING
			id,
			project_id,
			task,
			progress,
			start,
			"end",
			color,
			created_by,
			updated_by,
			created_at,
			updated_at,
			code
		`,
		[data.task ?? null, data.progress ?? null, data.start ?? null, data.end ?? null, data.color ?? null, data.updated_by ?? null, data.code ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteTimeline(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.timeline
		WHERE id = $1
		RETURNING
			id,
			project_id,
			task,
			progress,
			start,
			"end",
			color,
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
