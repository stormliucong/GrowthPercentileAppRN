import React from 'react';
import { View, Text } from 'react-native';
import InputForm from '../components/InputForm';
import { useEffect } from 'react';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    console.log('HomeScreen mounted');
  }, []);
  return (
    <View>
      <Text>Welcome to Growth Percentile Calculator</Text>
      <InputForm navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
