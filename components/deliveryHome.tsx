import React from 'react';
import { View, Button, ScrollView } from 'react-native';
import MassionCard from './missionZone/missionCard';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function HomePage({
  openMissions,
  goOnline,
  goOffline,
  refreshData,
  takeMission,
  online
}) {

const navigation = useNavigation()

  return (
    <View style={{height:'90%',width:'100%'}}>
    <Button onPress={refreshData} title="Refresh Data" />
      <ScrollView >
        {Array.isArray(openMissions)&&openMissions.length>0
          ? openMissions.map((card, index) => (
              <View
                key={index}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
              >
                <MassionCard info={card} takeMission={takeMission} />
              </View>
            ))
          : <Text>No Missions Yet</Text>}
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 }}>
        {!online?<Button onPress={goOnline} title="Go Online" />:null}
       {online?<Button onPress={goOffline} title="Go Offline" />:null}
      </View>
    </View>
  );
}
