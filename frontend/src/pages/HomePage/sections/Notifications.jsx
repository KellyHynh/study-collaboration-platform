import { useState } from "react";
import bem from "@/utils/bem";
import NotificationCard from "@/components/NotificationCard/NotificationCard";
import "./Notifications.scss";
const b = bem("notification");

function Notification() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "time",
            title: "Assignment deadline",
            content: "Math assignment is due tomorrow.",
            time: "3 hours ago",
            unread: true,
        },
        {
            id: 2,
            type: "message",
            title: "New message",
            content: "John sent you a message.",
            time: "10 minutes ago",
            unread: true,
        },
        {
            id: 3,
            type: "bell",
            title: "New lecture material",
            content: "New materials have been added to Web Development.",
            time: "Yesterday",
            unread: false,
        },
    ]);

    function handleRead(id) {
        setNotifications((currentNotifications) =>
            currentNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, unread: false }
                    : notification
            )
        );
    }

    function handleDelete(id) {
        setNotifications((currentNotifications) =>
            currentNotifications.filter(
                (notification) => notification.id !== id
            )
        );
    }

    const unreadCount = notifications.filter(
        (notification) => notification.unread
    ).length;

    return (
        <section className={b()}>
            <div className={b("header")}>
                <h2 className={b("title")}>
                    Notifications
                </h2>

                <span className={b("count")}>
                    {unreadCount} new
                </span>
            </div>

            <div className={b("list")}>
                {notifications.map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        type={notification.type}
                        title={notification.title}
                        content={notification.content}
                        time={notification.time}
                        unread={notification.unread}
                        onRead={() => handleRead(notification.id)}
                        onDelete={() => handleDelete(notification.id)}
                    />
                ))}
            </div>
        </section>
    );
}

export default Notification;