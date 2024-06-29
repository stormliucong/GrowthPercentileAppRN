import torch.onnx as onnx
import torch
from train_torch_models import MLP
import skl2onnx
import joblib
import onnxruntime as ort

# Load the PyTorch model
torch_model = MLP()
torch_model.load_state_dict(torch.load('torch_mlp_model_state_dict.pth'))
torch_model.eval()  # Set the model to evaluation mode

# Export the model to OXNN format
torch_input = torch.randn(1, 5) # IMPORTANT: it can only process one input at a time, which is desired for our use case.
print(torch_input.shape)
onnx_program = onnx.dynamo_export(torch_model, torch_input)
onnx_program.save('torch_mlp_model.onnx')


# Test the ONNX model

# Load the ONNX model
ort_session = ort.InferenceSession("./torch_mlp_model.onnx", providers=['CPUExecutionProvider'])
# Get the input name for the ONNX model
input_name = ort_session.get_inputs()[0].name
input_shape = ort_session.get_inputs()[0].shape
input_type = ort_session.get_inputs()[0].type
print(f'ONNX input name: {input_name}')
print(f'ONNX input shape: {input_shape}')
print(f'ONNX input type: {input_type}')
# create a random input tensor
# Since the OXNN is defined to process one sample each time, we can only pass one sample to the model.
torch_input = torch.randn(input_shape[0], input_shape[1])
print(f'Torch input shape: {torch_input.shape}')
print(f'Torch input type: {torch_input.dtype}')
print(f'Torch input: {torch_input}')

# Predict with PyTorch
torch_outputs = torch_model(torch_input)
print(f'Torch outputs: {torch_outputs}')
print(f'shape of torch outputs: {torch_outputs.shape}')

# change tensor to numpy, required by ONNX Runtime
oxnn_input = torch_input.numpy()
print(f'OXNN input: {oxnn_input}')
# Predict with OXNN
onnxruntime_outputs = ort_session.run(None,{input_name: oxnn_input})
print(f'ONNX outputs: {onnxruntime_outputs[0]}')
print(f'shape of ONNX outputs: {onnxruntime_outputs[0].shape}')

assert len(torch_outputs) == len(onnxruntime_outputs[0])
torch.testing.assert_close(torch_outputs, torch.tensor(onnxruntime_outputs[0]))

print("PyTorch and ONNX Runtime output matched!")

