import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCourse, getCourseById, updateCourse } from "@/services/courseService";
import bem from "@/utils/bem";
import Icon from "@/components/Icon/Icon";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";

import "./CourseCreate.scss";

const b = bem("course-create");

const categories = [
    {
        value: "Programming",
        label: "Lập trình",
    },
    {
        value: "Engineering",
        label: "Engineering",
    },
    {
        value: "Design",
        label: "Design",
    },
    {
        value: "Data",
        label: "Data",
    },
    {
        value: "Business",
        label: "Business",
    },
    {
        value: "Language",
        label: "Language",
    },
    {
        value: "Other",
        label: "Khác",
    },
];

const levels = [
    {
        value: "Beginner",
        label: "Người mới bắt đầu",
    },
    {
        value: "Intermediate",
        label: "Trung cấp",
    },
    {
        value: "Advanced",
        label: "Nâng cao",
    },
];

function CourseCreate({ mode = "create" }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = mode === "edit";
    const [course, setCourse] = useState({
        image: "",
        name: "",
        category: "",
        customCategory: "",
        level: "",
        tags: [],
        description: null,
        learningOutcomes: [""],
        requirements: [""],
        isPublic: true,
    });

    const [tagInput, setTagInput] = useState("");

    const handleCancel = () => {
        if (isEdit && id) {
            navigate(`/courses/${id}`);
            return;
        }

        navigate("/");
    };

    const updateField = (field, value) => {
        setCourse((current) => ({
            ...current,
            [field]: value,
        }));
    };

    useEffect(() => {
        if (!isEdit || !id) return;

        const loadCourse = async () => {
            try {
                const data = await getCourseById(id);

                setCourse({
                    image: data.image || "",
                    name: data.name || "",
                    category: data.category || "",
                    customCategory: "",
                    level: data.level || "",
                    tags: data.tags || [],
                    description: data.description || null,
                    learningOutcomes:
                        data.learningOutcomes?.length
                            ? data.learningOutcomes
                            : [""],
                    requirements:
                        data.requirements?.length
                            ? data.requirements
                            : [""],
                    isPublic:
                        data.isPublic ?? true,
                });
            } catch (error) {
                console.error(
                    "Failed to load course:",
                    error
                );
            }
        };

        loadCourse();
    }, [isEdit, id]);
    // ----- Cover -----

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        updateField("image", imageUrl);
    };

    // ----- Tags -----

    const handleTagKeyDown = (event) => {
        if (event.key !== "Enter") return;

        event.preventDefault();

        const value = tagInput.trim();

        if (!value) return;

        const alreadyExists = course.tags.some(
            (tag) =>
                tag.toLowerCase() === value.toLowerCase()
        );

        if (alreadyExists) {
            setTagInput("");
            return;
        }

        setCourse((current) => ({
            ...current,
            tags: [...current.tags, value],
        }));

        setTagInput("");
    };

    const removeTag = (tagToRemove) => {
        setCourse((current) => ({
            ...current,
            tags: current.tags.filter(
                (tag) => tag !== tagToRemove
            ),
        }));
    };

    // ----- List fields -----

    const updateListItem = (field, index, value) => {
        setCourse((current) => {
            const values = [...current[field]];

            values[index] = value;

            return {
                ...current,
                [field]: values,
            };
        });
    };

    const addListItem = (field) => {
        setCourse((current) => ({
            ...current,
            [field]: [...current[field], ""],
        }));
    };

    const removeListItem = (field, index) => {
        setCourse((current) => {
            const values = current[field].filter(
                (_, itemIndex) => itemIndex !== index
            );

            return {
                ...current,
                [field]: values.length ? values : [""],
            };
        });
    };

    // ----- Submit -----

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!course.name.trim()) {
            return;
        }

        const payload = {
            ...course,

            category:
                course.category === "Other"
                    ? course.customCategory.trim()
                    : course.category,

            learningOutcomes:
                course.learningOutcomes
                    .map((item) => item.trim())
                    .filter(Boolean),

            requirements:
                course.requirements
                    .map((item) => item.trim())
                    .filter(Boolean),
        };

        try {
            if (isEdit) {
                await updateCourse(id, payload);
            } else {
                const createdCourse =
                    await createCourse(payload);

                navigate(
                    `/courses/${createdCourse.id}`
                );

                return;
            }

            navigate(`/courses/${id}`);
        } catch (error) {
            console.error(
                isEdit
                    ? "Update course failed:"
                    : "Create course failed:",
                error
            );
        }
    };

    return (
        <main className={b()}>

            {/* Header */}

            <header className={b("header")}>

                <button
                    type="button"
                    className={b("back")}
                    onClick={handleCancel}
                >
                    <Icon name="chevron-left" />
                    Quay lại
                </button>

                <span className={b("divider")}>
                    |
                </span>

                <h1 className={b("title")}>
                    {isEdit
                        ? "Chỉnh sửa khóa học"
                        : "Tạo khóa học mới"}
                </h1>

            </header>


            <form
                className={b("form")}
                onSubmit={handleSubmit}
            >

                {/* ================= COVER ================= */}

                <section className={b("section")}>

                    <div className={b("section-header")}>
                        <h2 className={b("section-title")}>
                            Ảnh bìa khóa học
                        </h2>
                    </div>

                    <label className={b("cover-upload")}>

                        {course.image ? (
                            <img
                                className={b("cover-preview")}
                                src={course.image}
                                alt="Ảnh bìa khóa học"
                            />
                        ) : (
                            <>
                                <Icon name="image" />

                                <span>
                                    Nhấn để tải ảnh bìa lên
                                </span>

                                <small>
                                    JPG, PNG hoặc WEBP
                                </small>
                            </>
                        )}

                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                        />

                    </label>

                </section>


                {/* ================= BASIC INFORMATION ================= */}

                <section className={b("section")}>

                    <div className={b("section-header")}>
                        <h2 className={b("section-title")}>
                            Thông tin khóa học
                        </h2>
                    </div>


                    {/* Name */}

                    <div className={b("field")}>

                        <label htmlFor="course-name">
                            Tên khóa học
                            <span className={b("required")}>
                                *
                            </span>
                        </label>

                        <input
                            id="course-name"
                            type="text"
                            value={course.name}
                            onChange={(event) =>
                                updateField(
                                    "name",
                                    event.target.value
                                )
                            }
                            placeholder="Ví dụ: TypeScript Nâng cao – Từ cơ bản đến chuyên sâu"
                        />

                    </div>


                    <div className={b("row")}>

                        {/* Category */}

                        <div className={b("field")}>

                            <label htmlFor="course-category">
                                Danh mục
                            </label>

                            <select
                                id="course-category"
                                value={course.category}
                                onChange={(event) =>
                                    updateField(
                                        "category",
                                        event.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Chọn danh mục
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.label}
                                    </option>
                                ))}
                            </select>

                            {course.category === "Other" && (
                                <input
                                    type="text"
                                    value={course.customCategory}
                                    onChange={(event) =>
                                        updateField(
                                            "customCategory",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Nhập danh mục..."
                                />
                            )}

                        </div>


                        {/* Level */}

                        <div className={b("field")}>

                            <label htmlFor="course-level">
                                Trình độ
                            </label>

                            <select
                                id="course-level"
                                value={course.level}
                                onChange={(event) =>
                                    updateField(
                                        "level",
                                        event.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Chọn trình độ
                                </option>

                                {levels.map((level) => (
                                    <option
                                        key={level.value}
                                        value={level.value}
                                    >
                                        {level.label}
                                    </option>
                                ))}
                            </select>

                        </div>

                    </div>


                    {/* Tags */}

                    <div className={b("field")}>

                        <label htmlFor="course-tags">
                            Tag / Nhãn
                        </label>

                        <div className={b("input-icon")}>

                            <Icon name="tag" />

                            <input
                                id="course-tags"
                                type="text"
                                value={tagInput}
                                onChange={(event) =>
                                    setTagInput(
                                        event.target.value
                                    )
                                }
                                onKeyDown={handleTagKeyDown}
                                placeholder="Nhập tag và nhấn Enter..."
                            />

                        </div>


                        {course.tags.length > 0 && (
                            <div className={b("tags")}>

                                {course.tags.map((tag) => (
                                    <span
                                        className={b("tag")}
                                        key={tag}
                                    >
                                        {tag}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeTag(tag)
                                            }
                                            aria-label={`Xóa tag ${tag}`}
                                        >
                                            <Icon name="x" />
                                        </button>
                                    </span>
                                ))}

                            </div>
                        )}

                    </div>

                </section>


                {/* ================= DESCRIPTION ================= */}

                <section className={b("section")}>

                    <div className={b("section-header")}>

                        <h2 className={b("section-title")}>
                            Mô tả khóa học
                        </h2>

                        <p className={b("section-description")}>
                            Giới thiệu chi tiết về nội dung và lợi ích
                            của khóa học.
                        </p>

                    </div>

                    <div className={b("editor")}>

                        <RichTextEditor
                            value={course.description}
                            onChange={(value) =>
                                updateField(
                                    "description",
                                    value
                                )
                            }
                        />

                    </div>

                </section>


                {/* ================= LEARNING OUTCOMES ================= */}

                <section className={b("section")}>

                    <div className={b("section-header")}>

                        <div>
                            <h2 className={b("section-title")}>
                                Học viên sẽ được học
                            </h2>

                            <p className={b("section-description")}>
                                Thêm những kiến thức hoặc kỹ năng
                                học viên sẽ đạt được.
                            </p>
                        </div>

                        <button
                            type="button"
                            className={b("add-link")}
                            onClick={() =>
                                addListItem(
                                    "learningOutcomes"
                                )
                            }
                        >
                            <Icon name="plus" />
                            Thêm
                        </button>

                    </div>


                    <div className={b("list")}>

                        {course.learningOutcomes.map(
                            (item, index) => (
                                <div
                                    className={b("list-item")}
                                    key={index}
                                >

                                    <span
                                        className={b("icon-done")}
                                    >
                                        <Icon name="done" />
                                    </span>

                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(event) =>
                                            updateListItem(
                                                "learningOutcomes",
                                                index,
                                                event.target.value
                                            )
                                        }
                                        placeholder={`Mục tiêu ${index + 1}...`}
                                    />

                                    {course.learningOutcomes.length >
                                        1 && (
                                        <button
                                            type="button"
                                            className={b("remove-item")}
                                            onClick={() =>
                                                removeListItem(
                                                    "learningOutcomes",
                                                    index
                                                )
                                            }
                                            aria-label="Xóa mục tiêu"
                                        >
                                            <Icon name="close" />
                                        </button>
                                    )}

                                </div>
                            )
                        )}

                    </div>

                </section>


                {/* ================= REQUIREMENTS ================= */}

                <section className={b("section")}>

                    <div className={b("section-header")}>

                        <div>
                            <h2 className={b("section-title")}>
                                Yêu cầu đầu vào
                            </h2>

                            <p className={b("section-description")}>
                                Những kiến thức hoặc điều kiện cần
                                có trước khi tham gia khóa học.
                            </p>
                        </div>

                        <button
                            type="button"
                            className={b("add-link")}
                            onClick={() =>
                                addListItem(
                                    "requirements"
                                )
                            }
                        >
                            <Icon name="plus" />
                            Thêm
                        </button>

                    </div>


                    <div className={b("list")}>

                        {course.requirements.map(
                            (item, index) => (
                                <div
                                    className={b("list-item")}
                                    key={index}
                                >

                                    <span
                                        className={b("icon-dot")}
                                    />

                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(event) =>
                                            updateListItem(
                                                "requirements",
                                                index,
                                                event.target.value
                                            )
                                        }
                                        placeholder={`Yêu cầu ${index + 1}...`}
                                    />

                                    {course.requirements.length >
                                        1 && (
                                        <button
                                            type="button"
                                            className={b("remove-item")}
                                            onClick={() =>
                                                removeListItem(
                                                    "requirements",
                                                    index
                                                )
                                            }
                                            aria-label="Xóa yêu cầu"
                                        >
                                            <Icon name="close" />
                                        </button>
                                    )}

                                </div>
                            )
                        )}

                    </div>

                </section>


                {/* ================= ACCESS ================= */}

                <section className={b("section")}>

                    <div className={b("section-header")}>

                        <div>
                            <h2 className={b("section-title")}>
                                Quyền truy cập
                            </h2>

                            <p className={b("section-description")}>
                                Chọn cách học viên có thể tham gia
                                khóa học.
                            </p>
                        </div>

                    </div>


                    <div className={b("access-options")}>

                        <label className={b("access-option")}>

                            <input
                                type="radio"
                                name="visibility"
                                checked={course.isPublic}
                                onChange={() =>
                                    updateField(
                                        "isPublic",
                                        true
                                    )
                                }
                            />

                            <div>
                                <strong>
                                    Công khai
                                </strong>

                                <span>
                                    Mọi người có thể tìm và tham gia
                                    khóa học.
                                </span>
                            </div>

                        </label>


                        <label className={b("access-option")}>

                            <input
                                type="radio"
                                name="visibility"
                                checked={!course.isPublic}
                                onChange={() =>
                                    updateField(
                                        "isPublic",
                                        false
                                    )
                                }
                            />

                            <div>
                                <strong>
                                    Riêng tư
                                </strong>

                                <span>
                                    Chỉ người có mã lớp mới có thể
                                    tham gia.
                                </span>
                            </div>

                        </label>

                    </div>

                </section>


                {/* ================= ACTIONS ================= */}

                <footer className={b("actions")}>

                    <button
                        type="button"
                        className={b("cancel")}
                        onClick={handleCancel}
                    >
                        Hủy
                    </button>

                    <button
                        type="submit"
                        className={b("submit")}
                    >
                        <Icon name="save" />

                        {isEdit
                            ? "Lưu thay đổi"
                            : "Tạo khóa học"}
                    </button>

                </footer>

            </form>

        </main>
    );
}

export default CourseCreate;