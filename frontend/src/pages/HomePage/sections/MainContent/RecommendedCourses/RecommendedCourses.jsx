import React from "react";
import bem from "@/utils/bem";

const b = bem("recommended-courses");

function RecommendedCourses() {
    return (
        <section className={b()}>
            <h2>Recommended Courses</h2>
        </section>
    );
}

export default RecommendedCourses;