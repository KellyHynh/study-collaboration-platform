function bem(block) {
    return function (element = "", modifier = "") {
        let className = block;

        if (element) {
            className += `__${element}`;
        }

        if (modifier) {
            className += `--${modifier}`;
        }

        return className;
    };
}

export default bem;