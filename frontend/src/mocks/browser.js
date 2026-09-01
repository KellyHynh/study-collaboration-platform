import { setupWorker } from "msw/browser";

import { courseHandlers } from "./handlers/courses";
import { enrollmentHandlers } from "./handlers/enrollments";
import { curriculumHandlers } from "./handlers/curriculums";
import { lessonProgressHandlers } from "./handlers/lessonProgress";
import { lessonHandlers } from "./handlers/lessons";

export const worker = setupWorker(
    ...courseHandlers,
    ...enrollmentHandlers,
    ...curriculumHandlers,
    ...lessonProgressHandlers,
    ...lessonHandlers
);