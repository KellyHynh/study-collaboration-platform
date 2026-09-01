import { useNavigate } from "react-router-dom";

import Icon from "@/components/Icon/Icon";
import LessonItem from "../LessonItem/LessonItem";

import {
    getChapterDuration,
    getChapterProgress,
} from "@/utils/curriculumUtils";

import bem from "@/utils/bem";
import "./ChapterItem.scss";

const b = bem("chapter-item");

function ChapterItem({
    chapter,
    isExpanded,
    onToggle,
    lessonProgress,
    courseId,
    isOwner,
}) {
    const navigate = useNavigate();

    const progress = getChapterProgress(
        chapter,
        lessonProgress
    );

    const duration = getChapterDuration(chapter);

    // Open lesson creation form
    function handleAddLesson(event) {
        event.stopPropagation();

        navigate(
            `/courses/${courseId}/chapters/${chapter.id}/lessons/create`
        );
    }

    // Delete chapter
    function handleDeleteChapter(event) {
        event.stopPropagation();

        // Delete API will be connected later
        console.log("Delete chapter:", chapter.id);
    }

    return (
        <section className={b()}>

            <div className={b("header")}>

                {/* Chapter information and toggle */}
                <button
                    type="button"
                    className={b("toggle")}
                    onClick={onToggle}
                    aria-expanded={isExpanded}
                >
                    <div className={b("main")}>

                        <span className={b("title")}>
                            {chapter.title}
                        </span>

                        <span className={b("progress-count")}>
                            {progress.completed}/{progress.total} bài
                        </span>

                    </div>

                    <div className={b("meta")}>

                        <span className={b("duration")}>
                            {duration}
                        </span>

                        <span className={b("progress")}>
                            <span
                                className={b("progress-bar")}
                                style={{
                                    width: `${progress.percentage}%`,
                                }}
                            />
                        </span>

                        <Icon
                            name={
                                isExpanded
                                    ? "chevron-down"
                                    : "chevron-up"
                            }
                        />

                    </div>
                </button>


                {/* Owner actions */}
                {isOwner && (
                    <div className={b("actions")}>

                        <button
                            type="button"
                            className={b("action")}
                            onClick={handleAddLesson}
                            aria-label="Thêm bài"
                        >
                            <Icon name="plus" />
                        </button>

                        <button
                            type="button"
                            className={`${b("action")} ${b("action--delete")}`}
                            onClick={handleDeleteChapter}
                            aria-label="Xóa chương"
                        >
                            <Icon name="trash-2" />
                        </button>

                    </div>
                )}

            </div>


            {/* Chapter lessons */}
            {isExpanded && (
                <div className={b("lessons")}>

                    {chapter.lessons.map((lesson) => (
                        <LessonItem
                            key={lesson.id}
                            lesson={lesson}
                            lessonProgress={lessonProgress}
                            courseId={courseId}
                            isOwner={isOwner}
                        />
                    ))}

                </div>
            )}

        </section>
    );
}

export default ChapterItem;