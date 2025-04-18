import { useState } from "react";
import styled from "styled-components/native";

const SwitchWrapper = styled.View`
  flex-direction: row;
  background-color: #2c2c2c;
  padding: 3px;
  border-radius: 10px;
  margin: 0 18px;
`;

const TabItemBtn = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding-vertical: 6px;
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? "#ffffff11" : "transparent")};
`;

const TabLabel = styled.Text`
  color: ${({ selected }) => (selected ? "#ffffff" : "#999999")};
  font-size: 14px;
  font-weight: 500;
`;

export default function TabSwitch({ tabs, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const onTabPress = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <SwitchWrapper>
      {tabs.map((tab) => (
        <TabItemBtn key={tab} selected={selectedTab === tab} onPress={() => onTabPress(tab)}>
          <TabLabel selected={selectedTab === tab}>{tab}</TabLabel>
        </TabItemBtn>
      ))}
    </SwitchWrapper>
  );
}
