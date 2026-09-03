-- Run this after the existing ScrumBook schema/roles have been created.

CREATE TABLE IF NOT EXISTS scrum.permissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scrum.role_permissions (
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    CONSTRAINT role_permissions_role_id_fkey
        FOREIGN KEY (role_id) REFERENCES scrum.roles(id) ON DELETE CASCADE,
    CONSTRAINT role_permissions_permission_id_fkey
        FOREIGN KEY (permission_id) REFERENCES scrum.permissions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id
    ON scrum.role_permissions(permission_id);

INSERT INTO scrum.permissions (name, description)
VALUES
    ('PROJECT_VIEW', 'View projects'),
    ('PROJECT_CREATE', 'Create projects'),
    ('PROJECT_UPDATE', 'Update projects'),
    ('PROJECT_DELETE', 'Delete projects'),
    ('TASK_VIEW', 'View tasks'),
    ('TASK_CREATE', 'Create tasks'),
    ('TASK_UPDATE', 'Update tasks'),
    ('TASK_DELETE', 'Delete tasks'),
    ('TIMELINE_VIEW', 'View timelines'),
    ('TIMELINE_CREATE', 'Create timelines'),
    ('TIMELINE_UPDATE', 'Update timelines'),
    ('TIMELINE_DELETE', 'Delete timelines'),
    ('DOCUMENT_VIEW', 'View documents'),
    ('DOCUMENT_CREATE', 'Create documents'),
    ('DOCUMENT_UPDATE', 'Update documents'),
    ('DOCUMENT_DELETE', 'Delete documents'),
    ('FLOW_VIEW', 'View flows'),
    ('FLOW_CREATE', 'Create flows'),
    ('FLOW_UPDATE', 'Update flows'),
    ('FLOW_DELETE', 'Delete flows'),
    ('CHANGELOG_VIEW', 'View changelogs'),
    ('CHANGELOG_CREATE', 'Create changelogs'),
    ('CHANGELOG_UPDATE', 'Update changelogs'),
    ('CHANGELOG_DELETE', 'Delete changelogs'),
    ('CONSTRAINT_VIEW', 'View project constraints'),
    ('CONSTRAINT_CREATE', 'Create project constraints'),
    ('CONSTRAINT_UPDATE', 'Update project constraints'),
    ('CONSTRAINT_DELETE', 'Delete project constraints'),
    ('TEAM_VIEW', 'View corresponding teams'),
    ('TEAM_CREATE', 'Create corresponding teams'),
    ('TEAM_UPDATE', 'Update corresponding teams'),
    ('TEAM_DELETE', 'Delete corresponding teams'),
    ('ORGANIZATION_VIEW', 'View organizations'),
    ('ORGANIZATION_UPDATE', 'Update organizations'),
    ('ORGANIZATION_DELETE', 'Delete organizations'),
    ('MEMBER_VIEW', 'View organization members'),
    ('MEMBER_CREATE', 'Create organization members'),
    ('MEMBER_UPDATE', 'Update organization members'),
    ('MEMBER_DELETE', 'Delete organization members'),
    ('USER_VIEW', 'View users'),
    ('USER_CREATE', 'Create users'),
    ('USER_UPDATE', 'Update users'),
    ('USER_DELETE', 'Delete users'),
    ('ROLE_VIEW', 'View roles'),
    ('ROLE_CREATE', 'Create roles'),
    ('ROLE_UPDATE', 'Update roles'),
    ('ROLE_DELETE', 'Delete roles'),
    ('ACCESS_VIEW', 'View resource access rules'),
    ('ACCESS_CREATE', 'Create resource access rules'),
    ('ACCESS_UPDATE', 'Update resource access rules'),
    ('ACCESS_DELETE', 'Delete resource access rules'),
    ('AUDIT_LOG_VIEW', 'View audit logs'),
    ('BUSINESS_UNIT_VIEW', 'View business units'),
    ('BUSINESS_UNIT_CREATE', 'Create business units'),
    ('BUSINESS_UNIT_UPDATE', 'Update business units'),
    ('BUSINESS_UNIT_DELETE', 'Delete business units')
ON CONFLICT (name) DO NOTHING;

-- Public registration always creates VIEWER users. Keep this role present.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM scrum.roles WHERE name = 'VIEWER') THEN
        RAISE EXCEPTION 'VIEWER role must exist before creating users';
    END IF;
END $$;

-- Existing users without a role are safely assigned VIEWER.
UPDATE scrum.users
SET role_id = (SELECT id FROM scrum.roles WHERE name = 'VIEWER')
WHERE role_id IS NULL;


-- Global administrator. SUPER_ADMIN is intentionally separate from PROJECT_OWNER:
-- PROJECT_OWNER is a project/business role; SUPER_ADMIN is a platform role.
INSERT INTO scrum.roles (name, description)
VALUES ('SUPER_ADMIN', 'Global platform administrator with unrestricted access')
ON CONFLICT (name) DO NOTHING;

-- SUPER_ADMIN receives every application permission.
INSERT INTO scrum.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM scrum.roles r
CROSS JOIN scrum.permissions p
WHERE r.name = 'SUPER_ADMIN'
ON CONFLICT DO NOTHING;

-- PROJECT_OWNER receives every application permission.
INSERT INTO scrum.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM scrum.roles r
CROSS JOIN scrum.permissions p
WHERE r.name = 'PROJECT_OWNER'
ON CONFLICT DO NOTHING;

-- Other roles receive the permissions needed for their normal project duties.
WITH assignments(role_name, permission_name) AS (
    VALUES
    ('VIEWER','PROJECT_VIEW'),('VIEWER','TASK_VIEW'),('VIEWER','TIMELINE_VIEW'),('VIEWER','DOCUMENT_VIEW'),('VIEWER','FLOW_VIEW'),('VIEWER','CHANGELOG_VIEW'),('VIEWER','CONSTRAINT_VIEW'),('VIEWER','TEAM_VIEW'),
    ('DEVELOPER','PROJECT_VIEW'),('DEVELOPER','TASK_VIEW'),('DEVELOPER','TASK_CREATE'),('DEVELOPER','TASK_UPDATE'),('DEVELOPER','TIMELINE_VIEW'),('DEVELOPER','TIMELINE_CREATE'),('DEVELOPER','TIMELINE_UPDATE'),('DEVELOPER','DOCUMENT_VIEW'),('DEVELOPER','DOCUMENT_CREATE'),('DEVELOPER','DOCUMENT_UPDATE'),('DEVELOPER','FLOW_VIEW'),('DEVELOPER','FLOW_CREATE'),('DEVELOPER','FLOW_UPDATE'),('DEVELOPER','CHANGELOG_VIEW'),('DEVELOPER','CHANGELOG_CREATE'),('DEVELOPER','CONSTRAINT_VIEW'),('DEVELOPER','CONSTRAINT_CREATE'),('DEVELOPER','CONSTRAINT_UPDATE'),('DEVELOPER','TEAM_VIEW'),
    ('QA','PROJECT_VIEW'),('QA','TASK_VIEW'),('QA','TASK_UPDATE'),('QA','TIMELINE_VIEW'),('QA','DOCUMENT_VIEW'),('QA','FLOW_VIEW'),('QA','CHANGELOG_VIEW'),('QA','CONSTRAINT_VIEW'),('QA','TEAM_VIEW'),
    ('BUSINESS_ANALYST','PROJECT_VIEW'),('BUSINESS_ANALYST','PROJECT_UPDATE'),('BUSINESS_ANALYST','TASK_VIEW'),('BUSINESS_ANALYST','TASK_CREATE'),('BUSINESS_ANALYST','TASK_UPDATE'),('BUSINESS_ANALYST','TIMELINE_VIEW'),('BUSINESS_ANALYST','TIMELINE_CREATE'),('BUSINESS_ANALYST','TIMELINE_UPDATE'),('BUSINESS_ANALYST','DOCUMENT_VIEW'),('BUSINESS_ANALYST','DOCUMENT_CREATE'),('BUSINESS_ANALYST','DOCUMENT_UPDATE'),('BUSINESS_ANALYST','CHANGELOG_VIEW'),('BUSINESS_ANALYST','CHANGELOG_CREATE'),('BUSINESS_ANALYST','CONSTRAINT_VIEW'),('BUSINESS_ANALYST','CONSTRAINT_CREATE'),('BUSINESS_ANALYST','CONSTRAINT_UPDATE'),('BUSINESS_ANALYST','TEAM_VIEW'),('BUSINESS_ANALYST','TEAM_CREATE'),('BUSINESS_ANALYST','TEAM_UPDATE'),
    ('SCRUM_MASTER','PROJECT_VIEW'),('SCRUM_MASTER','PROJECT_UPDATE'),('SCRUM_MASTER','TASK_VIEW'),('SCRUM_MASTER','TASK_CREATE'),('SCRUM_MASTER','TASK_UPDATE'),('SCRUM_MASTER','TASK_DELETE'),('SCRUM_MASTER','TIMELINE_VIEW'),('SCRUM_MASTER','TIMELINE_CREATE'),('SCRUM_MASTER','TIMELINE_UPDATE'),('SCRUM_MASTER','TIMELINE_DELETE'),('SCRUM_MASTER','DOCUMENT_VIEW'),('SCRUM_MASTER','DOCUMENT_CREATE'),('SCRUM_MASTER','DOCUMENT_UPDATE'),('SCRUM_MASTER','FLOW_VIEW'),('SCRUM_MASTER','CHANGELOG_VIEW'),('SCRUM_MASTER','CHANGELOG_CREATE'),('SCRUM_MASTER','CONSTRAINT_VIEW'),('SCRUM_MASTER','CONSTRAINT_CREATE'),('SCRUM_MASTER','CONSTRAINT_UPDATE'),('SCRUM_MASTER','TEAM_VIEW'),('SCRUM_MASTER','TEAM_CREATE'),('SCRUM_MASTER','TEAM_UPDATE'),
    ('PROJECT_MANAGER','PROJECT_VIEW'),('PROJECT_MANAGER','PROJECT_CREATE'),('PROJECT_MANAGER','PROJECT_UPDATE'),('PROJECT_MANAGER','TASK_VIEW'),('PROJECT_MANAGER','TASK_CREATE'),('PROJECT_MANAGER','TASK_UPDATE'),('PROJECT_MANAGER','TASK_DELETE'),('PROJECT_MANAGER','TIMELINE_VIEW'),('PROJECT_MANAGER','TIMELINE_CREATE'),('PROJECT_MANAGER','TIMELINE_UPDATE'),('PROJECT_MANAGER','TIMELINE_DELETE'),('PROJECT_MANAGER','DOCUMENT_VIEW'),('PROJECT_MANAGER','DOCUMENT_CREATE'),('PROJECT_MANAGER','DOCUMENT_UPDATE'),('PROJECT_MANAGER','DOCUMENT_DELETE'),('PROJECT_MANAGER','FLOW_VIEW'),('PROJECT_MANAGER','FLOW_CREATE'),('PROJECT_MANAGER','FLOW_UPDATE'),('PROJECT_MANAGER','FLOW_DELETE'),('PROJECT_MANAGER','CHANGELOG_VIEW'),('PROJECT_MANAGER','CHANGELOG_CREATE'),('PROJECT_MANAGER','CONSTRAINT_VIEW'),('PROJECT_MANAGER','CONSTRAINT_CREATE'),('PROJECT_MANAGER','CONSTRAINT_UPDATE'),('PROJECT_MANAGER','CONSTRAINT_DELETE'),('PROJECT_MANAGER','TEAM_VIEW'),('PROJECT_MANAGER','TEAM_CREATE'),('PROJECT_MANAGER','TEAM_UPDATE'),('PROJECT_MANAGER','TEAM_DELETE'),
    ('BUSINESS','PROJECT_VIEW'),('BUSINESS','PROJECT_UPDATE'),('BUSINESS','TASK_VIEW'),('BUSINESS','TIMELINE_VIEW'),('BUSINESS','DOCUMENT_VIEW'),('BUSINESS','DOCUMENT_CREATE'),('BUSINESS','DOCUMENT_UPDATE'),('BUSINESS','FLOW_VIEW'),('BUSINESS','CHANGELOG_VIEW'),('BUSINESS','CONSTRAINT_VIEW'),('BUSINESS','TEAM_VIEW'),
    ('PROJECT_MANAGER','BUSINESS_UNIT_VIEW'),('PROJECT_MANAGER','BUSINESS_UNIT_CREATE'),('PROJECT_MANAGER','BUSINESS_UNIT_UPDATE'),('PROJECT_MANAGER','BUSINESS_UNIT_DELETE'),
    ('BUSINESS_ANALYST','BUSINESS_UNIT_VIEW'),('BUSINESS_ANALYST','BUSINESS_UNIT_UPDATE'),
    ('BUSINESS','BUSINESS_UNIT_VIEW')
)
INSERT INTO scrum.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM assignments a
JOIN scrum.roles r ON r.name = a.role_name
JOIN scrum.permissions p ON p.name = a.permission_name
ON CONFLICT DO NOTHING;


-- Ensure every existing organization has its owner as an ADMIN member.
-- The organization.user_id column is treated as the organization owner.
INSERT INTO scrum.organization_member (
    organization_id, user_id, level, created_by, updated_by, username
)
SELECT o.id, o.user_id, 'ADMIN', o.created_by, o.updated_by, u.username
FROM scrum.organization o
JOIN scrum.users u ON u.id = o.user_id
WHERE NOT EXISTS (
    SELECT 1
    FROM scrum.organization_member om
    WHERE om.organization_id = o.id
      AND om.user_id = o.user_id
)
ON CONFLICT (organization_id, user_id) DO NOTHING;
