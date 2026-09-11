import { http, HttpResponse } from "msw";

import curriculums from "@/mocks/data/curriculums";

export const curriculumHandlers = [

    // GET /api/courses/:id/curriculum
    http.get(
        "/api/courses/:id/curriculum",
        ({ params }) => {
            const courseId = Number(params.id);

            const curriculum = curriculums.find(
                (curriculum) =>
                    curriculum.courseId === courseId
            );

            if (!curriculum) {
                return HttpResponse.json(
                    {
                        message: "Curriculum not found",
                    },
                    {
                        status: 404,
                    }
                );
            }

            return HttpResponse.json(curriculum);
        }
    ),


    // POST /api/courses/:id/chapters
    http.post(
        "/api/courses/:id/chapters",
        async ({ params, request }) => {
            const courseId = Number(params.id);

            const curriculum = curriculums.find(
                (curriculum) =>
                    curriculum.courseId === courseId
            );

            if (!curriculum) {
                return HttpResponse.json(
                    {
                        message: "Curriculum not found",
                    },
                    {
                        status: 404,
                    }
                );
            }

            const body = await request.json();

            const title =
                typeof body.title === "string"
                    ? body.title.trim()
                    : "";

            if (!title) {
                return HttpResponse.json(
                    {
                        message: "Chapter title is required",
                    },
                    {
                        status: 400,
                    }
                );
            }

            const newChapter = {
                id:
                    Date.now(),

                title,

                lessons: [],
            };

            curriculum.chapters.push(newChapter);

            return HttpResponse.json(
                newChapter,
                {
                    status: 201,
                }
            );
        }
    ),
    
    // Create a new lesson inside a chapter
    http.post(
        "/api/courses/:courseId/chapters/:chapterId/lessons",
        async ({ params, request }) => {
            const { courseId, chapterId } = params;

            // Read lesson data from request body
            const lessonData =
                await request.json();

            // Find the curriculum for this course
            const curriculum =
                curriculums.find(
                    (item) =>
                        String(item.courseId) ===
                        String(courseId)
                );

            if (!curriculum) {
                return HttpResponse.json(
                    {
                        message:
                            "Không tìm thấy khóa học.",
                    },
                    { status: 404 }
                );
            }

            // Find the selected chapter
            const chapter =
                curriculum.chapters.find(
                    (item) =>
                        String(item.id) ===
                        String(chapterId)
                );

            if (!chapter) {
                return HttpResponse.json(
                    {
                        message:
                            "Không tìm thấy chương.",
                    },
                    { status: 404 }
                );
            }

            // Create a new lesson
            const newLesson = {
                id: crypto.randomUUID(),
                ...lessonData,
            };

            // Add the lesson to the chapter
            chapter.lessons.push(newLesson);

            // Return the created lesson
            return HttpResponse.json(
                newLesson,
                { status: 201 }
            );
        }
    ),

    // Update an existing lesson
    http.patch(
        "/api/courses/:courseId/chapters/:chapterId/lessons/:lessonId",
        async ({ params, request }) => {
            const {
                courseId,
                chapterId,
                lessonId,
            } = params;

            // Read updated lesson data
            const lessonData =
                await request.json();

            // Find the course curriculum
            const curriculum =
                curriculums.find(
                    (item) =>
                        String(item.courseId) ===
                        String(courseId)
                );

            if (!curriculum) {
                return HttpResponse.json(
                    {
                        message:
                            "Không tìm thấy khóa học.",
                    },
                    { status: 404 }
                );
            }

            // Find the selected chapter
            const chapter =
                curriculum.chapters.find(
                    (item) =>
                        String(item.id) ===
                        String(chapterId)
                );

            if (!chapter) {
                return HttpResponse.json(
                    {
                        message:
                            "Không tìm thấy chương.",
                    },
                    { status: 404 }
                );
            }

            // Find the lesson
            const lessonIndex =
                chapter.lessons.findIndex(
                    (item) =>
                        String(item.id) ===
                        String(lessonId)
                );

            if (lessonIndex === -1) {
                return HttpResponse.json(
                    {
                        message:
                            "Không tìm thấy bài giảng.",
                    },
                    { status: 404 }
                );
            }

            // Update the lesson
            chapter.lessons[lessonIndex] = {
                ...chapter.lessons[lessonIndex],
                ...lessonData,
            };

            // Return the updated lesson
            return HttpResponse.json(
                chapter.lessons[lessonIndex]
            );
        }
    ),

    // Delete an existing lesson
    http.delete(
        "/api/courses/:courseId/chapters/:chapterId/lessons/:lessonId",
        async ({ params }) => {
            const {
                courseId,
                chapterId,
                lessonId,
            } = params;

            // Find the course curriculum
            const curriculum =
                curriculums.find(
                    (item) =>
                        String(item.courseId) ===
                        String(courseId)
                );

            if (!curriculum) {
                return HttpResponse.json(
                    {
                        message:
                            "Không tìm thấy khóa học.",
                    },
                    { status: 404 }
                );
            }

            // Find the selected chapter
            const chapter =
                curriculum.chapters.find(
                    (item) =>
                        String(item.id) ===
                        String(chapterId)
                );

            if (!chapter) {
                return HttpResponse.json(
                    {
                        message:
                            "Không tìm thấy chương.",
                    },
                    { status: 404 }
                );
            }

            // Find the lesson
            const lessonIndex =
                chapter.lessons.findIndex(
                    (item) =>
                        String(item.id) ===
                        String(lessonId)
                );

            if (lessonIndex === -1) {
                return HttpResponse.json(
                    {
                        message:
                            "Không tìm thấy bài giảng.",
                    },
                    { status: 404 }
                );
            }

            // Remove the lesson from the chapter
            const deletedLesson =
                chapter.lessons.splice(
                    lessonIndex,
                    1
                )[0];

            // Return the deleted lesson
            return HttpResponse.json(
                deletedLesson
            );
        }
    ),
];