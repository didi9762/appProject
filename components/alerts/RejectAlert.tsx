import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Dialog } from "react-native-elements"
import { Text } from "react-native-elements"

interface props{
    visible:boolean
    handlePress:()=>void
    rejectInfo:{
        taskId:string,
        senderId:string,
        address:string|undefined
    } |null
}

const RejectAlert = ({visible,handlePress,rejectInfo}:props)=>{
const navigation = useNavigation()

    return(
<Dialog
overlayStyle={styles.dialogContainer}
      isVisible={visible}
      onBackdropPress={()=>handlePress()}
    >
      <Dialog.Title title="Reject note"/>
      <View style={{display:'flex',flexDirection:'column'}}>
        <View style={{flexDirection:'row'}}>
      <Text>Sender:</Text>
      <Text style={styles.txtBold}>{rejectInfo?.senderId}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text> is confirem the task to:</Text>
       <Text style={styles.txtBold}> {rejectInfo?.address}</Text>
       </View>
       <Text>unfortunetlly</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('Help' as never);handlePress()}}>
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
borderRadius:20

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

export default RejectAlert