import { useState } from "react";
// Video lesson content
import VideoLessonContent from "./VideoLessonContent";
// Reading lesson content
import ReadingLessonContent from "./ReadingLessonContent";
import Icon from "@/components/Icon/Icon";

import bem from "@/utils/bem";
import "./LessonForm.scss";

const b = bem("lesson-form");

function LessonForm({
    course,
    chapter,
    lesson = null,
    mode = "create",
    onCancel,
    onSubmit,
}) {
    // Check whether this form is creating or editing a lesson
    const isEdit = mode === "edit";

    // General lesson fields
    const [title, setTitle] = useState(
        lesson?.title || ""
    );

    const [type, setType] = useState(
        lesson?.type || "video"
    );

    const [duration, setDuration] = useState(
        lesson?.duration || ""
    );

    const [lockEnabled, setLockEnabled] = useState(
        lesson?.lock?.enabled || false
    );

    const [lockType, setLockType] = useState(
        lesson?.lock?.type || "none"
    );

    // Lesson content
    const [content, setContent] = useState(
        lesson?.content || null
    );

    // Handle lesson form submit
    function handleSubmit(event) {
        event.preventDefault();

        const trimmedTitle = title.trim();

        // Title is required
        if (!trimmedTitle) {
            return;
        }

        const formData = {
            title: trimmedTitle,
            type,
            duration: duration.trim(),
            // Lesson-specific content
            content,

            lock: {
                enabled: lockEnabled,
                type: lockEnabled
                    ? lockType
                    : "none",
            },
        };

        onSubmit?.(formData);
    }

    return (
        <section className={b()}>

            {/* Form header */}
            <div className={b("header")}>

                <button
                    type="button"
                    className={b("back")}
                    onClick={onCancel}
                >
                    <Icon name="chevron-left" />
                    Quay lại
                </button>

                <span className={b("divider")}>|</span>

                <h1 className={b("title")}>
                    {isEdit
                        ? "Chỉnh sửa bài giảng"
                        : "Thêm bài giảng mới"}
                </h1>

            </div>


            <form
                className={b("form")}
                onSubmit={handleSubmit}
            >

                {/* Chapter */}
                <div className={b("chapter-card")}>
                    <span className={b("chapter-label")}>
                        THUỘC VỀ CHƯƠNG
                    </span>
                    <span className={b("chapter-value")}>
                        {chapter?.title || ""}
                    </span>
                </div>


                {/* Lesson title */}
                <div className={b("field")}>

                    <label htmlFor="lesson-title">
                        Tiêu đề bài giảng
                        <span className={b("required")}>
                            *
                        </span>
                    </label>

                    <input
                        id="lesson-title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(
                                event.target.value
                            )
                        }
                        placeholder="Ví dụ: Giới thiệu về Conditional Types"
                    />

                </div>


                {/* Lesson type + Duration */}
                <div className={b("row")}>

                    <div className={b("field")}>

                        <label>
                            Loại bài giảng
                        </label>

                        <div className={b("type-options")}>

                            <button
                                type="button"
                                className={`${b("type-option")} ${
                                    type === "video"
                                        ? b("type-option--active")
                                        : ""
                                }`}
                                onClick={() =>
                                    setType("video")
                                }
                            >
                                <Icon name="triangle-right" />
                                Video
                            </button>

                            <button
                                type="button"
                                className={`${b("type-option")} ${
                                    type === "reading"
                                        ? b("type-option--active")
                                        : ""
                                }`}
                                onClick={() =>
                                    setType("reading")
                                }
                            >
                                <Icon name="book" />
                                Đọc
                            </button>

                            <button
                                type="button"
                                className={`${b("type-option")} ${
                                    type === "quiz"
                                        ? b("type-option--active")
                                        : ""
                                }`}
                                onClick={() =>
                                    setType("quiz")
                                }
                            >
                                <Icon name="edit" />
                                Quiz
                            </button>

                        </div>

                    </div>

                    <div className={b("field")}>

                        <label htmlFor="lesson-duration">
                            Thời lượng (mm:ss)
                        </label>

                        <input
                            id="lesson-duration"
                            type="text"
                            value={duration}
                            onChange={(event) =>
                                setDuration(
                                    event.target.value
                                )
                            }
                            placeholder="15:00"
                        />

                    </div>

                </div>


                {/* Lock */}
                <div className={b("lock-card")}>

                    <div className={b("lock-info")}>
                        <strong>
                            Khóa bài giảng
                        </strong>

                        <span>
                            Chỉ học viên đã đăng ký mới có thể xem
                        </span>
                    </div>

                    <label className={b("toggle")}>
                        <input
                            type="checkbox"
                            checked={lockEnabled}
                            onChange={(event) => {
                                const enabled =
                                    event.target.checked;

                                setLockEnabled(enabled);

                                setLockType(
                                    enabled
                                        ? "enrollment"
                                        : "none"
                                );
                            }}
                        />
                        <span className={b("toggle-slider")} />
                    </label>

                </div>


                {/* Dynamic content area */}
                <div className={b("content")}>

                    {type === "video" && (
                        <VideoLessonContent
                            value={content}
                            onChange={setContent}
                        />
                    )}

                    {type === "reading" && (
                        <ReadingLessonContent
                            value={content}
                            onChange={setContent}
                        />
                    )}

                    {type === "quiz" && (
                        <div>
                            {/* Quiz builder will be added later */}
                            Nội dung Quiz
                        </div>
                    )}

                </div>


                {/* Form actions */}
                <div className={b("actions")}>

                    <button
                        type="button"
                        className={b("cancel")}
                        onClick={onCancel}
                    >
                        Hủy
                    </button>

                    <button
                        type="submit"
                        className={b("submit")}
                        disabled={!title.trim()}
                    >
                        <Icon name="save" />
                        {isEdit
                            ? "Lưu thay đổi"
                            : "Thêm bài giảng"}
                    </button>

                </div>

            </form>

        </section>
    );
}

export default LessonForm;