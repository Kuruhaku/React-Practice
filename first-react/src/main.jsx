import { createRoot } from "react-dom/client";
import { Navbar, Page, Footer } from "../component/index.jsx";

const root = createRoot(document.querySelector("#root"));

root.render(
  <>
    <Navbar />
    <Page />
    <Footer />
  </>
);
