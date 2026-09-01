import React from "react";
import bem from "@/utils/bem";
import Icon from "../Icon/Icon";
import "./MenuItem.scss";

const b = bem("menu-item");

function MenuItem({ icon, title, badge, active, onClick  }) {
    return (
        <button className={`${b()} ${active ? "menu-item_active" : ""}`} onClick={onClick}>
            <span className={b("icon")}>
                <Icon name={icon} />
            </span>

            <span className={b("title")}>
                {title}
            </span>

            {active ? (
                <span className={b("arrow")}>
                    <Icon name="chevron-right" />
                </span>
            ) : (
                badge !== undefined && (
                    <span className={b("badge")}>
                        {badge}
                    </span>
                )
            )}
        </button>
    );
}

export default MenuItem;