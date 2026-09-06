import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    getCourseById,
    getCourseCurriculum,
    updateLesson,
} from "@/services/courseService";

import LessonForm from "@/pages/CourseDetail/components/LessonForm/LessonForm";

import bem from "@/utils/bem";

const b = bem("lesson-edit");

function LessonEdit() {
    const {
        id,
        chapterId,
        lessonId,
    } = useParams();

    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [lesson, setLesson] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                // Get course information
                const courseData =
                    await getCourseById(id);

                // Get curriculum separately from course data
                const curriculumData =
                    await getCourseCurriculum(id);

                // Find the chapter selected from the route
                const selectedChapter =
                    curriculumData.chapters?.find(
                        (item) =>
                            String(item.id) ===
                            String(chapterId)
                    );

                if (!selectedChapter) {
                    throw new Error(
                        "Không tìm thấy chương."
                    );
                }

                // Find the lesson selected from the route
                const selectedLesson =
                    selectedChapter.lessons?.find(
                        (item) =>
                            String(item.id) ===
                            String(lessonId)
                    );

                if (!selectedLesson) {
                    throw new Error(
                        "Không tìm thấy bài giảng."
                    );
                }

                setCourse(courseData);
                setChapter(selectedChapter);
                setLesson(selectedLesson);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [
        id,
        chapterId,
        lessonId,
    ]);

    // Return to course detail
    function handleCancel() {
        navigate(`/courses/${id}?tab=curriculum`);
    }

    // Handle lesson update
    async function handleSubmit(formData) {
        try {
            setError(null);

            // Update lesson through the service layer
            await updateLesson(
                id,
                chapterId,
                lessonId,
                formData
            );

            // Return to course detail after update
            navigate(`/courses/${id}?tab=curriculum`);
        } catch (error) {
            // Show update error
            setError(error.message);
        }
    }

    if (loading) {
        return (
            <main className={b()}>
                <p>Loading...</p>
            </main>
        );
    }

    if (
        error ||
        !course ||
        !chapter ||
        !lesson
    ) {
        return (
            <main className={b()}>
                <p>
                    {error ||
                        "Không tìm thấy bài giảng."}
                </p>
            </main>
        );
    }

    return (
        <main className={b()}>

            <LessonForm
                course={course}
                chapter={chapter}
                lesson={lesson}
                mode="edit"
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />

        </main>
    );
}

export default LessonEdit;