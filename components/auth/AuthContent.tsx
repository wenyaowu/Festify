import { View, Pressable } from "react-native";
import { Text, Input, Button, makeStyles } from "@rneui/themed";
import { useState, useCallback } from "react";
import {createUser} from '../../utils/auth';


type Props = {
  isLogin: boolean
  onAuthenticate: ()=>void
}

export default function AuthContent({isLogin}:Props) {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const onShake = useCallback(() => {}, []);

  const onSubmit = useCallback(() => {
    createUser(email, password);
    console.log(email, password);
  }, [email, password]);
  return (
    <View style={styles.screenContainer}>
      <View style={styles.formContainer}>
        <Input
          label="Email Address"
          shake={onShake}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            shake={onShake}
            onChangeText={setConfirmedEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
        <Input
          label="Password"
          shake={onShake}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            shake={onShake}
            onChangeText={setConfirmedEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
        <Button title={isLogin ? "Log In" : "Sign Up"} onPress={onSubmit} />
        {/* <Pressable onPress={onSwitchAuthMode}>
          <Text style={styles.switchModeText}>{isLogin ? "Create a new user": "Sign In"}</Text>
        </Pressable> */}
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
    paddingTop:24,
    borderRadius:10,
    backgroundColor:theme.colors?.grey0
  },
  switchModeText: {
    marginTop: 12,
    alignSelf: "center",
    color:theme.colors?.white
  },
}));
