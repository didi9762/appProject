import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { PricingCard } from "react-native-elements";
import tasksInPrograss from "../../taskAtoms";
import { useAtom } from "jotai";
import { useNavigation, useRoute } from "@react-navigation/native";
import { baseurlAtom, userDetails, userSocket } from "../profile/logOperation";
import MissionInfo from "./missionInfo";
import { Task } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserInfo } from "../profile/updateUserInfo";

export default function MissionsInPrograss() {
  const [open, setOpen] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [socket] = useAtom(userSocket);
  const [userD,setUserD] = useAtom(userDetails);
  const navigation = useNavigation();
  const [baseurl] = useAtom(baseurlAtom);

  useEffect(() => {
    async function getData() {
      const token = await AsyncStorage.getItem("tokenkey");
      try {
        const response = await axios.get(`${baseurl}close`, {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        const data = await response.data;
        if (data) {
          setTasks(data);
        }
      } catch (e) {
        console.log("error try get prograss tasks:", e);
      }
    }
    getData();
  }, []);

  function taskDone(taskId: string, sender: string) {
    if (socket) {
      socket.send(
        JSON.stringify({
          type: "done",
          missionId: taskId,
          userDetailes: userD.userName,
          sender: sender,
        })
      );
      return true;
    } else {
      return false;
    }
  }
  async function taskFinifh(id: string, sender: string) {
    if (taskDone(id, sender)) {
      setTasks((prev) => {
        const uptodate = prev.filter((task) => task.id !== id);
        return uptodate;
      });
      const updates =await updateUserInfo(baseurl)
      setUserD({...userD,tasksInProgress:updates.tasksInProgress})
    } else {
     Alert.alert('Note','you have to be online')
    }
  }

  function openTask(task: Task) {
    setOpen(task);
  }
  function toggleModal() {
    setOpen(null);
  }

  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      {open ? (
        <MissionInfo
          info={open}
          flag={true}
          taskFinish={taskFinifh}
          close={toggleModal}
        />
      ) : null}

      {tasks.length !== 0 ? (
        <ScrollView>
          {tasks.map((task, index) => (
            task?
            <TouchableOpacity key={index} onPress={() => openTask(task)}>
              <PricingCard
                price={`from:${task.senderAddress?task.senderAddress:task.address}`}
                pricingStyle={{ fontSize: 25 }}
                containerStyle={{ width: "80%", display: "flex" }}
                color="#4f9deb"
                title={"recive time***"}
                info={[`to: ${task.address}`]}
                infoStyle={{ fontSize: 25 }}
              />
            </TouchableOpacity>
          :null))}
        </ScrollView>
      ) : (
        <Text>No missions in prograss</Text>
      )}
    </View>
  );
}
