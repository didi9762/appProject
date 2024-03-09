import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Dialog } from "react-native-elements"
import { Text } from "react-native-elements"
import AntDesign from 'react-native-vector-icons/AntDesign'

interface props{
    visible:boolean
    handlePress:()=>void
    saveInfo:{
        taskId:string,
        senderId:string,
        address:string|undefined
    } |null
}

const ConfiremAlert = ({visible,handlePress,saveInfo}:props)=>{
const navigation = useNavigation()

    return(
<Dialog
overlayStyle={styles.dialogContainer}
      isVisible={visible}
      onBackdropPress={()=>handlePress()}
    >
        <View style={{flexDirection:'row'}}>
            <AntDesign name="checkcircle" size={25} color={'green'}/>
      <Dialog.Title title="Task confirem" titleStyle={{color:'green',marginLeft:10}}/></View>
      <View style={{display:'flex',flexDirection:'column'}}>
        <View style={{flexDirection:'row'}}>
      <Text>Sender:</Text>
      <Text style={styles.txtBold}>{saveInfo?.senderId}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text> is confirem the task to:</Text>
       <Text style={styles.txtBold}> {saveInfo?.address}</Text>
       </View>
       <Text>You On A Mission</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('Progress' as never);handlePress()}}>
      <Text style={{color:'blue'}}  >More Detailes</Text></TouchableOpacity>
      </View>
    </Dialog>
    ) 
}

const styles = StyleSheet.create({
    dialogContainer:{
position:'absolute',
top:0,
width:'94%',
height:'21%',
borderRadius:20,
flexDirection:'column'
    },
    btn:{
        backgroundColor:'#2525f19a',
        borderRadius:30,
        width:120,
        height:33,
    },
    txt:{
        color:'white',
        textAlign:'center',
        lineHeight:17,
        fontSize:17
    },
    txtBold:{
        fontWeight:'bold',
        fontSize:16,
        color:'#0909489a'
    }

})

export default ConfiremAlert