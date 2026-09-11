// utils/bem.js

function buildModifiers(base, modifier) {
    if (!modifier) return base;

    // Trường hợp modifier là string: b("icon", "bell") -> "icon_bell"
    if (typeof modifier === "string") {
        return modifier ? `${base}_${modifier}` : base;
    }

    // Trường hợp modifier là object: b({ active: true, disabled: false })
    // -> chỉ những key có giá trị truthy mới được thêm vào
    if (typeof modifier === "object") {
        const classes = [base];
        Object.keys(modifier).forEach((key) => {
            if (modifier[key]) {
                classes.push(`${base}_${key}`);
            }
        });
        return classes.join(" ");
    }

    return base;
}

function bem(block) {
    return function (element, modifier) {
        // Gọi b() -> chỉ trả về block, có thể kèm modifier dạng object
        // Gọi b({active: true}) -> "block block_active"
        if (typeof element === "object") {
            return buildModifiers(block, element);
        }

        // Gọi b("icon") -> "block__icon"
        // Gọi b("icon", "bell") -> "block__icon block__icon_bell"
        // Gọi b("icon", {bell: true}) -> "block__icon block__icon_bell"
        const base = element ? `${block}__${element}` : block;
        return buildModifiers(base, modifier);
    };
}

export default bem;