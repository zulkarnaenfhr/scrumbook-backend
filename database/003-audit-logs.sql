-- =========================================================
-- AUDIT LOGS
-- Generic, append-only trail of who changed what, tracked per entity row.
-- old_value / new_value store only the fields that actually changed on
-- UPDATE (a real diff, e.g. {"status": "TODO"} -> {"status": "IN_PROGRESS"}),
-- the full row on CREATE (old_value = NULL), and the full row on DELETE
-- (new_value = NULL).
-- =========================================================

CREATE TABLE scrum.audit_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID,
    action VARCHAR(10) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT audit_logs_action_check
        CHECK (action IN ('CREATE', 'UPDATE', 'DELETE')),

    -- ON DELETE SET NULL: if the acting user is later deleted, the log
    -- entry itself must still survive as evidence of what happened.
    CONSTRAINT audit_logs_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES scrum.users(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_audit_logs_entity
    ON scrum.audit_logs(entity, entity_id);

CREATE INDEX idx_audit_logs_user_id
    ON scrum.audit_logs(user_id);

CREATE INDEX idx_audit_logs_created_at
    ON scrum.audit_logs(created_at DESC);
