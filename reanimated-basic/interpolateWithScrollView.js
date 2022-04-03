import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "./components/Page";

const WORDS = ["I Love", "React", "Native"];
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const App = () => {
  const translateX = useSharedValue(0);
  // Allows to access the scroll event
  const scrollHandler = useAnimatedScrollHandler((e) => {
    translateX.value = e.contentOffset.x;
    console.log(translateX.value);
  });

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      style={{ flex: 1 }}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      decelerationRate={"fast"}
    >
      {WORDS.map((title, index) => {
        return (
          <Page
            title={title}
            index={index}
            key={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({});
