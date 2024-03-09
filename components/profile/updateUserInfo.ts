import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TemporaryUrl from "../../temperuryUrl";


async function updateUserInfo(url:string) { 
    const token = await AsyncStorage.getItem("tokenkey");
    if (!token) {
      console.log("no token");
      return;
    }
    try{
    const response = await axios.get(`${url}getupdates`, {
      headers: {
        "Content-Type": "string",
        authorization: token,
      },
    });
    const res = await JSON.parse(response.data);
    return res;}catch(e){console.log('error try get updates:',e);
    }
  }

  export {updateUserInfo}