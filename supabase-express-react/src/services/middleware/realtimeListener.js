// import { supabase } from "../../supabase-client.js";
// import { Server } from "socket.io";

// export function setupRealtimeListener(io) {
//   const channel = supabase
//     .channel("deal-changes")
//     .on("postgres_changes", { event: "*", schema: "public", table: "sales_deals" }, (payload) => {
//       console.log(`Change Detected: ${payload}`);
//       io.emit("deal-update", payload);
//     })
//     .subscribe();
// }
