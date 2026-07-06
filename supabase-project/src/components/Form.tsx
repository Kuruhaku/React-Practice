import { useActionState } from "react";
import { useAuth } from "../context/AuthContext";
import type { userData } from "../types";
import supabase from "../supabase-client";

export default function Form() {
  const { users, session } = useAuth();

  const [error, submitAction, isPending] = useActionState(async (previousState: Error | null, formData: FormData) => {
    console.log(formData);
    const submittedName = formData.get("name");
    const user = users.find((u) => u.name === submittedName);

    if (user === undefined) {
      return new Error("Cannot find submittedName");
    }

    const newDeal = {
      user_id: user.id,
      value: formData.get("value"),
    };
    console.log(previousState);
    console.log(newDeal);

    const { error } = await supabase.from("sales_deals").insert(newDeal);

    if (error) {
      console.log(`Error adding deal: ${error.message}`);
      return new Error("Failed to add deals");
    }

    return null;
  }, null);

  const currentUser = users.find((user) => user.id === session?.user?.id);

  const generateOption = () => {
    return users
      .filter((user) => user.account_type === "rep")
      .map((user: userData) => (
        <option key={user.id} value={user.name}>
          {user.name}
        </option>
      ));
  };

  return (
    <div className="add-form-container mx-auto mt-7 mb-4 w-[90%] shrink-0 rounded-md border p-2">
      <form action={submitAction} className="m-1.5 flex items-center justify-center gap-10">
        <div id="form-descirption" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter the amount
        </div>

        {currentUser?.account_type === "rep" ? (
          <label htmlFor="deal-name">
            Name:
            <input id="deal-name" type="text" name="name" value={currentUser?.name || ""} readOnly aria-required="true"></input>
          </label>
        ) : (
          <label htmlFor="deal-name">
            Name:
            <select id="deal-name" name="name" defaultValue={users[0]?.name || ""} aria-required="true">
              {generateOption()}
            </select>
          </label>
        )}

        <label htmlFor="deal-value">
          Amount: $
          <input
            id="deal-value"
            type="number"
            name="value"
            defaultValue={0}
            className="amount-input ml-0.5 w-15 rounded-md border bg-[#ffffff]"
            min="0"
            step="10"
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-label="Deal amount in dollars"
            disabled={isPending}
          />
        </label>

        <button
          className="w-full cursor-pointer rounded-md border-none bg-[#124f33] px-2 py-1 text-white hover:bg-[#187c49] disabled:cursor-not-allowed disabled:bg-[#6c757d]"
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
        >
          Add Deal
        </button>
      </form>
    </div>
  );
}
