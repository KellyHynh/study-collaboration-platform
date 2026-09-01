import Icon from "../../../../components/Icon/Icon";

import bem from "../../../../utils/bem";
import "./EnrollmentCard.scss";

const b = bem("enrollment-card");

function EnrollmentCard({ course, enrollment }) {
    const isEnrolled = Boolean(enrollment);

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

            {isEnrolled ? (
                <div className={b("content")}>

                    <div className={b("status")}>
                        <Icon name="circle-check" />

                        <span>
                            Đã đăng ký tham gia khóa học
                        </span>
                    </div>

                    <div className={b("progress")}>
                        <div className={b("progress-info")}>
                            <span>
                                {enrollment.completedLessons}/
                                {course.lessons} bài hoàn thành
                            </span>

                            <span>
                                {enrollment.progress}%
                            </span>
                        </div>

                        <div className={b("progress-bar")}>
                            <div
                                className={b("progress-value")}
                                style={{
                                    width: `${enrollment.progress}%`
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        className={b("button")}
                    >
                        <Icon name="triangle-right" size={20} />
                        Tiếp tục học
                    </button>

                </div>
            ) : (
                <div className={b("content")}>

                    <h3 className={b("title")}>
                        Đăng ký để truy cập toàn bộ khóa học
                    </h3>

                    <p className={b("description")}>
                        Truy cập toàn bộ {course.lessons} bài giảng
                        và tài liệu của khóa học.
                    </p>

                    <button
                        type="button"
                        className={b("button")}
                    >
                        Đăng ký tham gia khóa học
                    </button>

                </div>
            )}

        </section>
    );
}

export default EnrollmentCard;