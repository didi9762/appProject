import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


async function updateUserInfo(url:string) {
    const token = await AsyncStorage.getItem("tokenkey");
    if (!token) {
      console.log("no token");
      return;
    }
    const response = await axios.get(`${url}getupdates`, {
      headers: {
        "Content-Type": "string",
        authorization: token,
      },
    });
    const res = await JSON.parse(response.data);
    return res;
  }

  export {updateUserInfo}