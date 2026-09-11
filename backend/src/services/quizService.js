const query = require("../db/query");

// Get quiz belonging to a lesson.
const getQuizByLessonId = async (lessonId) => {
    const result = await query(
        `
        SELECT
            lesson_id AS "lessonId",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM quizzes
        WHERE lesson_id = $1
        `,
        [lessonId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Create a quiz for a lesson.
const createQuiz = async (lessonId) => {
    const result = await query(
        `
        INSERT INTO quizzes (
            lesson_id
        )
        VALUES ($1)
        RETURNING
            lesson_id AS "lessonId",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [lessonId]
    );

    return result.rows[0];
};

// Update quiz timestamp.
// The quiz currently has no editable fields besides its metadata.
const updateQuiz = async (lessonId) => {
    const result = await query(
        `
        UPDATE quizzes
        SET updated_at = CURRENT_TIMESTAMP
        WHERE lesson_id = $1
        RETURNING
            lesson_id AS "lessonId",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [lessonId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Delete a quiz.
// Related questions and options are removed by ON DELETE CASCADE.
const deleteQuiz = async (lessonId) => {
    const result = await query(
        `
        DELETE FROM quizzes
        WHERE lesson_id = $1
        RETURNING lesson_id
        `,
        [lessonId]
    );

    return result.rows.length > 0;
};

module.exports = {
    getQuizByLessonId,
    createQuiz,
    updateQuiz,
    deleteQuiz,
};