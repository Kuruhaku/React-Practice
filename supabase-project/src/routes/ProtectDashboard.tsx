import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import DashBoard from "./Dashboard";
import { useAuth } from "../context/AuthContext";

export default function ProtectDashBoard() {
  const { session } = useAuth();

  if (session?.user?.aud === "authenticated") {
    return (
      <>
        <Header />
        <DashBoard />
      </>
    );
  }

  return <Navigate to="/signin" />;
}
