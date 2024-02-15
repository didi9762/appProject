import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";


const GroupOptions = ({ isOpen, onClose }) => {
const navigation = useNavigation()
    function handlePress(option){
        if(option==='mygroups'){
        navigation.navigate('GroupsPage')
        }
        else if(option==='requests'){
          navigation.navigate('Requests')
        }
        }

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <View style={styles.modalView}>
          <TouchableOpacity  style={ styles.option} onPress={()=>{handlePress('mygroups');onClose()}}>
            <Text>My Grops</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={ styles.option} onPress={() => {handlePress('requests');onClose()}}>
            <Text>Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={ styles.option} onPress={() => {handlePress('3');onClose()}}>
            <Text>Option 3</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 50, // Adjust as needed
    paddingRight: 10, // Adjust as needed
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    elevation: 5,
  },
  option:{
    marginBottom:10
  }
});

export default GroupOptions;
