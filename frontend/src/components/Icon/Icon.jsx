import chevronRight from "@/assets/chevron-right.svg";
import search from "@/assets/search.png";

const icons = {
    "chevron-right": chevronRight,
    "search": search
};

function Icon({ 
    name, 
    size = 20,
    className,
}) {
    return (
        <img
            src={icons[name]}
            alt=""
            width={size}
            height={size}
            className={className}  
        />
    );
}

export default Icon;