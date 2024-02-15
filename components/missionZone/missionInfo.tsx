import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Task } from "../types/types";
import { Button } from "react-native-elements";

interface Props {
  info: Task;
  taskFinish: (id: string, sender: string) => void;
  close: () => void;
  flag:boolean
}

const MissionInfo: React.FC<Props> = ({ info, taskFinish, close,flag }) => {
  return (
    <ScrollView style={{width:'100%',height:'80%'}} contentContainerStyle={styles.container}>
        
      <View style={styles.contentContainer}>
<View>
        <Text style={styles.title}>Task Info</Text>
        <Text style={styles.info}>{`Sender: ${info.sender}`}</Text>
        <Text style={styles.info}>{`From: ${info.senderAddress}`}</Text>
        <Text style={styles.info}>{`Address: ${info.address}`}</Text>
        <Text style={styles.info}>{`Client Phone Number: ${info.targetPhone}`}</Text>
        <Text style={styles.info}>{`Other Notes: ${info.notes}`}</Text>
        </View>
        <View  >
        <Button
          style={styles.btn}
          title={flag?"Done":'Delete Task'}
          titleStyle={{ color: "black", textAlign: "center" }}
          onPress={() => {
            taskFinish(info.id, info.sender);
            close();
          }}
        />
        <Button
          title="Back"
          titleStyle={{ color: "black", textAlign: "center" }}
          style={styles.btn}
          onPress={close}
        />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width:'100%',
    height:'100%',
  },
  contentContainer: {
    width: "90%",
    height: "95%",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    justifyContent:'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  btn: {
    width: 200,
    height: 30,
    backgroundColor: "red",
    marginTop: 20,
  },
});

export default MissionInfo;
