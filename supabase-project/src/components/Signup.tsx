import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useActionState } from "react";

export default function Signup() {
  const { signUpNewUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(async (previousState: void | null, formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const accountType = formData.get("account-type");
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(accountType);
    console.log(previousState);

    const { success, data, error: signInError } = await signUpNewUser(email, password, name, accountType);

    if (signInError) {
      console.log(error);
    }

    if (success && data?.session) {
      navigate("/dashboard");
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
            <p>Use This form to create a new account. Enter your email and password</p>
          </div>

          <h2 className="form-title m-0 pb-4 text-3xl font-semibold text-[#082c1b]">Sign Up</h2>
          <div className="mb-4 flex flex-row gap-2">
            <p>Already Have an Account?</p>
            <Link className="form-link" to={"/"}>
              Login
            </Link>
          </div>

          <label htmlFor="name">Name</label>
          <input
            className="mx-0 my-4 box-border w-full rounded border bg-white p-3.5 text-base font-normal text-[#082c1b] focus:border-[#124f33] focus:shadow-[0_0_0_3px_rgba(18,79,51,0.1)] focus:outline-none"
            type="text"
            name="name"
            id="name"
            placeholder=""
            required
            aria-required="true"
            disabled={isPending}
          />

          <label htmlFor="email">Email</label>
          <input
            className="mx-0 my-4 box-border w-full rounded border bg-white p-3.5 text-base font-normal text-[#082c1b] focus:border-[#124f33] focus:shadow-[0_0_0_3px_rgba(18,79,51,0.1)] focus:outline-none"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
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
            disabled={isPending}
          />

          <fieldset className="form-fieldset">
            <legend>Select Your role</legend>
            <div className="radio-group">
              <label>
                <input type="radio" name="account-type" value="admin" required></input>
                Admin
              </label>

              <label>
                <input type="radio" name="account-type" value="rep" required></input>
                Sales Rep
              </label>
            </div>
          </fieldset>

          <button
            className="form-button mt-6 w-full cursor-pointer rounded-md border-none bg-[#124f33] px-5 py-3 text-base font-semibold text-white hover:-translate-y-0.5 hover:bg-[#187c49] disabled:transform-none disabled:cursor-not-allowed disabled:bg-[#6c757d] disabled:opacity-50"
            type="submit"
          >
            Sign In
          </button>

          {error && (
            <div className="" role="alert" id="signin-error">
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
