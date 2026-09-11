import Icon from "../../../../components/Icon/Icon";

import bem from "../../../../utils/bem";
import "./CourseActions.scss";

const b = bem("course-actions");

function CourseActions() {
    return (
        <div className={b()}>

            <button
                type="button"
                className={b("button")}
            >
                <Icon name="bookmark" />
                <span>Lưu</span>
            </button>

            <button
                type="button"
                className={b("button")}
            >
                <Icon name="share-2" />
                <span>Chia sẻ</span>
            </button>

        </div>
    );
}

export default CourseActions;