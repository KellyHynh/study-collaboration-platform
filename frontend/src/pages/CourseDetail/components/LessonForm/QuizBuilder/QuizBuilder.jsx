import { useState } from "react";

import Icon from "@/components/Icon/Icon";

import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import EssayQuestion from "./EssayQuestion";
import "./QuizBuilder.scss";
import bem from "@/utils/bem";

const b = bem("quiz-builder");

function QuizBuilder({
    value,
    onChange,
}) {
    // Store quiz questions
    const [questions, setQuestions] = useState(
        Array.isArray(value?.questions)
            ? value.questions
            : []
    );

    // Count multiple-choice questions
    const multipleChoiceCount = questions.filter(
        (question) =>
            question.type === "multiple-choice"
    ).length;

    // Count essay questions
    const essayCount = questions.filter(
        (question) =>
            question.type === "essay"
    ).length;

    // Update quiz data and local state
    function updateQuestions(updatedQuestions) {
        setQuestions(updatedQuestions);

        // Send updated quiz data to parent
        onChange?.({
            questions: updatedQuestions,
        });
    }

    // Add a new multiple-choice question
    function handleAddMultipleChoice() {
        const newQuestion = {
            id: crypto.randomUUID(),
            type: "multiple-choice",
            question: "",
            options: [
                {
                    optionKey: "A",
                    isCorrect: false,
                    text: "",
                },
                {
                    optionKey: "B",
                    isCorrect: false,
                    text: "",
                },
                {
                    optionKey: "C",
                    isCorrect: false,
                    text: "",
                },
                {
                    optionKey: "D",
                    isCorrect: false,
                    text: "",
                },
            ],
            image: null,
        };

        // Add question to the end of the list
        updateQuestions([
            ...questions,
            newQuestion,
        ]);
    }

    // Add a new essay question
    function handleAddEssay() {
        const newQuestion = {
            id: crypto.randomUUID(),
            type: "essay",
            question: "",
        };

        // Add question to the end of the list
        updateQuestions([
            ...questions,
            newQuestion,
        ]);
    }

    // Update an existing question
    function handleQuestionChange(
        questionId,
        updatedQuestion
    ) {
        const updatedQuestions =
            questions.map((question) =>
                question.id === questionId
                    ? updatedQuestion
                    : question
            );

        // Update the changed question
        updateQuestions(updatedQuestions);
    }

    // Delete a question
    function handleDeleteQuestion(questionId) {
        const updatedQuestions =
            questions.filter(
                (question) =>
                    question.id !== questionId
            );

        // Remove the selected question
        updateQuestions(updatedQuestions);
    }

    return (
        <div className={b()}>
            {/* Quiz header */}
            <div className={b("header")}>
                <div>
                    <span className={b("label")}>
                        Câu hỏi Quiz
                    </span>

                    <p className={b("hint")}>
                        {questions.length} câu ·{" "}
                        {multipleChoiceCount} trắc nghiệm ·{" "}
                        {essayCount} tự luận
                    </p>
                </div>

                {/* Add question buttons */}
                <div className={b("add-actions")}>
                    <button
                        type="button"
                        className={`${b("add-button")} ${b(
                            "add-button--mc"
                        )}`}
                        onClick={
                            handleAddMultipleChoice
                        }
                    >
                        <Icon name="plus" />
                        Trắc nghiệm
                    </button>

                    <button
                        type="button"
                        className={`${b("add-button")} ${b(
                            "add-button--essay"
                        )}`}
                        onClick={handleAddEssay}
                    >
                        <Icon name="plus" />
                        Tự luận
                    </button>
                </div>
            </div>

            {/* Question list */}
            <div className={b("questions")}>
                {questions.map(
                    (question, index) => (
                        <div
                            key={question.id}
                            className={b("question")}
                        >
                            {/* Multiple-choice question */}
                            {question.type ===
                                "multiple-choice" && (
                                <MultipleChoiceQuestion
                                    question={question}
                                    index={index}
                                    onChange={
                                        handleQuestionChange
                                    }
                                    onDelete={
                                        handleDeleteQuestion
                                    }
                                />
                            )}

                            {/* Essay question */}
                            {question.type ===
                                "essay" && (
                                <EssayQuestion
                                    question={question}
                                    index={index}
                                    onChange={
                                        handleQuestionChange
                                    }
                                    onDelete={
                                        handleDeleteQuestion
                                    }
                                />
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

// Export QuizBuilder component
export default QuizBuilder;