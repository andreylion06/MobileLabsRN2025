import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';

const APP_DATA_DIR = FileSystem.documentDirectory + 'AppData/';

export default function App() {
  useEffect(() => {
    initializeAppDataDirectory();
  }, []);

  const initializeAppDataDirectory = async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(APP_DATA_DIR);
      if (!dirInfo.exists) {
        console.log('AppData directory does not exist, creating...');
        await FileSystem.makeDirectoryAsync(APP_DATA_DIR, { intermediates: true });
        console.log('AppData directory created successfully');
      } else {
        console.log('AppData directory already exists');
      }
    } catch (error) {
      console.error('Error while initializing AppData directory:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to File Manager App!</Text>
    </View>
  );
}
