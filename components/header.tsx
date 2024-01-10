import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { IconButton,Avatar } from 'react-native-paper';
import * as React from 'react';
import Menu from './menu';
import { useState } from 'react';
import {Svg, Path} from 'react-native-svg';

interface params {
title:String
navigation:any
}

function HeaderApp (props:params) {

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.header} >
      <TouchableOpacity style={{marginRight: 15}} onPress={toggleMenu}>
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <Path
            fill={'black'}
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
          />
        </Svg>
      </TouchableOpacity>
         <Menu isVisible={isMenuVisible} onClose={toggleMenu} navigation={props.navigation}/>
         
      <Text style={styles.title}>
        {props.title}
      </Text>
      <Avatar.Image size={24} source={require('./boy.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display:'flex',
    flexDirection: 'row',
    backgroundColor: '#3498db',
    padding:15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight:'40%'
  },
});

export default HeaderApp;