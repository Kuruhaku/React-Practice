import { useAuth } from "../context/AuthContext";
import { useActionState } from "react";

export default function SignIn() {
  const { signInUser } = useAuth();

  const [error, submitAction, isPending] = useActionState(async (previousState: Error | null, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
    console.log(previousState);

    const { success, data, error: signInError } = await signInUser(email, password);

    if (signInError) {
      console.log(error);
    }

    if (success && data?.session) {
      return null;
    }

    return null;
  }, null);

  return (
    <>
      <h1 className="landing-header bg-linear-[45deg, #082c1b, #0dc566] mt-0 mb-3 bg-clip-text p-4 text-center text-6xl leading-[1.2] font-bold tracking-wide text-[#082c1b]">
        Paper Like A Boss
      </h1>
      <div className="sign-form-container bordder mx-auto my-0 max-w-md transform rounded-md bg-white p-10 shadow-[0_4px_6px_rgba(0,0,0,0.05)] duration-75 ease-in">
        <form action={submitAction} aria-label="Sign in form" aria-describedby="form-description">
          <div id="form-description" className="sr-only">
            Use this form to sign in to your account. Enter your email and password.
          </div>

          <h2 className="form-title m-0 pb-4 text-3xl font-semibold text-[#082c1b]">Sign In</h2>
          <p>Don't have an account yet? Sign Up</p>

          <label htmlFor="email">Email</label>
          <input
            className="mx-0 my-4 box-border w-full rounded border bg-white p-3.5 text-base font-normal text-[#082c1b] focus:border-[#124f33] focus:shadow-[0_0_0_3px_rgba(18,79,51,0.1)] focus:outline-none"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "signin-error" : undefined}
            disabled={isPending}
          />

          <label htmlFor="password">Password</label>
          <input
            className="mx-0 my-4 box-border w-full rounded border bg-white p-3.5 text-base font-normal text-[#082c1b] focus:border-[#124f33] focus:shadow-[0_0_0_3px_rgba(18,79,51,0.1)] focus:outline-none"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "signin-error" : undefined}
            disabled={isPending}
          />

          <button
            className="form-button mt-6 w-full cursor-pointer rounded-md border-none bg-[#124f33] px-5 py-3 text-base font-semibold text-white hover:-translate-y-0.5 hover:bg-[#187c49] disabled:transform-none disabled:cursor-not-allowed disabled:bg-[#6c757d] disabled:opacity-50"
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? "Signing In" : "Sign In"}
          </button>

          {error && (
            <div className="" role="alert" id="signin-error">
              {error.message}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
