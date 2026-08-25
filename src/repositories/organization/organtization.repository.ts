import { pool } from '../../config/database.js';

import { CreateOrganizationRequest, UpdateOrganizationRequest } from '../../types/organization/organization.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			created_at,
			name,
			description,
			created_by,
			updated_by,
			updated_at,
			user_id
		FROM scrum.organization
		ORDER BY created_at DESC
	`);

	return result.rows;
}

export async function findById(id: number) {
	const result = await pool.query(
		`
		SELECT
			id,
			created_at,
			name,
			description,
			created_by,
			updated_by,
			updated_at,
			user_id
		FROM scrum.organization
		WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
}

export async function findByName(name: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			created_at,
			name,
			description,
			created_by,
			updated_by,
			updated_at,
			user_id
		FROM scrum.organization
		WHERE LOWER(name) = LOWER($1)
		`,
		[name],
	);

	return result.rows[0] ?? null;
}

export async function create(data: CreateOrganizationRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.organization (
			name,
			description,
			created_by,
			updated_by,
			user_id
		)
		VALUES ($1, $2, $3, $3, $4)
		RETURNING
			id,
			created_at,
			name,
			description,
			created_by,
			updated_by,
			updated_at,
			user_id
		`,
		[data.name, data.description, data.created_by, data.user_id],
	);

	return result.rows[0];
}

export async function update(id: number, data: UpdateOrganizationRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.organization
		SET
			name = COALESCE($1, name),
			description = COALESCE($2, description),
			updated_by = COALESCE($3, updated_by),
			updated_at = NOW()
		WHERE id = $4
		RETURNING
			id,
			created_at,
			name,
			description,
			created_by,
			updated_by,
			updated_at,
			user_id
		`,
		[data.name ?? null, data.description ?? null, data.updated_by ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteOrganization(id: number) {
	const result = await pool.query(
		`
		DELETE FROM scrum.organization
		WHERE id = $1
		RETURNING
			id,
			created_at,
			name,
			description,
			created_by,
			updated_by,
			updated_at,
			user_id
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
