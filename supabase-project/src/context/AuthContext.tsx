import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase-client";

type children = {
  children: React.JSX.Element;
};

const AuthContext = createContext();

export const AuthContextProvider = ({ children }: children) => {
  const [session, setSession] = useState<unknown | null>(null);

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw new Error(error.message);
        }

        console.log(data.session);
        setSession(data.session);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }

    getInitialSession();

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      console.log(`Session Change:`, session);
    });
  }, []);

  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.toLowerCase(), password: password });
      if (error) {
        console.error("Supabase sign-in error:", error.message);
        return { success: false, error: error.message };
      }

      console.log("Supbase sign-in success", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign-in:", error);
      return { success: false, error: "An unexpected error occurred during signing in. Please try again." };
    }
  };

  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });

      if (error) {
        console.error(`Supabase sign-out error: ${error.message}`);
        return { success: false, error: error.message };
      }

      console.log(`Logout successful`);
      return { success: true };
    } catch (error) {
      console.error(`Unexpected error during sign-out: ${error}`);
      return { success: false, error: "An unexpected error occured during signing out. Please try again." };
    }
  };

  const signUpNewUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
      });

      if (error) {
        console.error(`Supabase sign-up error: ${error.message}`);
        return { success: false, error: error.message };
      }

      return { success: true, data: data };
    } catch (error) {
      console.error(`Unexpected error during sign-up new user: ${error}`);
      return { success: false, error: error };
    }
  };

  return <AuthContext.Provider value={{ session, signInUser, signOutUser, signUpNewUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
