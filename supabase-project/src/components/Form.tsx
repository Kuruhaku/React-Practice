import { useActionState } from "react";
import type { MetricProps } from "../types";
import supabase from "../supabase-client";

export default function Form({ metric }: MetricProps) {
  const [error, submitAction, isPending] = useActionState(async (previousState, formData: FormData) => {
    console.log(formData);
    const newDeal = {
      name: formData.get("name"),
      value: formData.get("value"),
    };
    console.log(newDeal);

    const { error } = await supabase.from("sales_deals").insert(newDeal);

    if (error) {
      console.log(`Error adding deal: ${error.message}`);
      return new Error("Failed to add deals");
    }

    return null;
  }, null);

  const generateOption = () => {
    return metric.map((metric) => (
      <option key={metric.name} value={metric.name}>
        {metric.name}
      </option>
    ));
  };

  return (
    <div className="add-form-container mx-auto mt-15 mb-1.75 w-[90%] shrink-0 rounded-md border p-2">
      <form action={submitAction} className="m-1.5 flex items-center justify-center gap-10">
        <div id="form-descirption" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter the amount
        </div>

        <label htmlFor="deal-name">
          Name:
          <select id="deal-name" name="name" defaultValue={metric?.[0]?.name || ""} aria-required="true">
            {generateOption()}
          </select>
        </label>

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

        <button type="submit" disabled={isPending} aria-busy={isPending}>
          Add Deal
        </button>
      </form>
    </div>
  );
}
