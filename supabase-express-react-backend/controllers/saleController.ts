import { supabase } from "../supabase-client";
import type { Request, Response } from "express";

export async function getSaleData(req: Request, res: Response) {
  const { data, error } = await supabase
    .from("sales_deals")
    .select(`name, value.sum()`);

  if (error) {
    return res.status(400).send(error.message);
  }

  return res.status(200).send(data);
}

export async function postSaleData(req: Request, res: Response) {
  const { name, value } = req.body;
  const newDeal = {
    name: name,
    value: value,
  };
  const { error } = await supabase.from("sales_deals").insert(newDeal);

  if (error) {
    return res
      .status(400)
      .json({ message: "Failed to insert Data", error: error.message });
  }
  return res
    .status(201)
    .json({ message: `Added deal to ${name} with a value of ${value}` });
}
