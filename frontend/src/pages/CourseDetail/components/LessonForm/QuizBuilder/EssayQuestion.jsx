import { useRef } from "react";

import Icon from "@/components/Icon/Icon";

import bem from "@/utils/bem";
import "./EssayQuestion.scss";
const b = bem("essay-question");

function EssayQuestion({
    question,
    index,
    onChange,
    onDelete,
}) {
    const imageInputRef = useRef(null);

    // Update essay question text
    function handleQuestionChange(event) {
        onChange?.(
            question.id,
            {
                ...question,
                question: event.target.value,
            }
        );
    }

    // Open image picker
    function handleChooseImage() {
        imageInputRef.current?.click();
    }

    // Handle selected question image
    function handleImageChange(event) {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        // Create temporary preview URL
        const previewUrl =
            URL.createObjectURL(file);

        onChange?.(
            question.id,
            {
                ...question,
                image: {
                    file,
                    fileName: file.name,
                    mimeType: file.type,
                    previewUrl,
                },
            }
        );
    }

    // Remove question image
    function handleRemoveImage() {
        if (question.image?.previewUrl) {
            URL.revokeObjectURL(
                question.image.previewUrl
            );
        }

        onChange?.(
            question.id,
            {
                ...question,
                image: null,
            }
        );

        // Reset file input
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    }

    return (
        <div className={b()}>
            {/* Question header */}
            <div className={b("header")}>
                <span className={b("badge")}>
                    Tự luận · Câu {index + 1}
                </span>

                <button
                    type="button"
                    className={b("delete")}
                    onClick={() =>
                        onDelete?.(question.id)
                    }
                    aria-label={`Xóa câu ${index + 1}`}
                >
                    <Icon name="trash" />
                </button>
            </div>

            {/* Question content */}
            <div className={b("field")}>
                <label>
                    Nội dung câu hỏi
                </label>

                <textarea
                    value={question.question}
                    onChange={
                        handleQuestionChange
                    }
                    placeholder="Nhập câu hỏi tự luận..."
                    rows={4}
                />
            </div>

            {/* Optional question image */}
            <div className={b("image")}>
                <div className={b("image-header")}>
                    <div>
                        <span className={b("image-label")}>
                            Hình ảnh
                        </span>

                        <p className={b("hint")}>
                            Tùy chọn. Có thể thêm ảnh
                            minh họa cho câu hỏi.
                        </p>
                    </div>

                    {!question.image && (
                        <button
                            type="button"
                            className={b("image-button")}
                            onClick={
                                handleChooseImage
                            }
                        >
                            <Icon name="image" />
                            Thêm ảnh
                        </button>
                    )}
                </div>

                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={
                        handleImageChange
                    }
                    hidden
                />

                {/* Question image preview */}
                {question.image?.previewUrl && (
                    <div className={b("image-preview")}>
                        <img
                            src={
                                question.image
                                    .previewUrl
                            }
                            alt="Ảnh câu hỏi"
                        />

                        <button
                            type="button"
                            onClick={
                                handleRemoveImage
                            }
                            aria-label="Xóa ảnh"
                        >
                            <Icon name="close" />
                        </button>
                    </div>
                )}
            </div>

            {/* Student answer information */}
            <div className={b("answer-hint")}>
                Người học sẽ nhập câu trả lời
                hoặc tải tệp lên khi làm bài.
            </div>
        </div>
    );
}

export default EssayQuestion;