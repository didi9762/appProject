import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ArrowContainer2 = () => {
  const marginAnim1 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateArrow();
  }, []);

  const getScreenWidth = () => {
    // Adjust this value based on your screen width requirements
    return Dimensions.get('screen').width; // Example value, replace with actual screen width
  };

  const animateArrow = () => {
    return Animated.loop(
      Animated.timing(marginAnim1, {
        toValue: getScreenWidth(),
        duration: 1500,
        delay:30,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };
  const minX =0; // Minimum x-value
  const maxX = 160; // Maximum x-value

  const interpolatedX = marginAnim1.interpolate({
    inputRange: [0, 600],
    outputRange: [minX, maxX],
  });

  function renderArrows(key) {
const clr = "rgb(33, 190, 243)"
const mr = key<8?-2:0
    return (
    <Animated.View key={key} style={{opacity:0.5, marginRight:mr,transform: [{ translateX: interpolatedX }, { translateY: -5 }]}}>
        <MaterialIcons name="double-arrow" color={clr} size={50}  />
      </Animated.View>
    );
  }

  const array = [1,2,3,4,5,6,7,8];

  return (
    <View style={styles.container}>
      {array.map((i) => renderArrows(i))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position:'absolute'
  },
});

export default ArrowContainer2;
