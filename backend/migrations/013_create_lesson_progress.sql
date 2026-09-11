CREATE TABLE lesson_progress (
    user_id UUID NOT NULL,

    lesson_id BIGINT NOT NULL,

    completed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, lesson_id),

    CONSTRAINT fk_lesson_progress_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_lesson_progress_lesson
        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
        ON DELETE CASCADE
);


CREATE INDEX idx_lesson_progress_lesson_id
    ON lesson_progress(lesson_id);