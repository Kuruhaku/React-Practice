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

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
