import AuthContent from "../components/auth/AuthContent";
import { AuthContext } from "../store/authContext";
import { useCallback, useContext } from "react";
import { Alert } from "react-native";
import { signIn } from "../utils/auth";

export default function LoginScreen() {
  const { authenticate } = useContext(AuthContext);
  const signUpHandler = useCallback(async (email: string, password: string) => {
    try {
      const token = await signIn(email, password);
      authenticate(token);
    } catch {
      Alert.alert(
        "Authenticate failed",
        "Unable to log in! Please check your credential and try again."
      );
    }
  }, []);
  return <AuthContent isLogin={true} onAuthenticate={signUpHandler} />;
}
