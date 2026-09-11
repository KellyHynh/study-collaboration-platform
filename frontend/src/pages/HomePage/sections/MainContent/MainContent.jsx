import { useEffect, useState } from "react";
import MyCourses from "./MyCourses/MyCourses";
import RecommendedCourses from "./RecommendedCourses/RecommendedCourses";
import bem from "@/utils/bem";
import { getCourses } from "@/services/courseService";
import "./MainContent.scss";
import QuickActions from "./QuickActions/QuickActions";
const b = bem("main-content");
function MainContent() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCourses()
            .then(setCourses)
            .catch((loadError) => setError(loadError.message));
    }, []);

    return (
        <main className={b()}>
            <QuickActions />
            {error ? <p>{error}</p> : <>
                <MyCourses courses={courses} />
                <RecommendedCourses courses={courses} />
            </>}
        </main>
    );
}

export default MainContent;