import React from "react";
import { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import HomePage from "./components/HomePage";
import newDeliverySocket from "./clientSocket";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderApp from "./components/header";
import Profile from "./components/profile/Profile";
import HistoryPage from "./components/missionZone/HistoryPage";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { baseurl } from "./components/profile/logOperation";
import { userDetails } from "./components/profile/logOperation";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlck5hbWUiOiJyeWFuX21pbGxlciIsImlhdCI6MTUxNjIzOTAyMn0.bUWcin4Uf6CG4mBQlAlo46bcbuHm7WxeOzQcKQhYmrI";
// const url = 'http://10.0.0.24:12345/client/'
interface ClientSocket {
  socket: WebSocket;
  userId: string;
  online: Boolean;
}

function MainPage() {
  const [data, setData] = useState<Array<any> | []>([]);
  const [userD] = useAtom(userDetails);
  const [clientSocket, setClientSocket] = useState<ClientSocket | null>(null);
  const navigation = useNavigation();
  

  useEffect(() => {
    if (clientSocket) {
      const messageCallback = (message: any) => {
        updateData(message);
      };
      clientSocket.socket.addEventListener("message", messageCallback);
    }
  }, [clientSocket]);

  function goOnline() {
    if (!userD) {
      navigation.navigate("LogIn");
      return;
    }
    const newSocket = newDeliverySocket(userD.userName, updateData, alertFunc,refresh);
    setClientSocket(newSocket);
  }

  function updateData(newMission: any) {
    if (newMission) {
      if (newMission.save) {
        setData((prev: any) =>
          prev.map((mission: any) => {
            if (newMission.id === mission.id) {
              return newMission;
            } else {
              return mission;
            }
          })
        );
      } else if (newMission.open) {
        console.log('updte:',newMission);
        
        setData((prev: Array<any>) => [...prev, newMission]);
      } else if(newMission.type){
        console.log('message:',newMission.type);
        
      }else{
        console.log('new mission not valid:',newMission);
      }
    } else {
      setData(data);
      setClientSocket(null);
    }
  }

  function takeMission(missionId: string) {
    if(!userD){
      navigation.navigate('LogIn')
    }
    if (clientSocket&&userD) {
      clientSocket.socket.send(JSON.stringify({ type: "save", missionId:missionId,userDetailes:userD.userName }));
      refresh();
    }
  }

  function alertFunc(type: string, message: string) {
    Alert.alert(type, message);
  }

  async function refresh() {
    try {
      const response = await axios.get(`${baseurl}open`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.data;
      setData(data);
    } catch (error) {
      console.log("Error object:", error);
    }
  }

  function goOffline() {
    if (clientSocket) {
      clientSocket.socket.close();
      setClientSocket(null);
    }
  }
  function taskDone(taskId:string,sender:string){
if(clientSocket&&clientSocket.socket)
clientSocket.socket.send(JSON.stringify({ type: "done", missionId:taskId,userDetailes:userD.userName,sender:sender }));
  }

  return (
    <View style={{ marginTop: 20 }}>
      <HeaderApp
        closeFunc={taskDone}
        title={clientSocket ? "online" : "offline"}
        navigation={navigation}
      />

      <HomePage
        openMissions={data}
        goOnline={goOnline}
        goOffline={goOffline}
        refreshData={refresh}
        takeMission={takeMission}
        online={clientSocket ? true : false}
      />
    </View>
  );
}

export default MainPage;
