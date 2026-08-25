import { pool } from '../../config/database.js';
import { CreateOrganizationMemberRequest, UpdateOrganizationMemberRequest } from '../../types/organization-members/organization-member.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			created_at,
			organization_id,
			user_id,
			level,
			created_by,
			updated_by,
			updated_at,
			username
		FROM scrum.organization_member
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
			organization_id,
			user_id,
			level,
			created_by,
			updated_by,
			updated_at,
			username
		FROM scrum.organization_member
		WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
}

export async function findByOrganizationId(organizationId: number) {
	const result = await pool.query(
		`
		SELECT
			id,
			created_at,
			organization_id,
			user_id,
			level,
			created_by,
			updated_by,
			updated_at,
			username
		FROM scrum.organization_member
		WHERE organization_id = $1
		ORDER BY created_at DESC
		`,
		[organizationId],
	);

	return result.rows;
}

export async function findByUserId(userId: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			created_at,
			organization_id,
			user_id,
			level,
			created_by,
			updated_by,
			updated_at,
			username
		FROM scrum.organization_member
		WHERE user_id = $1
		ORDER BY created_at DESC
		`,
		[userId],
	);

	return result.rows;
}

export async function findByOrganizationAndUser(organizationId: number, userId: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			created_at,
			organization_id,
			user_id,
			level,
			created_by,
			updated_by,
			updated_at,
			username
		FROM scrum.organization_member
		WHERE organization_id = $1
		AND user_id = $2
		`,
		[organizationId, userId],
	);

	return result.rows[0] ?? null;
}

export async function create(data: CreateOrganizationMemberRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.organization_member (
			organization_id,
			user_id,
			level,
			created_by,
			updated_by,
			username
		)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING
			id,
			created_at,
			organization_id,
			user_id,
			level,
			created_by,
			updated_by,
			updated_at,
			username
		`,
		[data.organization_id, data.user_id, data.level, data.created_by, data.updated_by, data.username ?? null],
	);

	return result.rows[0];
}

export async function update(id: number, data: UpdateOrganizationMemberRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.organization_member
		SET
			level = COALESCE($1, level),
			updated_by = COALESCE($2, updated_by),
			username = COALESCE($3, username),
			updated_at = NOW()
		WHERE id = $4
		RETURNING
			id,
			created_at,
			organization_id,
			user_id,
			level,
			created_by,
			updated_by,
			updated_at,
			username
		`,
		[data.level ?? null, data.updated_by ?? null, data.username ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function remove(id: number) {
	const result = await pool.query(
		`
		DELETE FROM scrum.organization_member
		WHERE id = $1
		RETURNING id
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
