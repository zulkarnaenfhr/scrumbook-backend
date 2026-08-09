import { pool } from '../config/database.js';
import { CreateUserRequest, UpdateUserRequest } from '../types/user.js';

export async function findAll() {
	const result = await pool.query(`
    SELECT email, name, is_active, created_at, updated_at
    FROM scrumbook.users
    ORDER BY created_at DESC
  `);
	return result.rows;
}

export async function findById(id: string) {
	const result = await pool.query(
		`
    SELECT email, name, is_active, created_at, updated_at
    FROM scrumbook.users
    WHERE id = $1
  `,
		[id],
	);
	return result.rows[0] ?? null;
}

export async function findByEmail(email: string) {
	const result = await pool.query(
		`
    SELECT email, name, is_active, created_at, updated_at
    FROM scrumbook.users
    WHERE LOWER(email) = LOWER($1)
  `,
		[email],
	);
	return result.rows[0] ?? null;
}

export async function create(data: CreateUserRequest) {
	try {
		const result = await pool.query(
			`
    INSERT INTO scrumbook.users (email, name, password_hash)
    VALUES ($1, $2, $3)
    RETURNING email, name, password_hash, is_active, created_at, updated_at
  `,
			[data.email, data.name, data.password_hash],
		);

		console.log('berhasil');

		return result.rows[0];
	} catch (error) {
		console.log('error nih');

    throw error;
	}
}

export async function update(id: string, data: UpdateUserRequest) {
	const result = await pool.query(
		`
    UPDATE users
    SET
      email = COALESCE($1, email),
      name = COALESCE($2, name),
      is_active = COALESCE($3, is_active),
      updated_at = NOW()
    WHERE id = $4
    RETURNING email, name, is_active, created_at, updated_at
  `,
		[data.email ?? null, data.name ?? null, data.is_active ?? null, id],
	);
	return result.rows[0] ?? null;
}

export async function deactivate(id: string) {
	const result = await pool.query(
		`
    UPDATE users
    SET is_active = FALSE, updated_at = NOW()
    WHERE id = $1
    RETURNING email, name, is_active, created_at, updated_at
  `,
		[id],
	);
	return result.rows[0] ?? null;
}
