import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserAccount from "./UserAccount";
import bem from "../../utils/bem";
import "./Header.scss";

const b = bem("header");

function Header() {
    return (
        <header className={b()}>

            <Logo />

            <div className={b("search")}>
                <SearchBar />
            </div>

            <UserAccount />
        </header>
    );
}

export default Header;