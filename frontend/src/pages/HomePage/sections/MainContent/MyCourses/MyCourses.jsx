import { useState } from "react";
import courses from "@/mocks/data/courses";
import CourseCard from "@/components/CourseCard/CourseCard";
import bem from "@/utils/bem";
import "./MyCourses.scss";
import { useNavigate } from "react-router-dom";

const b = bem("my-courses");
function MyCourses() {
    const [filter, setFilter] = useState("all");

    const navigate = useNavigate();

    const filteredCourses = courses.filter((course) => {
        if (filter === "all") {
            return true;
        }

        if (filter === "in-progress") {
            return course.progress > 0 && course.progress < 100;
        }

        if (filter === "completed") {
            return course.progress === 100;
        }

        return true;
    });

    const displayedCourses = filteredCourses.slice(0, 4);  //hiển thị 4 courses đầu tiên

    return (
        <section className={b()}>
            <div className={b("top")}>
                <div className={b("header")}>
                    <h2>My Courses</h2>
                    <p>{filteredCourses.length} courses you're enrolled in</p>
                </div>

                <div className={b("filters")}>
                    <button
                        className={filter === "all" ? b("filters-active") : ""}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>

                    <button
                        className={filter === "in-progress" ? b("filters-active") : ""}
                        onClick={() => setFilter("in-progress")}
                    >
                        In Progress
                    </button>

                    <button
                        className={filter === "completed" ? b("filters-active") : ""}
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </button>
                </div>
            </div>

            <div className={b("course-list")}>
                {displayedCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        image={course.image}
                        category={course.category}
                        name={course.name}
                        instructor={course.instructor.name}
                        lessons={course.lessons}
                        rating={course.rating}
                        progress={course.progress}
                    />
                ))}
            </div>

            <div className={b("footer")}>
                <button
                    className={b("view-all")}
                    onClick={() => navigate("/courses/my-courses")}
                >
                    View All
                </button>
            </div>
        </section>
    );
}

export default MyCourses;