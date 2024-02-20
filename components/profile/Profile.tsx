import * as react from 'react'
import { View,Text, StyleSheet } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { NavigationAction, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDetails } from './logOperation';
import { useAtom } from 'jotai';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default function ProfilePage(){
const [userD]= useAtom(userDetails)
const navigation:any = useNavigation()

react.useEffect(()=>{
if(userD===null){
    navigation.navigate('LogIn')
}
},[])

    return(
        <View >
            <View style={styles.container}>
            <Text style={styles.HeaderTxt}>My Profile</Text>
            <View style={styles.section}>
<Avatar rounded title={userD.firstName}
size={30} source={require('../boy.png')} containerStyle={{marginBottom:10,marginRight:30}} />
<Text style={styles.txtSection}>{`${userD.firstName} ${userD.lastName}`}</Text></View>
<View style={styles.section}>
    <FontAwesome name='phone' size={30} style={{marginBottom:10,marginRight:30}}/>
    <Text style={styles.txtSection}>
        {userD.phone}
    </Text>
</View>
        </View>
        </View>
        )}
    

    const styles = StyleSheet.create({
        HeaderTxt:{
fontSize:35,
marginTop:10,
marginBottom:30,
fontWeight:'bold'

        },
        container:{
            marginLeft:30,
            width:'70%'
        },
        section:{
            marginTop:20,marginBottom:20,
            display:'flex',flexDirection:"row",borderBottomWidth:0.5
        },
        txtSection:{
            fontSize:20
        }
    })
    