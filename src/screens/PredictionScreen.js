import React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InputForm from '../components/InputForm';


const PredictionScreen = ({ route, navigation }) => {
  const {patientData, modelPath} = route.params;


  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 20}}>Welcome to BMI Calculator</Text>
        <InputForm navigation={navigation} patientData={patientData} modelPath={modelPath} />
      </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default PredictionScreen;
