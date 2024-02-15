import SwipeButton from "rn-swipe-button";
import React, { useEffect, useState, useRef } from "react";
import { View, Switch, StyleSheet, Animated, Easing } from "react-native";
import { useAtom } from "jotai";
import { userDetails } from "../profile/logOperation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

interface props {
  onlineFunc: () => void;
  oflineFunc: () => void;
}

const Btn = ({ onlineFunc, oflineFunc }: props) => {
  const [state, setState] = useState(false);
  const [userD] = useAtom(userDetails);
  let forceResetLastButton = null;
  const navigation = useNavigation();

  useEffect(() => {  
    if (!userD) {
      navigation.navigate("LogIn");
    } else {
      setState(userD.online);
    }
  }, [userD]);
  function IconElement() {
    return (
      <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <MaterialIcons
        name="double-arrow"
        size={40}
        color={!state?"rgb(33, 100, 243)":'rgba(107, 33, 33, 0.922)'}
      /></View>
    );
  }
  async function handleSwipe() {
    if (!userD.online) {
      await onlineFunc();
    } else {
      await oflineFunc();
    }
    forceResetLastButton && forceResetLastButton();
    setState(!state);
  }

  return (
    <View style={styles.container}>
      <SwipeButton
        width={300}
        height={50}
        thumbIconComponent={IconElement}
        titleStyles={{ color: "white", fontWeight: "900" }}
        railBorderColor="white"
        disableResetOnTap
        forceReset={(reset) => {
          forceResetLastButton = reset;
        }}
        thumbIconStyles={{borderWidth:5}}
        railFillBackgroundColor={state?"rgb(33, 100, 243)":'rgba(245, 168, 168, 0.871)'}
        thumbIconBackgroundColor={!state?"rgb(33, 190, 243)":'rgba(245, 142,142, 0.871)'}
        railBackgroundColor={!state?"rgb(33, 150, 243)":'rgba(245, 168, 168, 0.871)'}
        thumbIconBorderColor={!state?"rgb(33, 150, 243)":'rgba(245, 168, 168, 0.871)'}
        title={!state ? "Go Online" : "Go Offline"}
        swipeSuccessThreshold={80}
        onSwipeSuccess={handleSwipe}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Btn;
