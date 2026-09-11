import Icon from "../Icon/Icon";
import bem from "../../utils/bem";
import "./RatingStars.scss";

const b = bem("rating-stars");

function RatingStars({ rating }) {
    const stars = Array.from({ length: 5 });

    return (
        <div
            className={b()}
            aria-label={`${rating} out of 5 stars`}
        >
            <div className={b("icons")}>
                {stars.map((_, index) => {
                    const fill = Math.min(
                        Math.max(rating - index, 0),
                        1
                    ) * 100;

                    return (
                        <span
                            className={b("star")}
                            key={index}
                        >
                            <Icon
                                name="star"
                                size={16}
                                className={b("star-base")}
                                fill="currentColor"
                            />

                            <span
                                className={b("star-fill")}
                                style={{ width: `${fill}%` }}
                            >
                                <Icon name="star" size={16} fill="currentColor"/>
                            </span>
                        </span>
                    );
                })}
            </div>

            <span className={b("value")}>
                {rating.toFixed(1)}
            </span>
        </div>
    );
}

export default RatingStars;