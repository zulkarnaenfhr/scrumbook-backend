-- =========================================================
-- EXTENSIONS
-- =========================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- =========================================================
-- SCHEMA
-- =========================================================

CREATE SCHEMA IF NOT EXISTS scrum;


-- =========================================================
-- USERS
-- Replaces Supabase auth.users
-- =========================================================

CREATE TABLE scrum.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE scrum.users
ALTER COLUMN username SET NOT NULL;

ALTER TABLE scrum.users
ALTER COLUMN email SET NOT NULL;


-- =========================================================
-- ORGANIZATION
-- =========================================================

CREATE TABLE scrum.organization (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    created_by VARCHAR NOT NULL,
    updated_by VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL,

    CONSTRAINT organization_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES scrum.users(id)
);


-- =========================================================
-- ORGANIZATION MEMBER
-- =========================================================

CREATE TABLE scrum.organization_member (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    organization_id BIGINT NOT NULL,
    user_id UUID NOT NULL,
    level VARCHAR NOT NULL,
    created_by VARCHAR NOT NULL,
    updated_by VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    username VARCHAR,

    CONSTRAINT organization_member_organization_id_fkey
        FOREIGN KEY (organization_id)
        REFERENCES scrum.organization(id),

    CONSTRAINT organization_member_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES scrum.users(id)
);


-- =========================================================
-- PROJECT
-- =========================================================

CREATE TABLE scrum.project (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    code VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    summary VARCHAR,
    target_start TIMESTAMPTZ,
    target_end TIMESTAMPTZ,
    target_implementation TIMESTAMPTZ,
    priority VARCHAR NOT NULL,
    status SMALLINT NOT NULL,
    color VARCHAR,
    created_by VARCHAR NOT NULL,
    updated_by VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    no_release VARCHAR,
    business_unit VARCHAR,
    category VARCHAR,
    project_owner VARCHAR,
    organization_id BIGINT NOT NULL,
    user_id UUID NOT NULL,

    CONSTRAINT project_organization_id_fkey
        FOREIGN KEY (organization_id)
        REFERENCES scrum.organization(id),

    CONSTRAINT project_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES scrum.users(id)
);


-- =========================================================
-- TIMELINE
-- =========================================================

CREATE TABLE scrum.timeline (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    project_id BIGINT NOT NULL,
    task VARCHAR NOT NULL,
    progress SMALLINT,
    start TIMESTAMPTZ NOT NULL,
    "end" TIMESTAMPTZ NOT NULL,
    color VARCHAR,
    created_by VARCHAR NOT NULL,
    updated_by VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    code VARCHAR NOT NULL,

    CONSTRAINT timeline_project_id_fkey
        FOREIGN KEY (project_id)
        REFERENCES scrum.project(id)
);


-- =========================================================
-- DOCUMENT
-- =========================================================

CREATE TABLE scrum.document (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    code VARCHAR NOT NULL,
    project_id BIGINT,
    category VARCHAR NOT NULL,
    summary VARCHAR,
    content VARCHAR,
    type VARCHAR NOT NULL,
    url VARCHAR,
    version SMALLINT,
    created_by VARCHAR NOT NULL,
    updated_by VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title VARCHAR,
    user_id UUID NOT NULL,
    is_redirect BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT document_project_id_fkey
        FOREIGN KEY (project_id)
        REFERENCES scrum.project(id),

    CONSTRAINT document_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES scrum.users(id)
);


-- =========================================================
-- FLOW
-- =========================================================

CREATE TABLE scrum.flow (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    node JSONB,
    created_by VARCHAR NOT NULL,
    updated_by VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title VARCHAR NOT NULL,
    description VARCHAR,
    is_publish BOOLEAN NOT NULL,
    edge JSONB,
    code VARCHAR NOT NULL,
    version SMALLINT,
    user_id UUID NOT NULL,
    project_id BIGINT NOT NULL,

    CONSTRAINT flow_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES scrum.users(id),

    CONSTRAINT flow_project_id_fkey
        FOREIGN KEY (project_id)
        REFERENCES scrum.project(id)
);


-- =========================================================
-- CHANGELOG
-- =========================================================

CREATE TABLE scrum.changelog (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    code VARCHAR NOT NULL,
    project_id BIGINT NOT NULL,
    log VARCHAR NOT NULL,
    created_by VARCHAR NOT NULL,
    updated_by VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT changelog_project_id_fkey
        FOREIGN KEY (project_id)
        REFERENCES scrum.project(id)
);


-- =========================================================
-- ACCESS
-- =========================================================

CREATE TABLE scrum.access (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    item_id BIGINT NOT NULL,
    view BOOLEAN NOT NULL,
    create_permission BOOLEAN NOT NULL,
    write BOOLEAN NOT NULL,
    delete BOOLEAN NOT NULL,
    user_id UUID NOT NULL,
    type VARCHAR NOT NULL,
    username VARCHAR NOT NULL DEFAULT 'a',

    CONSTRAINT access_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES scrum.users(id)
);


-- =========================================================
-- PROJECT CONSTRAINT
-- =========================================================

CREATE TABLE scrum.project_constraint (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name VARCHAR NOT NULL,
    start TIMESTAMPTZ NOT NULL,
    status VARCHAR NOT NULL,
    detail VARCHAR,
    project_id BIGINT NOT NULL,
    created_by VARCHAR NOT NULL,
    updated_by VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT project_constraint_project_id_fkey
        FOREIGN KEY (project_id)
        REFERENCES scrum.project(id)
);


-- =========================================================
-- TASK
-- =========================================================

CREATE TABLE scrum.task (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    project_id BIGINT,
    title VARCHAR NOT NULL,
    detail VARCHAR,
    user_id UUID NOT NULL DEFAULT gen_random_uuid(),
    target TIMESTAMPTZ,
    priority VARCHAR NOT NULL,
    created_by VARCHAR,
    updated_by VARCHAR,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR NOT NULL,
    timeline_id BIGINT,

    CONSTRAINT task_project_id_fkey
        FOREIGN KEY (project_id)
        REFERENCES scrum.project(id),

    CONSTRAINT task_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES scrum.users(id),

    CONSTRAINT task_timeline_id_fkey
        FOREIGN KEY (timeline_id)
        REFERENCES scrum.timeline(id)
);


-- =========================================================
-- CORRESPONDING TEAM
-- =========================================================

CREATE TABLE scrum.corresponding_team (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    project_id BIGINT NOT NULL,
    name VARCHAR NOT NULL,
    pic VARCHAR,
    description VARCHAR,
    created_by VARCHAR NOT NULL,
    updated_by VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    code VARCHAR NOT NULL,

    CONSTRAINT corresponding_team_project_id_fkey
        FOREIGN KEY (project_id)
        REFERENCES scrum.project(id)
);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_organization_user_id
    ON scrum.organization(user_id);

CREATE INDEX idx_organization_member_organization_id
    ON scrum.organization_member(organization_id);

CREATE INDEX idx_organization_member_user_id
    ON scrum.organization_member(user_id);

CREATE INDEX idx_project_organization_id
    ON scrum.project(organization_id);

CREATE INDEX idx_project_user_id
    ON scrum.project(user_id);

CREATE INDEX idx_timeline_project_id
    ON scrum.timeline(project_id);

CREATE INDEX idx_document_project_id
    ON scrum.document(project_id);

CREATE INDEX idx_document_user_id
    ON scrum.document(user_id);

CREATE INDEX idx_flow_project_id
    ON scrum.flow(project_id);

CREATE INDEX idx_flow_user_id
    ON scrum.flow(user_id);

CREATE INDEX idx_changelog_project_id
    ON scrum.changelog(project_id);

CREATE INDEX idx_access_user_id
    ON scrum.access(user_id);

CREATE INDEX idx_project_constraint_project_id
    ON scrum.project_constraint(project_id);

CREATE INDEX idx_task_project_id
    ON scrum.task(project_id);

CREATE INDEX idx_task_user_id
    ON scrum.task(user_id);

CREATE INDEX idx_task_timeline_id
    ON scrum.task(timeline_id);

CREATE INDEX idx_corresponding_team_project_id
    ON scrum.corresponding_team(project_id);