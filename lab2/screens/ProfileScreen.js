import styled from "styled-components/native";
import MenuItems from "../components/MenuItems";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ProfileWrapper = styled.View`
  align-items: center;
  margin-top: 25px;
  margin-bottom: 26px;
`;

const AvatarBox = styled.View`
  position: relative;
`;

const AvatarImage = styled.Image`
  width: 98px;
  height: 98px;
  border-radius: 49px;
`;

const OnlineStatusDot = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #35c759;
  border: 2px solid ${({ theme }) => theme.background};
`;

const UserNameText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-top: 10px;
`;

const UserRoleText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
`;

const ActionsWrapper = styled.View`
  margin-bottom: 20px;
`;

const AvatarSection = ({ imageSource, name, group }) => (
  <ProfileWrapper>
    <AvatarBox>
      <AvatarImage source={imageSource} />
      <OnlineStatusDot />
    </AvatarBox>
    <UserNameText>{name}</UserNameText>
    <UserRoleText>{group}</UserRoleText>
  </ProfileWrapper>
);

export default function ProfileScreen() {
  const { toggleTheme } = useContext(ThemeContext);

  const profileActions = [
    { id: 1, title: "Change Theme", onPress: toggleTheme },
    { id: 2, title: "Logout", onPress: () => console.log("Logout tapped") },
  ];

  return (
    <ScreenContainer>
      <AvatarSection
        imageSource={require("../assets/img/user-avatar.png")}
        name="Firstname Lastname"
        group="Group"
      />
      <ActionsWrapper>
        <MenuItems menuItems={profileActions} />
      </ActionsWrapper>
    </ScreenContainer>
  );
}
