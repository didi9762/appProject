import React ,{useEffect, useState} from "react";
import { useAtom } from "jotai";
import { userDetails,baseurlAtom } from "../profile/logOperation";
import { User } from "../types/types";
import { View,Text,ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

const JoinGroup = () =>{
    const [load,setLoad]= useState(false)
    const [message,setMessage]= useState('')
    const [baseurl] = useAtom(baseurlAtom)
    const navigation = useNavigation()
    const route = useRoute();
const {token}= route.params;
const [userD,setUserD] = useAtom(userDetails)

useEffect(()=>{
    setLoad(true)
requestGroup(token)

},[])

async function requestGroup(token:string){
try{
const response =await axios.post(`${baseurl}joingroup`,{userId:userD.userName,token:token})
if(response.status===200){
setMessage('request sent to sender wait for approve')
const updateUserD = {...userD,requests:[...userD.requests,{userId:token,time:new Date()}]}
setUserD(updateUserD)
setLoad(false)}
else if(response.status===299){
    setMessage('Sorry the link is not valid')
    setLoad(false)
}
else if(response.status===298){setMessage('you already in this group');
setLoad(false)}
else if(response.status===297){
    setMessage("you already sent requset to join the group\n you'll be inform when you joined successfully");
    setLoad(false)
}
}catch(error){
    console.log('error try join group:',error);
    setMessage('error request not sent')
    setLoad(false)
}
}

return(

    <View style ={{width:'100%',height:'100%',display:'flex',justifyContent:'center'}}>
<View style={{width:'100%',height:'100%',justifyContent:'space-around',alignItems:'center'}}>
        {load&&<ActivityIndicator size={60} color={'blue'}/>}

        {!load&&<Text style={{textAlign:'center',fontSize:70}}>{message}</Text>}
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('MainPage' as never)}>
         
            <Text style={{color:'red',fontSize:20,textAlign:'center'}}>Go To HomePage</Text>
        
        </TouchableOpacity>
    </View>
    </View>
)

}

const styles = StyleSheet.create({
    btn:{
        width:'70%',
        height:'8%',
        backgroundColor:'blue',
        borderRadius:20,
        elevation:5,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default JoinGroup
