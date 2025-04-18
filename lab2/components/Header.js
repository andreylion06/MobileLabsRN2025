import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "./Logo";

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background-color: ${({ theme }) => theme.background};
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ScreenHeading = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 26px;
  font-weight: 500;
  margin-left: 8px;
`;

const SearchButton = styled(Ionicons).attrs({
  name: "search-outline",
  size: 24,
})`
  color: ${({ theme }) => theme.textSecondary};
`;

export default function Header({ title, showSearch = true }) {
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <Logo />
        <ScreenHeading>{title}</ScreenHeading>
      </HeaderLeft>
      {showSearch && <SearchButton />}
    </HeaderWrapper>
  );
}
