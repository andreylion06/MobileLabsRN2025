import { useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, FlatList } from "react-native";
import Header from "../components/Header";
import FilterTabs from "../components/FilterTabs";
import PostItem from "../components/PostItem";

const posts = [
  {
    id: 1,
    username: "SteamInsider",
    avatar: require("../assets/img/avatar-1.png"),
    timestamp: "2 days ago • 11:45 am",
    isNews: true,
    image: require("../assets/img/factorio.png"),
    title: "New Factorio expansion lets you automate alien diplomacy",
    description:
      "Developers tease experimental features allowing players to negotiate with native species for the first time.",
    likes: 417,
    comments: 23,
  },
  {
    id: 2,
    username: "SteamInsider",
    avatar: require("../assets/img/avatar-1.png"),
    timestamp: "Yesterday • 5:10 pm",
    isNews: false,
    image: require("../assets/img/horizon.png"),
    title: "Horizon Zero Dawn mod brings ray tracing to the wilds",
    description:
      "A new fan mod overhauls the lighting system and adds photorealistic weather to Aloy's journey.",
    likes: 802,
    comments: 47,
  },
];

const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Subtext = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: -8px;
  margin-bottom: 20px;
  padding: 0 18px;
`;

const CenterLoader = styled.View`
  padding: 18px;
  align-items: center;
`;

export default function CommunityScreen() {
  const [feedData, setFeedData] = useState(posts);
  const [isFetching, setIsFetching] = useState(false);

  const loadMorePosts = () => {
    if (isFetching) return;
    setIsFetching(true);

    setTimeout(() => {
      const newPosts = posts.map((post) => ({
        ...post,
        id: `${post.id}-${Date.now()}`
      }));
      setFeedData((current) => [...current, ...newPosts]);
      setIsFetching(false);
    }, 1200);
  };

  return (
    <ScreenWrapper>
      <Header title="Community" showSearch={false} />
      <Subtext>Community and official content for all gamers and software</Subtext>
      <FilterTabs
        tabs={["All", "Screenshots", "Artwork", "Workshop"]}
        showSearch={true}
      />
      <FlatList
        data={feedData}
        keyExtractor={(item) => `post-${item.id}`}
        renderItem={({ item }) => <PostItem post={item} />}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          isFetching && (
            <CenterLoader>
              <ActivityIndicator size="small" color="#999" />
            </CenterLoader>
          )
        }
        style={{ marginTop: 18 }}
      />
    </ScreenWrapper>
  );
}
