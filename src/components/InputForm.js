import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const InputForm = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [standard, setStandard] = useState('US');

  const handleSubmit = () => {
    navigation.navigate('Result', {
      weight,
      height,
      age,
      gender,
      standard,
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
