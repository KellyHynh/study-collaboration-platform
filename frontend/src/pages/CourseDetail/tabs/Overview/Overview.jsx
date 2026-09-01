import bem from "../../../../utils/bem";
import RichTextRenderer from "@/components/RichTextRenderer/RichTextRenderer";
import Icon from "@/components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import "./Overview.scss";

const b = bem("course-overview");

function Overview({ course, isOwner = false,}) {
    const navigate = useNavigate();

    const hasRequirements =
        course.requirements?.content?.length > 0;

    return (
        <section className={b()}>

            {isOwner && (
                <button
                    type="button"
                    onClick={() =>
                        navigate(`/courses/${course.id}/edit`)
                    }
                >
                    <Icon name="edit" />
                    Chỉnh sửa khóa học
                </button>
            )}

            {/* Description */}
            <section className={b("section")}>
                <h2 className={b("title")}>
                    Mô tả khóa học
                </h2>

                {course.description && (
                    <RichTextRenderer
                        content={course.description}
                    />
                )}
            </section>

                {/* Learning outcomes */}
                {course.learningOutcomes?.length > 0 && (
                    <section className={b("section")}>
                        <h2 className={b("title")}>
                            Học viên sẽ được học
                        </h2>

                        <ul className={b("outcomes")}>
                            {course.learningOutcomes.map((item, index) => (
                                <li
                                    className={b("outcome")}
                                    key={index}
                                >
                                    <span className={b("outcome-icon")}>
                                        <Icon name="done" />
                                    </span>

                                    <span>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

            {/* Requirements */}
            {hasRequirements && (
                <section className={b("section")}>
                    <h2 className={b("title")}>
                        Yêu cầu đầu vào
                    </h2>

                    <RichTextRenderer
                        content={course.requirements}
                    />
                </section>
            )}


            {/* Instructor */}
            <section className={b("section")}>
                <h2 className={b("title")}>
                    Giảng viên
                </h2>

                <div className={b("instructor")}>

                    {course.instructor.avatar ? (
                        <img
                            className={b("instructor-avatar")}
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                        />
                    ) : (
                        <div className={b("instructor-avatar-placeholder")}>
                            <Icon name="users" />
                        </div>
                    )}

                    <div className={b("instructor-content")}>

                        <h3 className={b("instructor-name")}>
                            {course.instructor.name}
                        </h3>

                        <div className={b("instructor-stats")}>
                            <span>
                                <Icon name="users" size={14} />
                                {course.instructor.students?.toLocaleString()}
                                {" "}học viên
                            </span>

                            <span>
                                <Icon name="course" size={14} />
                                {course.instructor.courses}
                                {" "}khóa học
                            </span>
                        </div>

                        <p className={b("instructor-description")}>
                            {course.instructor.description}
                        </p>

                    </div>

                </div>

            </section>

        </section>
    );
}

export default Overview;