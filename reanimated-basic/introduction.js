import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import { useEffect } from "react";

const SIZE = 100.0;

export default function App() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const handleRotation = (progress) => {
    "worklet";
    return `${progress.value * 2 * Math.PI}rad`;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    // repeat 3 times, reverse = true
    scale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.square, animatedStyle]}></Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    aspectRatio: 1,
    backgroundColor: "blue",
  },
});
