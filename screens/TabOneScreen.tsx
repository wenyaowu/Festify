import { View } from "react-native";
import { makeStyles } from "@rneui/themed";
import { RootTabScreenProps } from "../types";
import SpotifyButton from "../components/spotify/SpotifyButton";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const styles = useStyles();
  
  return (
    <View style={styles.container}>
      <SpotifyButton/>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
}));
