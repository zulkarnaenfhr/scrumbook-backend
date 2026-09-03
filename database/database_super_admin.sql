-- Promote an existing user to SUPER_ADMIN.
-- Replace the email below with the administrator's account.
-- Run database_authorization.sql first.

UPDATE scrum.users
SET role_id = (SELECT id FROM scrum.roles WHERE name = 'SUPER_ADMIN'),
    updated_at = NOW()
WHERE email = 'admin@example.com';

-- Verify the result.
SELECT u.id, u.username, u.email, r.name AS role
FROM scrum.users u
LEFT JOIN scrum.roles r ON r.id = u.role_id
WHERE u.email = 'admin@example.com';
