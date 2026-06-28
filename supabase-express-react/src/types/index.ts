export type Metric = {
  name: string;
  sum: number;
};

export type SalesChartDatum = {
  primary: string;
  secondary: number;
};

export type MetricProps = {
  metric: Metric[];
};

export type Deals = {
  name: string;
  value: string;
};

// export type previousStateType = {
//   error: string | null;
//   success: boolean;
// };
