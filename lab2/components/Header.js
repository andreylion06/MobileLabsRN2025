import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "./Logo";

const HeaderWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background-color: #1a1a1a;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ScreenHeading = styled.Text`
  color: #ffffff;
  font-size: 26px;
  font-weight: 500;
  margin-left: 8px;
`;

const SearchButton = styled(Ionicons).attrs({
  name: "search-outline",
  size: 24,
})`
  color: #cccccc;
`;

export default function Header({ title, showSearch = true }) {
  return (
    <HeaderWrap>
      <HeaderLeft>
        <Logo />
        <ScreenHeading>{title}</ScreenHeading>
      </HeaderLeft>
      {showSearch && <SearchButton />}
    </HeaderWrap>
  );
}
