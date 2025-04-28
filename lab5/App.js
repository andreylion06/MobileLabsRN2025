import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FileManagerScreen from './screens/FileManagerScreen';
import * as FileSystem from 'expo-file-system';

const Stack = createNativeStackNavigator();
const APP_DATA_DIR = FileSystem.documentDirectory + 'AppData/';

export default function App() {
  useEffect(() => {
    initializeAppDataDirectory();
  }, []);

  const initializeAppDataDirectory = async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(APP_DATA_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(APP_DATA_DIR, { intermediates: true });
      }
    } catch (error) {
      console.error('Error while initializing AppData directory:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FileManager" component={FileManagerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
