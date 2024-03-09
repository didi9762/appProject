import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { userDetails,baseurlAtom } from './components/profile/logOperation';
import { useState} from "react";
import { updateUserInfo } from './components/profile/updateUserInfo';
import { TouchableOpacity } from "react-native";
import  {useAtom} from 'jotai'
import {  useNavigation } from '@react-navigation/native';



export default function InitPage(){
const [,setUserD] = useAtom(userDetails);
const [value, onChangeText] = useState("");
const [,setUrlatom] = useAtom(baseurlAtom);
const navigation = useNavigation()


async function initialize() {
  const dev = value.length < 16 && value.length > 0;
  if (dev) {
    setUrlatom(`http://${value}:12345/client/`);
  }
    const userInfo = await updateUserInfo(dev ? `http://${value}:12345/client/` : `https://app-http-server.vercel.app/client/`);
    if (userInfo) {      
      userInfo.online = false
      setUserD(userInfo)
      ;}
    navigation.navigate('MainPage' as never)
    }





return (

        <View style={styles.openView}>
          <View style={styles.cont}>
          <TextInput
            placeholder="For development enter IP Address else press continue"
            value={value}
            onChangeText={(v) => onChangeText(v)}
            style={styles.input}
          ></TextInput>
          <TouchableOpacity onPress={initialize} style={styles.btn}>
            <Text style={{color: "white",textAlign:'center',padding:10}}>Continue</Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.logo}>App Logo</Text>
        </View>)
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    width: "70%",
    overflow:'scroll'
  },
  openView: {
    height: "60%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-around',
    alignItems: "center",
  },
  cont:{
    marginTop:30,
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  logo: {
    fontSize: 80,
    fontWeight: "bold",
  },
  btn: {
    marginTop:15,
    borderRadius: 20,
    backgroundColor:'#2e2b68cc',
    width: "70%",
    elevation: 10,

  },
});