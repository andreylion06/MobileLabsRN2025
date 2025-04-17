import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from '../screens/MainScreen';
import TasksScreen from '../screens/TasksScreen';


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Головна') iconName = 'home';
                        else if (route.name === 'Завдання') iconName = 'list';

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#007AFF',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { backgroundColor: '#fff', paddingBottom: 10 },
                })}
            >
                <Tab.Screen name="Головна" component={MainScreen} />
                <Tab.Screen name="Завдання" component={TasksScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
