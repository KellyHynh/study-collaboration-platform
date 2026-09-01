import MyCourses from "./MyCourses/MyCourses";
import RecommendedCourses from "./RecommendedCourses/RecommendedCourses";
import bem from "@/utils/bem";
import courses from "@/mocks/data/courses";
import "./MainContent.scss";
import QuickActions from "./QuickActions/QuickActions";
const b = bem("main-content");
function MainContent() {
    return (
        <main className={b()}>
            <QuickActions />
            <MyCourses />
            <RecommendedCourses courses={courses}/>
        </main>
    );
}

export default MainContent;