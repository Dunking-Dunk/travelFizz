import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import api from './api/axios.js'
import Main from './screens/MainScreen.js'
import AuthStack from './screens/Auth.js';
import store from './store/store.js';
import { setUser } from './store/AuthReducer.js';
import useLocation from './utils/useLocation.js';

const Stack = createStackNavigator()

const StackNavigator = () => {
  const {user, location} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useLocation()

  useEffect(() => {
    const helper = async() => {
      try {
        const res = await api.get('/users/me')
        dispatch(setUser(res.data.user))
      }catch (err) {
        console.log(err)
      }
    }
    helper()
  }, [])


  return (
    <NavigationContainer >
    <SafeAreaView style={{flex: 1}}>
    <StatusBar backgroundColor='#282534'/>

    <Stack.Navigator initialRouteName='auth' screenOptions={{
        animationEnabled: true,
        headerShown: false,
      }} >
        {user && location ? <Stack.Screen name='main' component={Main}/>: <Stack.Screen name='auth' component={AuthStack}/> }

    </Stack.Navigator> 
      </SafeAreaView>       
  </NavigationContainer>
  )
}

export default function App() {

  return (
    <Provider store={store}>
      <StackNavigator/>     
      </Provider>
  );
}
