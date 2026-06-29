import { createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import DashBoard from "./routes/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <DashBoard />
      </>
    ),
  },
]);
