import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';

const ClickableObject = ({ onScore }) => {
  // Shared values for animations
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const savedScale = useSharedValue(1);

  // Tap gesture
  const tap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .onStart(() => {
      scale.value = withSequence(withSpring(1.1), withSpring(1));
    })
    .onEnd(() => onScore(1, 'tap'));

  // Double tap gesture
  const doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .onStart(() => {
      scale.value = withSequence(withSpring(1.2), withSpring(1));
    })
    .onEnd(() => onScore(2, 'doubleTap'));

  // Long press gesture
  const longPress = Gesture.LongPress()
    .runOnJS(true)
    .minDuration(3000)
    .maxDistance(50)
    .onStart(() => {
      opacity.value = withSequence(
        withTiming(0.5, { duration: 200 }),
        withTiming(1, { duration: 200 })
      );
      onScore(3, 'longPress');
    });

  // Pan gesture
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      onScore(0, 'pan');
    });

  // Fling right gesture
  const flingRight = Gesture.Fling()
    .runOnJS(true)
    .direction(Directions.RIGHT)
    .onStart(() => {
      rotate.value = withSequence(
        withTiming(15, { duration: 100 }),
        withTiming(-15, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
      onScore(Math.floor(Math.random() * 10) + 1, 'swipeRight');
    });

  // Fling left gesture
  const flingLeft = Gesture.Fling()
    .runOnJS(true)
    .direction(Directions.LEFT)
    .onStart(() => {
      rotate.value = withSequence(
        withTiming(-15, { duration: 100 }),
        withTiming(15, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
      onScore(Math.floor(Math.random() * 10) + 1, 'swipeLeft');
    });

  // Pinch gesture
  const pinch = Gesture.Pinch()
    .runOnJS(true)
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      onScore(14, 'pinch');
    });

  // Combine gestures
  const gestures = Gesture.Simultaneous(
    pinch,
    pan,
    flingRight,
    flingLeft,
    Gesture.Exclusive(doubleTap, tap, longPress)
  );

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      { scale: scale.value },
      { rotateZ: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={gestures}>
      <Animated.Image
        source={require('../assets/clickable.png')}
        style={[styles.image, animatedStyle]}
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
