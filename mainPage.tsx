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
import { baseurlAtom } from "./components/profile/logOperation";
import { userDetails,userSocket } from "./components/profile/logOperation";
import { User } from "./components/types/types";
import { updateUserInfo } from "./components/profile/updateUserInfo";




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
  const [userD,setUserD] = useAtom(userDetails);
  const [,setSocket] = useAtom(userSocket)
  const [clientSocket, setClientSocket] = useState<ClientSocket | null>(null);
  const navigation = useNavigation();
  const [baseurl] = useAtom(baseurlAtom)
  

  useEffect(() => {
    if(!userD){navigation.navigate('LogIn' as never)}
    if (clientSocket) {
      const messageCallback = (message: any) => {
        updateData(message);
      };
      clientSocket.socket.addEventListener("message", messageCallback);
    }
  }, [clientSocket]);

async function goOnline() {
    return new Promise((resolve, reject) => {
        if (!userD) {
            navigation.navigate("LogIn" as never);
            reject("User not logged in");
            return;
        }

        const newSocket = newDeliverySocket(userD.userName, updateData, alertFunc, refresh, goOffline, baseurl);
        
        newSocket.socket.addEventListener('error', (event) => {
            console.error('WebSocket error cennot connect:', event);
            reject(false);
        });

        newSocket.socket.addEventListener('open', () => {
            console.log(`${newSocket.userId} Connected to the server`);
            newSocket.initiateCommunication();
            newSocket.online = true;
            setUserD({ ...userD, online: true });
            setSocket(newSocket.socket)
            setClientSocket(newSocket)
            resolve(true);
        });
    });
}


  function updateData(newMission: any) {
    if (newMission) {
      if (newMission.saved) {
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
        setData((prev: Array<any>) => [...prev, newMission]);
      }
    } else {
      setData(data);
    }
  }

  function takeMission(missionId: string) {
    if(!userD){
      navigation.navigate('LogIn' as never)
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

  function goOffline(error:boolean) {    
    if (clientSocket) {      
      clientSocket.socket.close();
      setClientSocket(null);
      setUserD((prevUserD) => ({ ...prevUserD, online: false }));
      setSocket(null)
    }
    else if(error){
      setClientSocket(null);
      setUserD((prevUserD) => ({ ...prevUserD, online: false }));
      setSocket(null)
    }

    
  }



  return (
    <View style={{ marginTop: 20 ,backgroundColor:'white'}}>
      <HeaderApp
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
