import bem from "@/utils/bem";
import Icon from "../Icon/Icon";
import "./NotificationCard.scss";

const b = bem("notification-card");

function NotificationCard({
    type,
    title,
    content,
    time,
    unread,
    onRead,
    onDelete
}) {
    return (
        <article
            className={b({ unread, read: !unread })}
            onClick={onRead}
        >
            <div className={b("icon", { bell: type === "bell", message: type === "message", time: type === "time" })}>
                <Icon name={type} />
            </div>

            <div className={b("content")}>
                <div className={b("header")}>
                    <h3 className={b("title")}>
                        {title}
                    </h3>

                    {unread && (
                        <span className={b("unread")} />
                    )}

                    <button
                        className={b("delete")}
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete();
                        }}
                    >
                        <Icon name="close" />
                    </button>
                </div>

                <p className={b("description")}>
                    {content}
                </p>

                <span className={b("time")}>
                    {time}
                </span>
            </div>
        </article>
    );
}

export default NotificationCard;