import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';

const BASE_DIR = FileSystem.documentDirectory + 'AppData/';

export default function FileManagerScreen({ navigation }) {
  const [currentPath, setCurrentPath] = useState(BASE_DIR);
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(true);
  const [inputName, setInputName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const loadDirectory = async (path) => {
    try {
      const dirContents = await FileSystem.readDirectoryAsync(path);
      setItems(dirContents);
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  const handleItemPress = async (itemName) => {
    const itemPath = currentPath + itemName;
    const itemInfo = await FileSystem.getInfoAsync(itemPath);

    if (itemInfo.isDirectory) {
      setCurrentPath(itemPath + '/');
    } else if (itemName.endsWith('.txt')) {
      navigation.navigate('EditFile', { filePath: itemPath });
    } else {
      Alert.alert('Info', 'This file type is not supported for viewing.');
    }
  };

  const goBack = () => {
    if (currentPath === BASE_DIR) return;
    const pathParts = currentPath.split('/').filter(Boolean);
    pathParts.pop();
    const newPath = pathParts.join('/') + '/';
    const baseIndex = newPath.indexOf('AppData');
    setCurrentPath(FileSystem.documentDirectory + newPath.substring(baseIndex));
  };


  const createFolder = async (name) => {
    try {
      const folderPath = currentPath + name;
      await FileSystem.makeDirectoryAsync(folderPath);
      loadDirectory(currentPath);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const createFile = async (name, content) => {
    try {
      const filePath = currentPath + name;
      await FileSystem.writeAsStringAsync(filePath, content);
      loadDirectory(currentPath);
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  const openModal = (isFolder) => {
    setIsCreatingFolder(isFolder);
    setInputName('');
    setFileContent('');
    setModalVisible(true);
  };

  const handleCreate = () => {
    if (!inputName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    if (isCreatingFolder) {
      createFolder(inputName.trim());
    } else {
      createFile(inputName.trim().endsWith('.txt') ? inputName.trim() : inputName.trim() + '.txt', fileContent);
    }
    setModalVisible(false);
  };

  const confirmDelete = (itemName) => {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete "${itemName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteItem(itemName) },
      ]
    );
  };

  const deleteItem = async (itemName) => {
    const itemPath = currentPath + itemName;
    try {
      const itemInfo = await FileSystem.getInfoAsync(itemPath);
      if (itemInfo.isDirectory) {
        await FileSystem.deleteAsync(itemPath, { idempotent: true });
      } else {
        await FileSystem.deleteAsync(itemPath);
      }
      loadDirectory(currentPath);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const showInfo = async (itemName) => {
    const itemPath = currentPath + itemName;
    try {
      const info = await FileSystem.getInfoAsync(itemPath, { size: true });
      if (info.exists) {
        setFileInfo({
          name: itemName,
          isDirectory: info.isDirectory,
          size: info.size,
          modificationTime: info.modificationTime,
          extension: itemName.includes('.') ? itemName.split('.').pop() : 'Folder',
        });
        setInfoModalVisible(true);
      }
    } catch (error) {
      console.error('Error getting file info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} disabled={currentPath === BASE_DIR}>
          <Text style={[styles.backButton, currentPath === BASE_DIR && styles.disabled]}>⬅️ Back</Text>
        </TouchableOpacity>
        <Text style={styles.pathText}>{currentPath.replace(BASE_DIR, 'AppData/')}</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity
              onPress={() => handleItemPress(item)}
              style={styles.itemTextContainer}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showInfo(item)} style={styles.infoButton}>
              <Text style={styles.infoButtonText}>ℹ️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDelete(item)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No files or folders</Text>}
      />

      <View style={styles.buttonRow}>
        <Button title="Create Folder" onPress={() => openModal(true)} />
        <Button title="Create File" onPress={() => openModal(false)} />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isCreatingFolder ? 'Create Folder' : 'Create File'}</Text>
            <TextInput
              placeholder="Enter name"
              value={inputName}
              onChangeText={setInputName}
              style={styles.input}
            />
            {!isCreatingFolder && (
              <TextInput
                placeholder="Enter file content"
                value={fileContent}
                onChangeText={setFileContent}
                multiline
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              />
            )}
            <Button title="Create" onPress={handleCreate} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={infoModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {fileInfo && (
              <>
                <Text style={styles.modalTitle}>File Info</Text>
                <Text>Name: {fileInfo.name}</Text>
                <Text>Type: {fileInfo.isDirectory ? 'Folder' : fileInfo.extension + ' File'}</Text>
                <Text>Size: {fileInfo.size} bytes</Text>
                <Text>Last Modified: {new Date(fileInfo.modificationTime * 1000).toLocaleString()}</Text>
              </>
            )}
            <Button title="Close" onPress={() => setInfoModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backButton: { marginRight: 10, color: 'blue' },
  disabled: { color: 'gray' },
  pathText: { fontWeight: 'bold', flexShrink: 1 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTextContainer: {
    flex: 1,
  },
  deleteButton: {
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    fontSize: 18,
    color: 'red',
  },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  empty: { textAlign: 'center', marginTop: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginBottom: 10 },
  infoButton: {
    paddingHorizontal: 10,
  },
  infoButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
