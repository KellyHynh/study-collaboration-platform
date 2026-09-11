const query = require("../db/query");

const hydrateLesson = async (lesson) => {
    if (!lesson) return lesson;

    const [readingResult, videoResult, attachmentResult] = await Promise.all([
        query(
            `SELECT body FROM lesson_readings WHERE lesson_id = $1`,
            [lesson.id]
        ),
        query(
            `
            SELECT
                lesson_id AS "lessonId",
                video_url AS "videoUrl",
                file_name AS "fileName",
                mime_type AS "mimeType"
            FROM lesson_videos
            WHERE lesson_id = $1
            `,
            [lesson.id]
        ),
        query(
            `
            SELECT
                id,
                lesson_id AS "lessonId",
                file_url AS "fileUrl",
                file_name AS "fileName",
                mime_type AS "mimeType",
                created_at AS "createdAt"
            FROM lesson_attachments
            WHERE lesson_id = $1
            ORDER BY id ASC
            `,
            [lesson.id]
        ),
    ]);

    const storedBody = readingResult.rows[0]?.body;
    let body = null;

    if (storedBody) {
        try {
            body = JSON.parse(storedBody);
        } catch {
            body = {
                type: "doc",
                content: [{
                    type: "paragraph",
                    content: [{ type: "text", text: storedBody }],
                }],
            };
        }
    }

    return {
        ...lesson,
        video: videoResult.rows[0] || null,
        content: body || attachmentResult.rows.length > 0
            ? { body, attachments: attachmentResult.rows }
            : null,
    };
};

// Get all lessons belonging to a chapter.
// Lessons are returned in curriculum order.
const getLessonsByChapterId = async (chapterId) => {
    const result = await query(
        `
        SELECT
            id,
            chapter_id AS "chapterId",
            title,
            type,
            position,
            duration_seconds AS "durationSeconds",
            is_locked AS "isLocked",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM lessons
        WHERE chapter_id = $1
        ORDER BY position ASC
        `,
        [chapterId]
    );

    return Promise.all(result.rows.map(hydrateLesson));
};

// Get a single lesson by ID.
const getLessonById = async (id) => {
    const result = await query(
        `
        SELECT
            id,
            chapter_id AS "chapterId",
            title,
            type,
            position,
            duration_seconds AS "durationSeconds",
            is_locked AS "isLocked",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM lessons
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return hydrateLesson(result.rows[0]);
};

// Create a lesson inside a chapter.
const createLesson = async (chapterId, lessonData) => {
    const {
        title,
        type,
        position,
        durationSeconds = 0,
    } = lessonData;
    const isLocked = lessonData.isLocked === undefined
        ? false
        : lessonData.isLocked;

    const result = await query(
        `
        INSERT INTO lessons (
            chapter_id,
            title,
            type,
            position,
            duration_seconds,
            is_locked
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            id,
            chapter_id AS "chapterId",
            title,
            type,
            position,
            duration_seconds AS "durationSeconds",
            is_locked AS "isLocked",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [
            chapterId,
            title,
            type,
            position,
            durationSeconds,
            isLocked,
        ]
    );

    return hydrateLesson(result.rows[0]);
};

// Update only the fields provided by the client.
const updateLesson = async (id, lessonData) => {
    const updates = [];
    const values = [];
    let parameterIndex = 1;

    const fieldMap = {
        title: "title",
        type: "type",
        position: "position",
        durationSeconds: "duration_seconds",
        isLocked: "is_locked",
    };

    for (const [field, column] of Object.entries(fieldMap)) {
        if (lessonData[field] !== undefined) {
            updates.push(`${column} = $${parameterIndex}`);
            values.push(lessonData[field]);
            parameterIndex++;
        }
    }

    // Nothing to update → return the current lesson.
    if (updates.length === 0) {
        return getLessonById(id);
    }

    updates.push("updated_at = CURRENT_TIMESTAMP");

    values.push(id);

    const result = await query(
        `
        UPDATE lessons
        SET ${updates.join(", ")}
        WHERE id = $${parameterIndex}
        RETURNING
            id,
            chapter_id AS "chapterId",
            title,
            type,
            position,
            duration_seconds AS "durationSeconds",
            is_locked AS "isLocked",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        values
    );

    if (result.rows.length === 0) {
        return null;
    }

    return hydrateLesson(result.rows[0]);
};

// Delete a lesson.
// Related reading/video/quiz data will be handled by ON DELETE CASCADE.
const deleteLesson = async (id) => {
    const result = await query(
        `
        DELETE FROM lessons
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return result.rows.length > 0;
};

module.exports = {
    getLessonsByChapterId,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
};