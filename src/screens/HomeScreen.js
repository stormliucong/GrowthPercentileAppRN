import React from 'react';
import { View } from 'react-native';
import InputForm from '../components/InputForm';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <InputForm navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
