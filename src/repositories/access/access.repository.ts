import { pool } from '../../config/database.js';
import { CreateAccessRequest, UpdateAccessRequest } from '../../types/access/access.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			item_id,
			view,
			create_permission,
			write,
			"delete",
			user_id,
			type,
			username,
			created_at
		FROM scrum.access
		ORDER BY created_at DESC
	`);

	return result.rows;
}

export async function findById(id: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			item_id,
			view,
			create_permission,
			write,
			"delete",
			user_id,
			type,
			username,
			created_at
		FROM scrum.access
		WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
}

export async function findByUserId(userId: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			item_id,
			view,
			create_permission,
			write,
			"delete",
			user_id,
			type,
			username,
			created_at
		FROM scrum.access
		WHERE user_id = $1
		ORDER BY created_at DESC
		`,
		[userId],
	);

	return result.rows;
}

export async function findByItemAndType(itemId: string, type: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			item_id,
			view,
			create_permission,
			write,
			"delete",
			user_id,
			type,
			username,
			created_at
		FROM scrum.access
		WHERE item_id = $1 AND type = $2
		ORDER BY created_at DESC
		`,
		[itemId, type],
	);

	return result.rows;
}

export async function findByUserItemAndType(userId: string, itemId: string, type: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			item_id,
			view,
			create_permission,
			write,
			"delete",
			user_id,
			type,
			username,
			created_at
		FROM scrum.access
		WHERE user_id = $1 AND item_id = $2 AND type = $3
		`,
		[userId, itemId, type],
	);

	return result.rows[0] ?? null;
}

export async function create(data: CreateAccessRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.access (
			item_id,
			view,
			create_permission,
			write,
			"delete",
			user_id,
			type,
			username
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING
			id,
			item_id,
			view,
			create_permission,
			write,
			"delete",
			user_id,
			type,
			username,
			created_at
		`,
		[data.item_id, data.view, data.create_permission, data.write, data.delete, data.user_id, data.type, data.username ?? 'a'],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateAccessRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.access
		SET
			view = COALESCE($1, view),
			create_permission = COALESCE($2, create_permission),
			write = COALESCE($3, write),
			"delete" = COALESCE($4, "delete"),
			username = COALESCE($5, username)
		WHERE id = $6
		RETURNING
			id,
			item_id,
			view,
			create_permission,
			write,
			"delete",
			user_id,
			type,
			username,
			created_at
		`,
		[data.view ?? null, data.create_permission ?? null, data.write ?? null, data.delete ?? null, data.username ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteAccess(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.access
		WHERE id = $1
		RETURNING
			id,
			item_id,
			view,
			create_permission,
			write,
			"delete",
			user_id,
			type,
			username,
			created_at
		`,
		[id],
	);

	return result.rows[0] ?? null;
}
