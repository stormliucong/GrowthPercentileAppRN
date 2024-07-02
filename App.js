import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PredictionScreen from './src/screens/PredictionScreen';
import ResultScreen from './src/screens/ResultScreen';
import LoginScreen from './src/screens/LoginScreen';
import PatientScreen from './src/screens/PatientScreen';

const Stack = createStackNavigator();

export default function App() {
  console.log('App component loaded');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login'}}/>
        <Stack.Screen name="Patient" component={PatientScreen} />
        <Stack.Screen name="Prediction" component={PredictionScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

