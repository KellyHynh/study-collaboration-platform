import MyCourses from "./MyCourses/MyCourses";
import RecommendedCourses from "./RecommendedCourses/RecommendedCourses";
import bem from "@/utils/bem";

const b = bem("main-content");
function MainContent() {
    return (
        <main className={b()}>
            <MyCourses />
            <RecommendedCourses />
        </main>
    );
}

export default MainContent;