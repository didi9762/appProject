import * as react from 'react'
import { View,Text } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDetails } from './logOperation';
import { useAtom } from 'jotai';


export default function ProfilePage(){
const [userD]= useAtom(userDetails)
const navigation:any = useNavigation()
function login(){
    navigation.navigate('LogIn')
}

    return(
        <View >
<Avatar rounded title={userD.name}
size={'large'}
 />
            <Button onPress={login}>log in</Button>
            <Button onPress={async()=>{
  try {
   const token = await AsyncStorage.getItem('tokenkey')
   console.log('token:',token)
   console.log('user:',userD);
   
  } catch (error) {
    console.log('error saving token:',error);
  }
            }} style={{borderColor:'red',borderWidth:10,borderStyle:'solid'}}>tokrn</Button>
        </View>
    )
}