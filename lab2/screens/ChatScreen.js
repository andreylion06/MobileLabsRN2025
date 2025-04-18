import { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Header from "../components/Header";
import TabSwitch from "../components/TabSwitch";
import ChatItem from "../components/ChatItem";

const initialChats = [
  {
    id: "1",
    username: "SkyKnight",
    lastMessage: "Joining now!",
    date: "15 Jul",
    avatar: require("../assets/img/avatar-1.png"),
    isOnline: true,
    isSeenRecently: false,
    isLastMessageYours: false,
    unreadMessagesCount: 2,
  },
  {
    id: "2",
    username: "ShadowRider",
    lastMessage: "Cool, let's start",
    date: "14 Jul",
    avatar: require("../assets/img/avatar-2.png"),
    isOnline: false,
    isSeenRecently: true,
    isLastMessageYours: true,
    unreadMessagesCount: 0,
  },
  {
    id: "3",
    username: "NovaBlitz",
    lastMessage: "Sent you the invite",
    date: "13 Jul",
    avatar: require("../assets/img/avatar-3.png"),
    isOnline: true,
    isSeenRecently: false,
    isLastMessageYours: false,
    unreadMessagesCount: 1,
  },
];

const ScreenWrapper = styled.View`
  flex: 1;
  background-color: #111111;
`;

const tabs = ["Open chats", "My friends"];

export default function ChatScreen() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [chatData, setChatData] = useState(initialChats);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreChats = () => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      const newChats = initialChats.map((chat, i) => ({
        ...chat,
        id: `${chat.id}-${Date.now()}-${i}`,
      }));
      setChatData((prev) => [...prev, ...newChats]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ScreenWrapper>
      <Header title="Chat" showSearch={true} />
      <TabSwitch tabs={tabs} onTabChange={setSelectedTab} />
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem chat={item} />}
        onEndReached={fetchMoreChats}
        onEndReachedThreshold={0.5}
        style={{ marginTop: 12 }}
      />
    </ScreenWrapper>
  );
}
