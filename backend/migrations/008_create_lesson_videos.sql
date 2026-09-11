CREATE TABLE lesson_videos (
    lesson_id BIGINT PRIMARY KEY,

    video_url TEXT NOT NULL,

    file_name VARCHAR(255) NOT NULL,

    mime_type VARCHAR(100) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_lesson_videos_lesson
        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
        ON DELETE CASCADE
);