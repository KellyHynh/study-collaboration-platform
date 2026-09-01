import { http, HttpResponse } from "msw";

import lessonProgress from "../data/lessonProgress";

export const lessonProgressHandlers = [

    // GET /api/courses/:id/progress
    http.get(
        "/api/courses/:id/progress",
        ({ params }) => {
            const courseId = Number(params.id);

            const progress = lessonProgress.find(
                (item) =>
                    item.courseId === courseId &&
                    item.userId === "current-user"
            );

            if (!progress) {
                return HttpResponse.json(
                    {
                        message: "Lesson progress not found",
                    },
                    {
                        status: 404,
                    }
                );
            }

            return HttpResponse.json(progress);
        }
    ),

];