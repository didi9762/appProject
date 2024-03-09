import React, { useState,useEffect } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { PricingCard } from "react-native-elements";
import { baseurlAtom, userDetails } from "../profile/logOperation";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import MissionInfo from "./missionInfo";
import { useAtom } from "jotai";
import { Task } from "../types/types";

export default function HistoryPage() {
  const [reload,setReload] = useState(false)
  const [tasks,setTasks] = useState <Array<Task>> ([])
  const [open,setOpen] = useState<Task|null>(null)
  const [baseurl] = useAtom(baseurlAtom)
  const [userD] = useAtom(userDetails)
  const navigation = useNavigation()
  const url = baseurl.replace('client','common')

  useEffect(() => {
    async function  getData() {
      const token = await AsyncStorage.getItem('tokenkey')
      if(!token){
navigation.navigate('LogIn' as never)
      }
      try{
        const response = await axios.get(`${url}taskshistory`,{
          headers:{
            "Content-Type":"application/json",
            authorization:token
          }
        })
        const data = await response.data
        setTasks(data)
      }catch(e){console.log('error try get history tasks',e);
      }
    }
    getData()
  }, [reload]);


  function openTask(task:Task){
    setOpen(task)
    }
    function toggleModal(){
    setOpen(null)
    }

   async function deleteTask(taskid:string){
    const token = await AsyncStorage.getItem('tokenkey')
try{
const response = await axios.delete(`${url}deleteTaskHistory`,{headers:{
  "Content-Type":'aplication-json',
  taskId:taskid,
authorization:token,
}})
console.log(response.status);
setReload(!reload)
}catch(e){console.log('error try delete task from history:',e);
}
   }
    
        return(
            <View style={{display:'flex',alignItems:'center'}}>
                {open?<MissionInfo flag={false} info={open} taskFinish={()=>deleteTask(open.id)} close={toggleModal}/>:null}
    {tasks.length!==0?tasks.map((task,index)=>
    <TouchableOpacity key={index} onPress={()=>openTask(task)}>
        <PricingCard
        price={`from:${task.senderAddress}`}
        pricingStyle={{fontSize:25}}
              containerStyle={{ width: "80%", display:'flex'}}
              color="#4f9deb"
              title={'recive time***'}
              info={[ `to: ${task.address}`]}
              infoStyle={{ fontSize: 25 }}
              /></TouchableOpacity>
              
    ):<Text>{userD?'There are no saved tasks':'Please log in first'}</Text>}
            </View>
        )}