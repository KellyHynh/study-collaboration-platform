export async function getCourseById(id) {
    const response = await fetch(`/api/courses/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch course");
    }

    return response.json();
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
    const response = await fetch(
        "/api/courses",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(courseData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create course"
        );
    }

    return data;
}

export async function updateCourse(id, courseData) {
    const response = await fetch(
        `/api/courses/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update course"
        );
    }

    return data;
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

export async function createChapter(courseId, title) {
    const response = await fetch(
        `/api/courses/${courseId}/chapters`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
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