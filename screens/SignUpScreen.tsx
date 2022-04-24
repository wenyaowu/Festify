import AuthContent from "../components/auth/AuthContent";
import { AuthContext } from "../store/authContext";
import { useCallback, useContext } from "react";
import { Alert } from "react-native";
import { createUser } from "../utils/auth";

export default function SignUpScreen() {
  const { authenticate } = useContext(AuthContext);
  const signUpHandler = useCallback(async (email: string, password: string) => {
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch {
      Alert.alert(
        "Authenticate failed",
        "Unable to create user! Please check your credential and try again."
      );
    }
  }, []);

  return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />;
}
