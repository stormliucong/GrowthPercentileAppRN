// utils/onnxModel.js
import * as ort from 'onnxruntime-react-native'
import { Asset } from "expo-asset";
import RNFS from 'react-native-fs';
import FileSystem from 'expo-file-system';
// import torch_mlp_model from '../../assets/torch_mlp_model.onnx';


async function fetchModelFile(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Failed to fetch the model file: ${response.statusText}`);
      }
      console.log('Response:', response);
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer;
  } catch (error) {
      console.error('Error fetching model file:', error);
      return null;
  }
}


export const loadAndRunModel = async (modelPath, inputFeatures) => {
  try {
    if (!ort.InferenceSession) {
      throw new Error('ort.InferenceSession is not available. Ensure onnxruntime-web is properly imported.');
    }
    console.log('Model Path:', modelPath);
    const arrayBuffer = await fetchModelFile(modelPath);
    if (!arrayBuffer) {
      throw new Error('Failed to load the model file');
    }
    else {
      console.log('Model loaded:', arrayBuffer);
    }
    // The following code is commented out because it is not working
    // const modelPath = require("./assets/torch_mlp_model.onnx");
    // const assets = await Asset.loadAsync(modelPath);
    // const modelUri = assets[0].localUri;
    // It only works when the model is loaded from the hard coded path
    const modelUri = '/Users/cl3720/Desktop/GrowthPercentileAppRN/assets/torch_mlp_model.onnx'
    const session = await ort.InferenceSession.create(modelUri, {});

    // const session = await ort.InferenceSession.create(arrayBuffer, {});
    console.log('Inference session created successfully');

    // Prepare the input tensor for the model
    const inputTensor = new ort.Tensor('float32', new Float32Array(inputFeatures), [1, inputFeatures.length]);
    if (!inputTensor) {
      throw new Error('Failed to create input tensor for the model.');
    }

    const input_name = 'l_x_'
    // Create the feeds object for the session run
    const feeds = { [input_name]: inputTensor };
    console.log('Feeds:', feeds);
    const results = await session.run(feeds);
    console.log('Results:', results);
    // Get the output from the model
    const output = results.layers_1.cpuData;
    console.log('Output:', output);
    // Return the output
    return output[0];
  } catch (error) {
    // Log any errors that occur during the model load and run process
    console.error('Failed to load and run ONNX model:', error);
    throw error;
  }
};



export const processFeatures = (weight_kg, height_cm, gender) => {
    // Implement the logic to process the input features
    // This is a placeholder and should be replaced with actual logic
    const genderValue = gender.toLowerCase() === 'male' ? 0 : 1;
    height_cm = parseFloat(height_cm);
    weight_kg = parseFloat(weight_kg);
    const weigth_lb = weight_kg * 2.20462;
    const height_ft = height_cm * 0.0328084;
    
    // 'Gender','Height_cm','Weight_kg','Height_ft','Weight_lb'
    const inputFeatures = [genderValue, height_cm, weight_kg, height_ft, weigth_lb]
    console.log('inputFeatures:', inputFeatures);
    // z = (x - u) / s
    // mean and std in adult
    height_cm_mean = 169.5;
    height_cm_std = 9.7;
    weight_kg_mean = 69.4;
    weight_kg_std = 15.2;
    height_ft_mean = 5.6;
    height_ft_std = 0.3;
    weight_lb_mean = 152.9;
    weight_lb_std = 33.5;
    const inputFeaturesS = inputFeatures.map((x, i) => {
        if (i === 1) {
            return StandardScaler(x, height_cm_mean, height_cm_std);
        }
        else if (i === 2) {
            return StandardScaler(x, weight_kg_mean, weight_kg_std);
        }
        else if (i === 3) {
            return StandardScaler(x, height_ft_mean, height_ft_std);
        }
        else if (i === 4) {
            return StandardScaler(x, weight_lb_mean, weight_lb_std);
        }
        return x;
    });
    return inputFeaturesS;
}

// StandardScaler
function StandardScaler (x, mean, std) {
    // z = (x - u) / s
    return (x - mean) / std;
}
