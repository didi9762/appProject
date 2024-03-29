import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from './components/profile/Profile';
import MainPage from './mainPage';
import GroupsPage from './components/groups/groupsPage';
import HistoryPage from './components/missionZone/HistoryPage';
import LoginScreen from './components/profile/logIn';
import  {Provider} from 'jotai'
import MissionsInProgress from './components/missionZone/missionInProgress';
import React, { useEffect } from 'react';
import JoinGroup from './components/groups/joinGroup';
import {I18nManager,StatusBar} from 'react-native'
import GroupsRequests from './components/groups/GroupsRequests';
import InitPage from './initPage';
import HelpPage from './components/help/help';

I18nManager.forceRTL(false)
I18nManager.allowRTL(false)
StatusBar.setHidden(false)
export default function App(){
const stack = createStackNavigator()



return (
  <Provider>
  <NavigationContainer>
  <stack.Navigator initialRouteName='InitPage'>
    <stack.Screen name='InitPage' options={{headerShown:false}} component={InitPage}/>
    <stack.Screen name='MainPage'  options={{headerShown:false}} component={MainPage}/>
    <stack.Screen name='ProfilePage' component={ProfilePage}/>
    <stack.Screen name='HistoryPage' component={HistoryPage}/>
    <stack.Screen name='GroupsPage' component={GroupsPage}/>
    <stack.Screen name='LogIn' component={LoginScreen}/>
    <stack.Screen name='Progress'  component={MissionsInProgress}/>
    <stack.Screen name='Join' component={JoinGroup}/>
    <stack.Screen name='Requests' component={GroupsRequests}/>
    <stack.Screen name='Help' component={HelpPage}/>
   </stack.Navigator>
  </NavigationContainer>
  </Provider>
);
}