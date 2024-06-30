const ort = require('onnxruntime-web');

const testONNXRuntime = async () => {
  try {
    if (!ort.InferenceSession) {
      throw new Error('ort.InferenceSession is not available. Ensure onnxruntime-web is properly imported.');
    }

    console.log('onnxruntime-web is properly imported and available.');
  } catch (error) {
    console.error(error);
  }
};

testONNXRuntime();
