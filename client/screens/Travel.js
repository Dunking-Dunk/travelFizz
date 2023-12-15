import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import RNPickerSelect from 'react-native-picker-select';

const TravelScreen = ({ navigation}) => {
    const [state, setState] = useState({
        destination: '',
        budget: 0,
        numberOfPerson: 0,
        modeOfTransport: ''
    })

    const handleSubmit = () => {
        console.log(state)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Travel</Text>
            <InputField label={'destination'}  setText={(e) => {
            setState((state) => ({...state, destination: e}))
          }}/>
            <TextInput placeholder='Enter Budget In Rupee' keyboardType='numeric'  onChangeText={(text) => setState((state) => ({...state, budget: text}))}
         style={styles.input}/>
            <Text>Number Of Person</Text>
            <RNPickerSelect
      
         onValueChange={(value) => setState((state) => ({...state, numberOfPerson: value}))}
        items={[
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
        ]}
    />
    <Text>Mode Of Transport</Text>
     <RNPickerSelect
        onValueChange={(value) => setState((state) => ({...state, modeOfTransport: value}))}
        items={[
            { label: 'Bus', value: 'bus' },
            { label: 'Train', value: 'train' },
            { label: 'Flight', value: 'flight' },
        ]}
    />
    <CustomButton label={'Submit'} onPress={handleSubmit}/>
        </View>
    )
}

export default TravelScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
      flex: 1,
      padding: 20,
      gap: 20
    },
    title: {
        fontSize: 20,
        textTransform: 'uppercase'
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5
      },
  });
  