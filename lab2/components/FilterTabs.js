// components/FilterTabs.js
import { useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";

const Container = styled.View`
  flex-direction: row;
  margin-left: 20px;
  margin-top: 8px;
`;

const Tab = styled.TouchableOpacity`
  background-color: ${({ active }) => (active ? "#2dcdf5" : "#2b2d3a")};
  padding: 8px 14px;
  border-radius: 10px;
  margin-right: 10px;
`;

const TabText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;

export default function FilterTabs({ tabs, onTabChange }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <Container>
      <FlatList
        data={tabs}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Tab active={activeTab === item} onPress={() => handleTabPress(item)}>
            <TabText>{item}</TabText>
          </Tab>
        )}
      />
    </Container>
  );
}
