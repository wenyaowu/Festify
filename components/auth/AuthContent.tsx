import { Input, Button, makeStyles } from "@rneui/themed";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable, Alert } from "react-native";
import { useState, useCallback } from "react";

type Props = {
  isLogin: boolean;
  onAuthenticate: (email: string, password: string) => void;
};

export default function AuthContent({ isLogin, onAuthenticate }: Props) {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmedEmail: false,
    confirmedPassword: false,
  });
  const onShake = useCallback(() => {}, []);
  const navigation = useNavigation();
  const switchAuthModeHandler = useCallback(() => {
    if (isLogin) {
      navigation.replace("SignUp");
    } else {
      navigation.replace("LogIn");
    }
  }, [isLogin]);

  const onSubmit = useCallback(() => {
    const isEmail = validator.isEmail(email);
    const isStrongPassword = password.length >= 6;
    const emailsAreMatched = email === confirmedEmail;
    const passwordAreMatched = password === confirmedPassword;

    if (
      !isEmail ||
      !isStrongPassword ||
      (!isLogin && (!emailsAreMatched || !passwordAreMatched))
    ) {
      // TODO[FEATURE]: handler form errors
      setCredentialsInvalid({
        email: !isEmail,
        confirmedEmail: !isEmail || !emailsAreMatched,
        password: !isStrongPassword,
        confirmedPassword: !isStrongPassword || !passwordAreMatched,
      });
      return;
    }

    onAuthenticate(email, password);
  }, [email, password, onAuthenticate]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.formContainer}>
        <Input
          label="Email Address"
          shake={onShake}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.formInputText}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            shake={onShake}
            onChangeText={setConfirmedEmail}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.formInputText}
          />
        )}
        <Input
          label="Password"
          shake={onShake}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          style={styles.formInputText}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            shake={onShake}
            onChangeText={setConfirmedEmail}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            style={styles.formInputText}
          />
        )}
        <Button title={isLogin ? "Log In" : "Sign Up"} onPress={onSubmit} />
        <Button
          onPress={switchAuthModeHandler}
          titleStyle={styles.switchModeText}
          type="clear"
          title={isLogin ? "Create a new user" : "Sign In"}
        />
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  screenContainer: {
    flex: 1,
  },
  formContainer: {
    marginHorizontal: 36,
    marginTop: 64,
    padding: 16,
    paddingTop: 24,
    borderRadius: 10,
    backgroundColor: theme.colors?.grey0,
  },
  formInputText: { color: theme.colors?.white },
  switchModeText: {
    marginTop: 12,
    alignSelf: "center",
    color: theme.colors?.white,
  },
}));
