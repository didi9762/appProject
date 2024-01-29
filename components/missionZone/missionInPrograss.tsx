import React, { useEffect, useState } from "react";
import axios from "axios";
import { View,Text } from "react-native";
import { PricingCard } from "react-native-elements";
import tasksInPrograss from "../../taskAtoms";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import { baseurl } from "../profile/logOperation";


export default function MissionsInPrograss({route}){
    const { taskDone } = route.params || {};
    
    const [tasks,setTasks] = useState([])

    const navigation:any = useNavigation();
///////////////////
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlck5hbWUiOiJyeWFuX21pbGxlciIsImlhdCI6MTUxNjIzOTAyMn0.bUWcin4Uf6CG4mBQlAlo46bcbuHm7WxeOzQcKQhYmrI";
  ////////////////
    useEffect(()=>{
        async function getData(){
            try {
                const response = await axios.get(`${baseurl}close`, {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                  },
                });
                const data = await response.data;
                if (data) {
                setTasks(data)}
        }catch(e){console.log('error try get prograss tasks:',e);
        }}
        getData()
        console.log(tasks);
        
    },[])
function taskFinifh(id:string,sender:string){
    taskDone(id,sender)
setTasks((prev)=>{
const uptodate = prev.filter((task)=>task.id!==id)
return uptodate
})
}

    return(
        <View>
{tasks.length!==0?tasks.map((task,index)=>
    <PricingCard
    key={index}
          containerStyle={{ width: "80%" }}
          color="#4f9deb"
          title={'date***'}
          price={`${task.price} ₪`}
          pricingStyle={{ fontSize: 30 }}
          info={[`from:${task.sender}`, `to: ${task.address}`]}
          infoStyle={{ fontSize: 25 }}
          button={{title:'Done'}}
          onButtonPress={()=>taskFinifh(task.id,task.sender)}
          />
          
):<Text>No missions yin prograss</Text>}
        </View>
    )
}