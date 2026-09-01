import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage/HomePage";
import CourseDetail from "@/pages/CourseDetail/CourseDetail";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CourseCreate from "@/pages/CourseCreate/CourseCreate";
// Lesson creation page
import LessonCreate from "@/pages/LessonCreate/LessonCreate";

function App() {
    return (
      <>
        <Header />

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
                path="/courses/:id"
                element={<CourseDetail />}
            />
            <Route
              path="/courses/create"
              element={<CourseCreate />}
            />
            <Route
              path="/courses/:id/edit"
              element={<CourseCreate mode="edit" />}
            />
            // Create lesson
            <Route
                path="/courses/:id/chapters/:chapterId/lessons/create"
                element={<LessonCreate />}
            />
        </Routes>


        <Footer />
    </>
    );
}

export default App;