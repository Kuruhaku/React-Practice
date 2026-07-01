import { createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import DashBoard from "./routes/Dashboard";
import Signup from "./components/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
