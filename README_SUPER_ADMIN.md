# SUPER_ADMIN

ScrumBook now supports a global `SUPER_ADMIN` platform role.

## What SUPER_ADMIN means

`SUPER_ADMIN` is different from `PROJECT_OWNER`:

- `PROJECT_OWNER`: business/project role. Access is still organization/resource oriented.
- `SUPER_ADMIN`: platform role. It bypasses organization membership checks and has every application permission.

## Setup

1. Run `database_authorization.sql` after the base schema. This creates/updates the `SUPER_ADMIN` role and grants it every permission.
2. Create a normal user through the normal registration flow.
3. Run `database_super_admin.sql` after replacing `admin@example.com` with the user's email.
4. Log in again. The middleware loads the current role from the database, so the new role is recognized without putting the role into the JWT.

Example:

```sql
UPDATE scrum.users
SET role_id = (SELECT id FROM scrum.roles WHERE name = 'SUPER_ADMIN'),
    updated_at = NOW()
WHERE email = 'your-admin@example.com';
```

Verify:

```sql
SELECT u.id, u.username, u.email, r.name AS role
FROM scrum.users u
LEFT JOIN scrum.roles r ON r.id = u.role_id
WHERE u.email = 'your-admin@example.com';
```

## Runtime behavior

`authenticate()` loads the user's current role and sets `req.user.isSuperAdmin`.

`requirePermission()` allows SUPER_ADMIN without checking `role_permissions`.

`authorizeOrganizationLevel()` allows SUPER_ADMIN without requiring an `organization_member` row.

Organization and project read services also bypass normal user scoping for SUPER_ADMIN.
