import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { session } = useAuth();

  console.log(session);
  return (
    <>
      <h2 className="landing-header">Paper Like Boss</h2>
      <h2>This is the sign in Page</h2>
    </>
  );
}
