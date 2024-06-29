import pandas as pd
import torch
from torch.utils.data import DataLoader, TensorDataset
import torch.nn as nn
import torch.optim as optim
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split


class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.layers = nn.Sequential(
            nn.Linear(5, 50),  # 5 inputs to 50 hidden nodes
            nn.ReLU(),
            nn.Linear(50, 1)  # Output layer: 50 inputs to 1 output
        )
    
    def forward(self, x):
        return self.layers(x)



if __name__ == '__main__':
    # Load data
    data = pd.read_csv('simulated_patient_gender_height_weight_bmi.csv')

    # Encode the 'Gender' column
    label_encoder = LabelEncoder()
    data['Gender'] = label_encoder.fit_transform(data['Gender'])

    # Features and target
    X = data[['Gender','Height_cm','Weight_kg','Height_ft','Weight_lbs']]
    y = data['BMI'].values

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Normalize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Convert to PyTorch tensors
    X_train_tensor = torch.tensor(X_train_scaled, dtype=torch.float32)
    y_train_tensor = torch.tensor(y_train.reshape(-1, 1), dtype=torch.float32)
    X_test_tensor = torch.tensor(X_test_scaled, dtype=torch.float32)
    y_test_tensor = torch.tensor(y_test.reshape(-1, 1), dtype=torch.float32)
    print(X_train_tensor.shape, y_train_tensor.shape)

    # Create dataloaders
    train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)

    model = MLP()

    optimizer = optim.Adam(model.parameters(), lr=0.001)
    epochs = 1000

    for epoch in range(epochs):
        for inputs, targets in train_loader:
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = nn.MSELoss()(outputs, targets)
            loss.backward()
            optimizer.step()
        print(f'Epoch {epoch+1}/{epochs}, Loss: {loss.item()}')
        
    # Evaluate the model
    model.eval()
    with torch.no_grad():
        y_pred = model(X_test_tensor)
        test_loss = nn.MSELoss()(y_pred, y_test_tensor)
        print(f'Test Loss: {test_loss.item()}')

    # Save the model
    torch.save(model.state_dict(), 'torch_mlp_model_state_dict.pth')