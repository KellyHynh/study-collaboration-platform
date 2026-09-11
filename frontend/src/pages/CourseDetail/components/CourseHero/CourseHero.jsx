import Icon from "../../../../components/Icon/Icon";
import RatingStars from "../../../../components/RatingStars/RatingStars";

import bem from "../../../../utils/bem";
import "./CourseHero.scss";

const b = bem("course-hero");

function CourseHero({ course, enrollment }) {
    const isCompleted = enrollment?.completedAt != null;

    return (
        <section className={b()}>

            {course.thumbnailUrl ? (
                <img
                    className={b("image")}
                    src={course.thumbnailUrl}
                    alt={course.title}
                />
            ) : (
                <div className={b("image-placeholder")}>
                    <Icon name="course" />
                </div>
            )}

            <div className={b("overlay")}>

                <div className={b("tags")}>

                    <span className={b("tag")}>
                        {course.category?.name || course.categoryId}
                    </span>

                    {Array.isArray(course.tags) &&
                        course.tags.map((tag) => (
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
                    {course.title}
                </h1>

                <div className={b("meta")}>

                    {course.rating !== undefined && (
                        <div className={b("rating")}>
                            <RatingStars
                                rating={course.rating}
                            />

                            <span>
                                {course.rating}
                            </span>
                        </div>
                    )}

                    {course.students !== undefined && (
                        <span>
                            <Icon name="users" size={16} />
                            {course.students.toLocaleString()} học viên
                        </span>
                    )}

                    {course.duration && (
                        <span>
                            <Icon name="time" size={16} />
                            {course.duration}
                        </span>
                    )}

                    {course.level && (
                        <span>
                            <Icon name="zap" size={16} />
                            {course.level}
                        </span>
                    )}

                </div>

            </div>

        </section>
    );
}

export default CourseHero;
