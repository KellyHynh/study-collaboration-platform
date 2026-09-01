import { http, HttpResponse } from "msw";
// Import mock lesson data
import lessons from "@/mocks/data/lessons";


export const lessonHandlers = [
    // GET lesson detail
    http.get("/api/lessons/:id", ({ params }) => {
        // Convert URL parameter to number
        const lessonId = Number(params.id);

        // Find lesson from mock data
        const lesson = lessons.find(
            (item) => item.id === lessonId
        );

        // Return 404 if lesson does not exist
        if (!lesson) {
            return HttpResponse.json(
                {
                    message: "Lesson not found",
                },
                {
                    status: 404,
                }
            );
        }

        // Return lesson data
        return HttpResponse.json(lesson);
    }),
];