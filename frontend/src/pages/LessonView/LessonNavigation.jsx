import Icon from "@/components/Icon/Icon";
import bem from "@/utils/bem";

const b = bem("lesson-navigation");

function LessonNavigation({ previousLesson, nextLesson, onNavigate }) {
    return <nav className={b()} aria-label="Điều hướng bài học">
        <button type="button" disabled={!previousLesson} onClick={() => onNavigate(previousLesson)}><Icon name="chevron-left" size={18} /> Bài trước</button>
        <button type="button" disabled={!nextLesson || nextLesson.isLocked === true} onClick={() => onNavigate(nextLesson)}>Bài tiếp theo <Icon name="chevron-right" size={18} /></button>
    </nav>;
}

export default LessonNavigation;
