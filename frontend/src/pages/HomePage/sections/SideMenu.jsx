import MenuItem from "../../../components/MenuItem/MenuItem";
import bem from "@/utils/bem";

const b = bem("side-menu");
function SideMenu() {
    const menuItems = [
        {
            id: 1,
            icon: "📚",
            title: "Course",
            hasArrow: true
        },
        {
            id: 2,
            icon: "📝",
            title: "Todo",
            badge: 3
        },
        {
            id: 3,
            icon: "📅",
            title: "Calendar",
            hasArrow: true
        },
        {
            id: 4,
            icon: "💬",
            title: "Messages",
            badge: 12
        }
    ];

    return (
        <nav className={b()}>
            {menuItems.map((item) => (
                <MenuItem
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    badge={item.badge}
                    hasArrow={item.hasArrow}
                />
            ))}
        </nav>
    );
}

export default SideMenu;