import { useState } from "react";

import Icon from "@/components/Icon/Icon";

import bem from "@/utils/bem";
import "./AddChapterModal.scss";

const b = bem("add-chapter-modal");

function AddChapterModal({
    onClose,
    onSubmit,
    loading = false,
}) {
    const [title, setTitle] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle || loading) {
            return;
        }

        onSubmit(trimmedTitle);
    }

    return (
        <div className={b("overlay")}>

            <div
                className={b()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-chapter-title"
            >

                <button
                    type="button"
                    className={b("close")}
                    onClick={onClose}
                    disabled={loading}
                    aria-label="Đóng"
                >
                    <Icon name="close" />
                </button>

                <div className={b("heading")}>

                    <div className={b("icon")}>
                        <Icon name="plus" />
                    </div>

                    <div>
                        <h2
                            id="add-chapter-title"
                            className={b("title")}
                        >
                            Thêm chương mới
                        </h2>

                        <p className={b("description")}>
                            Tạo một chương mới cho khóa học.
                        </p>
                    </div>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className={b("field")}>

                        <label htmlFor="chapter-title">
                            Tên chương
                            <span className={b("required")}>*</span>
                        </label>

                        <input
                            id="chapter-title"
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="Nhập tên chương"
                            autoFocus
                            disabled={loading}
                        />

                    </div>

                    <div className={b("actions")}>

                        <button
                            type="button"
                            className={b("cancel")}
                            onClick={onClose}
                            disabled={loading}
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            className={b("submit")}
                            disabled={
                                !title.trim() || loading
                            }
                        >
                            {loading
                                ? "Đang thêm..."
                                : "Thêm chương"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddChapterModal;