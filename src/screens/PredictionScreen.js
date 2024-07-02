import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import InputForm from '../components/InputForm';


const PredictionScreen = ({ route, navigation }) => {
  console.log('navigation:', route.params);
  const {patientData, modelPath} = route.params;
  console.log('patientData:', patientData);
  console.log('modelPath:', modelPath);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View>
      <Text>Welcome to BMI Calculator</Text>
      <InputForm navigation={navigation} patientData={patientData} modelPath={modelPath} />
    </View>
    </SafeAreaView>
    
  );
};

export default PredictionScreen;
