import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import { Button, Text } from "react-native-elements";
import { useAtom } from "jotai";
import { baseurlAtom, userDetails } from "./profile/logOperation";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserInfo } from "./profile/updateUserInfo";

interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
  navigation: any;
}

const Menu: React.FC<MenuProps> = ({ isVisible, onClose, navigation }) => {
  const [userD, setUserD] = useAtom(userDetails);
  const [baseurl] = useAtom(baseurlAtom);
  const [newGroups,setNewGroups] = useState(false);
  const { height } = Dimensions.get("window");

  useEffect(() => {
    if(isVisible&&userD){
    async function getUpdates() {
      const groupsList = await AsyncStorage.getItem('group')
      const updates = await updateUserInfo(baseurl);
      setUserD({
        ...userD,
        tasksHistory: updates.tasksHistory,
        tasksInProgress: updates.tasksInProgress,
        group: updates.group,
      });
      if(groupsList&&groupsList.split(',').length<updates.group.length)
      {setNewGroups(true);
      }else{setNewGroups(false)}
    }
    getUpdates()}
  }, [isVisible]);

  function itemClick(linkTo: string) {
    navigation.navigate(linkTo);
  }

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
              if (userD !== null) {
                itemClick("ProfilePage");
                onClose();
              } else {
                itemClick("LogIn");
                onClose();
              }
            }}
          >
            <Ionicons name="person-circle" size={30} />
            <Text style={styles.textOption}>My Profile</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("HistoryPage");
              onClose();
            }}
          >
            <FontAwesome name="history" size={25} />
            <Text style={styles.textOption}>Tasks History</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("GroupsPage");
              onClose();
            }}
          >{newGroups? (
            <AntDesign
              name="exclamationcircle"
              size={25}
              color={"#ff6f00d5"}
              style={{ position: "absolute", right: 3, top: -5, zIndex: 2 }}
            />
          ) : null}
            <FontAwesome name="group" size={25} />
            <Text style={styles.textOption}>My Groups</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("Progress");
              onClose();
            }}
          >
            {userD?.tasksInProgress.length > 0 ? (
              <AntDesign
                name="exclamationcircle"
                size={25}
                color={"#ff6f00d5"}
                style={{ position: "absolute", right: 3, top: -5, zIndex: 2 }}
              />
            ) : null}
            <MaterialCommunityIcons name="progress-clock" size={25} />
            <Text style={styles.textOption}>{"Missions \nin progress"}</Text>
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("settings"), onClose();
            }}
          >
            <Ionicons name="settings" size={25} />
            <Text style={styles.textOption}>Settings</Text>
          </Pressable>

          <Button
            title={"button for dev:lead to join group page"}
            buttonStyle={{ width: 100, backgroundColor: "gray" }}
            onPress={() => {
              navigation.navigate("Join", { token: "alice_johnson" });
              onClose();
            }}
          />
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
    display: "flex",
    flexDirection: "row",
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
  textOption: {
    marginLeft: 15,
    lineHeight: 25,
    fontWeight: "900",
  },
});

export default Menu;
