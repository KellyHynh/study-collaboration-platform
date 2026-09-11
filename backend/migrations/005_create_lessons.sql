CREATE TABLE lessons (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    chapter_id BIGINT NOT NULL,

    title VARCHAR(255) NOT NULL,

    type VARCHAR(20) NOT NULL,

    position INTEGER NOT NULL,

    duration_seconds INTEGER NOT NULL DEFAULT 0,

    is_locked BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_lessons_chapter
        FOREIGN KEY (chapter_id)
        REFERENCES chapters(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_lessons_type
        CHECK (
            type IN (
                'reading',
                'video',
                'quiz'
            )
        ),

    CONSTRAINT chk_lessons_position
        CHECK (position > 0),

    CONSTRAINT chk_lessons_duration
        CHECK (duration_seconds >= 0),

    CONSTRAINT uq_lessons_chapter_position
        UNIQUE (chapter_id, position)
);


CREATE INDEX idx_lessons_chapter_id
    ON lessons(chapter_id);