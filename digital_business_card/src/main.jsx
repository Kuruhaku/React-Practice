import { createRoot } from "react-dom/client";
import { AboutMe } from "../components/about-me.jsx";
import { MainDetails } from "../components/details-me.jsx";
import { Header } from "../components/header.jsx";
import { Footer } from "../components/footer.jsx";

const root = createRoot(document.querySelector("#root"));

root.render(
  <>
    <main>
      <Header />
      <div className="page-container">
        <AboutMe />
        <MainDetails />
      </div>
      <Footer />
    </main>
  </>
);
