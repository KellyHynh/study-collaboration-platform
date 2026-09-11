CREATE TABLE lesson_attachments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    lesson_id BIGINT NOT NULL,

    file_url TEXT NOT NULL,

    file_name VARCHAR(255) NOT NULL,

    mime_type VARCHAR(100) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_lesson_attachments_lesson
        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
        ON DELETE CASCADE
);


CREATE INDEX idx_lesson_attachments_lesson_id
    ON lesson_attachments(lesson_id);