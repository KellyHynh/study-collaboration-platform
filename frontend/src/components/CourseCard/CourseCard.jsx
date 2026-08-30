import bem from "@/utils/bem";
import "./CourseCard.scss";
import { useNavigate } from "react-router-dom";

const b = bem("course-card");

function CourseCard({
    id,
    image,
    category,
    name,
    instructor,
    lessons,
    rating,
    progress
}) {
    const navigate = useNavigate();

    let status;
    

    if (progress === 0) {
        status = "New";
    } else if (progress < 100) {
        status = "In Progress";
    } else {
        status = "Completed";
    }

    const handleClick = () => {
        navigate(`/courses/${id}`);
    };

    return (
        <article className={b()} onClick={handleClick}>
            <div className={b("image")}>
                <img src={image} alt={name} />

                <span className={b("status")}>
                    {status}
                </span>
                <span
                    className={b("status", {
                        completed: progress === 100
                    })}
                >
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
                            className={b("progress-bar-fill", {
                                completed: progress === 100
                            })}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

            </div>

        </article>
    );
}

export default CourseCard;