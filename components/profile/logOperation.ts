// logOperation.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAtom, atom } from 'jotai';
import { User } from '../types/types';

const baseurl = 'https://app-http-server.vercel.app/client/';
const userDetails = atom<User>({name:''}); 

const logInFunc = async (userName:string, password:string) => {
  try {
    const response = await axios.post(`${baseurl}login`, { userName: 'didi9762', password: '12345' });
    const data = await response.data;
    await storeToken(data.token);
    return data.userDetailes[0]
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
