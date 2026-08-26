import { Link } from "react-router-dom";
import bem from "../../utils/bem";
import logo from "../../assets/logo.png";

import "./Logo.scss";

const b = bem("logo");
function Logo() {
    return (
        <Link to="/" className={b()}>
            <img
                className={b("icon")}
                src={logo}
                alt="KnoVerse"
            />

            <span className={b("text")}>
                KnoVerse
            </span>
        </Link>
    );
}

export default Logo;