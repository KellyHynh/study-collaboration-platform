import { http, HttpResponse } from "msw";
import courses from "../data/courses";

const generateJoinCode = () => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 6; i++) {
        code += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return `KNO-${code}`;
};

const generateCourseId = () => {
    if (courses.length === 0) {
        return 1;
    }

    return Math.max(
        ...courses.map((course) => course.id)
    ) + 1;
};

export const courseHandlers = [

    // GET /api/courses/:id
    // http.get("/api/courses/:id", ({ params }) => {
    //     const courseId = Number(params.id);

    //     const course = courses.find(
    //         (course) => course.id === courseId
    //     );

    //     if (!course) {
    //         return HttpResponse.json(
    //             {
    //                 message: "Course not found",
    //             },
    //             {
    //                 status: 404,
    //             }
    //         );
    //     }

    //     return HttpResponse.json(course);
    // }),


    // POST /api/courses
    http.post("/api/courses", async ({ request }) => {
        const body = await request.json();

        // Title is required
        if (
            !body.title ||
            typeof body.title !== "string" ||
            !body.title.trim()
        ) {
            return HttpResponse.json(
                {
                    message: "Course title is required",
                },
                {
                    status: 400,
                }
            );
        }

        const now = new Date().toISOString();

        const newCourse = {
            id: generateCourseId(),

            title: body.title.trim(),

            thumbnailUrl: body.thumbnailUrl || "",

            categoryId: body.categoryId || "",

            instructor: body.instructor || {
                id: "current-user",
                name: "Current User",
                avatar: "",
                students: 0,
                courses: 1,
                description: "",
            },

            description: body.description || null,

            learningOutcomes:
                Array.isArray(body.learningOutcomes)
                    ? body.learningOutcomes
                    : [],

            requirements:
                Array.isArray(body.requirements)
                    ? body.requirements
                    : [],

            tags:
                Array.isArray(body.tags)
                    ? body.tags
                    : [],

            lessons: 0,

            duration: "0 hours",

            level: body.level || "",

            rating: 0,

            students: 0,

            progress: 0,

            visibility:
                body.visibility === "private"
                    ? "private"
                    : "public",

            joinCode: generateJoinCode(),

            ownerId: body.ownerId || "current-user",

            language: body.language || "English",

            createdAt: now,

            updatedAt: now,
        };

        // Mock database
        courses.push(newCourse);

        return HttpResponse.json(
            newCourse,
            {
                status: 201,
            }
        );
    }),


    // PATCH /api/courses/:id
    http.patch("/api/courses/:id", async ({ params, request }) => {
        const courseId = Number(params.id);

        const courseIndex = courses.findIndex(
            (course) => course.id === courseId
        );

        if (courseIndex === -1) {
            return HttpResponse.json(
                {
                    message: "Course not found",
                },
                {
                    status: 404,
                }
            );
        }

        const body = await request.json();

        // Title is required
        if (
            !body.title ||
            typeof body.title !== "string" ||
            !body.title.trim()
        ) {
            return HttpResponse.json(
                {
                    message: "Course title is required",
                },
                {
                    status: 400,
                }
            );
        }

        const currentCourse = courses[courseIndex];

        const updatedCourse = {
            ...currentCourse,

            // Editable fields
            title: body.title.trim(),

            thumbnailUrl:
                body.thumbnailUrl !== undefined
                    ? body.thumbnailUrl
                    : currentCourse.thumbnailUrl,

            categoryId:
                body.categoryId !== undefined
                    ? body.categoryId
                    : currentCourse.categoryId,

            description:
                body.description !== undefined
                    ? body.description
                    : currentCourse.description,

            learningOutcomes:
                Array.isArray(body.learningOutcomes)
                    ? body.learningOutcomes
                    : currentCourse.learningOutcomes,

            requirements:
                Array.isArray(body.requirements)
                    ? body.requirements
                    : currentCourse.requirements,

            tags:
                Array.isArray(body.tags)
                    ? body.tags
                    : currentCourse.tags,

            level:
                body.level !== undefined
                    ? body.level
                    : currentCourse.level,

            visibility:
                body.visibility === "private"
                    ? "private"
                    : body.visibility === "public"
                        ? "public"
                        : currentCourse.visibility,

            language:
                body.language !== undefined
                    ? body.language
                    : currentCourse.language,

            // System fields
            id: currentCourse.id,

            ownerId: currentCourse.ownerId,

            joinCode: currentCourse.joinCode,

            createdAt: currentCourse.createdAt,

            instructor: currentCourse.instructor,

            lessons: currentCourse.lessons,

            duration: currentCourse.duration,

            rating: currentCourse.rating,

            students: currentCourse.students,

            progress: currentCourse.progress,

            updatedAt: new Date().toISOString(),
        };

        courses[courseIndex] = updatedCourse;

        return HttpResponse.json(updatedCourse);
    }),
];