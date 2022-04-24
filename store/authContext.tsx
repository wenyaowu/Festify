import React, { createContext, useState , useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextValue = {
  authToken: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  authToken: "",
  isAuthenticated: false,
  isAuthenticating: false,
  authenticate: () => {},
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function AuthContextProvider({ children }: Props) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(()=>{
    async function fetchToken() {
      setIsAuthenticating(true);
      const token = await AsyncStorage.getItem('token');
      if(token != null) {
        setAuthToken(token);
      }
      setIsAuthenticating(false);
    }
    fetchToken();
  },[]);
  

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const value = {
    authToken,
    isAuthenticating,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
