import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function EditFileScreen({ route, navigation }) {
  const { filePath } = route.params;
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    loadFileContent();
  }, []);

  const loadFileContent = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        setContent(fileContent);
        const parts = filePath.split('/');
        setFileName(parts[parts.length - 1]);
      } else {
        Alert.alert('Error', 'File does not exist.');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const saveChanges = async () => {
    try {
      await FileSystem.writeAsStringAsync(filePath, content);
      Alert.alert('Success', 'File saved successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fileName}</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.textInput}
      />
      <Button title="Save Changes" onPress={saveChanges} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
});
