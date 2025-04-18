import { useState } from "react";
import styled from "styled-components/native";
import { View, FlatList } from "react-native";
import Header from "../components/Header";
import GameCard from "../components/GameCard";
import FilterTabs from "../components/FilterTabs";
import GameItem from "../components/GameItem";

const featuredGame = {
  title: "ELDEN RING",
  subtitle: "Recommended based on your preferences",
  discount: "-25%",
  price: "$60",
  discountedPrice: "$45",
  image: require("../assets/img/elden-ring.png"),
  icons: [require("../assets/img/windows-icon.png")],
};

const gameList = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    platform: "Windows",
    price: "$59",
    discount: "-35%",
    discountedPrice: "$38",
    image: require("../assets/img/cyberpunk.png"),
    icons: [require("../assets/img/windows-icon.png")],
  },
  {
    id: 2,
    title: "Stardew Valley",
    platform: "Windows, Mac",
    price: "$15",
    image: require("../assets/img/stardew.png"),
    icons: [
      require("../assets/img/windows-icon.png"),
      require("../assets/img/mac-icon.png"),
    ],
  },
  {
    id: 3,
    title: "The Witcher 3: Wild Hunt",
    platform: "Windows",
    price: "$30",
    discount: "-60%",
    discountedPrice: "$12",
    image: require("../assets/img/witcher3.png"),
    icons: [require("../assets/img/windows-icon.png")],
  },
  {
    id: 4,
    title: "Hollow Knight",
    platform: "Windows",
    price: "$10",
    image: require("../assets/img/hollow-knight.png"),
    icons: [require("../assets/img/windows-icon.png")],
  },
];

const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ListWrapper = styled.View`
  margin-top: 28px;
`;

export default function StoreScreen() {
  const [featuredList, setFeaturedList] = useState([featuredGame]);
  const [storeItems, setStoreItems] = useState(gameList);
  const [loadingMoreFeatured, setLoadingMoreFeatured] = useState(false);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);

  const loadMoreFeatured = () => {
    if (loadingMoreFeatured) return;
    setLoadingMoreFeatured(true);
    setTimeout(() => {
      setFeaturedList((prev) => [...prev, featuredGame]);
      setLoadingMoreFeatured(false);
    }, 1500);
  };

  const loadMoreStoreItems = () => {
    if (loadingMoreItems) return;
    setLoadingMoreItems(true);
    setTimeout(() => {
      setStoreItems((prev) => [...prev, ...gameList]);
      setLoadingMoreItems(false);
    }, 1500);
  };

  return (
    <ScreenWrapper>
      <Header title="Store" showSearch />
      <FlatList
        data={featuredList}
        keyExtractor={(item, index) => `featured-${index}`}
        renderItem={({ item }) => (
          <View style={{ marginRight: 18 }}>
            <GameCard gameData={item} />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={loadMoreFeatured}
        onEndReachedThreshold={0.5}
        style={{
          marginTop: 18,
          marginLeft: 20,
          minHeight: 230,
        }}
      />

      <ListWrapper>
        <FilterTabs
          tabs={["Top Sellers", "Free to Play", "Early Access", "Action"]}
        />
        <FlatList
          data={storeItems}
          keyExtractor={(item, index) => `store-${index}`}
          renderItem={({ item }) => <GameItem game={item} />}
          onEndReached={loadMoreStoreItems}
          onEndReachedThreshold={0.5}
          style={{ marginTop: 16 }}
        />
      </ListWrapper>
    </ScreenWrapper>
  );
}
