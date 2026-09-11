const query = require("../db/query");

// Create an enrollment for a user and a course.
const createEnrollment = async (userId, courseId) => {
    const result = await query(
        `
        INSERT INTO enrollments (
            user_id,
            course_id
        )
        VALUES ($1, $2)
        RETURNING
            user_id AS "userId",
            course_id AS "courseId",
            enrolled_at AS "enrolledAt",
            completed_at AS "completedAt"
        `,
        [userId, courseId]
    );

    return result.rows[0];
};

// Get all enrollments of a user.
const getEnrollmentsByUserId = async (userId) => {
    const result = await query(
        `
        SELECT
            user_id AS "userId",
            course_id AS "courseId",
            enrolled_at AS "enrolledAt",
            completed_at AS "completedAt"
        FROM enrollments
        WHERE user_id = $1
        ORDER BY enrolled_at DESC
        `,
        [userId]
    );

    return result.rows;
};

// Get all users enrolled in a course.
const getEnrollmentsByCourseId = async (courseId) => {
    const result = await query(
        `
        SELECT
            user_id AS "userId",
            course_id AS "courseId",
            enrolled_at AS "enrolledAt",
            completed_at AS "completedAt"
        FROM enrollments
        WHERE course_id = $1
        ORDER BY enrolled_at ASC
        `,
        [courseId]
    );

    return result.rows;
};

// Get one enrollment.
const getEnrollment = async (userId, courseId) => {
    const result = await query(
        `
        SELECT
            user_id AS "userId",
            course_id AS "courseId",
            enrolled_at AS "enrolledAt",
            completed_at AS "completedAt"
        FROM enrollments
        WHERE user_id = $1
            AND course_id = $2
        `,
        [userId, courseId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Mark an enrollment as completed or reset completion.
const updateEnrollment = async (userId, courseId, completedAt) => {
    const result = await query(
        `
        UPDATE enrollments
        SET completed_at = $1
        WHERE user_id = $2
            AND course_id = $3
        RETURNING
            user_id AS "userId",
            course_id AS "courseId",
            enrolled_at AS "enrolledAt",
            completed_at AS "completedAt"
        `,
        [completedAt, userId, courseId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Delete an enrollment.
const deleteEnrollment = async (userId, courseId) => {
    const result = await query(
        `
        DELETE FROM enrollments
        WHERE user_id = $1
            AND course_id = $2
        RETURNING user_id
        `,
        [userId, courseId]
    );

    return result.rows.length > 0;
};

const getCourseEnrollment = async (courseId, userId) => {
    const enrollment = await getEnrollment(userId, courseId);

    if (!enrollment) return null;

    const result = await query(
        `
        SELECT
            COUNT(*)::int AS "totalLessons",
            COUNT(*) FILTER (WHERE lp.completed_at IS NOT NULL)::int AS "completedLessons"
        FROM chapters ch
        JOIN lessons l ON l.chapter_id = ch.id
        LEFT JOIN lesson_progress lp
            ON lp.lesson_id = l.id AND lp.user_id = $1
        WHERE ch.course_id = $2
        `,
        [userId, courseId]
    );

    const { totalLessons, completedLessons } = result.rows[0];
    const progress = totalLessons === 0
        ? 0
        : Math.round((completedLessons / totalLessons) * 100);

    return { ...enrollment, totalLessons, completedLessons, progress };
};

module.exports = {
    createEnrollment,
    getEnrollmentsByUserId,
    getEnrollmentsByCourseId,
    getEnrollment,
    getCourseEnrollment,
    updateEnrollment,
    deleteEnrollment,
};