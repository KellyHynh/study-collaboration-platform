const query = require("../db/query");
const currentUserId = "ec8574c6-f44d-40e0-ba80-68e1d0aa9da9";

const toRichTextDocument = (value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
        return value.type === "doc" ? value : { type: "doc", content: [] };
    }

    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);

            if (parsed && parsed.type === "doc") {
                return parsed;
            }
        } catch {
            // Preserve existing plain-text descriptions as rich text.
        }

        return {
            type: "doc",
            content: value
                ? [{
                    type: "paragraph",
                    content: [{ type: "text", text: value }],
                }]
                : [],
        };
    }

    if (Array.isArray(value)) {
        return {
            type: "doc",
            content: value
                .filter((item) => typeof item === "string" && item)
                .map((item) => ({
                    type: "paragraph",
                    content: [{ type: "text", text: item }],
                })),
        };
    }

    return { type: "doc", content: [] };
};

const toRequirementsArray = (value) => {
    if (Array.isArray(value)) {
        return value.filter((item) => typeof item === "string");
    }

    if (value?.type === "doc") {
        return (value.content || [])
            .filter((block) => block.type === "paragraph")
            .map((block) => (block.content || [])
                .filter((item) => item.type === "text")
                .map((item) => item.text || "")
                .join(""))
            .filter(Boolean);
    }

    return [];
};

// ============================================================
// Map database course → FE course shape
// ============================================================

const mapCourse = (course) => ({
    id: course.id,
    ownerId: course.ownerId,

    title: course.title,
    thumbnailUrl: course.thumbnailUrl,

    categoryId: course.categoryId,
    category: course.categoryName || "",

    level: course.level,
    tags: course.tags || [],

    description: toRichTextDocument(course.description),

    learningOutcomes: course.learningOutcomes || [],
    requirements: toRequirementsArray(course.requirements),

    visibility: course.visibility,
    joinCode: course.joinCode,
    language: course.language,

    // FE course metadata
    rating: course.rating ?? 0,
    students: course.students ?? 0,
    progress: course.progress ?? 0,
    isEnrolled: course.isEnrolled ?? false,
    lessons: course.lessons ?? 0,
    duration: course.duration ?? "0 hours",

    // FE instructor structure
    instructor: {
        id: course.ownerId,
        name: course.ownerName || "Unknown",
        avatar: course.ownerAvatar || "",
        students: course.ownerStudents ?? 0,
        courses: course.ownerCourses ?? 0,
        description: course.ownerDescription || "",
    },

    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
});


// ============================================================
// Get all courses
// Used by course list pages and course management.
// ============================================================

const getAllCourses = async () => {
    const result = await query(
        `
        SELECT
            c.id,
            c.owner_id AS "ownerId",
            c.title,
            c.thumbnail_url AS "thumbnailUrl",
            c.category_id AS "categoryId",
            c.level,
            c.tags,
            c.description,
            c.learning_outcomes AS "learningOutcomes",
            c.requirements,
            c.visibility,
            c.join_code AS "joinCode",
            c.language,
            c.created_at AS "createdAt",
            c.updated_at AS "updatedAt",

            (
                SELECT COUNT(*)::int
                FROM chapters ch
                JOIN lessons l ON l.chapter_id = ch.id
                WHERE ch.course_id = c.id
            ) AS lessons,

            (
                SELECT COUNT(*)::int
                FROM enrollments e
                WHERE e.course_id = c.id
            ) AS students,

            COALESCE((
                SELECT ROUND(SUM(l.duration_seconds) / 3600.0, 1)::text || ' hours'
                FROM chapters ch
                JOIN lessons l ON l.chapter_id = ch.id
                WHERE ch.course_id = c.id
            ), '0 hours') AS duration,

            COALESCE((
                SELECT ROUND(
                    100.0 * COUNT(*) FILTER (WHERE lp.completed_at IS NOT NULL) /
                    NULLIF(COUNT(*), 0)
                )::int
                FROM chapters ch
                JOIN lessons l ON l.chapter_id = ch.id
                LEFT JOIN lesson_progress lp
                    ON lp.lesson_id = l.id AND lp.user_id = $1
                WHERE ch.course_id = c.id
            ), 0) AS progress,

            EXISTS (
                SELECT 1
                FROM enrollments enrolled
                WHERE enrolled.course_id = c.id
                    AND enrolled.user_id = $1
            ) AS "isEnrolled",

            u.name AS "ownerName",

            u.avatar_url AS "ownerAvatar",

            (SELECT COUNT(*)::int FROM courses owned WHERE owned.owner_id = u.id) AS "ownerCourses",

            (SELECT COUNT(*)::int FROM enrollments e JOIN courses owned ON owned.id = e.course_id WHERE owned.owner_id = u.id) AS "ownerStudents",

            u.bio AS "ownerDescription",

            cat.name AS "categoryName"

        FROM courses c

        JOIN users u
            ON u.id = c.owner_id

        JOIN categories cat
            ON cat.id = c.category_id

        ORDER BY c.created_at DESC
        `,
        [currentUserId]
    );

    return result.rows.map(mapCourse);
};


// ============================================================
// Get a single course by ID
// ============================================================

const getCourseById = async (id) => {
    const result = await query(
        `
        SELECT
            c.id,
            c.owner_id AS "ownerId",
            c.title,
            c.thumbnail_url AS "thumbnailUrl",
            c.category_id AS "categoryId",
            c.level,
            c.tags,
            c.description,
            c.learning_outcomes AS "learningOutcomes",
            c.requirements,
            c.visibility,
            c.join_code AS "joinCode",
            c.language,
            c.created_at AS "createdAt",
            c.updated_at AS "updatedAt",

            (
                SELECT COUNT(*)::int
                FROM chapters ch
                JOIN lessons l ON l.chapter_id = ch.id
                WHERE ch.course_id = c.id
            ) AS lessons,

            (
                SELECT COUNT(*)::int
                FROM enrollments e
                WHERE e.course_id = c.id
            ) AS students,

            COALESCE((
                SELECT ROUND(SUM(l.duration_seconds) / 3600.0, 1)::text || ' hours'
                FROM chapters ch
                JOIN lessons l ON l.chapter_id = ch.id
                WHERE ch.course_id = c.id
            ), '0 hours') AS duration,

            COALESCE((
                SELECT ROUND(
                    100.0 * COUNT(*) FILTER (WHERE lp.completed_at IS NOT NULL) /
                    NULLIF(COUNT(*), 0)
                )::int
                FROM chapters ch
                JOIN lessons l ON l.chapter_id = ch.id
                LEFT JOIN lesson_progress lp
                    ON lp.lesson_id = l.id AND lp.user_id = $1
                WHERE ch.course_id = c.id
            ), 0) AS progress,

            u.name AS "ownerName",

            u.avatar_url AS "ownerAvatar",

            (SELECT COUNT(*)::int FROM courses owned WHERE owned.owner_id = u.id) AS "ownerCourses",

            (SELECT COUNT(*)::int FROM enrollments e JOIN courses owned ON owned.id = e.course_id WHERE owned.owner_id = u.id) AS "ownerStudents",

            u.bio AS "ownerDescription",

            cat.name AS "categoryName"

        FROM courses c

        JOIN users u
            ON u.id = c.owner_id

        JOIN categories cat
            ON cat.id = c.category_id

        WHERE c.id = $2
        `,
        [currentUserId, id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return mapCourse(result.rows[0]);
};


// ============================================================
// Create a new course
// ============================================================

const createCourse = async (courseData) => {
    const {
        ownerId,
        title,
        thumbnailUrl = null,
        categoryId,
        level,
        tags = [],
        description = null,
        learningOutcomes = [],
        requirements = null,
        visibility = "public",
        joinCode,
        language,
    } = courseData;

    const result = await query(
        `
        INSERT INTO courses (
            owner_id,
            title,
            thumbnail_url,
            category_id,
            level,
            tags,
            description,
            learning_outcomes,
            requirements,
            visibility,
            join_code,
            language
        )

        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6::jsonb,
            $7,
            $8::jsonb,
            $9::jsonb,
            $10,
            $11,
            $12
        )

        RETURNING
            id,
            owner_id AS "ownerId",
            title,
            thumbnail_url AS "thumbnailUrl",
            category_id AS "categoryId",
            level,
            tags,
            description,
            learning_outcomes AS "learningOutcomes",
            requirements,
            visibility,
            join_code AS "joinCode",
            language,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [
            ownerId,
            title,
            thumbnailUrl,
            categoryId,
            level,
            JSON.stringify(tags),
            description && typeof description === "object"
                ? JSON.stringify(description)
                : description,
            JSON.stringify(learningOutcomes),
            JSON.stringify(toRequirementsArray(requirements)),
            visibility,
            joinCode,
            language,
        ]
    );

    return getCourseById(result.rows[0].id);
};


// ============================================================
// Update an existing course
// ============================================================

const updateCourse = async (id, courseData) => {
    const fieldMap = {
        title: "title",
        thumbnailUrl: "thumbnail_url",
        categoryId: "category_id",
        level: "level",
        tags: "tags",
        description: "description",
        learningOutcomes: "learning_outcomes",
        requirements: "requirements",
        visibility: "visibility",
        language: "language",
    };

    const updates = [];
    const values = [];

    let parameterIndex = 1;

    for (const [field, column] of Object.entries(fieldMap)) {
        if (courseData[field] !== undefined) {
            const isJsonField = [
                "tags",
                "learningOutcomes",
                "requirements",
            ].includes(field);

            updates.push(
                `${column} = $${parameterIndex}${isJsonField ? "::jsonb" : ""}`
            );

            values.push(
                                isJsonField
                                        ? JSON.stringify(
                                                field === "requirements"
                                                        ? toRequirementsArray(courseData[field])
                                                        : courseData[field]
                                        )
                                        : field === "description" &&
                                            courseData[field] &&
                                            typeof courseData[field] === "object"
                                                ? JSON.stringify(courseData[field])
                                                : courseData[field]
            );

            parameterIndex++;
        }
    }

    if (updates.length === 0) {
        return getCourseById(id);
    }

    updates.push(
        "updated_at = CURRENT_TIMESTAMP"
    );

    values.push(id);

    const result = await query(
        `
        UPDATE courses

        SET ${updates.join(", ")}

        WHERE id = $${parameterIndex}

        RETURNING id
        `,
        values
    );

    if (result.rows.length === 0) {
        return null;
    }

    return getCourseById(id);
};


// ============================================================
// Delete a course by ID
// ============================================================

const deleteCourse = async (id) => {
    const result = await query(
        `
        DELETE FROM courses

        WHERE id = $1

        RETURNING id
        `,
        [id]
    );

    return result.rows.length > 0;
};


// ============================================================
// Get course curriculum with chapters and lessons
// ============================================================

const getCourseCurriculum = async (courseId) => {
    const chapterService = require("./chapterService");
    const lessonService = require("./lessonService");

    const course = await getCourseById(courseId);

    if (!course) {
        return null;
    }

    const chapters =
        await chapterService.getChaptersByCourseId(courseId);

    const chaptersWithLessons = await Promise.all(
        chapters.map(async (chapter) => {
            const lessons =
                await lessonService.getLessonsByChapterId(
                    chapter.id
                );

            return {
                ...chapter,
                lessons,
            };
        })
    );

    return {
        chapters: chaptersWithLessons,
    };
};


module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseCurriculum,
};
