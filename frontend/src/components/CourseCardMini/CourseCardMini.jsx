import { useNavigate } from "react-router-dom";
import Icon from "../Icon/Icon";

import RatingStars from "../RatingStars/RatingStars";
import bem from "../../utils/bem";
import "./CourseCardMini.scss";

const b = bem("course-card-mini");

function CourseCardMini({ course }) {
    const navigate = useNavigate();

    const {
        id,
        image,
        name,
        instructor,
        rating,
        students
    } = course;

    const handleClick = () => {
        navigate(`/courses/${id}`);
    };

    return (
        <article
            className={b()}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    handleClick();
                }
            }}
        >
            <img
                className={b("image")}
                src={image}
                alt={name}
            />

            <div className={b("content")}>
                <h3 className={b("name")}>
                    {name}
                </h3>

                <p className={b("instructor")}>
                    {instructor}
                </p>

                <div className={b("meta")}>
                    <RatingStars rating={rating} />

                    <span className={b("students")}>
                        {students?.toLocaleString()} học viên
                    </span>
                </div>
            </div>

            <Icon name="chevron-right" className={b("arrow")} />
        </article>
    );
}

export default CourseCardMini;