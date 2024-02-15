import {View,TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const CarFilter = ({handleCarType,filters})=>{
    
    return(
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:10,marginBottom:10}}>
        <TouchableOpacity onPress={()=>handleCarType('car')} style={{...styles.iconStyle,backgroundColor:filters.wehicleType==='car'?'red':'white'}}>
       <Icon name={'car'} size={30} color={'blue'} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>handleCarType('motor')} style={{...styles.iconStyle,backgroundColor:filters.wehicleType==='motor'?'red':'white'}}>
       <Icon name={'motorcycle'} size={30} color={'blue'} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>handleCarType('station')} style={{...styles.iconStyle,backgroundColor:filters.wehicleType==='station'?'red':'white'}}>
       <MaterialCommunityIcons name="car-estate" size={30} color={'blue'}/>
       </TouchableOpacity>
     </View>
    )
}

const styles = StyleSheet.create( { iconStyle:{
    borderWidth:1,
    borderRadius:20,
    borderColor:'blue',
    width:50,
    alignItems:'center'
  }
})

export default CarFilter