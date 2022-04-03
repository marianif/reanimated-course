import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

// Change opacity base on page index

const { height, width } = Dimensions.get("screen");
const SIZE = width * 0.7;

const Page = ({ title, index, translateX }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0]
    );

    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: scale }],
      borderRadius: borderRadius,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-2, 1, -2]
    );

    const translateY = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [height * 0.7, 0, -height * 0.7],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
      transform: [{ translateY: translateY }],
    };
  });

  return (
    <View
      title={title}
      index={index}
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0, 256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, animatedStyle]}>
        <Animated.View style={animatedText}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: SIZE,
    aspectRatio: 1,
    backgroundColor: "rgba(0,0,256,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 60,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "700",
  },
});
