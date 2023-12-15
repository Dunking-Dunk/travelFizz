import { createStackNavigator } from "@react-navigation/stack"

import RegisterScreen from "./Register.js"
import LoginScreen from "./Login.js"
import OnboardingScreen from "./OnBoard.js"

const Stack = createStackNavigator()


const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            animationEnabled: true,
            headerShown: false,
          }} >
          <Stack.Screen name='Register' component={RegisterScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name="OnBoard" component={OnboardingScreen}/>
        </Stack.Navigator> 
    )
}

export default AuthStack