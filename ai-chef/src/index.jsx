import { createRoot } from "react-dom/client";
import { App } from "./screens/App";

const root = createRoot(document.querySelector("#root"));

root.render(
  <>
    <App />
  </>
);
