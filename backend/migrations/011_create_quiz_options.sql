CREATE TABLE quiz_options (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    question_id BIGINT NOT NULL,

    option_key VARCHAR(5) NOT NULL,

    text TEXT NOT NULL,

    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    position INTEGER NOT NULL,

    CONSTRAINT fk_quiz_options_question
        FOREIGN KEY (question_id)
        REFERENCES quiz_questions(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_quiz_options_position
        CHECK (position > 0),

    CONSTRAINT uq_quiz_options_key
        UNIQUE (question_id, option_key),

    CONSTRAINT uq_quiz_options_position
        UNIQUE (question_id, position)
);


CREATE INDEX idx_quiz_options_question_id
    ON quiz_options(question_id);