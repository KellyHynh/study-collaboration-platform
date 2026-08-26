import { useState } from "react";
import courses from "@/mocks/courses";
import CourseCard from "@/components/CourseCard/CourseCard";
import bem from "@/utils/bem";

const b = bem("my-courses");
function MyCourses() {
    const [filter, setFilter] = useState("all");

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

    return (
        <section className={b()}>
            <div className={b("header")}>
                <h2>My Courses</h2>
                <p>{filteredCourses.length} courses you're enrolled in</p>
            </div>

            <div className={b("filters")}>
                <button onClick={() => setFilter("all")}>
                    All
                </button>

                <button onClick={() => setFilter("in-progress")}>
                    In Progress
                </button>

                <button onClick={() => setFilter("completed")}>
                    Completed
                </button>
            </div>

            <div className={b("course-list")}>
                {filteredCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        image={course.image}
                        category={course.category}
                        name={course.name}
                        instructor={course.instructor}
                        lessons={course.lessons}
                        rating={course.rating}
                        progress={course.progress}
                    />
                ))}
            </div>

            <button className="view-all">
                View All
            </button>
        </section>
    );
}

export default MyCourses;