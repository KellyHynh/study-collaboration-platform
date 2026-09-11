const query = require("../db/query");

// Create progress record for a user and a lesson.
const createProgress = async (userId, lessonId) => {
    const result = await query(
        `
        INSERT INTO lesson_progress (
            user_id,
            lesson_id
        )
        VALUES ($1, $2)
        RETURNING
            user_id AS "userId",
            lesson_id AS "lessonId",
            completed_at AS "completedAt",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [userId, lessonId]
    );

    return result.rows[0];
};

// Get all lesson progress records of a user.
const getProgressByUserId = async (userId) => {
    const result = await query(
        `
        SELECT
            user_id AS "userId",
            lesson_id AS "lessonId",
            completed_at AS "completedAt",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM lesson_progress
        WHERE user_id = $1
        ORDER BY created_at ASC
        `,
        [userId]
    );

    return result.rows;
};

// Get all progress records of a lesson.
const getProgressByLessonId = async (lessonId) => {
    const result = await query(
        `
        SELECT
            user_id AS "userId",
            lesson_id AS "lessonId",
            completed_at AS "completedAt",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM lesson_progress
        WHERE lesson_id = $1
        ORDER BY created_at ASC
        `,
        [lessonId]
    );

    return result.rows;
};

// Get one progress record.
const getProgress = async (userId, lessonId) => {
    const result = await query(
        `
        SELECT
            user_id AS "userId",
            lesson_id AS "lessonId",
            completed_at AS "completedAt",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM lesson_progress
        WHERE user_id = $1
          AND lesson_id = $2
        `,
        [userId, lessonId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Update lesson completion status.
const updateProgress = async (userId, lessonId, completedAt) => {
    const result = await query(
        `
        UPDATE lesson_progress
        SET
            completed_at = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $2
          AND lesson_id = $3
        RETURNING
            user_id AS "userId",
            lesson_id AS "lessonId",
            completed_at AS "completedAt",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [completedAt, userId, lessonId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Delete a progress record.
const deleteProgress = async (userId, lessonId) => {
    const result = await query(
        `
        DELETE FROM lesson_progress
        WHERE user_id = $1
          AND lesson_id = $2
        RETURNING user_id
        `,
        [userId, lessonId]
    );

    return result.rows.length > 0;
};

const getCourseProgress = async (userId, courseId) => {
    const result = await query(
        `
        SELECT
            lp.user_id AS "userId",
            lp.lesson_id AS "lessonId",
            lp.completed_at AS "completedAt",
            lp.created_at AS "createdAt",
            lp.updated_at AS "updatedAt"
        FROM lesson_progress lp
        JOIN lessons l
            ON l.id = lp.lesson_id
        JOIN chapters c
            ON c.id = l.chapter_id
        WHERE lp.user_id = $1
          AND c.course_id = $2
        ORDER BY c.position ASC, l.position ASC
        `,
        [userId, courseId]
    );

    return result.rows;
};

module.exports = {
    createProgress,
    getProgressByUserId,
    getProgressByLessonId,
    getProgress,
    updateProgress,
    deleteProgress,
    getCourseProgress,
};