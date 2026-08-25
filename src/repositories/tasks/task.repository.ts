import { pool } from '../../config/database.js';
import { CreateTaskRequest, UpdateTaskRequest } from '../../types/tasks/task.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			project_id,
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			created_at,
			updated_at,
			status,
			timeline_id
		FROM scrum.task
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
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			created_at,
			updated_at,
			status,
			timeline_id
		FROM scrum.task
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
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			created_at,
			updated_at,
			status,
			timeline_id
		FROM scrum.task
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
			project_id,
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			created_at,
			updated_at,
			status,
			timeline_id
		FROM scrum.task
		WHERE user_id = $1
		ORDER BY created_at DESC
		`,
		[userId],
	);

	return result.rows;
}

export async function findByTimelineId(timelineId: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			project_id,
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			created_at,
			updated_at,
			status,
			timeline_id
		FROM scrum.task
		WHERE timeline_id = $1
		ORDER BY created_at DESC
		`,
		[timelineId],
	);

	return result.rows;
}

export async function create(data: CreateTaskRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.task (
			project_id,
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			status,
			timeline_id
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
		RETURNING
			id,
			project_id,
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			created_at,
			updated_at,
			status,
			timeline_id
		`,
		[data.project_id ?? null, data.title, data.detail ?? null, data.user_id, data.target ?? null, data.priority, data.created_by ?? null, data.updated_by ?? null, data.status, data.timeline_id ?? null],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateTaskRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.task
		SET
			project_id = COALESCE($1, project_id),
			title = COALESCE($2, title),
			detail = COALESCE($3, detail),
			target = COALESCE($4, target),
			priority = COALESCE($5, priority),
			updated_by = COALESCE($6, updated_by),
			status = COALESCE($7, status),
			timeline_id = COALESCE($8, timeline_id),
			updated_at = NOW()
		WHERE id = $9
		RETURNING
			id,
			project_id,
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			created_at,
			updated_at,
			status,
			timeline_id
		`,
		[data.project_id ?? null, data.title ?? null, data.detail ?? null, data.target ?? null, data.priority ?? null, data.updated_by ?? null, data.status ?? null, data.timeline_id ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteTask(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.task
		WHERE id = $1
		RETURNING
			id,
			project_id,
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			created_at,
			updated_at,
			status,
			timeline_id
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
