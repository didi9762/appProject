import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';
import { userDetails } from './profile/logOperation';
import { useAtom } from 'jotai';
import Menu from './menu';

interface params {
  title: string;
  navigation: any;
}

function HeaderApp(props: params) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const animatedValues = useRef(new Animated.Value(0)).current;
  const [userD] = useAtom(userDetails)

  useEffect(() => { 
    animatedLetter();
  }, [userD]);

  const animatedLetter = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValues, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValues, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const toggleMenu = () => {

    setMenuVisible(!isMenuVisible);
    
  };

  const renderTitle = () => {
    const titleArray = userD&&userD.online?'Online'.split(''):'Offline'.split('');
    return titleArray.map((letter, index) => (
      <Animated.Text
        key={index}
        style={!userD||!userD.online?[styles.title,{color:'white'}]:[
          styles.title,
          {
            color: animatedValues.interpolate({
              inputRange: [0, 1],
              outputRange: ['#fff', 'blue'],
            }),
          },
        ]}
      >
        {letter}
      </Animated.Text>
    ));
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={{ marginRight: 15 }} onPress={toggleMenu}>
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <Path fill={'black'} d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </Svg>
      </TouchableOpacity>
      <Menu isVisible={isMenuVisible} onClose={toggleMenu} navigation={props.navigation}/>
      <View style={{display:'flex',flexDirection:'row'}}>
      {renderTitle()}
      </View>
      <Avatar.Image size={24} source={require('./boy.png')}  />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#3498db',
    padding: 15,
    justifyContent:'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HeaderApp;
