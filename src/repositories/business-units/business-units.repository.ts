import { pool } from '../../config/database.js';
import { CreateBusinessUnitRequest, UpdateBusinessUnitRequest } from '../../types/business-units/business-units.js';

export async function findAll() {
	const result = await pool.query(`
    SELECT
      id,
      name,
      is_active,
      created_at,
      updated_at
    FROM "scrumbook".business_units
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
        is_active,
        created_at,
        updated_at
      FROM "scrumbook".business_units
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
        is_active,
        created_at,
        updated_at
      FROM "scrumbook".business_units
      WHERE LOWER(name) = LOWER($1)
    `,
		[name],
	);

	return result.rows[0] ?? null;
}

export async function create(data: CreateBusinessUnitRequest) {
	const result = await pool.query(
		`
      INSERT INTO "scrumbook".business_units (
        name
      )
      VALUES ($1)
      RETURNING
        id,
        name,
        is_active,
        created_at,
        updated_at
    `,
		[data.name],
	);

	return result.rows[0];
}

export async function update(id: number, data: UpdateBusinessUnitRequest) {
	const result = await pool.query(
		`
      UPDATE "scrumbook".business_units
      SET
        name = COALESCE($1, name),
        is_active = COALESCE($2, is_active),
        updated_at = NOW()
      WHERE id = $3
      RETURNING
        id,
        name,
        is_active,
        created_at,
        updated_at
    `,
		[data.name ?? null, data.is_active ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deactivate(id: number) {
	const result = await pool.query(
		`
      UPDATE "scrumbook".business_units
      SET
        is_active = FALSE,
        updated_at = NOW()
      WHERE id = $1
      RETURNING
        id,
        name,
        is_active,
        created_at,
        updated_at
    `,
		[id],
	);

	return result.rows[0] ?? null;
}
