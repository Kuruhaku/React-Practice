import { createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import RootRedirect from "./routes/RootRedirect";
import ProtectDashBoard from "./routes/ProtectDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <ProtectDashBoard />,
  },
]);
