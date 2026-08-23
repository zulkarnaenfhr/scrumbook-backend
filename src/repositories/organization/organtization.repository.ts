import { pool } from '../../config/database.js';
import { CreateOrganizationRequest, UpdateOrganizationRequest } from '../../types/organization/organization.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			name,
			code,
			created_at,
			updated_at
		FROM "scrumbook".organizations
		ORDER BY created_at 
	`);

	return result.rows;
}

export async function findById(id: number) {
	const result = await pool.query(
		`
		SELECT
			id,
			name,
			code,
			created_at,
			updated_at
		FROM "scrumbook".organizations
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
			name,
			code,
			created_at,
			updated_at
		FROM "scrumbook".organizations
		WHERE LOWER(name) = LOWER($1)
		`,
		[name],
	);

	return result.rows[0] ?? null;
}

export async function findByCode(code: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			name,
			code,
			created_at,
			updated_at
		FROM "scrumbook".organizations
		WHERE LOWER(code) = LOWER($1)
		`,
		[code],
	);

	return result.rows[0] ?? null;
}

export async function create(data: CreateOrganizationRequest) {
	const result = await pool.query(
		`
		INSERT INTO "scrumbook".organizations (
			name,
			code
		)
		VALUES ($1, $2)
		RETURNING
			id,
			name,
			code,
			created_at,
			updated_at
		`,
		[data.name, data.code ?? null],
	);

	return result.rows[0];
}

export async function update(id: number, data: UpdateOrganizationRequest) {
	const result = await pool.query(
		`
		UPDATE "scrumbook".organizations
		SET
			name = COALESCE($1, name),
			code = COALESCE($2, code),
			updated_at = NOW()
		WHERE id = $3
		RETURNING
			id,
			name,
			code,
			created_at,
			updated_at
		`,
		[data.name ?? null, data.code ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteOrganization(id: number) {
	const result = await pool.query(
		`
		DELETE FROM "scrumbook".organizations
		WHERE id = $1
		RETURNING
			id,
			name,
			code,
			created_at,
			updated_at
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
