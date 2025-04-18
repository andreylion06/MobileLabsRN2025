import { useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabsWrapper = styled.View`
  flex-direction: row;
  padding-left: 20px;
  align-items: center;
`;

const TabItem = styled.TouchableOpacity`
  background-color: ${({ isActive }) =>
    isActive ? "#00cfff" : "transparent"};
  padding: 7px 14px;
  border-radius: 10px;
  margin-right: 10px;
`;

const TabText = styled.Text`
  font-size: 14px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.buttonText : theme.textSecondary};
`;

const SearchButton = styled(Ionicons).attrs({
  name: "search-outline",
  size: 20,
})`
  color: ${({ theme }) => theme.textSecondary};
  margin-right: 10px;
`;

export default function FilterTabs({ tabs, onTabChange, showSearch = false }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelect = (tabLabel) => {
    setSelectedTab(tabLabel);
    if (onTabChange) {
      onTabChange(tabLabel);
    }
  };

  return (
    <TabsWrapper>
      {showSearch && (
        <TabItem isActive={false}>
          <SearchButton />
        </TabItem>
      )}
      <FlatList
        horizontal
        data={tabs}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabItem
            key={item}
            isActive={selectedTab === item}
            onPress={() => handleSelect(item)}
          >
            <TabText isActive={selectedTab === item}>{item}</TabText>
          </TabItem>
        )}
      />
    </TabsWrapper>
  );
}
