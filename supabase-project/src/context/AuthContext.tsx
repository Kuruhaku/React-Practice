import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase-client";

type children = {
  children: React.JSX.Element;
};

const AuthContext = createContext();

export const AuthContextProvider = ({ children }: children) => {
  //
  const [session, setSession] = useState(undefined);

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
      return { success: false, error: "An unexpected error occurred. Please try again." };
    }
  };

  return <AuthContext.Provider value={{ session, signInUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
