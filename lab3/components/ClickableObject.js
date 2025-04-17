import React from 'react';
import { StyleSheet, Image } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';

const ClickableObject = ({ onScore }) => {
  // Tap gesture
  const tap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .onEnd(() => onScore(1, 'tap'));

  // Double tap gesture
  const doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .onEnd(() => onScore(2, 'doubleTap'));

  // Long press gesture
  const longPress = Gesture.LongPress()
    .runOnJS(true)
    .minDuration(3000)
    .maxDistance(50)
    .onStart(() => onScore(3, 'longPress'));

  // Pan gesture
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onEnd(() => onScore(0, 'pan'));

  // Fling right gesture
  const flingRight = Gesture.Fling()
    .runOnJS(true)
    .direction(Directions.RIGHT)
    .onStart(() => {
      onScore(Math.floor(Math.random() * 10) + 1, 'swipeRight');
    });

  // Fling left gesture
  const flingLeft = Gesture.Fling()
    .runOnJS(true)
    .direction(Directions.LEFT)
    .onStart(() => {
      onScore(Math.floor(Math.random() * 10) + 1, 'swipeLeft');
    });

  // Pinch gesture
  const pinch = Gesture.Pinch()
    .runOnJS(true)
    .onEnd(() => onScore(14, 'pinch'));

  // Combine gestures
  const gestures = Gesture.Simultaneous(
    pinch,
    pan,
    flingRight,
    flingLeft,
    Gesture.Exclusive(doubleTap, tap, longPress)
  );

  return (
    <GestureDetector gesture={gestures}>
      <Image
        source={require('../assets/clickable.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
  },
});

export default ClickableObject;
