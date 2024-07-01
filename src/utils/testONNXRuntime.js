const ort = require('onnxruntime-web');

const testONNXRuntime = async () => {
  try {
    if (!ort.InferenceSession) {
      throw new Error('ort.InferenceSession is not available. Ensure onnxruntime-web is properly imported.');
    }

    console.log('onnxruntime-web is properly imported and available.');
    if (!ort.InferenceSession) {
      throw new Error('ort.InferenceSession is not available. Ensure onnxruntime-web is properly imported.');
    }
    const modelPath = 'https://github.com/stormliucong/GrowthPercentileAppRN/blob/main/models/torch_mlp_model.onnx';
    console.log('Fetching model from:', modelPath);
    const response = await fetch(modelPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch model: ${response.statusText}`);
    }
    const arrayBuffer = response.arrayBuffer();
    if (!arrayBuffer) {
      throw new Error('Failed to convert response to array buffer.');
    }
    const uint8Array = new Uint8Array(arrayBuffer);
    console.log('Model loaded:', uint8Array);
    const session = await ort.InferenceSession.create('./assests/torch_mlp_model.onnx');
    console.log('Model loaded:', session);


  } catch (error) {
    console.error(error);
  }
};

testONNXRuntime();
