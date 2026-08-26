import bem from "@/utils/bem";

const b = bem("activity-panel");
function ActivityPanel() {
    return (
        <div className={b()}>
            <h2>Notifications</h2>
        </div>
    );
}

export default ActivityPanel;