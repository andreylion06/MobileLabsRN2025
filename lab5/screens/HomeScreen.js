import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen({ navigation }) {
  const [storageInfo, setStorageInfo] = useState(null);

  useEffect(() => {
    getStorageInfo();
  }, []);

  const getStorageInfo = async () => {
    try {
      const info = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      setStorageInfo({ free: info, total: total });
    } catch (error) {
      console.error('Error fetching storage info:', error);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!storageInfo) {
    return (
      <View style={styles.container}>
        <Text>Loading storage info...</Text>
      </View>
    );
  }

  const used = storageInfo.total - storageInfo.free;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storage Information</Text>
      <Text>Total: {formatBytes(storageInfo.total)}</Text>
      <Text>Used: {formatBytes(used)}</Text>
      <Text>Free: {formatBytes(storageInfo.free)}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Go to File Manager" onPress={() => navigation.navigate('FileManager')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
