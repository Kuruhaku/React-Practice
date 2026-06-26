import { supabase } from "../../supabase-client.js";

export async function getSalesData(req, res) {
  const { data, error } = await supabase.from("sales_deals").select(`name, value.sum()`);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.send(data);
}

export async function insertSalesData(req, res) {
  const { name, value } = req.body;
  res.send(name);
}
