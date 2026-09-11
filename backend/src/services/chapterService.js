const query = require("../db/query");

// ============================================================
// Get all chapters of a course
// Chapters are ordered by their position in the course.
// ============================================================

const getChaptersByCourseId = async (courseId) => {
    const result = await query(
        `
        SELECT
            id,
            course_id AS "courseId",
            title,
            position,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM chapters
        WHERE course_id = $1
        ORDER BY position ASC
        `,
        [courseId]
    );

    return result.rows;
};

// ============================================================
// Get a single chapter by ID
// ============================================================

const getChapterById = async (id) => {
    const result = await query(
        `
        SELECT
            id,
            course_id AS "courseId",
            title,
            position,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM chapters
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// ============================================================
// Create a chapter inside a course
// Position is automatically assigned as the last position + 1.
// ============================================================

const createChapter = async (courseId, chapterData) => {
    const { title, position } = chapterData;

    const result = await query(
        `
        INSERT INTO chapters (
            course_id,
            title,
            position
        )
        VALUES (
            $1,
            $2,
            COALESCE(
                $3,
                (
                    SELECT COALESCE(MAX(position), 0) + 1
                    FROM chapters
                    WHERE course_id = $1
                )
            )
        )
        RETURNING
            id,
            course_id AS "courseId",
            title,
            position,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [courseId, title, position]
    );

    return result.rows[0];
};

// ============================================================
// Update a chapter
// Only fields provided by the client are updated.
// ============================================================

const updateChapter = async (id, chapterData) => {
    const updates = [];
    const values = [];
    let parameterIndex = 1;

    if (chapterData.title !== undefined) {
        updates.push(`title = $${parameterIndex}`);
        values.push(chapterData.title);
        parameterIndex++;
    }

    if (chapterData.position !== undefined) {
        updates.push(`position = $${parameterIndex}`);
        values.push(chapterData.position);
        parameterIndex++;
    }

    // Nothing to update → return current chapter.
    if (updates.length === 0) {
        return getChapterById(id);
    }

    updates.push("updated_at = CURRENT_TIMESTAMP");

    values.push(id);

    const result = await query(
        `
        UPDATE chapters
        SET ${updates.join(", ")}
        WHERE id = $${parameterIndex}
        RETURNING
            id,
            course_id AS "courseId",
            title,
            position,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        values
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// ============================================================
// Delete a chapter
// Lessons belonging to the chapter are automatically deleted
// by the database because of ON DELETE CASCADE.
// ============================================================

const deleteChapter = async (id) => {
    const result = await query(
        `
        DELETE FROM chapters
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return result.rows.length > 0;
};

module.exports = {
    getChaptersByCourseId,
    getChapterById,
    createChapter,
    updateChapter,
    deleteChapter,
};
