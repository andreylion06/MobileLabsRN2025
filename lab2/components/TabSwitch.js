import { useState } from "react";
import styled, { useTheme } from "styled-components/native";

const SwitchWrapper = styled.View`
  flex-direction: row;
  padding: 3px;
  border-radius: 10px;
  margin: 0 18px;
  background-color: ${({ isLight }) => (isLight ? "#e4e4e4" : "#2c2c2c")};
`;

const TabItemBtn = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding-vertical: 6px;
  border-radius: 8px;
  background-color: ${({ selected, isLight, theme }) =>
    selected
      ? isLight
        ? "#ffffff"
        : theme.textHighlight + "22"
      : "transparent"};
`;

const TabLabel = styled.Text`
  color: ${({ selected, isLight, theme }) => {
    if (selected) return isLight ? "#000000" : theme.textHighlight;
    return isLight ? "#4a4a4a" : theme.textSecondary;
  }};
  font-size: 14px;
  font-weight: 500;
`;

export default function TabSwitch({ tabs, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const theme = useTheme();
  const isLight = theme.background === "#f4f4f4";

  const onTabPress = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <SwitchWrapper isLight={isLight}>
      {tabs.map((tab) => (
        <TabItemBtn
          key={tab}
          selected={selectedTab === tab}
          isLight={isLight}
          onPress={() => onTabPress(tab)}
        >
          <TabLabel selected={selectedTab === tab} isLight={isLight}>
            {tab}
          </TabLabel>
        </TabItemBtn>
      ))}
    </SwitchWrapper>
  );
}
