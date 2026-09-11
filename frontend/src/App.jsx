import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage/HomePage";
import CourseDetail from "@/pages/CourseDetail/CourseDetail";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CourseCreate from "@/pages/CourseCreate/CourseCreate";
// Lesson creation page
import LessonCreate from "@/pages/LessonCreate/LessonCreate";
// Lesson editing page
import LessonEdit from "@/pages/LessonEdit/LessonEdit";
import LessonView from "@/pages/LessonView/LessonView";
import ViewAllCourses from "@/pages/ViewAllCourses/ViewAllCourses";
function App() {
    return (
      <>
        <Header />

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<ViewAllCourses />} />
            <Route path="/courses/my-courses" element={<ViewAllCourses mode="my" />} />
            <Route path="/courses/recommended" element={<ViewAllCourses mode="recommended" />} />
            <Route
                path="/courses/:id"
                element={<CourseDetail />}
            />
            <Route
              path="/courses/:courseId/lessons/:lessonId"
              element={<LessonView />}
            />
            <Route
              path="/courses/create"
              element={<CourseCreate />}
            />
            <Route
              path="/courses/:id/edit"
              element={<CourseCreate mode="edit" />}
            />
            {/* Create lesson */}
            <Route
                path="/courses/:id/chapters/:chapterId/lessons/create"
                element={<LessonCreate />}
            />
            {/* Edit lesson */}
            <Route
                path="/courses/:id/chapters/:chapterId/lessons/:lessonId/edit"
                element={<LessonEdit />}
            />
        </Routes>


        <Footer />
    </>
    );
}

export default App;