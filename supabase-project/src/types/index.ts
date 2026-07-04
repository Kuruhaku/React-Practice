import type { Session, User, AuthError } from "@supabase/supabase-js";

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

export type children = {
  children: React.JSX.Element;
};

export type AuthContextType = {
  session: Session | null;
  signInUser: (email: string, password: string) => Promise<{ success: boolean; error?: string; data?: unknown }>;
  signOutUser: () => Promise<{ success: boolean; error?: string }>;
  signUpNewUser: (
    email: string,
    password: string,
    name: string,
    account_type: string,
  ) => Promise<
    | { data: null; error: AuthError; success?: undefined }
    | { success: boolean; data: { user: User | null; session: Session | null }; error?: undefined }
    | { success: boolean; error: unknown; data?: undefined }
  >;
  users: userData[];
};

export type userData = {
  id: string;
  name: string;
  account_type: string;
};
