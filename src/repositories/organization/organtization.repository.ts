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

export async function findAllByUserId(userId: string) {
	const result = await pool.query(
		`
		SELECT
			o.id,
			o.created_at,
			o.name,
			o.description,
			o.created_by,
			o.updated_by,
			o.updated_at,
			o.user_id
		FROM scrum.organization o
		INNER JOIN scrum.organization_member om
			ON om.organization_id = o.id
		WHERE om.user_id = $1
		ORDER BY o.created_at DESC
		`,
		[userId],
	);

	return result.rows;
}

export async function findByIdForUser(id: number, userId: string) {
	const result = await pool.query(
		`
		SELECT
			o.id,
			o.created_at,
			o.name,
			o.description,
			o.created_by,
			o.updated_by,
			o.updated_at,
			o.user_id
		FROM scrum.organization o
		INNER JOIN scrum.organization_member om
			ON om.organization_id = o.id
		WHERE o.id = $1
		  AND om.user_id = $2
		`,
		[id, userId],
	);

	return result.rows[0] ?? null;
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

export async function create(data: CreateOrganizationRequest & { created_by: string; user_id: string }) {
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

export async function createWithOwner(data: { name: string; description: string; actorUserId: string }) {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');

		const organizationResult = await client.query(
			`
			INSERT INTO scrum.organization (
				name,
				description,
				created_by,
				updated_by,
				user_id
			)
			VALUES ($1, $2, $3, $3, $3)
			RETURNING
				id, created_at, name, description, created_by, updated_by, updated_at, user_id
			`,
			[data.name, data.description, data.actorUserId],
		);

		const organization = organizationResult.rows[0];

		const memberResult = await client.query(
			`
			INSERT INTO scrum.organization_member (
				organization_id,
				user_id,
				level,
				created_by,
				updated_by,
				username
			)
			SELECT $1, u.id, 'ADMIN', $2, $2, u.username
			FROM scrum.users u
			WHERE u.id = $3
			RETURNING
				id, created_at, organization_id, user_id, level, created_by, updated_by, updated_at, username
			`,
			[organization.id, data.actorUserId, data.actorUserId],
		);

		if (!memberResult.rows[0]) {
			throw new Error('User not found');
		}

		await client.query('COMMIT');

		return { organization, member: memberResult.rows[0] };
	} catch (error) {
		await client.query('ROLLBACK');
		throw error;
	} finally {
		client.release();
	}
}
