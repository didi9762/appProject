import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { PricingCard } from 'react-native-elements';

export default function MassionCard({ info, takeMission }) {
  function handleSave() {
    takeMission(info.id);
  }

  let color = 'green';
  if (info.save) {
    color = 'orange';
  }

  return (
    <View style={{width:'100%', display:'flex', flexDirection:'column',alignItems:'center'}}>
      {info.sender?<PricingCard
  containerStyle={{width:'80%'}}
  color="#4f9deb"
  title={info.name}
  price={`${info.price} ₪`}
  pricingStyle={{fontSize:30}}
  info={[`from:${info.sender}`,`to: ${info.address}` ]}
  infoStyle={{fontSize:25}}
  button={info.open?{title: 'Take It', icon: 'flight-takeoff'}:{title:'Mission On Hold'}}
  onButtonPress={info.open?handleSave:()=>{Alert.alert('sorry','Mission already taken try later if change')}}
/>:<Text>no missions</Text>}
  
    {/* {info.sender?(
    <View style={[styles.card, { backgroundColor: color }]} onTouchEnd={handleClick}>
     <Text style={styles.title}>{info.name}</Text>
      <Text style={styles.body}>{info.address}</Text>
      <Text style={styles.body}>Price: ${info.price}</Text>
      {info.open ? (
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : null}
       </View>
  ):<Text>no missions</Text>} */}
  </View>)
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: 'blue', // Adjust the color as needed
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
