import { useRef } from "react";

import Icon from "@/components/Icon/Icon";
import "./MultipleChoiceQuestion.scss";
import bem from "@/utils/bem";

const b = bem("multiple-choice-question");

function MultipleChoiceQuestion({
    question,
    index,
    onChange,
    onDelete,
}) {
    const imageInputRef = useRef(null);

    // Update question text
    function handleQuestionChange(event) {
        onChange?.(
            question.id,
            {
                ...question,
                question: event.target.value,
            }
        );
    }

    // Update an answer option
    function handleOptionChange(
        optionId,
        text
    ) {
        const updatedOptions =
            question.options.map((option) =>
                (option.optionKey || option.id) === optionId
                    ? {
                        ...option,
                        text,
                    }
                    : option
            );

        onChange?.(
            question.id,
            {
                ...question,
                options: updatedOptions,
            }
        );
    }

    // Select the correct answer
    function handleCorrectAnswer(optionId) {
        const updatedOptions =
            question.options.map((option) => ({
                ...option,
                isCorrect:
                    (option.optionKey || option.id) === optionId,
            }));

        onChange?.(
            question.id,
            {
                ...question,
                options: updatedOptions,
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
                    Trắc nghiệm · Câu {index + 1}
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
                    placeholder="Nhập câu hỏi..."
                    rows={3}
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

            {/* Answer options */}
            <div className={b("options")}>
                <label>
                    Đáp án <span className={b("options-hint")}>· Nhấn để chọn đáp án đúng</span>
                </label>

                {question.options.map((option) => (
                    <div
                        key={option.optionKey || option.id}
                        className={`${b("option")} ${
                            option.isCorrect ? b("option--correct") : ""
                        }`}
                    >
                        <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={option.isCorrect}
                            onChange={() => handleCorrectAnswer(option.optionKey || option.id)}
                        />

                        <input
                            type="text"
                            value={option.text}
                            onChange={(event) =>
                                handleOptionChange(option.optionKey || option.id, event.target.value)
                            }
                            placeholder={`Đáp án ${option.optionKey || option.id}...`}
                        />

                        {option.isCorrect && (
                            <Icon name="circle-check" className={b("option-check")} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultipleChoiceQuestion;