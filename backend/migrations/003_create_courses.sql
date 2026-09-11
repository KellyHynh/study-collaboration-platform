CREATE TABLE courses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    owner_id UUID NOT NULL,

    title VARCHAR(255) NOT NULL,

    thumbnail_url TEXT,

    category_id BIGINT NOT NULL,

    level VARCHAR(30) NOT NULL,

    tags JSONB NOT NULL DEFAULT '[]'::jsonb,

    description TEXT,

    learning_outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,

    requirements JSONB NOT NULL DEFAULT '[]'::jsonb,

    visibility VARCHAR(20) NOT NULL DEFAULT 'public',

    join_code VARCHAR(10) NOT NULL UNIQUE,

    language VARCHAR(20) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_courses_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_courses_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_courses_level
        CHECK (
            level IN (
                'beginner',
                'intermediate',
                'advanced'
            )
        ),

    CONSTRAINT chk_courses_visibility
        CHECK (
            visibility IN (
                'public',
                'private'
            )
        ),

    CONSTRAINT chk_courses_language
        CHECK (
            language IN (
                'en',
                'vi'
            )
        )
);


CREATE INDEX idx_courses_owner_id
    ON courses(owner_id);

CREATE INDEX idx_courses_category_id
    ON courses(category_id);