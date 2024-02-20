import React, { useEffect, useState } from 'react';
import { View, Button,  ScrollView, RefreshControl,TouchableOpacity, StyleSheet } from 'react-native';
import MassionCard from './missionZone/missionCard';
import { Text } from 'react-native-elements';
import AwesomeButton from "react-native-really-awesome-button";
import Btn from './buttons/onlineBtn';
import Filtering from './filtering/filtering';
import { useAtom } from 'jotai';
import filterAtom from './filtering/filterAtom';
import { Task, defaultFilters } from './types/types';



export default function HomePage({
  openMissions,
  goOnline,
  goOffline,
  refreshData,
  takeMission,
  online
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [filters] = useAtom(filterAtom)
  const [filteredMissions,setFilteredMissions] = useState <Array<Task> >([])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshData();
    setRefreshing(false);
  }, [refreshData]);

  useEffect(()=>{
    if(Array.isArray(openMissions)){ 
      if(filters===defaultFilters){setFilteredMissions(openMissions)}
      else{
     setFilteredMissions(()=>{
      const tasksList = []
       openMissions.map((mission)=>{
       const task = filterFunc(mission)
       if(task){tasksList.push(task)}
     })
     return tasksList
       })
    }}
  },[openMissions,filters])

  function filterFunc(task:Task){
    let flag = true
    Object.entries(filters).map((filter)=>{
      if(filter[0]==='minPrice'){
          if(task.price<Number(filter[1])){
          flag=false
          }
      }
      else if(filter[1]!==''&&task[filter[0]]!==filter[1]){
        flag= false}
    })
    return flag?task:flag
    }

  return (
    <View style={{height:'90%',width:'100%'}}>
      <Btn onlineFunc={goOnline} oflineFunc={goOffline}/>
      <Filtering/>
      <ScrollView 
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        

        {Array.isArray(openMissions)&&openMissions.length>0
          ? filteredMissions.map((card, index) => (
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
          : <Text style={{textAlign:'center'}}>No Missions Yet</Text>}
          
      </ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    padding: 8,
    borderRadius: 4,
    textAlign: "center",
    color: "white",
    fontWeight: '400',
    fontSize: 18,
  },
})