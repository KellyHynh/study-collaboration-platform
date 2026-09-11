import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Icon from "@/components/Icon/Icon";
import {
    getCourseById,
    getCourseCurriculum,
    getCourseLessonProgress,
    getLessonById,
    getQuizForLesson,
    markLessonComplete,
} from "@/services/courseService";
import bem from "@/utils/bem";
import CourseContentSidebar from "./CourseContentSidebar";
import LessonContent from "./LessonContent";
import LessonNavigation from "./LessonNavigation";
import QuizLesson from "./QuizLesson";
import "./LessonView.scss";

const b = bem("lesson-view");

function flattenLessons(curriculum) {
    return (curriculum?.chapters || []).flatMap((chapter) =>
        (chapter.lessons || []).map((lesson) => ({ ...lesson, chapter }))
    );
}

function LessonView() {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [curriculum, setCurriculum] = useState(null);
    const [lesson, setLesson] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [progressMessage, setProgressMessage] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadLesson() {
            setLoading(true);
            setError("");
            setQuiz(null);
            try {
                const [courseData, curriculumData, lessonData, progressData] =
                    await Promise.all([
                        getCourseById(courseId),
                        getCourseCurriculum(courseId),
                        getLessonById(lessonId),
                        getCourseLessonProgress(courseId),
                    ]);

                if (cancelled) return;
                setCourse(courseData);
                setCurriculum(curriculumData);
                setLesson(lessonData);
                setProgress(Array.isArray(progressData) ? progressData : []);

                if (lessonData.type === "quiz") {
                    setQuiz(await getQuizForLesson(lessonId));
                }
            } catch (loadError) {
                if (!cancelled) setError(loadError.message || "Không thể tải bài học.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadLesson();
        return () => { cancelled = true; };
    }, [courseId, lessonId]);

    const lessons = useMemo(() => flattenLessons(curriculum), [curriculum]);
    const currentIndex = lessons.findIndex(
        (item) => String(item.id) === String(lessonId)
    );
    const currentLesson = lessons[currentIndex] || lesson;
    const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex >= 0 ? lessons[currentIndex + 1] : null;
    const completedIds = new Set(
        progress.filter((item) => item.completedAt).map((item) => String(item.lessonId))
    );

    async function handleComplete() {
        try {
            setProgressMessage("");
            await markLessonComplete(lessonId);
            const freshProgress = await getCourseLessonProgress(courseId);
            setProgress(Array.isArray(freshProgress) ? freshProgress : []);
            setProgressMessage("Đã lưu trạng thái hoàn thành.");
        } catch (completeError) {
            setProgressMessage(completeError.message);
        }
    }

    function goToLesson(targetLesson) {
        if (!targetLesson || targetLesson.isLocked === true) return;
        navigate(`/courses/${courseId}/lessons/${targetLesson.id}`);
    }

    if (loading) return <main className={b()}><div className={b("state")}>Đang tải bài học...</div></main>;
    if (error) return <main className={b()}><div className={b("state", "error")}>{error}</div></main>;
    if (!lesson || lesson.isLocked === true) {
        return <main className={b()}><div className={b("state")}>Bài học này đang bị khóa.</div></main>;
    }

    const typeLabel = lesson.type === "quiz" ? "Quiz" : lesson.type === "reading" ? "Reading" : "Video";
    const position = currentIndex >= 0 ? currentIndex + 1 : "-";

    return (
        <main className={b()}>
            <div className={b("bar")}>
                <button type="button" className={b("back")} onClick={() => navigate(`/courses/${courseId}`)} aria-label="Quay lại khóa học">
                    <Icon name="chevron-left" size={18} />
                </button>
                <span className={b("course-title")}>{course?.title}</span>
                <span className={b("divider")} />
                <div className={b("crumbs")}>
                    <span>{currentLesson?.chapter?.title}</span>
                    <strong>{lesson.title}</strong>
                </div>
                <div className={b("bar-meta")}><span className={b("type")}>{typeLabel}</span><span>{position} / {lessons.length}</span></div>
            </div>

            <div className={b("layout")}>
                <section className={b("main")}>
                    {lesson.type === "quiz" ? (
                        <QuizLesson quiz={quiz} />
                    ) : (
                        <LessonContent
                            lesson={lesson}
                            course={course}
                            onComplete={handleComplete}
                            isCompleted={completedIds.has(String(lesson.id))}
                            progressMessage={progressMessage}
                        />
                    )}
                    <LessonNavigation previousLesson={previousLesson} nextLesson={nextLesson} onNavigate={goToLesson} />
                </section>
                <CourseContentSidebar
                    curriculum={curriculum}
                    activeLessonId={lessonId}
                    completedIds={completedIds}
                    courseId={courseId}
                />
            </div>
        </main>
    );
}

export default LessonView;
