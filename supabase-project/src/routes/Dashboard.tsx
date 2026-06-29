import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import { Chart } from "react-charts";
import Form from "../components/Form";
import type { SalesChartDatum, Metric } from "../types";

export default function DashBoard() {
  async function fetchMetrics() {
    try {
      const { data, error } = await supabase.from("sales_deals").select(`name, value.sum()`);

      if (error) throw error;

      console.log(data);
      setMetric(data);
    } catch (error) {
      console.log(`Data Fetching Error: ${error}`);
    }
  }

  const [metric, setMetric] = useState<Metric[]>([]);

  useEffect(() => {
    fetchMetrics();

    const channel = supabase
      .channel("deal-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sales_deals",
        },
        (payload) => {
          console.log(payload);
          fetchMetrics();
        },
      )
      .subscribe();

    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const primaryAxis = {
    getValue: (d: SalesChartDatum) => d.primary,
    scaleType: "band" as const,
    padding: 0.2,
    position: "bottom" as const,
  };

  const secondaryAxes = [
    {
      getValue: (d: SalesChartDatum) => d.secondary,
      scaleType: "linear" as const,
      min: 0,
      max: y_max(),
      padding: {
        top: 20,
        bottom: 40,
      },
    },
  ];

  function y_max() {
    if (metric.length > 0) {
      const maxSum = Math.max(...metric.map((m) => m.sum));
      return maxSum + 2000;
    }
    return 5000;
  }

  const ChartData = [
    {
      type: "bar",
      data: metric.map((m) => ({
        primary: m.name,
        secondary: m.sum,
      })),
    },
  ];

  return (
    <div className="dashboard-wrapper m-0 flex h-screen flex-col">
      <div className="chart-container rounded-m relative mx-auto mt-26 mb-1.75 flex h-[65vh] w-[90%] grow flex-col overflow-hidden border bg-[#f9f9f9] px-2.5 pb-5">
        <h2>Total Sales This Quarter</h2>
        <div style={{ flex: 1 }}>
          <Chart
            options={{
              data: ChartData,
              primaryAxis,
              secondaryAxes,
              defaultColors: ["#58d675"],
              tooltip: { show: false },
            }}
          />
        </div>
      </div>
      <Form metric={metric} />
    </div>
  );
}
