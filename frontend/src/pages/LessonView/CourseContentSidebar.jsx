import { Link } from "react-router-dom";
import Icon from "@/components/Icon/Icon";
import bem from "@/utils/bem";

const b = bem("course-sidebar");

function CourseContentSidebar({ curriculum, activeLessonId, completedIds, courseId }) {
    const chapters = curriculum?.chapters || [];
    const lessons = chapters.flatMap((chapter) => chapter.lessons || []);
    const completedCount = lessons.filter((lesson) => completedIds.has(String(lesson.id))).length;
    const percent = lessons.length ? (completedCount / lessons.length) * 100 : 0;

    return <aside className={b()}>
        <div className={b("heading")}><h2>NỘI DUNG KHÓA HỌC</h2><strong>{completedCount}/{lessons.length} hoàn thành</strong><div className={b("progress")}><span style={{ width: `${percent}%` }} /></div></div>
        <div className={b("chapters")}>
            {chapters.map((chapter) => {
                const chapterLessons = chapter.lessons || [];
                const chapterDone = chapterLessons.filter((lesson) => completedIds.has(String(lesson.id))).length;
                return <section className={b("chapter")} key={chapter.id}>
                    <div className={b("chapter-heading")}><strong>{chapter.title}</strong><span>{chapterDone}/{chapterLessons.length} bài</span></div>
                    {chapterLessons.map((lesson) => {
                        const isActive = String(lesson.id) === String(activeLessonId);
                        const isLocked = lesson.isLocked === true;
                        const className = [b("lesson"), isActive && b("lesson--active"), isLocked && b("lesson--locked")].filter(Boolean).join(" ");
                        return isLocked ? <div className={className} key={lesson.id}><Icon name="lock" size={15} /><span>{lesson.title}</span></div> : <Link className={className} key={lesson.id} to={`/courses/${courseId}/lessons/${lesson.id}`}><Icon name={completedIds.has(String(lesson.id)) ? "done" : lesson.type === "quiz" ? "list-check" : "triangle-right"} size={16} /><span>{lesson.title}<small>{Math.floor((lesson.durationSeconds || 0) / 60)}:{String((lesson.durationSeconds || 0) % 60).padStart(2, "0")}</small></span></Link>;
                    })}
                </section>;
            })}
        </div>
    </aside>;
}

export default CourseContentSidebar;
