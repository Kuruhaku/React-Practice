import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Learned: Know how to setup supabase, cliene library, fetching data using const [data, error] = await supabase.from(table).inset() or .select(), setting up realtime using supabase.channel.on("postgres_changes"), and inserting data and reflect it.

createRoot(document.getElementById("root")!).render(<App />);
