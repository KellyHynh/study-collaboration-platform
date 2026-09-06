import { useNavigate } from "react-router-dom";

import Icon from "@/components/Icon/Icon";
import { getLessonStatus } from "@/utils/curriculumUtils";

import bem from "@/utils/bem";
import "./LessonItem.scss";

const b = bem("lesson-item");

function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function LessonItem({
    lesson,
    lessonProgress,
    courseId,
    chapterId,
    isOwner,
    onDelete,
}) {
    const navigate = useNavigate();

    // Get current lesson progress status
    const status = getLessonStatus(
        lesson,
        lessonProgress
    );

    const isQuiz = lesson.type === "quiz";
    const isReading = lesson.type === "reading";

    const isLocked = status === "locked";

    // Open lesson editor
    function handleEdit(event) {
        event.stopPropagation();

        navigate(
            `/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}/edit`
        );
    }

    // Delete lesson
    function handleDelete(event) {
        event.stopPropagation();

        // Ask for confirmation before deleting
        const confirmed = window.confirm(
            "Bạn có chắc muốn xóa bài giảng này?"
        );

        if (!confirmed) {
            return;
        }

        // Pass the deletion request to the parent
        onDelete?.();
    }

    // Open lesson detail when the lesson is available
    function handleClick() {
        if (isLocked) {
            return;
        }

        navigate(
            `/courses/${courseId}/lessons/${lesson.id}`
        );
    }

    return (
        <div
            className={`${b()} ${
                isLocked ? `${b()}--locked` : ""
            }`}
            onClick={handleClick}
            role={!isLocked ? "button" : undefined}
            tabIndex={!isLocked ? 0 : undefined}
            onKeyDown={(event) => {
                // Allow keyboard users to open the lesson
                if (
                    !isLocked &&
                    (event.key === "Enter" ||
                        event.key === " ")
                ) {
                    event.preventDefault();
                    handleClick();
                }
            }}
        >

            <div className={b("left")}>

                <span
                    className={`${b("status")} ${b(`status--${status}`)} ${
                        status === "current"
                            ? b(
                                isQuiz
                                    ? "status--quiz"
                                    : "status--video"
                            )
                            : ""
                    }`}
                >
                    {status === "done" && (
                        <Icon name="done" />
                    )}

                    {status === "current" && (
                        <Icon
                            name={
                                isQuiz
                                    ? "list-check"
                                    : "triangle-right"
                            }
                        />
                    )}

                    {status === "locked" && (
                        <Icon name="lock" />
                    )}
                </span>

                <span className={b("title")}>
                    {lesson.title}
                </span>

            </div>

            <div className={b("right")}>

                <span
                    className={`${b("badge")} ${
                        isQuiz
                            ? b("badge--quiz")
                            : isReading
                                ? b("badge--reading")
                                : b("badge--video")
                    }`}
                >
                    {isQuiz ? "QUIZ" : isReading ? "READING" : "VIDEO"}
                </span>

                <span className={b("duration")}>
                    {formatDuration(lesson.durationSeconds)}
                </span>

                {/* Owner actions */}
                {isOwner && (
                    <div
                        className={b("actions")}
                    >
                        {/* Edit lesson */}
                        <button
                            type="button"
                            className={`${b(
                                "action"
                            )} ${b(
                                "action--edit"
                            )}`}
                            onClick={handleEdit}
                            aria-label="Chỉnh sửa bài"
                        >
                            <Icon name="edit" />
                        </button>

                        {/* Delete lesson */}
                        <button
                            type="button"
                            className={`${b(
                                "action"
                            )} ${b(
                                "action--delete"
                            )}`}
                            onClick={handleDelete}
                            aria-label="Xóa bài"
                        >
                            <Icon name="trash-2" />
                        </button>
                    </div>
                )}

            </div>

        </div>
    );
}

export default LessonItem;