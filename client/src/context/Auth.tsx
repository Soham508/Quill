import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { authType } from "@/types";

type AuthContextType = [authType, React.Dispatch<React.SetStateAction<authType>>] | null;

const AuthContext = createContext<AuthContextType>([{
  user: null,
  token: "",
}, () => { }]);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<authType>({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth.token;


  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });

    }
    //eslint-disable-next-line
  }, [auth.user]);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider };
