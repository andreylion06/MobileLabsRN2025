import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

import StoreScreen from "../screens/StoreScreen";
import CommunityScreen from "../screens/CommunityScreen";
import ChatScreen from "../screens/ChatScreen";
import SafetyScreen from "../screens/SafetyScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            if (route.name === "Profile") {
              return (
                <Image
                  source={require("../assets/img/user-avatar.png")}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    borderWidth: color === theme.mainNavIconActive ? 2 : 0,
                    borderColor:
                      color === theme.mainNavIconActive ? theme.mainNavIconActive : "transparent",
                  }}
                />
              );
            }

            const icons = {
              Store: "shopping-bag",
              Community: "user",
              Chat: "comment",
              Safety: "shield-alt",
            };

            return (
              <FontAwesome5
                name={icons[route.name] || "circle"}
                size={20}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: theme.mainNavIconActive,
          tabBarInactiveTintColor: theme.mainNavIconInactive,
          tabBarStyle: {
            backgroundColor: theme.mainNavBackground,
            paddingBottom: 16,
            paddingTop: 8,
            paddingHorizontal: 12,
            borderTopWidth: 0,
            height: 72,
          },
        })}
      >
        <Tab.Screen name="Store" component={StoreScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Safety" component={SafetyScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
