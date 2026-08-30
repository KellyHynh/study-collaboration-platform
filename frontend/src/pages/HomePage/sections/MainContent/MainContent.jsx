import MyCourses from "./MyCourses/MyCourses";
import RecommendedCourses from "./RecommendedCourses/RecommendedCourses";
import bem from "@/utils/bem";
import courses from "@/mocks/courses";
import "./MainContent.scss";

const b = bem("main-content");
function MainContent() {
    return (
        <main className={b()}>
            <MyCourses />
            <RecommendedCourses courses={courses}/>
        </main>
    );
}

export default MainContent;