import { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import TabSwitch from "../components/TabSwitch";
import MenuItems from "../components/MenuItems";
import Header from "../components/Header";

const menuItems = [
  { id: 1, title: "Remove Authenticator", onPress: () => console.log("Remove Authenticator clicked") },
  { id: 2, title: "My Recovery Code", onPress: () => console.log("My Recovery Code clicked") },
  { id: 3, title: "Help", onPress: () => console.log("Help clicked") }
];

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #111111;
`;

const Title = styled.Text`
  font-size: 54px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  margin-top: 4px;
`;

const Subtitle = styled.Text`
  text-align: center;
  color: #bbbbbb;
  font-size: 14px;
  margin-top: 26px;
`;

const ProgressBar = styled.View`
  width: 157px;
  height: 7px;
  background-color: #222222;
  border-radius: 3.5px;
  margin-top: 11px;
  overflow: hidden;
`;

const Progress = styled.View`
  width: 70%;
  height: 100%;
  background-color: #1ab0f2;
`;

const Description = styled.Text`
  color: #e0e0e0;
  font-size: 14px;
  margin: 25px 20px 0;
`;

const Tip = styled.Text`
  color: #1ab0f2;
  font-size: 14px;
  margin: 14px 20px 24px;
`;

const GradientWrapper = styled.View`
  margin-top: 19px;
  height: 167px;
  width: 100%;
`;

const GradientBackground = styled(LinearGradient).attrs({
  colors: ["transparent", "#2a2a2a"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
`;

const CodeContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

const Strokes = styled(ImageBackground).attrs({
  resizeMode: "cover",
  source: require("../assets/img/stroke.png"),
})`
  width: 100%;
  height: 100%;
`;

const TintOverlay = styled.View`
  ${StyleSheet.absoluteFillObject}
  background-color: #000000;
  opacity: 0;
`;

const tabsList = ["Guard", "Confirmations"];

export default function SafetyScreen() {
  const [selectedTab, setSelectedTab] = useState(tabsList[0]);

  return (
    <ScreenContainer>
      <Header title="Safety" showSearch={false} />
      <TabSwitch tabs={tabsList} onTabChange={setSelectedTab} />
      <GradientWrapper>
        <GradientBackground>
          <Strokes>
            <TintOverlay />
            <CodeContainer>
              <Subtitle>Logged in as player</Subtitle>
              <Title>N5KCV</Title>
              <ProgressBar>
                <Progress />
              </ProgressBar>
            </CodeContainer>
          </Strokes>
        </GradientBackground>
      </GradientWrapper>
      <Description>
        You'll enter your code each time you enter your password to sign in to your Steam account.
      </Description>
      <Tip>
        Tip: If you don’t share your PC, you can select "Remember my password" when you sign in to the PC
        client to enter your password and authenticator code less often.
      </Tip>
      <MenuItems menuItems={menuItems} />
    </ScreenContainer>
  );
}
