import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TasksScreen() {
    return (
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    }
});