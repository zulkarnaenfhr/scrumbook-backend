-- =========================================================
-- REFRESH TOKENS
-- Supports POST /api/auth/refresh and POST /api/auth/logout.
-- We only ever store a SHA-256 hash of the refresh token value,
-- never the raw token, so a DB leak alone can't be used to log in.
-- =========================================================

CREATE TABLE scrum.refresh_tokens (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    replaced_by_token_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT refresh_tokens_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES scrum.users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_refresh_tokens_user_id
    ON scrum.refresh_tokens(user_id);

CREATE INDEX idx_refresh_tokens_token_hash
    ON scrum.refresh_tokens(token_hash);
