import styled from "styled-components/native";
import MenuItems from "../components/MenuItems";

const profileActions = [
  { id: 1, title: "Change Theme", onPress: () => console.log("Change Theme tapped") },
  { id: 2, title: "Logout", onPress: () => console.log("Logout tapped") },
];

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #111111;
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
  border: 2px solid #111111;
`;

const UserNameText = styled.Text`
  font-size: 16px;
  color: #ffffff;
  margin-top: 10px;
`;

const UserRoleText = styled.Text`
  font-size: 16px;
  color: #cccccc;
`;

const ActionsWrapper = styled.View`
  margin-bottom: 20px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #00c896;
  padding: 10px 20px;
  border-radius: 8px;
  margin: 0 20px;
  align-items: center;
  justify-content: center;
`;

const ActionLabel = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
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
