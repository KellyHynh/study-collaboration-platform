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
    http.get("/api/courses/:id", ({ params }) => {
        const courseId = Number(params.id);

        const course = courses.find(
            (course) => course.id === courseId
        );

        if (!course) {
            return HttpResponse.json(
                {
                    message: "Course not found",
                },
                {
                    status: 404,
                }
            );
        }

        return HttpResponse.json(course);
    }),


    // POST /api/courses
    http.post("/api/courses", async ({ request }) => {
        const body = await request.json();

        // Name là field bắt buộc
        if (
            !body.name ||
            typeof body.name !== "string" ||
            !body.name.trim()
        ) {
            return HttpResponse.json(
                {
                    message: "Course name is required",
                },
                {
                    status: 400,
                }
            );
        }

        const newCourse = {
            id: generateCourseId(),

            image: body.image || "",

            category: body.category || "",

            name: body.name.trim(),

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

            isPublic:
                typeof body.isPublic === "boolean"
                    ? body.isPublic
                    : true,

            joinCode: generateJoinCode(),

            createdAt: new Date()
                .toISOString()
                .split("T")[0],
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

        if (
            !body.name ||
            typeof body.name !== "string" ||
            !body.name.trim()
        ) {
            return HttpResponse.json(
                {
                    message: "Course name is required",
                },
                {
                    status: 400,
                }
            );
        }

        const currentCourse = courses[courseIndex];

        const updatedCourse = {
            ...currentCourse,

            ...body,

            id: currentCourse.id,

            joinCode: currentCourse.joinCode,

            createdAt: currentCourse.createdAt,

            instructor: currentCourse.instructor,

            name: body.name.trim(),

            category:
                body.category || currentCourse.category,

            tags:
                Array.isArray(body.tags)
                    ? body.tags
                    : currentCourse.tags,

            learningOutcomes:
                Array.isArray(body.learningOutcomes)
                    ? body.learningOutcomes
                    : currentCourse.learningOutcomes,

            requirements:
                Array.isArray(body.requirements)
                    ? body.requirements
                    : currentCourse.requirements,
        };

        courses[courseIndex] = updatedCourse;

        return HttpResponse.json(updatedCourse);
    }),
];