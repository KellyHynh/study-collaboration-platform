import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import CourseCard from "@/components/CourseCard/CourseCard";
import SideMenu from "@/pages/HomePage/sections/SideMenu";
import { getCategories, getCourses } from "@/services/courseService";
import bem from "@/utils/bem";
import "./ViewAllCourses.scss";

const b = bem("view-all-courses");

function CourseState({ children }) {
    return <div className={b("state")}>{children}</div>;
}

function ViewAllCourses({ mode = "all" }) {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        Promise.all([getCourses(), getCategories()])
            .then(([courseData, categoryData]) => {
                if (!active) return;
                setCourses(courseData);
                setCategories(categoryData);
            })
            .catch((loadError) => {
                if (active) setError(loadError.message);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const visibleCourses = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return courses.filter((course) => {
            const matchesMode = mode === "my" ? course.isEnrolled : true;
            const matchesSearch = !normalizedSearch
                || course.title.toLowerCase().includes(normalizedSearch);
            const matchesCategory = category === "All"
                || course.category === category;

            return matchesMode && matchesSearch && matchesCategory;
        });
    }, [category, courses, mode, search]);

    const title = mode === "my" ? "My Courses" : "Explore Courses";
    const description = mode === "my"
        ? "Keep learning from the courses you have joined."
        : "Find a course that gives your next idea somewhere to go.";

    return (
        <div className={b()}>
            <main className={b("layout")}>
                <aside className={b("sidebar")}>
                    <SideMenu />
                </aside>

                <section className={b("content")}>
                    <header className={b("intro")}>
                        <p className={b("eyebrow")}>KnoVerse library</p>
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </header>

                    <div className={b("toolbar")}>
                        <label className={b("search")}>
                            <Search size={18} aria-hidden="true" />
                            <span className="sr-only">Search courses by title</span>
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search courses by title"
                            />
                        </label>

                        <div className={b("filters")} aria-label="Course categories">
                            <button
                                type="button"
                                className={category === "All" ? b("filter", { active: true }) : b("filter")}
                                onClick={() => setCategory("All")}
                            >
                                All
                            </button>
                            {categories.map((item) => (
                                <button
                                    type="button"
                                    className={category === item.name ? b("filter", { active: true }) : b("filter")}
                                    key={item.id}
                                    onClick={() => setCategory(item.name)}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading && <CourseState>Loading courses...</CourseState>}
                    {!loading && error && <CourseState>{error}</CourseState>}
                    {!loading && !error && visibleCourses.length === 0 && (
                        <CourseState>
                            <h2>{mode === "my" ? "No joined courses yet" : "No courses found"}</h2>
                            <p>Try another search or category.</p>
                        </CourseState>
                    )}
                    {!loading && !error && visibleCourses.length > 0 && (
                        <div className={b("grid")}>
                            {visibleCourses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    id={course.id}
                                    thumbnailUrl={course.thumbnailUrl}
                                    category={course.category}
                                    title={course.title}
                                    instructor={course.instructor.name}
                                    lessons={course.lessons}
                                    rating={course.rating}
                                    progress={course.progress}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default ViewAllCourses;
