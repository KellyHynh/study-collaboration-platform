import { useState } from "react";
import MenuItem from "../../../components/MenuItem/MenuItem";
import bem from "@/utils/bem";
import "./SideMenu.scss";
const b = bem("side-menu");

function SideMenu() {

    const [activeItem, setActiveItem] = useState(null);

    const menuSections = [
        {
            title: "HỌC TẬP",
            items: [
                { id: 1, icon: "course", title: "Course" },
                { id: 5, icon: "list-check", title: "Progress" },
                { id: 6, icon: "done", title: "Certificates" }
            ]
        },
        {
            title: "CÔNG CỤ",
            items: [
                { id: 2, icon: "list-todo", title: "Todo", badge: 3 },
                { id: 3, icon: "calendar", title: "Calendar" },
                { id: 4, icon: "message", title: "Message", badge: 12 },
                { id: 7, icon: "course", title: "Thư viện" }
            ]
        },
        {
            title: "HỆ THỐNG",
            items: [
                { id: 8, icon: "help-circle", title: "Support" },
                { id: 9, icon: "key", title: "Setting" }
            ]
        }
    ];

    return (
        <nav className={b()}>
            {menuSections.map((section) => (
                <section className={b("section")} key={section.title}>
                    <h2 className={b("title")}>{section.title}</h2>
                    {section.items.map((item) => (
                        <MenuItem
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            badge={item.badge}
                            active={activeItem === item.id}
                            onClick={() => setActiveItem(item.id)}
                        />
                    ))}
                </section>
            ))}
        </nav>
    );
}

export default SideMenu;