import { useNavigate } from "react-router-dom";

import courses from "@/mocks/courses";
import CourseCardMini from "@/components/CourseCardMini/CourseCardMini";
import bem from "@/utils/bem";
import "./RecommendedCourses.scss";

const b = bem("recommended-courses");

function RecommendedCourses({ courses }) {
    const navigate = useNavigate();

    const recommendedCourses = courses
        .filter(
            (course) =>
                course.isPublic &&
                !course.isEnrolled
        )
        .slice(0, 5);

    return (
        <section className={b()}>
            <div className={b("header")}>
                <div>
                    <h2 className={b("title")}>
                        Recommended Courses
                    </h2>

                    <p className={b("description")}>
                        Courses you may be interested in
                    </p>
                </div>
            </div>

            <div className={b("list")}>
                {recommendedCourses.map((course) => (
                    <CourseCardMini
                        key={course.id}
                        course={course}
                    />
                ))}
            </div>

            <div className={b("footer")}>
                <button
                    className={b("view-all")}
                    onClick={() => navigate("/courses/recommended")}
                >
                    View All
                </button>
            </div>
        </section>
    );
}

export default RecommendedCourses;