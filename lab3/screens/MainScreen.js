import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ClickableObject from '../components/ClickableObject';

const MainScreen = () => {
  const [points, setPoints] = useState(0);

  const updatePoints = (value) => {
    setPoints((prevPoints) => prevPoints + value);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.counter}>Очки: {points}</Text>
      <ClickableObject onScore={updatePoints} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    fontSize: 28,
    marginBottom: 150,
  },
});

export default MainScreen;