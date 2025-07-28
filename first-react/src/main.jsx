import { createRoot } from "react-dom/client";
import { MyAwsomeNavbar, Page, MyAwesomeFooter } from "./index.jsx";

const root = createRoot(document.querySelector("#root"));

root.render(
  <>
    <MyAwsomeNavbar />
    <Page />
    <MyAwesomeFooter />

    <div>
      <img src="/src/assets/react-logo.png" alt="" />
      <h1>Fun facts about React</h1>
      <ul>
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100k stars on GitHub</li>
        <li>Is maintained by Meta</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </div>
  </>
);
