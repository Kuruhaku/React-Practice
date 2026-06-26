export async function addDeal(name: string, value: number) {
  const response = await fetch("http://localhost:8000/sales", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDeal),
  });

  if (!response.ok) {
    console.log("problem");
  }

  return response.json();
}
