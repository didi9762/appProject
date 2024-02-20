import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAtom, atom } from 'jotai';
import { User } from '../types/types';
import TemporaryUrl from '../../temperuryUrl.js';
import { Socket } from 'net';

// const ip = process.env.BASE_URL
const ip = TemporaryUrl
// const baseurl = `http://${ip}:12345/client/`
// console.log('http url:',baseurl);
const baseurlAtom = atom<string>('')

// const baseurl = 'https://app-http-server.vercel.app/client/';
const userDetails = atom<User>(null as User); 

// const logInFunc = async (userName:string, password:string) => {
//   try {
//     const response = await axios.post(`${baseurl}login`, { userName: 'ryan_miller', password:'delivery1pass'  });//change 
//     const data = await response.data;
//     if(!data||data===null){return}
//     await storeToken(data.token);
//     return data.userDetailes
//   } catch (e) {
//     console.log('error try log in:', e);
//   }
// };

const storeToken = async (token:string) => {
  try {
    await AsyncStorage.setItem('tokenkey', `${token}`);
  } catch (error) {
    console.log('error saving token:', error);
  }
};

// async function updateUserInfo() {
//   const token =await AsyncStorage.getItem('tokenkey')
//   if(!token){console.log('no token');return
//   }
//   const response =await axios.get(`${baseurl}getupdates`,{headers:{
//     "Content-Type":'string',
//     authorization:token
//   }})
//   const res = await JSON.parse(response.data)
// return res
// }

const userSocket = atom <WebSocket>(null as WebSocket)

export { baseurlAtom, userDetails,userSocket };
