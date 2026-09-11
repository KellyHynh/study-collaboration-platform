const query = require("../db/query");

// Get video content of a lesson.
const getVideo = async (lessonId) => {
    const result = await query(
        `
        SELECT
            lesson_id AS "lessonId",
            video_url AS "videoUrl",
            file_name AS "fileName",
            mime_type AS "mimeType",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM lesson_videos
        WHERE lesson_id = $1
        `,
        [lessonId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Create video content for a lesson.
const createVideo = async (lessonId, videoData) => {
    const {
        videoUrl,
        fileName,
        mimeType,
    } = videoData;

    const result = await query(
        `
        INSERT INTO lesson_videos (
            lesson_id,
            video_url,
            file_name,
            mime_type
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
            lesson_id AS "lessonId",
            video_url AS "videoUrl",
            file_name AS "fileName",
            mime_type AS "mimeType",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [
            lessonId,
            videoUrl,
            fileName,
            mimeType,
        ]
    );

    return result.rows[0];
};

// Update video content.
const updateVideo = async (lessonId, videoData) => {
    const {
        videoUrl,
        fileName,
        mimeType,
    } = videoData;

    const result = await query(
        `
        UPDATE lesson_videos
        SET
            video_url = $1,
            file_name = $2,
            mime_type = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE lesson_id = $4
        RETURNING
            lesson_id AS "lessonId",
            video_url AS "videoUrl",
            file_name AS "fileName",
            mime_type AS "mimeType",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [
            videoUrl,
            fileName,
            mimeType,
            lessonId,
        ]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Delete video content.
const deleteVideo = async (lessonId) => {
    const result = await query(
        `
        DELETE FROM lesson_videos
        WHERE lesson_id = $1
        RETURNING lesson_id
        `,
        [lessonId]
    );

    return result.rows.length > 0;
};

module.exports = {
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo,
};