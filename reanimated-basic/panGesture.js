import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 3.5;

const App = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({});

  const panGestureEvent = Gesture.Pan()
    .onStart((event) => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((e) => {
      translateX.value = context.value.x + e.translationX;
      translateY.value = context.value.y + e.translationY;
    })
    .onEnd(() => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.screen}>
      <View style={styles.circle}>
        <GestureDetector gesture={panGestureEvent}>
          <Animated.View style={[styles.square, animatedStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: CIRCLE_RADIUS,
    aspectRatio: 1,
    borderWidth: 5,
    borderColor: "blue",
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: SIZE,
    aspectRatio: 1,
    borderRadius: 15,
    backgroundColor: "blue",
    opacity: 0.8,
  },
});
