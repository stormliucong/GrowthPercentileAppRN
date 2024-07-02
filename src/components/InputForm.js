import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const InputForm = ({ navigation, patientData, modelPath }) => {
  const [weight, setWeight] = useState('65'); // weight in kg default value is 65
  const [height, setHeight] = useState('170'); // height in cm default value is 170
  const [age, setAge] = useState('400'); // age in months default value is 400
  const [gender, setGender] = useState('male');
  const [standard, setStandard] = useState('US');

  const processPatientData = (patientData) => {
    // To be implemented
    // It should extract weight, height
    // and age from the patient data
    // and set them to the state
  }

  const handleSubmit = () => {
    navigation.navigate('Result', {
      weight,
      height,
      age,
      gender,
      standard,
      modelPath
    });
  };

  return (
    <View>
      <Text>Weight (kg)</Text>
      <TextInput value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <Text>Height (cm)</Text>
      <TextInput value={height} onChangeText={setHeight} keyboardType="numeric" />
      <Text>Age (months)</Text>
      <TextInput value={age} onChangeText={setAge} keyboardType="numeric" />
      <Text>Gender</Text>
      <Picker selectedValue={gender} onValueChange={setGender}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <Text>Standard</Text>
      <Picker selectedValue={standard} onValueChange={setStandard}>
        <Picker.Item label="US" value="US" />
        <Picker.Item label="WHO" value="WHO" />
      </Picker>
      <Button title="Calculate" onPress={handleSubmit} />
    </View>
  );
};

export default InputForm;
