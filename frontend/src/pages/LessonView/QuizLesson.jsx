import { useMemo, useState } from "react";
import Icon from "@/components/Icon/Icon";
import bem from "@/utils/bem";

const b = bem("quiz-lesson");

function QuizLesson({ quiz }) {
    const [answers, setAnswers] = useState({});
    const [message, setMessage] = useState("");
    const questions = quiz?.questions || [];
    const answeredCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);

    function setAnswer(questionId, value) {
        setAnswers((current) => ({ ...current, [questionId]: value }));
        setMessage("");
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (answeredCount !== questions.length) {
            setMessage("Hãy trả lời tất cả câu hỏi trước khi nộp bài.");
            return;
        }
        setMessage("Backend hiện chưa có API lưu và chấm bài quiz, nên bài làm chưa được gửi.");
    }

    if (!quiz) return <div className={b("loading")}>Đang tải quiz...</div>;

    return (
        <form className={b()} onSubmit={handleSubmit}>
            <header className={b("header")}><Icon name="list-check" size={24} /><div><h1>Quiz · {questions.length} câu hỏi</h1><p>Đã trả lời: {answeredCount}/{questions.length}</p></div></header>
            {questions.map((question, index) => {
                const isMultipleChoice = question.type === "multiple-choice";
                return <fieldset className={b("question")} key={question.id}>
                    <legend><span className={b("badge")}>{isMultipleChoice ? "Trắc nghiệm" : "Tự luận"}</span><strong>Câu {index + 1}: {question.question}</strong></legend>
                    {question.imageUrl && <img src={question.imageUrl} alt={`Hình ảnh câu hỏi ${index + 1}`} />}
                    {isMultipleChoice ? <div className={b("options")}>{question.options.map((option) => <label className={answers[question.id] === String(option.id) ? b("option", "selected") : b("option")} key={option.id}><input type="radio" name={`question-${question.id}`} value={option.id} checked={answers[question.id] === String(option.id)} onChange={(event) => setAnswer(question.id, event.target.value)} />{option.text}</label>)}</div> : <textarea value={answers[question.id] || ""} onChange={(event) => setAnswer(question.id, event.target.value)} placeholder="Viết câu trả lời của bạn tại đây..." />}
                </fieldset>;
            })}
            <button className={b("submit")} type="submit"><Icon name="done2" size={18} /> Nộp bài ({answeredCount}/{questions.length} đã trả lời)</button>
            {message && <p className={b("message")}>{message}</p>}
        </form>
    );
}

export default QuizLesson;
