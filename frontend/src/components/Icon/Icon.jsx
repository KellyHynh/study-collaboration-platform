
import {
    ChevronRight,
    ChevronLeft,
    CircleHelp,
    Globe,
    Search,
    BookOpen,
    ListTodo,
    MessageCircle,
    Calendar,
    Clock,
    Bell,
    X,
    Star,
    Zap,
    Users,
    Play,
    Check,
    Lock,
    Key,
    Plus,
    Edit,
    // Rich Text Editor
    Bold,
    Italic,
    Underline,
    Heading,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link,
    Undo2,
    Redo2,
    Image,
    Tag,
    ChevronUp,
    ChevronDown,
    CircleCheck,
    ListCheck,
    Trash2
} from "lucide-react";

const icons = {
    "chevron-right": ChevronRight,
    "chevron-left": ChevronLeft,
    "chevron-up": ChevronUp,
    "chevron-down": ChevronDown,
    "help-circle": CircleHelp,
    globe: Globe,
    search: Search,
    course: BookOpen,
    "list-todo": ListTodo,
    message: MessageCircle,
    calendar: Calendar,
    time: Clock,
    bell: Bell,
    close: X,
    star: Star,
    zap: Zap,
    users: Users,
    "triangle-right": Play,
    done: CircleCheck,
    done2: Check,
    lock: Lock,
    key: Key,
    plus: Plus,

    // Rich Text Editor
    bold: Bold,
    italic: Italic,
    underline: Underline,
    heading: Heading,
    list: List,
    "list-ordered": ListOrdered,
    "align-left": AlignLeft,
    "align-center": AlignCenter,
    "align-right": AlignRight,
    link: Link,
    undo: Undo2,
    redo: Redo2,
    image: Image,
    tag: Tag,
    "list-check": ListCheck,
    "trash-2": Trash2
};

function Icon({ name, size = 20, className, fill, strokeWidth }) {
    const SvgIcon = icons[name];

    if (!SvgIcon) return null;

    const extraProps = {
        width: size,
        height: size,
        className,
    };

    if (fill !== undefined) {
        extraProps.fill = fill;
    }

    if (strokeWidth !== undefined) {
        extraProps.strokeWidth = strokeWidth;
    }

    return <SvgIcon {...extraProps} />;
}

export default Icon;