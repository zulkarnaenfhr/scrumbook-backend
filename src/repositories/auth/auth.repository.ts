import { pool } from '../../config/database.js';

export async function findUserByEmail(email: string) {
	const result = await pool.query(
		`
		SELECT
			id,
			username,
			email,
			password_hash
		FROM scrum.users
		WHERE email = $1
	`,
		[email],
	);

	return result.rows[0] ?? null;
}
