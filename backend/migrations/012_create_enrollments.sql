CREATE TABLE enrollments (
    user_id UUID NOT NULL,

    course_id BIGINT NOT NULL,

    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    completed_at TIMESTAMPTZ,

    PRIMARY KEY (user_id, course_id),

    CONSTRAINT fk_enrollments_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_enrollments_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
);


CREATE INDEX idx_enrollments_course_id
    ON enrollments(course_id);