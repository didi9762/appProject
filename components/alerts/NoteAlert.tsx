import { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Dialog } from "react-native-elements"
import { Text } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign'

interface props{
    visible:boolean
    handlePress:()=>void
    noteInfo:{
        type:string,
        massage:string
    } |null
} 

const NoteAlert = ({visible,handlePress,noteInfo}:props)=>{
const [color,setColor] = useState('red')

useEffect(()=>{
async function waitAndClose(){
await waitSedconds()
handlePress()
}
if(visible){
    if(noteInfo?.type==='success'){
        setColor('green')
        waitAndClose()
    }else if(noteInfo?.type==='error'){setColor('red')}

}
      },[visible])
      
      function waitSedconds(): Promise<void> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 5000);
        });
      }


    return(
<Dialog
overlayStyle={styles.dialogContainer}
      isVisible={visible}
      onBackdropPress={()=>handlePress()
      }
    >
        <View style={{flexDirection:'row'}}>
        {noteInfo.type==='error'?<AntDesign name="warning" size={25} color={'red'}/>:noteInfo.type==='success'?
        <AntDesign name="checkcircle" size={25} color={'green'}/>:null}
      <Dialog.Title title={noteInfo?.type} titleStyle={{marginLeft:10, color:color}}/></View>
      <Text>
        {noteInfo?.massage}
      </Text>
    </Dialog>
    ) 
}

const styles = StyleSheet.create({
    dialogContainer:{
position:'absolute',
top:0,
width:'94%',
height:'auto',
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

export default NoteAlert