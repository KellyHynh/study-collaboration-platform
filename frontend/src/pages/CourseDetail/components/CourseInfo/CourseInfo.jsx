import bem from "../../../../utils/bem";
import "./CourseInfo.scss";
import Icon from "@/components/Icon/Icon";
const b = bem("course-info");

function CourseInfo({ course }) {
    const items = [
        {
            icon: "time",
            label: "Thời lượng",
            value: course.duration
        },
        {
            icon: "course",
            label: "Bài giảng",
            value: course.lessons
        },
        {
            icon: "zap",
            label: "Trình độ",
            value: course.level
        },
        {
            icon: "globe",
            label: "Ngôn ngữ",
            value: course.language
        },
        {
            icon: "users",
            label: "Số học viên",
            value: course.students?.toLocaleString()
        }
    ];

    return (
        <section className={b()}>

            <h2 className={b("title")}>
                Thông tin khóa học
            </h2>

            <div className={b("list")}>
                {items.map((item) => (
                    <div
                        key={item.label}
                        className={b("item")}
                    >
                        
                        <span>
                            <Icon
                                name={item.icon}
                                size={20}
                            />
                            {item.label}
                        </span>
                        <strong>{item.value}</strong>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default CourseInfo;