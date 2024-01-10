import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import { Text } from "react-native-elements";
import { useAtom } from "jotai";
import { userDetails } from "./profile/logOperation";

interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
  navigation: any;
}

const Menu: React.FC<MenuProps> = ({ isVisible, onClose, navigation }) => {
  const [userD] = useAtom(userDetails);
  const { height } = Dimensions.get("window");
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
              if (userD.name !== "") {
                itemClick("ProfilePage");
                onClose();
              } else {
                console.log(userD.name);
                itemClick('LogIn')
                onClose();
              }
            }}
          >
            <Text>My Profile</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("HistoryPage");
              onClose();
            }}
          >
            <Text>Tasks History</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("GroupsPage");
              onClose();
            }}
          >
            <Text>My Groups</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("settings"), onClose();
            }}
          >
            <Text>Settings</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "white",
    width: "40%",
    height: "100%",
  },
  option: {
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
});

export default Menu;
