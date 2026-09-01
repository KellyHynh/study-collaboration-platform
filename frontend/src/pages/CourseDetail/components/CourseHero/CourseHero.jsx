import Icon from "../../../../components/Icon/Icon";
import RatingStars from "../../../../components/RatingStars/RatingStars";

import bem from "../../../../utils/bem";
import "./CourseHero.scss";

const b = bem("course-hero");

function CourseHero({ course, enrollment }) {
    const isCompleted = enrollment?.progress === 100;

    return (
        <section className={b()}>

            {course.image ? (
                <img
                    className={b("image")}
                    src={course.image}
                    alt={course.name}
                />
            ) : (
                <div className={b("image-placeholder")}>
                    <Icon name="course" />
                </div>
            )}

            <div className={b("overlay")}>

                <div className={b("tags")}>

                    <span className={b("tag")}>
                        {course.category}
                    </span>

                    {course.tags?.map((tag) => (
                        <span
                            key={tag}
                            className={b("tag")}
                        >
                            {tag}
                        </span>
                    ))}

                    {enrollment && (
                        <span className={b("status")}>
                            <Icon
                                name={
                                    isCompleted
                                        ? "circle-check"
                                        : "clock"
                                }
                            />

                            {isCompleted
                                ? "Completed"
                                : "In Progress"}
                        </span>
                    )}

                </div>

                <h1 className={b("title")}>
                    {course.name}
                </h1>

                <div className={b("meta")}>

                    <div className={b("rating")}>
                        <RatingStars rating={course.rating} />

                        <span>
                            {course.rating}
                        </span>
                    </div>

                    <span>
                        <Icon name="users" size={16} />
                        {course.students?.toLocaleString()} học viên
                    </span>

                    <span>
                        <Icon name="time" size={16} />
                        {course.duration}
                    </span>

                    <span>
                        <Icon name="zap" size={16} />
                        {course.level}
                    </span>

                </div>

            </div>

        </section>
    );
}

export default CourseHero;