import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from '../components/CustomButton';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/AuthReducer';
import api from '../api/axios'

const COLORS = {primary: '#282534', white: '#fff'};


const OnboardingScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
      gender: '',
      age: 0,
      interest: '',
      modeOfTransport: ''
    })

    const handleSubmit = async() => {
        const res = await api.put('/users/me', state)
        dispatch(setUser(res.data))
    }

  return (
    <View style={{backgroundColor: '#282534', flex: 1, gap: 20, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.title}>Preferences</Text>
        <TextInput placeholder='Enter Age' keyboardType='numeric'  onChangeText={(text) => setState((state) => ({...state, age: text}))}
         style={styles.input}/>
        <RNPickerSelect
        style={styles.selectInput}
            onValueChange={(value) => setState((state) => ({...state, gender: value}))}
            items={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ]}
        />
         <RNPickerSelect
          style={styles.selectInput}
         onValueChange={(value) => setState((state) => ({...state, interest: value}))}
    
        items={[
          { label: 'Adventure activities', value: 'adventure activities' },
          { label: 'Cultural experiences', value: 'cultural experiences' },
          { label: 'Relaxation and wellness activities', value: 'relaxation and wellness activities' },
          { label: 'Culinary preferences', value: 'culinary preferences' },
        ]}
    />
     <RNPickerSelect
      style={styles.selectInput}
        onValueChange={(value) => setState((state) => ({...state, modeOfTransport: value}))}
        items={[
            { label: 'Bus', value: 'bus' },
            { label: 'Train', value: 'train' },
            { label: 'Flight', value: 'flight' },
        ]}
    />
    <CustomButton label={'submit'} onPress={handleSubmit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  selectInput: {
    color: '#fff'
  }
});
export default OnboardingScreen;