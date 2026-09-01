import { pool } from '../../config/database.js';
import { CreateUserRequest, UpdateUserRequest } from '../../types/users/user.js';

export async function findAll() {
	const result = await pool.query(`
		SELECT
			id,
			username,
			email,
			created_at,
			updated_at
		FROM scrum.users
		ORDER BY created_at DESC
	`);

	return result.rows;
}

export async function findById(id: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			username,
			email,
			created_at,
			updated_at
		FROM scrum.users
		WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
}

export async function findByEmail(email: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			username,
			email,
			created_at,
			updated_at
		FROM scrum.users
		WHERE email = $1
		`,
		[email],
	);

	return result.rows[0] ?? null;
}

export async function findByUsername(username: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			username,
			email,
			created_at,
			updated_at
		FROM scrum.users
		WHERE username = $1
		`,
		[username],
	);

	return result.rows[0] ?? null;
}

export async function create(data: CreateUserRequest) {
	const result = await pool.query(
		`
		INSERT INTO scrum.users (
			username,
			email,
			password_hash
		)
		VALUES ($1, $2, $3)
		RETURNING
			id,
			username,
			email,
			created_at,
			updated_at
		`,
		[data.username ?? null, data.email ?? null, data.password],
	);

	return result.rows[0];
}

export async function update(id: string, data: UpdateUserRequest) {
	const result = await pool.query(
		`
		UPDATE scrum.users
		SET
			username = COALESCE($1, username),
			email = COALESCE($2, email),
			updated_at = NOW()
		WHERE id = $3
		RETURNING
			id,
			username,
			email,
			created_at,
			updated_at
		`,
		[data.username ?? null, data.email ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteUser(id: string) {
	const result = await pool.query(
		`
		DELETE FROM scrum.users
		WHERE id = $1
		RETURNING
			id,
			username,
			email,
			created_at,
			updated_at
		`,
		[id],
	);

	return result.rows[0] ?? null;
}

export async function findByEmailWithPassword(email: string) {
	const result = await pool.query(
		`

      SELECT

        id,

        username,

        email,

        password_hash,

        created_at,

        updated_at

      FROM scrum.users

      WHERE email = $1

    `,

		[email],
	);

	return result.rows[0];
}
