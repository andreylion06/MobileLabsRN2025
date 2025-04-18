import { Image } from "react-native";
import { useTheme } from "styled-components/native";

export default function Logo() {
  const theme = useTheme();

  return (
    <Image
      source={require("../assets/img/steam-logo.png")}
      style={{
        width: 40,
        height: 40,
        resizeMode: "contain",
        tintColor: theme.text,
      }}
    />
  );
}
