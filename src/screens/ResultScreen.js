import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { calculatePercentile } from '../utils/growthPercentile';
import { loadAndRunModel, processFeatures } from '../utils/onnxModel';
import { useEffect, useState } from 'react';

const ResultScreen = ({ route }) => {
  const { weight, height, age, gender, standard } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [riskScore, setRiskScore] = useState(null);
  const percentile = calculatePercentile(weight, height, age, gender, standard);
  
  const inputFeatures = processFeatures(weight, height, gender);
  console.log('inputFeatures', inputFeatures);
  const modelPath = 'https://github.com/stormliucong/GrowthPercentileAppRN/blob/main/models/torch_mlp_model.onnx';
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Load and Run the ONNX model
        const result = await loadAndRunModel(modelPath, inputFeatures);

        // Set the risk score
        setRiskScore(output[0]);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load ONNX model:', error);
        setIsLoading(false);
      }
    };

    loadModel();
  }, [inputFeatures]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading model...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Percentile: {percentile}</Text>
      <Text>Risk: {riskScore} </Text>
    </View>
  );
};

export default ResultScreen;
