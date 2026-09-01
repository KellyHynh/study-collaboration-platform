export function parseDuration(duration) {
    if (!duration || typeof duration !== "string") {
        return 0;
    }

    const parts = duration.split(":").map(Number);

    if (
        parts.length === 2 &&
        parts.every((part) => Number.isFinite(part))
    ) {
        return parts[0] * 60 + parts[1];
    }

    return 0;
}


export function formatTotalDuration(totalSeconds) {
    if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
        return "0m";
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    if (hours > 0) {
        return minutes > 0
            ? `${hours}h ${minutes}m`
            : `${hours}h`;
    }

    return `${minutes}m`;
}


export function getChapterDuration(chapter) {
    if (!chapter?.lessons?.length) {
        return "0m";
    }

    const totalSeconds = chapter.lessons.reduce(
        (total, lesson) =>
            total + parseDuration(lesson.duration),
        0
    );

    return formatTotalDuration(totalSeconds);
}


export function getChapterProgress(
    chapter,
    lessonProgress = {}
) {
    const lessons = chapter?.lessons || [];

    if (lessons.length === 0) {
        return {
            completed: 0,
            total: 0,
            percentage: 0,
        };
    }

    const completed = lessons.filter(
        (lesson) =>
            lessonProgress[lesson.id] === "done"
    ).length;

    return {
        completed,
        total: lessons.length,
        percentage: Math.round(
            (completed / lessons.length) * 100
        ),
    };
}


export function getLessonStatus(
    lesson,
    lessonProgress = {}
) {
    return lessonProgress[lesson.id] || "locked";
}