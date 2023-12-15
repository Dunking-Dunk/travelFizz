import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/CustomDrawerContent.js'
import HomeScreen from './Home.js';
import TravelScreen from './Travel.js';
import ProfileScreen from './Profile.js';

const Drawer = createDrawerNavigator()

const MainScreen = () => {
    return(
      <View style={styles.container}>
<Drawer.Navigator initialRouteName='main'  drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
        />
      )}
      screenOptions={{
        drawerActiveBackgroundColor: '#0F0F0F',
        drawerActiveTintColor: '#fff',
        drawerStatusBarAnimation: "fade",
        swipeEnabled: true,
        headerShown: false,
        drawerInactiveTintColor: '#282534',
      }}>
        <Drawer.Screen name='Home' component={HomeScreen}/>
        <Drawer.Screen name='Travel' component={TravelScreen}/>
        <Drawer.Screen name='Profile' component={ProfileScreen}/>
      </Drawer.Navigator>
      </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#282534'
    },
  });
  