import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import TextInput from './TextInput';
import { userDetails,baseurlAtom} from './logOperation';
import {Button} from 'react-native-paper' 
import { useAtom } from 'jotai';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [,setUserDetails] = useAtom(userDetails)
  const [userName, setUserName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [message,setMassage] = useState('massagge:')
const [url,setUrl] = useState({value:'',error:''})
const [baseurl,setBaseUrl] = useAtom(baseurlAtom)



  const logInFunc = async (userName:string, password:string) => {
    try {                                     // {url.value}
      const response = await axios.post(`http://${url.value}:12345/client/login`, { userName: userName, password:password  });//change 
      const data = await response.data;
      if(!data||data===null){return}
     
      await storeToken(data.token);      
      return data.userDetailes
    } catch (e) {
      const error = e.response.data.error
      console.log(e);
      if(error ==='user not found'){setUserName({value:'',error:'User Name Incorerect'});return}
      if(error==='incorrect password'){setPassword({value:'',error:'Incorrect Password'});return}
      else{setUrl({value:'',error:'invalid url'})}

    //   console.log('error try log in:', e);
    //   function concatenateObjectValues(obj) {//function to log the error with all values
    //     let result = '';
    //     for (const key in obj) {
    //         if (Object.hasOwnProperty.call(obj, key)) {
    //             const value = obj[key];
    //             if (typeof value === 'string' || typeof value === 'number') {
    //                 result += value.toString() + ' ';
    //             } else if (Array.isArray(value)) {
    //                 result += value.join(' ') + ' ';
    //             } else if (typeof value === 'object') {
    //                 result += concatenateObjectValues(value) + ' ';
    //             }
    //         }
    //     }
    //     return result.trim();
    // }
    //   setMassage(concatenateObjectValues(e))
    }
  };
  
  const storeToken = async (token:string) => {
    try {
      await AsyncStorage.setItem('tokenkey', `${token}`);
    } catch (error) {
      console.log('error saving token:', error);
    }
  };

  const onLoginPressed = async() => {
    setMassage(url.value)  // {url.value}
    setBaseUrl(`http://${url.value}:12345/client/`)
    const userD =await logInFunc(userName.value,password.value)
    userD.online = false
    setUserDetails(userD)
      setUserName({ ...userName, error: userName.error });
      setPassword({ ...password, error: password.error });
      setUrl({...url,error:url.error})
      navigation.navigate('MainPage')
      return;
    }  

  return (
 <View style={styles.container}>
 <TextInput
        label="Server Url"
        returnKeyType="next"
        value={url.value}
        onChangeText={text =>setUrl({ value: text, error: '' })}
        error={!!url.error}
        errorText={url.error}
        autoCapitalize="none"
        textContentType="username"
      />

      <TextInput
        label="User Name"
        returnKeyType="next"
        value={userName.value}
        onChangeText={text =>setUserName({ value: text, error: '' })}
        error={!!userName.error}
        errorText={userName.error}
        autoCapitalize="none"
        textContentType="username"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      {/* <Text style={{fontSize:15}}>
        {message}
      </Text> */}

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
    container:{
        height:'80%',
        width:'100%',
display:'flex',
justifyContent:'center'
    },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    // color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    // color: theme.colors.primary,
  },
  
});

export default LoginScreen