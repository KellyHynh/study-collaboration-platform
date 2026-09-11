import { useState } from "react";
import bem from "../../utils/bem";
import "./UserAccount.scss";
const b = bem("user-account");
function UserAccount() {
    const [isLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen((prev) => !prev);
    }

    return (
        <div className={b()}>
            <button
                className={b("avatar-btn")}
                onClick={toggleDropdown}
            >
                👤
            </button>

            {isOpen && (
                <div className={b("dropdown-menu")}>

                    {/* User Info */}
                    <div className={b("user-info")}>
                        <p>Guest</p>
                        <p>Please login</p>
                    </div>

                    <hr />

                    {/* Menu */}
                    <nav className={b("menu")}>
                        <button>My Profile</button>
                        <button>Settings</button>
                    </nav>

                    <hr />

                    {/* Login Status */}
                    <div className={b("auth")}>
                        {isLoggedIn ? (
                            <button>Logout</button>
                        ) : (
                            <>
                                <button>Login/Signup</button>
                            </>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}

export default UserAccount;