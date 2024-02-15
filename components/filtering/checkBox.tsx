import { useEffect, useState } from 'react'
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native'
import { CheckBox,Slider } from 'react-native-elements'


const CheckBoxes = ({filterName,onCheck,check,minValue,priceChange}) =>{
    return (
        <View>
<TouchableOpacity style={styles.container} onPress={()=>onCheck(filterName)} >
    <CheckBox center title={filterName} iconRight iconType='material' checked={check}  checkedIcon="clear"
      uncheckedIcon="add"
 onPress={()=>onCheck(filterName)}/>
</TouchableOpacity>
{filterName==='price'&&check?
<View>
          <Text>{`min price:${minValue}₪`}</Text>
          <Slider
            value={minValue/500}
            
            thumbStyle={{ height: 12, width: 12 }}
            onValueChange={(val) => {
              priceChange(val)
            }}
          /></View>:null}
          </View>)
}

const styles = StyleSheet.create({
    optionTxt:{
lineHeight:45,
marginLeft:5
    },
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    }
})
export default CheckBoxes