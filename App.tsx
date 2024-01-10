import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from './components/profile/Profile';
import MainPage from './mainPage';
import GroupsPage from './components/groups/groupsPage';
import HistoryPage from './components/missionZone/HistoryPage';
import LoginScreen from './components/profile/logIn';
import  {Provider} from 'jotai'


export default function App(){
const stack = createStackNavigator()

return (
  <Provider>
  <NavigationContainer>
  <stack.Navigator initialRouteName='MainPage'>
    <stack.Screen name='MainPage' options={{headerShown:false}} component={MainPage}/>
    <stack.Screen name='ProfilePage' component={ProfilePage}/>
    <stack.Screen name='HistoryPage' component={HistoryPage}/>
    <stack.Screen name='GroupsPage' component={GroupsPage}/>
    <stack.Screen name='LogIn' component={LoginScreen}/>
   </stack.Navigator>
  </NavigationContainer>
  </Provider>
);
}