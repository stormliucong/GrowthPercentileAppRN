// utils/onnxModel.js
import * as ort from 'onnxruntime-react-native'

export const loadAndRunModel = async (modelPath, inputFeatures) => {
  try {
    // Load the ONNX model from the specified path
    // console.log('modelPath', modelPath);
    // console.log('ort', ort)
    // console.log('ort.InferenceSession', ort.InferenceSession)
    // const modelPath = './assets/torch_mlp_model.onnx';
    if (!ort.InferenceSession) {
      throw new Error('ort.InferenceSession is not available. Ensure onnxruntime-web is properly imported.');
    }
    console.log('Fetching model from:', modelPath);
    const response = await fetch(modelPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch model: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const session = await ort.InferenceSession.create(uint8Array);

    // Prepare the input tensor for the model
    const inputTensor = new ort.Tensor('float32', new Float32Array(inputFeatures), [1, inputFeatures.length]);

    // Create the feeds object for the session run
    const feeds = { input: inputTensor };
    const results = await session.run(feeds);

    // Get the output from the model
    const output = results.output.data;

    // Return the output
    return output[0];
  } catch (error) {
    // Log any errors that occur during the model load and run process
    console.error('Failed to load ONNX model:', error);
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
