import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList, View } from "react-native";

const OptionButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 18px 20px;
  margin: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
  border-top-left-radius: ${({ isFirst }) => (isFirst ? "10px" : "0px")};
  border-top-right-radius: ${({ isFirst }) => (isFirst ? "10px" : "0px")};
  border-bottom-left-radius: ${({ isLast }) => (isLast ? "10px" : "0px")};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? "10px" : "0px")};
`;

const OptionLabel = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

export default function MenuItems({ menuItems }) {
  return (
    <View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <OptionButton
            onPress={item.onPress}
            isFirst={index === 0}
            isLast={index === menuItems.length - 1}
          >
            <OptionLabel>{item.title}</OptionLabel>
            <FontAwesome name="angle-right" size={18} color="#aaaaaa" />
          </OptionButton>
        )}
      />
    </View>
  );
}
