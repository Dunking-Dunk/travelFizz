import {View, Text,StyleSheet, TouchableOpacity} from 'react-native'
import { useState } from 'react'
import InputField from '../components/InputField'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import CustomButton from '../components/CustomButton'
import api from '../api/axios'

const RegisterScreen = ({navigation}) => {
    const [state,setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async() => {
      if (state.name.length > 3 && state.password.length > 3 && state.email.length > 3) {
        await api.post('/users/register', state)
        navigation.navigate('OnBoard')
      }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
        <InputField
          label={'Full Name'}
          setText={(e) => {
            setState((state) => ({...state, name: e}))
          }}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />

        <InputField
          label={'Email ID'}
          setText={(e) => {
            setState((state) => ({...state, email: e}))
          }}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          setText={(e) => {
            setState((state) => ({...state, password: e}))
          }}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />

        <InputField
          label={'Confirm Password'}
          
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />
        <CustomButton onPress={() => {
            handleSubmit()
        }} label='Register'/>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10
    },
    title: {
        fontSize: 28,
        textTransform: 'uppercase',
        marginBottom: 20
    }
})