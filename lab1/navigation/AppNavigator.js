import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from '../screens/MainScreen';
import PhotoGalleryScreen from '../screens/PhotoGalleryScreen';
import ProfileScreen from '../screens/ProfileScreen';


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
                        else if (route.name === 'Фотогалерея') iconName = 'images';
                        else if (route.name === 'Профіль') iconName = 'person';

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#007AFF',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { backgroundColor: '#fff', paddingBottom: 10 },
                })}
            >
                <Tab.Screen name="Головна" component={MainScreen} />
                <Tab.Screen name="Фотогалерея" component={PhotoGalleryScreen} />
                <Tab.Screen name="Профіль" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;