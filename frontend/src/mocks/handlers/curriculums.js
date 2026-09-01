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

];