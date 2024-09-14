import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import os

# Define the MLP model
class MLP(nn.Module):
    def __init__(self, dims):
        '''
        dims: list of dimensions (including input and output) for linear layers
        '''
        super(MLP, self).__init__()
        self.module = nn.Sequential(
            *[
                layer 
                for i in range(1, len(dims))
                for layer in (nn.Linear(dims[i-1], dims[i]), nn.ReLU())
            ]
        )

    def forward(self, x):
        return self.module(x)

# Initialize the model, loss function, and optimizer
input_size = 10    # Example input size
hidden_size = 64   # Number of neurons in hidden layers
output_size = 1    # Example output size (e.g., regression)


# Example training loop
def train(train_loader, save_dir, save_iter = 10, num_epochs=100):
    '''
    Training loop for the MLP, which includes a save_dir capability
    '''
    model = MLP(input_size, hidden_size, output_size)
    model.train()
    # Define the loss function and optimizer
    criterion = nn.MSELoss()  # Mean Squared Error for regression
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    for epoch in range(num_epochs):
        for data in train_loader:
            # Forward pass
            outputs = model(data)
            loss = criterion(outputs, data)

            # Backward pass and optimization
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
        if (epoch+1) % 10 == 0:
            print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')
        if (epoch + 1) % save_iter == 0:
            save_path = os.path.join(save_dir, f'MLP_epoch_{epoch+1}.pth')
            torch.save(model.state_dict(), save_path)
            print(f'Model saved at epoch {epoch+1} to {save_path}')