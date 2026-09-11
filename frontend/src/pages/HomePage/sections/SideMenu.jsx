import React, { useState } from "react";
import MenuItem from "../../../components/MenuItem/MenuItem";
import bem from "@/utils/bem";
import "./SideMenu.scss";
const b = bem("side-menu");

function SideMenu() {

    const [activeItem, setActiveItem] = useState(null);

    const menuItems = [
        {
            id: 1,
            icon: "course",
            title: "Course",
            hasArrow: true
        },
        {
            id: 2,
            icon: "list-todo",
            title: "Todo",
            badge: 3
        },
        {
            id: 3,
            icon: "calendar",
            title: "Calendar",
            hasArrow: true
        },
        {
            id: 4,
            icon: "message",
            title: "Messages",
            badge: 12
        }
    ];

    return (
        <nav className={b()}>
            <h2 className={b("title")}>
                Menu
            </h2>
            {menuItems.map((item) => (
                <MenuItem
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    badge={item.badge}
                    active={activeItem === item.id}
                    onClick={() => setActiveItem(item.id)}
                />
            ))}
        </nav>
    );
}

export default SideMenu;