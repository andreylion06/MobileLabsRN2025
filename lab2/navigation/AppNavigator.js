import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "react-native";
import StoreScreen from "../screens/StoreScreen";
import CommunityScreen from "../screens/CommunityScreen";
import ChatScreen from "../screens/ChatScreen";
import SafetyScreen from "../screens/SafetyScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const icons = {
  Store: "shopping-bag",
  Community: "user",
  Chat: "comment",
  Safety: "shield-alt",
};

const getTabIcon = (routeName, color) => {
  if (routeName === "Profile") {
    return (
      <Image
        source={require("../assets/img/user-avatar.png")}
        style={{ width: 24, height: 24, borderRadius: 100 }}
      />
    );
  }

  const iconName = icons[routeName] || "circle";
  return <FontAwesome5 name={iconName} size={20} color={color} />;
};

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: ({ color }) => getTabIcon(route.name, color),
  tabBarActiveTintColor: "#fff",
  tabBarInactiveTintColor: "#888",
  tabBarStyle: {
    backgroundColor: "#202020",
    paddingBottom: 16,
    paddingTop: 8,
    paddingHorizontal: 12,
    borderTopWidth: 0,
    height: 72,
  },
});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Store" component={StoreScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Safety" component={SafetyScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
