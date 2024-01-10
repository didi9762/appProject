import React from 'react'
import { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import HomePage from './components/deliveryHome';
import newDeliverySocket from './clientSocket'; 
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import HeaderApp from './components/header';
import Profile from './components/profile/Profile';
import HistoryPage from './components/missionZone/HistoryPage';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { baseurl } from './components/profile/logOperation';

const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImRpZGkiLCJpYXQiOjE1MTYyMzkwMjJ9.QQtZFto9uXFKebk6QtHOmf8LzXQrbcXEQpIK8GlmAVo' 
// const url = 'http://10.0.0.24:12345/client/'
interface ClientSocket {
  socket:WebSocket
  userId:string
  online:Boolean
}

function MainPage() {
  const [data, setData] = useState<Array<any>|[]>([]);
  const [clientSocket, setClientSocket] = useState<ClientSocket|null>(null)
const navigation = useNavigation()

  useEffect(() => {
    if (clientSocket) {
      const messageCallback = (message:any) => {
        updateData(message)
      }
      clientSocket.socket.addEventListener('message',messageCallback);
    }
  }, [clientSocket]);

  const userName = 'abcd';

  function goOnline() {
    const newSocket = newDeliverySocket(userName, updateData,alertFunc);
    setClientSocket(newSocket);
  }

  function updateData(newMission:any) {    
    if(newMission){
    if (newMission.save) {
      setData((prev:any) =>
        prev.map((mission:any) => {
          if (newMission.id === mission.id) {
            return newMission;
          } else {
            return mission;
          }
        })
      );
    } else if(newMission.open){
      setData((prev:Array<any>) => [...prev, newMission]);
    }
    else{console.log(newMission);
    }}
    else{setData(data);setClientSocket(null)}
  }

  function takeMission(missionId:string) {
    
    if (clientSocket) {
      clientSocket.socket.send(JSON.stringify({ type: 'save', missionId }));
    }
  }

  function alertFunc(type:string,message:string){
    Alert.alert(type,message)
  }

  async function refresh() {
    try {

      const response = await axios.get(`${baseurl}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.data;
      console.log(response.request);
      
      console.log('data:',data);
      
      setData(data);
    } catch (error) {
     console.log(error);
        }
    
  }

  function goOffline() {
    if(clientSocket){clientSocket.socket.close();setClientSocket(null)}

  }

    return(<View style={{marginTop:20}}>
      <HeaderApp title={clientSocket?'online':'offline'} navigation={navigation}/>
      
      <HomePage
        openMissions={data}
        goOnline={goOnline}
        goOffline={goOffline}
        refreshData={refresh}
        takeMission={takeMission}
        online={clientSocket?true:false}
      />
    </View>)
  }




export default MainPage;
