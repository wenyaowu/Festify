import { useEffect , useCallback} from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Image } from "@rneui/themed";

WebBrowser.maybeCompleteAuthSession();

export default function SpotifyButton() {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };
  const authRequest = {
    responseType: ResponseType.Token,
    clientId: "1c281bccb78b432ca0feb52f6d9b30ff",
    scopes: [
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "user-modify-playback-state",
      "streaming",
      "user-read-email",
      "user-read-private",
    ],
    // In order to follow the "Authorization Code Flow"
    // to fetch token after authorizationEndpoint
    // this must be set to false
    usePKCE: false,
    redirectUri: "exp://127.0.0.1:19000/",
  };

  const [request, response, promptAsync] = useAuthRequest(
    authRequest,
    discovery
  );

  const connectSpotifyHandler = useCallback(()=>{
    promptAsync();
  },[promptAsync]);

  useEffect(() => {
    if (response?.type === "success") {
      console.log('token', response.authentication?.accessToken);
    }
  }, [response]);
  return (
    <Image
      style={{ width: 140, height: 42 }}
      source={require("../../assets/images/spotify.png")}
      onPress={connectSpotifyHandler}
    />
  );
}
