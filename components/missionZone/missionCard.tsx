import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated, Easing, Dimensions } from "react-native";
import { Button, PricingCard } from "react-native-elements";
import { userDetails } from "../profile/logOperation";
import { useAtom } from "jotai";
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
import ArrowContainer2 from "./arrows2";
import { Task } from "../types/types";


interface props {
  info:Task,
  takeMission:(id:string)=>void
}

export default function MassionCard({ info, takeMission }:props) {
  const marginAnim1 = useRef(new Animated.Value(0)).current;
  const marginAnim2 = useRef(new Animated.Value(20)).current;
  const marginAnim3 = useRef(new Animated.Value(40)).current;
  const [userD] = useAtom(userDetails);
  const saveForUser = info.saved === userD.userName;

  useEffect(() => {
    animateArrows();
  }, [info]);

  const getScreenWidth = () => {
    return Dimensions.get('window').width;
  };

  const animateArrow = (animatedValue) => {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: getScreenWidth(),
        duration: 2000,
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

  function handleSave() {
    takeMission(info.id);
  }

  return (
    <View
      style={{
        width: "85%",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      
      {info.sender ? (
        <View>
          
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-around' }}>
            {info.wehicleType==='car'?
            <Icon name={'car'} size={30} color={'blue'} />:
            info.wehicleType==='motor'?
            <Icon name={'motorcycle'} size={30} color={'blue'} />:
            info.wehicleType==='station'?
            <MaterialCommunityIcons name="car-estate" size={30} color={'blue'}/>:null}
            <Text style={{ fontSize: 20 }}>{'internal || inter state task'}</Text>
          </View>

          <Text style={styles.header}>{`from: ${info.senderAddress}`}</Text>
          <Text style={styles.text}>{`to: ${info.address}`}</Text>
          <Text style={styles.text}>{`${info.price} ₪`}</Text>

          <View style={{ backgroundColor: '#2196F3' }}>
            
            <TouchableOpacity onPress={()=>{info.open?handleSave():null}}>
              {info.open ?
              
               <ArrowContainer2/> 
               : null}
              <Text style={styles.buttonText}>{info.open
                ? "Take It"
                : saveForUser
                  ? "You hold the mission"
                  : "Mission On Hold"}</Text>
              
            </TouchableOpacity>
            <View style={{backgroundColor:'white',position:'absolute',width:15,height:40,right:-15}}></View>
            <View style={{backgroundColor:'white',position:'absolute',width:15,height:40,left:-15}}></View>
          </View>
          
          <View style={{backgroundColor:'white',position:'absolute',width:30,height:'100%',right:-45}}></View>
          <View style={{backgroundColor:'white',position:'absolute',width:30,height:'100%',left:-45}}></View>
        </View>
      ) : (
        <Text>no missions</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    padding: 8,
    borderRadius: 4,
    textAlign: "center",
    color: "white",
    fontWeight: '400',
    fontSize: 18,
    position:'relative'
  },
  header: { fontSize: 30, textAlign: 'center' },
  text: { fontSize: 25, textAlign: 'center' },
  titleCard: { fontSize: 30, textAlign: 'center' },
});
