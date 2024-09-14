import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F

# Define the MLP model
class MLP(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(MLP, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)  # Input to hidden layer
        self.fc2 = nn.Linear(hidden_size, hidden_size)  # Hidden layer to another hidden layer
        self.fc3 = nn.Linear(hidden_size, output_size)  # Hidden layer to output layer

    def forward(self, x):
        x = F.relu(self.fc1(x))  # Apply ReLU activation function to hidden layer 1
        x = F.relu(self.fc2(x))  # Apply ReLU to hidden layer 2
        x = self.fc3(x)  # Output layer (no activation for regression)
        return x

# Initialize the model, loss function, and optimizer
input_size = 10    # Example input size
hidden_size = 64   # Number of neurons in hidden layers
output_size = 1    # Example output size (e.g., regression)

model = MLP(input_size, hidden_size, output_size)

# Define the loss function and optimizer
criterion = nn.MSELoss()  # Mean Squared Error for regression
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Example training loop
def train(model, criterion, optimizer, inputs, targets, num_epochs=100):
    for epoch in range(num_epochs):
        model.train()

        # Forward pass
        outputs = model(inputs)
        loss = criterion(outputs, targets)

        # Backward pass and optimization
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if (epoch+1) % 10 == 0:
            print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

# Example inputs and targets
inputs = torch.randn(100, input_size)  # 100 samples, each with `input_size` features
targets = torch.randn(100, output_size)  # 100 corresponding targets

# Train the model
train(model, criterion, optimizer, inputs, targets)
