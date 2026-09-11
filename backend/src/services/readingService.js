const query = require("../db/query");

// Get the reading content of a lesson.
const getReading = async (lessonId) => {
    const result = await query(
        `
        SELECT
            lesson_id AS "lessonId",
            body,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM lesson_readings
        WHERE lesson_id = $1
        `,
        [lessonId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Create reading content for a lesson.
const createReading = async (lessonId, body) => {
    const result = await query(
        `
        INSERT INTO lesson_readings (
            lesson_id,
            body
        )
        VALUES ($1, $2)
        RETURNING
            lesson_id AS "lessonId",
            body,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [lessonId, body]
    );

    return result.rows[0];
};

// Update reading content.
const updateReading = async (lessonId, body) => {
    const result = await query(
        `
        UPDATE lesson_readings
        SET
            body = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE lesson_id = $2
        RETURNING
            lesson_id AS "lessonId",
            body,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [body, lessonId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Delete reading content.
const deleteReading = async (lessonId) => {
    const result = await query(
        `
        DELETE FROM lesson_readings
        WHERE lesson_id = $1
        RETURNING lesson_id
        `,
        [lessonId]
    );

    return result.rows.length > 0;
};

module.exports = {
    getReading,
    createReading,
    updateReading,
    deleteReading,
};