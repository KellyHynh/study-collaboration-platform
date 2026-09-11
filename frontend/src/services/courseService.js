import { CURRENT_USER } from "@/config/currentUser";

async function parseResponse(response, fallbackMessage) {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || fallbackMessage);
    }

    return data;
}

function normalizeCourse(course) {
    return {
        ...course,
        isOwner: course.ownerId === CURRENT_USER.id,
        category: course.category || course.categoryName || "",
        instructor: course.instructor || {
            id: course.ownerId,
            name: "Unknown",
            avatar: "",
            students: 0,
            courses: 0,
            description: "",
        },
        lessons: course.lessons ?? 0,
    };
}

async function resolveCategoryId(categoryId) {
    if (!categoryId || /^\d+$/.test(String(categoryId))) {
        return categoryId;
    }

    const categories = await parseResponse(
        await fetch("/api/categories"),
        "Failed to fetch categories"
    );

    const category = categories.find(
        (item) =>
            item.name.toLowerCase() ===
            String(categoryId).toLowerCase()
    );

    if (category) return category.id;

    const createdCategory = await parseResponse(
        await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: String(categoryId).trim() }),
        }),
        "Failed to create category"
    );

    return createdCategory.id;
}

export async function getCourses() {
    const data = await parseResponse(
        await fetch("/api/courses"),
        "Failed to fetch courses"
    );

    return data.map(normalizeCourse);
}

export async function getCategories() {
    return parseResponse(
        await fetch("/api/categories"),
        "Failed to fetch categories"
    );
}

export async function getCourseById(id) {
    const response = await fetch(`/api/courses/${id}`);
    return normalizeCourse(
        await parseResponse(response, "Failed to fetch course")
    );
}


export async function getCourseEnrollment(id) {
    const response = await fetch(
        `/api/courses/${id}/enrollment`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch enrollment");
    }

    return response.json();
}


export async function createCourse(courseData) {
    const categoryId = await resolveCategoryId(
        courseData.categoryId
    );

    const response = await fetch(
        "/api/courses",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                ...courseData,
                ownerId: CURRENT_USER.id,
                categoryId,
                level: courseData.level?.toLowerCase(),
                language: courseData.language || CURRENT_USER.language,
            }),
        }
    );

    return normalizeCourse(
        await parseResponse(response, "Failed to create course")
    );
}

export async function updateCourse(id, courseData) {
    const categoryId = await resolveCategoryId(
        courseData.categoryId
    );

    const response = await fetch(
        `/api/courses/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...courseData,
                categoryId,
                level: courseData.level?.toLowerCase(),
            }),
        }
    );

    return normalizeCourse(
        await parseResponse(response, "Failed to update course")
    );
}

export async function getCourseCurriculum(id) {
    const response = await fetch(
        `/api/courses/${id}/curriculum`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch course curriculum"
        );
    }

    return response.json();
}


export async function getCourseLessonProgress(id) {
    const response = await fetch(
        `/api/courses/${id}/progress`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch lesson progress"
        );
    }

    return response.json();
}

export async function getLessonById(id) {
    const response = await fetch(
        `/api/lessons/${id}`
    );

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.message || "Failed to fetch lesson"
        );
    }

    return response.json();
}

export async function getQuizForLesson(lessonId) {
    const quizResponse = await fetch(`/api/quizzes/${lessonId}`);
    if (!quizResponse.ok) {
        const data = await quizResponse.json().catch(() => ({}));
        throw new Error(data.message || "Failed to fetch quiz");
    }

    const quiz = await quizResponse.json();
    const questionsResponse = await fetch(
        `/api/quiz-questions/quizzes/${quiz.lessonId}`
    );
    if (!questionsResponse.ok) {
        throw new Error("Failed to fetch quiz questions");
    }

    const questions = await questionsResponse.json();
    const hydratedQuestions = await Promise.all(
        questions.map(async (question) => {
            const hydratedQuestion = {
                ...question,
                image: question.imageUrl
                    ? {
                        imageUrl: question.imageUrl,
                        previewUrl: question.imageUrl,
                        fileName: question.imageFileName,
                        mimeType: question.imageMimeType,
                    }
                    : null,
            };

            if (question.type !== "multiple-choice") {
                return { ...hydratedQuestion, options: [] };
            }

            const optionsResponse = await fetch(
                `/api/quiz-options/questions/${question.id}`
            );
            if (!optionsResponse.ok) {
                throw new Error("Failed to fetch quiz options");
            }

            return {
                ...hydratedQuestion,
                options: await optionsResponse.json(),
            };
        })
    );

    return { ...quiz, questions: hydratedQuestions };
}

export async function markLessonComplete(lessonId) {
    const userId = CURRENT_USER.id;
    const completedAt = new Date().toISOString();
    const createResponse = await fetch("/api/lesson-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, lessonId }),
    });

    if (createResponse.ok) {
        const progress = await createResponse.json();
        return updateLessonProgress(userId, lessonId, completedAt, progress);
    }

    return updateLessonProgress(userId, lessonId, completedAt);
}

async function updateLessonProgress(userId, lessonId, completedAt, fallback) {
    const response = await fetch(
        `/api/lesson-progress/${userId}/${lessonId}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completedAt }),
        }
    );

    if (!response.ok) {
        if (fallback) return fallback;
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save lesson progress");
    }

    return response.json();
}

export async function createChapter(courseId, title, position) {
    const response = await fetch(
        `/api/chapters/courses/${courseId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                position,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create chapter"
        );
    }

    return data;
}


// Create a lesson inside a chapter.
export async function createLesson(
    courseId,
    chapterId,
    lessonData
) {
    const response = await fetch(
        `/api/lessons/chapters/${chapterId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: lessonData.title,
                type: lessonData.type,
                position: lessonData.position,
                durationSeconds: lessonData.durationSeconds,
                isLocked: lessonData.isLocked,
                content: lessonData.content,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create lesson"
        );
    }

    return data;
}


// Update an existing lesson.
export async function updateLesson(
    courseId,
    chapterId,
    lessonId,
    lessonData
) {
    const response = await fetch(
        `/api/lessons/${lessonId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: lessonData.title,
                type: lessonData.type,
                position: lessonData.position,
                durationSeconds: lessonData.durationSeconds,
                isLocked: lessonData.isLocked,
                content: lessonData.content,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update lesson"
        );
    }

    return data;
}


// Delete an existing lesson.
export async function deleteLesson(
    courseId,
    chapterId,
    lessonId
) {
    const response = await fetch(
        `/api/lessons/${lessonId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        let data = {};

        try {
            data = await response.json();
        } catch {
            // Response may have no JSON body.
        }

        throw new Error(
            data.message || "Failed to delete lesson"
        );
    }

    // DELETE returns 204, so there may be no JSON body.
    return true;
}

export async function deleteChapter(chapterId) {
    const response = await fetch(
        `/api/chapters/${chapterId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        let data = {};

        try {
            data = await response.json();
        } catch {
            // Response may have no JSON body.
        }

        throw new Error(
            data.message || "Failed to delete chapter"
        );
    }

    return true;
}