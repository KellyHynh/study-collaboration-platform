import bem from "@/utils/bem";

const b = bem("course-card");

function CourseCard({
    image,
    category,
    name,
    instructor,
    lessons,
    rating,
    progress
}) {
    let status;

    if (progress === 0) {
        status = "New";
    } else if (progress < 100) {
        status = "In Progress";
    } else {
        status = "Completed";
    }

    return (
        <article className={b()}>
            <div className={b("image")}>
                <img src={image} alt={name} />

                <span className={b("status")}>
                    {status}
                </span>
            </div>

            <div className={b("info")}>

                <p className={b("category")}>
                    {category}
                </p>

                <h3 className={b("name")}>
                    {name}
                </h3>

                <p className={b("instructor")}>
                    By {instructor}
                </p>

                <div className={b("meta")}>
                    <span>{lessons} lessons</span>
                    <span>⭐ {rating}</span>
                </div>

                <div className={b("progress")}>
                    <div className={b("progress-header")}>
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>

                    <div className={b("progress-bar")}>
                        <div
                            className={b("progress-bar-fill")}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

            </div>

        </article>
    );
}

export default CourseCard;