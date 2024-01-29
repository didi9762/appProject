// logOperation.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAtom, atom } from 'jotai';
import { User } from '../types/types';
import TemporaryUrl from '../../temperuryUrl.js';

// const ip = process.env.BASE_URL
const ip = TemporaryUrl
const baseurl = `http://${ip}:12345/client/`
console.log('http url:',baseurl);

// const baseurl = 'https://app-http-server.vercel.app/client/';
const userDetails = atom<User>(null); 

const logInFunc = async (userName:string, password:string) => {
  try {
    const response = await axios.post(`${baseurl}login`, { userName: 'ryan_miller', password:'delivery1pass'  });//change 
    const data = await response.data;
    if(!data||data===null){return}
    await storeToken(data.token);
    return data.userDetailes
  } catch (e) {
    console.log('error try log in:', e);
  }
};

const storeToken = async (token:string) => {
  try {
    await AsyncStorage.setItem('tokenkey', `${token}`);
  } catch (error) {
    console.log('error saving token:', error);
  }
};

export { logInFunc, baseurl, userDetails };
