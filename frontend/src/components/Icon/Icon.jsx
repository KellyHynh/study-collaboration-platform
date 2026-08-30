import ChevronRight from "@/assets/chevron-right.svg?react";
import Course from "@/assets/course.svg?react";
import ListTodo from "@/assets/list-todo.svg?react";
import Message from "@/assets/message.svg?react";
import Calendar from "@/assets/calendar.svg?react";
import Time from "@/assets/time.svg?react";
import Bell from "@/assets/bell.svg?react";
import Close from "@/assets/close.svg?react";
import Star from "@/assets/star.svg?react";
import ChevronLeft from "@/assets/chevron-left.svg?react";
import HelpCircle from "@/assets/help-circle.svg?react";
import Globe from "@/assets/globe.svg?react";

const icons = {
    "chevron-right": ChevronRight,
    "chevron-left": ChevronLeft,
    "help-circle": HelpCircle,
    "globe": Globe,

    "course": Course,
    "list-todo": ListTodo,
    "message": Message,
    "calendar": Calendar,
    "time": Time,
    "bell": Bell,
    "close": Close,
    "star": Star
};

function Icon({ name, size = 20, className, fill }) {
    const SvgIcon = icons[name];
    if (!SvgIcon) return null;

    const extraProps = fill ? { fill } : {};

    return (
        <SvgIcon
            width={size}
            height={size}
            className={className}
            {...extraProps}
        />
    );
}

export default Icon;