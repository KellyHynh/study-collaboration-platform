import React from "react";
import bem from "@/utils/bem";
import Icon from "../Icon/Icon";
const b = bem("menu-item");

function MenuItem({ icon, title, badge, hasArrow }) {
    return (
        <button className={b()}>
            <img
                className={b("icon")}
                src={icon}
                alt=""
            />

            <span className={b("title")}>
                {title}
            </span>

            {badge !== undefined && (
                <span className={b("badge")}>
                    {badge}
                </span>
            )}

            {hasArrow && (
                <Icon
                    name="chevron-right"
                    size={16}
                    className={b("chevron")}
                />
            )}
        </button>
    );
}

export default MenuItem;