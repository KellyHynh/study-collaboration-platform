import Icon from "@/components/Icon/Icon";
import "./Footer.scss";

function Footer({ language, setLanguage }) {
    const languages = ["VI", "EN", "JA"];

    return (
        <footer className="footer">
            {/* Back */}
            <button className="footer__button">
                <Icon name="chevron-left" />
                Quay lại
            </button>

            <div className="footer__divider" />

            {/* Support */}
            <button className="footer__button">
                <Icon name="help-circle" />
                Hỗ trợ
            </button>

            {/* Language */}
            <div className="footer__languages">
                <Icon name="globe" />

                {languages.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`footer__language ${
                            language === lang
                                ? "footer__language--active"
                                : ""
                        }`}
                    >
                        {lang}
                    </button>
                ))}
            </div>
        </footer>
    );
}

export default Footer;