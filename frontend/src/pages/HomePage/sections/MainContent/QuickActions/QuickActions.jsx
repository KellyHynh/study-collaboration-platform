import { useState } from "react";
import { useNavigate } from "react-router-dom";

import bem from "@/utils/bem";
import Icon from "@/components/Icon/Icon";

import "./QuickActions.scss";

const b = bem("quick-actions");

function QuickActions() {
    const navigate = useNavigate();
    const [isJoinOpen, setIsJoinOpen] = useState(false);
    const [joinCode, setJoinCode] = useState("");

    const handleCreateCourse = () => {
        navigate("/courses/create");
    };

    const handleJoinCourse = (event) => {
        event.preventDefault();

        // TODO: gọi API join course bằng joinCode
        console.log("Join code:", joinCode);
    };

    return (
        <section className={b()}>

            <button
                type="button"
                className={b("action")}
                onClick={() => setIsJoinOpen(true)}
            >
                <Icon name="key" />
                <span>Tham gia lớp</span>
            </button>

            <button
                type="button"
                className={b("action")}
                onClick={handleCreateCourse}
            >
                <Icon name="plus" />
                <span>Tạo khóa học</span>
            </button>


            {isJoinOpen && (
                <div
                    className={b("overlay")}
                    onClick={() => setIsJoinOpen(false)}
                >
                    <form
                        className={b("join-form")}
                        onSubmit={handleJoinCourse}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className={b("join-header")}>
                            <div className={b("join-main")}>
                                <div className={b("join-icon")}>
                                    <Icon name="key" />
                                </div>

                                <div className={b("join-header-text")}>
                                    <h2 className={b("join-title")}>
                                        Tham gia lớp học
                                    </h2>

                                    <p className={b("join-description")}>
                                        Nhập mã lớp để tham gia khóa học.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className={b("close")}
                                onClick={() => setIsJoinOpen(false)}
                                aria-label="Đóng"
                            >
                                <Icon name="close" />
                            </button>
                        </div>

                        <label className={b("label")}>
                            Mã lớp
                        </label>

                        <input
                            type="text"
                            value={joinCode}
                            onChange={(event) =>
                                setJoinCode(event.target.value)
                            }
                            placeholder="Nhập mã lớp"
                            autoFocus
                        />
                        
                        <div className={b("join-actions")}>
                            <button type="button" className={b("cancle")} onClick={() => setIsJoinOpen(false)}>
                                Hủy
                            </button>
                            <button type="submit" className={b("submit")}>
                                Tham gia
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </section>
    );
}

export default QuickActions;