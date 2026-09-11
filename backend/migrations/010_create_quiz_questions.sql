CREATE TABLE quiz_questions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    quiz_id BIGINT NOT NULL,

    type VARCHAR(20) NOT NULL,

    question TEXT NOT NULL,

    position INTEGER NOT NULL,

    image_url TEXT,

    image_file_name VARCHAR(255),

    image_mime_type VARCHAR(100),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_quiz_questions_quiz
        FOREIGN KEY (quiz_id)
        REFERENCES quizzes(lesson_id)
        ON DELETE CASCADE,

    CONSTRAINT chk_quiz_questions_type
        CHECK (
            type IN (
                'multiple-choice',
                'essay'
            )
        ),

    CONSTRAINT chk_quiz_questions_position
        CHECK (position > 0),

    CONSTRAINT uq_quiz_questions_position
        UNIQUE (quiz_id, position)
);


CREATE INDEX idx_quiz_questions_quiz_id
    ON quiz_questions(quiz_id);