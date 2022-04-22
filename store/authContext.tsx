import React, { createContext, useState } from "react";

type AuthContextValue = {
  authToken: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  authToken: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function AuthContextProvider({ children }: Props) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  function authenticate(token: string) {
    setAuthToken(token);
  }
  function logout() {
    setAuthToken(null);
  }

  const value = {
    authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
