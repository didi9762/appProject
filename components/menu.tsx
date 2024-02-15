import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import { Button, Text } from "react-native-elements";
import { useAtom } from "jotai";
import { userDetails } from "./profile/logOperation";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";


interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
  navigation: any;
}

const Menu: React.FC<MenuProps> = ({ isVisible, onClose, navigation}) => {
  const [userD] = useAtom(userDetails);
  const [groupUpdate,setGroupUpdate] = useState(false)
  const { height } = Dimensions.get("window");

useEffect(()=>{
 
},[])

  function itemClick(linkTo: string) {
    
  navigation.navigate(linkTo)
  }

  const updateIcon = ()=><View>

  </View>



  return (
    <Modal
      style={{ margin: 0, flex: 1 }}
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn={"slideInLeft"}
      animationOut={"slideOutLeft"}
      backdropOpacity={0.4}
      avoidKeyboard={true}
      deviceHeight={height + 120}
    >
      <View style={styles.modalStyle}>
        <View style={styles.optionContainer}>
          <Pressable
            style={styles.option}
            onPress={() => {
              if (userD !==null) {
                itemClick("ProfilePage");
                onClose();
              } else {
                console.log(userD);
                itemClick('LogIn')
                onClose();
              }
            }}
          >
            <Ionicons name="person-circle" size={30}/>
            <Text style={styles.textOption}>My Profile</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("HistoryPage");
              onClose();
            }}
          >
            <FontAwesome name="history" size={25}/> 
            <Text style={styles.textOption}>Tasks History</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("GroupsPage");
              onClose();
            }}
          >
            <FontAwesome name="group" size={25}/>
            <Text style={styles.textOption}>My Groups</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("Progress");
              onClose();
            }}
          >
            <MaterialCommunityIcons name="progress-clock" size={25}/>
            <Text style={styles.textOption}>{'Missions \nin progress'}</Text>
          </Pressable>

          <Pressable
          
            style={styles.option}
            onPress={() => {
              itemClick("settings"), onClose();
            }}
          >
            <Ionicons name="settings" size={25}/>
            <Text style={styles.textOption}>Settings</Text>
          </Pressable>

          <Button title={'button for dev:lead to join group page'} buttonStyle={{width:100,backgroundColor:'gray'}} onPress={()=>{navigation.navigate('Join',{token:'alice_johnson'});onClose()}}/>

         

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "white",
    width: "50%",
    height: "100%",
  },
  option: {
    display:'flex',
    flexDirection:'row',
    height: "13%",
    width: "80%",
    textAlign: "left",
    borderBottomColor: "black",
    // borderColor:'black',
    // borderWidth:0.5,
    borderBottomWidth: 0.5,
    borderStyle: "solid",
    marginBottom: 20,
  },
  optionContainer: {
    display: "flex",

    flexDirection: "column",
    // justifyContent:'space-between',
    alignContent: "center",
    alignItems: "center",
    marginTop: "40%",
  },
  textOption:{
    marginLeft:15,
    lineHeight:25,
    fontWeight:'900'
  }
});

export default Menu;
