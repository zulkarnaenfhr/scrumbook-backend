import { pool } from '../../config/database.js';

export async function userHasPermission(userId: string, permissionName: string): Promise<boolean> {
	const result = await pool.query(
		`
		SELECT EXISTS (
			SELECT 1
			FROM scrum.users u
			INNER JOIN scrum.roles r
				ON r.id = u.role_id
			INNER JOIN scrum.role_permissions rp
				ON rp.role_id = r.id
			INNER JOIN scrum.permissions p
				ON p.id = rp.permission_id
			WHERE u.id = $1
			  AND r.is_active = TRUE
			  AND p.name = $2
		) AS has_permission
		`,
		[userId, permissionName],
	);

	return result.rows[0]?.has_permission === true;
}
