import React from 'react';
import { View, Text } from 'react-native';
import { calculatePercentile } from '../utils/growthPercentile';

const ResultScreen = ({ route }) => {
  const { weight, height, age, gender, standard } = route.params;
  const percentile = calculatePercentile(weight, height, age, gender, standard);

  return (
    <View>
      <Text>Percentile: {percentile}</Text>
    </View>
  );
};

export default ResultScreen;
