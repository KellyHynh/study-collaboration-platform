const query = require("../db/query");

// Get all attachments of a lesson.
const getAttachmentsByLessonId = async (lessonId) => {
    const result = await query(
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
        [lessonId]
    );

    return result.rows;
};

// Get a single attachment.
const getAttachmentById = async (id) => {
    const result = await query(
        `
        SELECT
            id,
            lesson_id AS "lessonId",
            file_url AS "fileUrl",
            file_name AS "fileName",
            mime_type AS "mimeType",
            created_at AS "createdAt"
        FROM lesson_attachments
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Create an attachment.
const createAttachment = async (lessonId, data) => {
    const {
        fileUrl,
        fileName,
        mimeType,
    } = data;

    const result = await query(
        `
        INSERT INTO lesson_attachments (
            lesson_id,
            file_url,
            file_name,
            mime_type
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
            id,
            lesson_id AS "lessonId",
            file_url AS "fileUrl",
            file_name AS "fileName",
            mime_type AS "mimeType",
            created_at AS "createdAt"
        `,
        [
            lessonId,
            fileUrl,
            fileName,
            mimeType,
        ]
    );

    return result.rows[0];
};

// Update an attachment.
const updateAttachment = async (id, data) => {
    const {
        fileUrl,
        fileName,
        mimeType,
    } = data;

    const result = await query(
        `
        UPDATE lesson_attachments
        SET
            file_url = $1,
            file_name = $2,
            mime_type = $3
        WHERE id = $4
        RETURNING
            id,
            lesson_id AS "lessonId",
            file_url AS "fileUrl",
            file_name AS "fileName",
            mime_type AS "mimeType",
            created_at AS "createdAt"
        `,
        [
            fileUrl,
            fileName,
            mimeType,
            id,
        ]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Delete an attachment.
const deleteAttachment = async (id) => {
    const result = await query(
        `
        DELETE FROM lesson_attachments
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return result.rows.length > 0;
};

module.exports = {
    getAttachmentsByLessonId,
    getAttachmentById,
    createAttachment,
    updateAttachment,
    deleteAttachment,
};