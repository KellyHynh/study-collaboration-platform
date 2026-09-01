import { useEffect, useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import {
    createChapter,
    getCourseCurriculum,
    getCourseLessonProgress,
} from "@/services/courseService";
import AddChapterModal from "@/pages/CourseDetail/components/AddChapterModal/AddChapterModal";
import ChapterItem from "@/pages/CourseDetail/components/ChapterItem/ChapterItem";

import bem from "@/utils/bem";
import "./Curriculum.scss";

const b = bem("curriculum");

function Curriculum({ course }) {
    const [curriculum, setCurriculum] = useState(null);
    const [lessonProgress, setLessonProgress] = useState({});

    const [expandedChapters, setExpandedChapters] =
        useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddChapter, setShowAddChapter] =
        useState(false);

    const [creatingChapter, setCreatingChapter] =
        useState(false);

    useEffect(() => {
        async function fetchCurriculumData() {
            try {
                setLoading(true);
                setError(null);

                const [
                    curriculumData,
                    progressData,
                ] = await Promise.all([
                    getCourseCurriculum(course.id),
                    getCourseLessonProgress(course.id),
                ]);

                setCurriculum(curriculumData);

                setLessonProgress(
                    progressData?.lessons || {}
                );

                const firstChapter =
                    curriculumData?.chapters?.[0];

                if (firstChapter) {
                    setExpandedChapters({
                        [firstChapter.id]: true,
                    });
                } else {
                    setExpandedChapters({});
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCurriculumData();
            }, [course.id]);

            async function handleCreateChapter(title) {
            try {
                setCreatingChapter(true);

                const newChapter = await createChapter(
                    course.id,
                    title
                );

                setCurriculum((current) => ({
                    ...current,

                    chapters: [
                        ...current.chapters,
                        newChapter,
                    ],
                }));

                setExpandedChapters((current) => ({
                    ...current,
                    [newChapter.id]: true,
                }));

                setShowAddChapter(false);
            } catch (error) {
                setError(error.message);
            } finally {
                setCreatingChapter(false);
            }
        }

    function handleToggleChapter(chapterId) {
        setExpandedChapters((current) => ({
            ...current,
            [chapterId]: !current[chapterId],
        }));
    }

    if (loading) {
        return (
            <section className={b()}>
                <p>Loading curriculum...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={b()}>
                <p>{error}</p>
            </section>
        );
    }

    if (
        !curriculum ||
        !curriculum.chapters?.length
    ) {
        return (
            <section className={b()}>
                <p>Chưa có bài giảng.</p>
            </section>
        );
    }

    return (
        <section className={b()}>

            <div className={b("header")}>
                <h2 className={b("title")}>
                    Bài giảng
                </h2>

                {course.isOwner && (
                    <button
                        type="button"
                        className={b("add-chapter")}
                        onClick={() =>
                            setShowAddChapter(true)
                        }
                    >
                        <Icon name="plus" />
                        Thêm chương
                    </button>
                )}
            </div>

            <div className={b("chapters")}>

                {curriculum.chapters.map((chapter) => (
                    <ChapterItem
                        key={chapter.id}
                        chapter={chapter}
                        isExpanded={
                            !!expandedChapters[chapter.id]
                        }
                        onToggle={() =>
                            handleToggleChapter(
                                chapter.id
                            )
                        }
                        lessonProgress={lessonProgress}
                        courseId={course.id}
                        isOwner={course.isOwner}
                    />
                ))}

            </div>
            {showAddChapter && (
                <AddChapterModal
                    onClose={() =>
                        setShowAddChapter(false)
                    }
                    onSubmit={handleCreateChapter}
                    loading={creatingChapter}
                />
            )}

        </section>
    );
}

export default Curriculum;
