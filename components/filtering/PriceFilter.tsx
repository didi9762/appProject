import { useEffect, useState } from "react"
import { View,Text, TouchableOpacity } from "react-native"
import { Slider,CheckBox } from "react-native-elements"

const PriceFilter = ({minValue,priceChange})=>{
const [open,setOpen]  = useState(false)

useEffect(()=>{
if(minValue!=0){setOpen(true)}
},[])
return (
    <View>
    <TouchableOpacity>
    <CheckBox center title={'Min Price'} iconRight iconType='material' checked={open}  checkedIcon="clear"
    uncheckedIcon="add"
onPress={()=>{priceChange(0),setOpen(!open)}}/>
</TouchableOpacity>
{open?<View>
          <Text>{`min price:${minValue}₪`}</Text>
          <Slider
            value={minValue/500}
            
            thumbStyle={{ height: 12, width: 12 }}
            onValueChange={(val) => {
              priceChange(val)
            }}
          /></View>:null}
          </View>
)
}

export default PriceFilter