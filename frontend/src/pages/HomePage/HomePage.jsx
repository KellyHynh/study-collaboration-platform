import Header from "../../components/Header/Header";
import SideMenu from "./sections/SideMenu";
import MainContent from "./sections/MainContent/MainContent";
import ActivityPanel from "./sections/ActivityPanel";
import Footer from "../../components/Footer/Footer";
import "./HomePage.scss";
import bem from "../../utils/bem";

const b = bem("home-page");
function HomePage() {
    return (
        <div className={b()}>
            <Header />

            <main className={b("layout")}>
                <aside className={b("sidebar")}>
                    <SideMenu />
                </aside>

                <section className={b("main")}>
                    <MainContent />
                </section>

                <aside className={b("activity")}>
                    <ActivityPanel />
                </aside>
            </main>

            <Footer />
        </div>
    );
}

export default HomePage;