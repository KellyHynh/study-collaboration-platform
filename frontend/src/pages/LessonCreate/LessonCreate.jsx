import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    getCourseById,
    getCourseCurriculum,
    createLesson,
} from "@/services/courseService";

import LessonForm from "@/pages/CourseDetail/components/LessonForm/LessonForm";

import bem from "@/utils/bem";
import "./LessonCreate.scss";

const b = bem("lesson-create");

function LessonCreate() {
    const { id, chapterId } = useParams();

    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [chapter, setChapter] = useState(null);

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

                setCourse(courseData);

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

                setChapter(selectedChapter);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id, chapterId]);

    // Return to course detail
    function handleCancel() {
        navigate(`/courses/${id}?tab=curriculum`);
    }

    // Handle lesson creation
    async function handleSubmit(formData) {
        try {
            setError(null);

            // Create lesson through the service layer
            await createLesson(
                id,
                chapterId,
                formData
            );

            // Return to course detail after creation
            navigate(`/courses/${id}?tab=curriculum`);
        } catch (error) {
            // Show creation error
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

    if (error || !course || !chapter) {
        return (
            <main className={b()}>
                <p>
                    {error ||
                        "Không tìm thấy chương."}
                </p>
            </main>
        );
    }

    return (
        <main className={b()}>

            <LessonForm
                course={course}
                chapter={chapter}
                mode="create"
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />

        </main>
    );
}

export default LessonCreate;