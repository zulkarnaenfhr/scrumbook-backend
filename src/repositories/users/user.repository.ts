import { pool } from '../../config/database.js';
import { CreateUserRequest, UpdateUserRequest } from '../../types/users/user.js';

export async function findAll() {
	const result = await pool.query(`
    SELECT
      email,
      name,
      is_active,
      created_at,
      updated_at
    FROM scrumbook.users
    ORDER BY created_at DESC
  `);

	return result.rows;
}

export async function findByEmail(email: string) {
	const result = await pool.query(
		`
      SELECT
        email,
        name,
        is_active,
        created_at,
        updated_at
      FROM scrumbook.users
      WHERE email = $1
    `,
		[email],
	);

	return result.rows[0] ?? null;
}

export async function create(data: CreateUserRequest) {
	const result = await pool.query(
		`
      INSERT INTO scrumbook.users (
        email,
        name,
        password_hash
      )
      VALUES ($1, $2, $3)
      RETURNING
        email,
        name,
        is_active,
        created_at,
        updated_at
    `,
		[data.email, data.name, data.password_hash],
	);

	return result.rows[0];
}

export async function update(email: string, data: UpdateUserRequest) {
	const result = await pool.query(
		`
      UPDATE scrumbook.users
      SET
        email = COALESCE($1, email),
        name = COALESCE($2, name),
        is_active = COALESCE($3, is_active),
        updated_at = NOW()
      WHERE email = $4
      RETURNING
        email,
        name,
        is_active,
        created_at,
        updated_at
    `,
		[data.email ?? null, data.name ?? null, data.is_active ?? null, email],
	);

	return result.rows[0] ?? null;
}

export async function deactivate(email: string) {
	const result = await pool.query(
		`
      UPDATE scrumbook.users
      SET
        is_active = false,
        updated_at = NOW()
      WHERE email = $1
      RETURNING
        email,
        name,
        is_active,
        created_at,
        updated_at
    `,
		[email],
	);

	return result.rows[0] ?? null;
}
