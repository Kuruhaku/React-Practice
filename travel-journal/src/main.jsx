import { createRoot } from "react-dom/client";
import travelData from "./data.js";
import { Header } from "./components/header";
import { Entry } from "./components/entry";

const root = createRoot(document.querySelector("#root"));

const entryData = travelData.map((entry) => {
  {
    return <Entry key={entry.id} entry={entry} />;
  }
});

root.render(
  <>
    <Header />
    <main className="container">{entryData}</main>
  </>
);
