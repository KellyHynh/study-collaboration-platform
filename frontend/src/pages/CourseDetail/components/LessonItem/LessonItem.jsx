import { useNavigate } from "react-router-dom";

import Icon from "@/components/Icon/Icon";
import { getLessonStatus } from "@/utils/curriculumUtils";

import bem from "@/utils/bem";
import "./LessonItem.scss";

const b = bem("lesson-item");

function LessonItem({
    lesson,
    lessonProgress,
    courseId,
}) {
    const navigate = useNavigate();

    // Get current lesson progress status
    const status = getLessonStatus(
        lesson,
        lessonProgress
    );

    const isQuiz = lesson.type === "quiz";
    const isLocked = status === "locked";

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
                            : b("badge--video")
                    }`}
                >
                    {isQuiz ? "QUIZ" : "VIDEO"}
                </span>

                <span className={b("duration")}>
                    {lesson.duration}
                </span>

            </div>

        </div>
    );
}

export default LessonItem;