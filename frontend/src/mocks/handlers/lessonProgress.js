import { http, HttpResponse } from "msw";

import lessonProgress from "../data/lessonProgress";

export const lessonProgressHandlers = [

    // GET /api/courses/:id/progress
    http.get(
        "/api/courses/:id/progress",
        ({ params }) => {
            const courseId = Number(params.id);

            const progress = lessonProgress.filter(
                (item) =>
                    item.userId === "current-user" &&
                    item.lessonId >= courseId * 1000 &&
                    item.lessonId < (courseId + 1) * 1000
            );

            if (progress.length === 0) {
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