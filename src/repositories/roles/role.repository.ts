import { pool } from '../../config/database.js';
import { CreateRoleRequest, UpdateRoleRequest } from '../../types/roles/roles.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			name,
			description,
			is_active,
			created_at,
			updated_at
		FROM scrum.roles
		ORDER BY id
	`);

	return result.rows;
}

export async function findById(id: number) {
	const result = await pool.query(
		`
		SELECT
			id,
			name,
			description,
			is_active,
			created_at,
			updated_at
		FROM scrum.roles
		WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
}

export async function findByName(name: string) {
	const result = await pool.query(
		`
		SELECT *
		FROM scrum.roles
		WHERE LOWER(name) = LOWER($1)
		`,
		[name],
	);

	return result.rows[0] ?? null;
}

export async function create(data: CreateRoleRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.roles (
			name,
			description
		)
		VALUES ($1, $2)
		RETURNING *
		`,
		[data.name, data.description ?? null],
	);

	return result.rows[0];
}

export async function update(id: number, data: UpdateRoleRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.roles
		SET
			name = COALESCE($1, name),
			description = COALESCE($2, description),
			is_active = COALESCE($3, is_active),
			updated_at = NOW()
		WHERE id = $4
		RETURNING *
		`,
		[data.name ?? null, data.description ?? null, data.is_active ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deactivate(id: number) {
	const result = await pool.query(
		`
		UPDATE scrum.roles
		SET
			is_active = FALSE,
			updated_at = NOW()
		WHERE id = $1
		RETURNING *
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
