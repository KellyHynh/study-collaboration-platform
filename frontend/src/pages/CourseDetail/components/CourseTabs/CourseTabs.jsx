import bem from "../../../../utils/bem";
import "./CourseTabs.scss";

const b = bem("course-tabs");

function CourseTabs({
    activeTab,
    onTabChange,
    lessonCount
}) {
    const tabs = [
        {
            id: "overview",
            label: "Tổng quan"
        },
        {
            id: "curriculum",
            label: `Bài giảng (${lessonCount})`
        },
        {
            id: "materials",
            label: "Tài liệu"
        },
        {
            id: "discussion",
            label: "Thảo luận"
        }
    ];

    return (
        <nav className={b()}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    className={`${b("tab")} ${
                        activeTab === tab.id
                            ? b("tab--active")
                            : ""
                    }`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}

export default CourseTabs;