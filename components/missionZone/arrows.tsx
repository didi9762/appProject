import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ArrowContainer = () => {
  const marginAnim1 = useRef(new Animated.Value(0)).current;
  const marginAnim2 = useRef(new Animated.Value(3)).current;
  const marginAnim3 = useRef(new Animated.Value(7)).current;

  useEffect(() => {
    animateArrows();
  }, []);

  const getScreenWidth = () => {
    // Adjust this value based on your screen width requirements
    return 300; // Example value, replace with actual screen width
  };

  const animateArrow = (animatedValue) => {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: getScreenWidth(),
        duration: 1700,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
  };

  const animateArrows = () => {
    Animated.parallel([
      animateArrow(marginAnim1),
      animateArrow(marginAnim2),
      animateArrow(marginAnim3),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX: marginAnim1 }, { translateY: -5 }] }}>
        <MaterialIcons name="double-arrow" color="rgb(33, 100, 243)" size={50} />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateX: marginAnim2 }, { translateY: -5 }] }}>
        <MaterialIcons name="double-arrow" color="rgb(33, 100, 243)" size={50} />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateX: marginAnim3 }, { translateY: -5 }] }}>
        <MaterialIcons name="double-arrow" color="rgb(33, 100, 243)" size={50} />
      </Animated.View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    position: 'absolute',
  },
});

export default ArrowContainer;