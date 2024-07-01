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
      const blob = await response.blob();
      console.log('Blob:', blob); 
      const arrayBuffer = await blobToArrayBuffer(blob);
      return arrayBuffer;
  } catch (error) {
      console.error('Error fetching model file:', error);
      return null;
  }
}


export const loadAndRunModel = async (modelPath, inputFeatures) => {
  try {
    // Load the ONNX model from the specified path
    // console.log('modelPath', modelPath);
    // console.log('ort', ort)
    // console.log('ort.InferenceSession', ort.InferenceSession)
    // const modelPath = require("./torch_mlp_model.onnx");
    // const assets = await Asset.loadAsync(modelPath);
    // const modelUri = assets[0].localUri;
    // console.log('Model URI:', modelUri);
    // if (!modelUri) {
    //   throw new Error('Failed to load model from assets.');
    // }
    if (!ort.InferenceSession) {
      throw new Error('ort.InferenceSession is not available. Ensure onnxruntime-web is properly imported.');
    }
    console.log('Model Path:', modelPath);
    // const response = await fetch(modelPath);
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch model: ${response.statusText}`);
    // }
    // const arrayBuffer = await response.arrayBuffer();
    // const uint8Array = new Uint8Array(arrayBuffer);
    // const arrayBuffer = await fetchModelFile(modelPath);
    // if (!arrayBuffer) {
    //   throw new Error('Failed to load the model file');
    // }
    // else {
    //   console.log('Model loaded:', arrayBuffer);
    // }
    // console.log('Model loaded:', torch_mlp_model);
    // const modelPath = require("./assets/torch_mlp_model.onnx");
    // const assets = await Asset.loadAsync(modelPath);
    // const modelUri = assets[0].localUri;
    modelUri = '/Users/cl3720/Desktop/GrowthPercentileAppRN/assets/torch_mlp_model.onnx'
    console.log('Model URI:', modelUri);
    const session = await ort.InferenceSession.create(modelUri, {});
    console.log('Inference session created successfully');
    if (!session) {
      throw new Error('Failed to load ONNX model.');
    }

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
    const weigth_lb = weight_kg * 2.20462;
    const height_ft = height_cm * 0.0328084;
    // 'Gender','Height_cm','Weight_kg','Height_ft','Weight_lb'
    inputFeatures = [genderValue, height_cm, weight_kg, height_ft, weigth_lb]
    return inputFeatures;
}
