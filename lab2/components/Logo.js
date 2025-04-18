import { Image } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("../assets/img/steam-logo.png")}
      style={{
        width: 40,
        height: 40,
        resizeMode: "contain",
        tintColor: "#ffffff",
      }}
    />
  );
}
