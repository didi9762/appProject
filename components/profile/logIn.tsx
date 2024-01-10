import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import TextInput from './TextInput';
import {logInFunc, userDetails} from './logOperation';
import {Button} from 'react-native-paper' 
import { useAtom } from 'jotai';

const LoginScreen = ({ navigation }) => {
    const [,setUserDetails] = useAtom(userDetails)
  const [userName, setUserName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onLoginPressed = async() => {
    const userD =await logInFunc(userName.value,password.value)
    console.log('userd:',userD);
    
    setUserDetails(userD)
      setUserName({ ...userName, error: userName.error });
      setPassword({ ...password, error: password.error });
      navigation.navigate('MainPage')
      return;
    }  

  return (
 <View style={styles.container}>

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