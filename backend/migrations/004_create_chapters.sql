CREATE TABLE chapters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    course_id BIGINT NOT NULL,

    title VARCHAR(255) NOT NULL,

    position INTEGER NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_chapters_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_chapters_position
        CHECK (position > 0),

    CONSTRAINT uq_chapters_course_position
        UNIQUE (course_id, position)
);


CREATE INDEX idx_chapters_course_id
    ON chapters(course_id);