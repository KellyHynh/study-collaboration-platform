import { http, HttpResponse } from "msw";
import enrollments from "../data/enrollments";

const CURRENT_USER_ID = 1;

export const enrollmentHandlers = [
    http.get("/api/courses/:id/enrollment", ({ params }) => {
        const courseId = Number(params.id);

        const enrollment = enrollments.find(
            (enrollment) =>
                enrollment.userId === CURRENT_USER_ID &&
                enrollment.courseId === courseId
        );

        if (!enrollment) {
            return HttpResponse.json(null);
        }

        return HttpResponse.json(enrollment);
    }),
];