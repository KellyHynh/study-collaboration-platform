import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getCourseById,
    getCourseEnrollment
} from "../../services/courseService";

import CourseHero from "./components/CourseHero/CourseHero";
import CourseTabs from "./components/CourseTabs/CourseTabs";
import EnrollmentCard from "./components/EnrollmentCard/EnrollmentCard";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CourseActions from "./components/CourseActions/CourseActions";

import Overview from "./tabs/Overview/Overview";
import Curriculum from "./tabs/Curriculum/Curriculum";
import Materials from "./tabs/Materials/Materials";
import Discussion from "./tabs/Discussion/Discussion";

import bem from "../../utils/bem";
import "./CourseDetail.scss";

const b = bem("course-detail");

function CourseDetail() {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCourseDetail() {
            try {
                const [courseData, enrollmentData] = await Promise.all([
                    getCourseById(id),
                    getCourseEnrollment(id)
                ]);

                setCourse(courseData);
                setEnrollment(enrollmentData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCourseDetail();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main className={b()}>

            <CourseHero
                course={course}
                enrollment={enrollment}
            />

            <section className={b("content")}>

                <div className={b("main")}>

                    <CourseTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        lessonCount={course.lessons}
                    />

                    <div className={b("tab-content")}>

                        {activeTab === "overview" && (
                            <Overview course={course}
                            isOwner={course.isOwner} />
                        )}

                        {activeTab === "curriculum" && (
                            <Curriculum course={course} />
                        )}

                        {activeTab === "materials" && (
                            <Materials course={course} />
                        )}

                        {activeTab === "discussion" && (
                            <Discussion course={course} />
                        )}

                    </div>

                </div>

                <aside className={b("sidebar")}>

                    <EnrollmentCard
                        course={course}
                        enrollment={enrollment}
                    />

                    <CourseInfo course={course} />

                    <CourseActions />

                </aside>

            </section>

        </main>
    );
}

export default CourseDetail;