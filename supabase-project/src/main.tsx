import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthContextProvider } from "./context/AuthContext";

// Learned: Know how to setup supabase, cliene library, fetching data using const [data, error] = await supabase.from(table).inset() or .select(), setting up realtime using supabase.channel.on(postgres_changes), and inserting data and reflect it.
createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
);
