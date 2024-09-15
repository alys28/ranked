import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import os
import matplotlib.pyplot as plt

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
                for i in range(1, len(dims)-1)
                for layer in (nn.Linear(dims[i-1], dims[i]), nn.ReLU())
            ],
            nn.Linear(dims[-2], dims[-1])
        )

    def forward(self, x):
        return self.module(x)


# Example training loop

def train(train_loader, val_loader, dims, num_epochs, save_dir, save_iter=10, lr=0.001):
    '''
    Training loop for the MLP, with validation and plotting capabilities
    '''
    # Initialize the model, loss function, and optimizer
    model = MLP(dims)
    criterion = nn.MSELoss()  # Mean Squared Error for regression
    optimizer = optim.Adam(model.parameters(), lr=lr)

    best_val_loss = float('inf')  # To track the best validation loss

    # Lists to store losses for plotting
    train_losses = []
    val_losses = []

    # Training loop
    for epoch in range(num_epochs):
        model.train()  # Set the model to training mode
        running_loss = 0.0

        # Training step
        for data in train_loader:
            inputs, outputs = data

            # Forward pass
            preds = model(inputs)
            loss = criterion(preds, outputs)

            # Backward pass and optimization
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        avg_train_loss = running_loss / len(train_loader)
        train_losses.append(avg_train_loss)
        print(f'Epoch [{epoch+1}/{num_epochs}], Train Loss: {avg_train_loss:.4f}')

        # Validation step
        model.eval()  # Set the model to evaluation mode (no dropout, etc.)
        val_loss = 0.0

        with torch.no_grad():  # Disable gradient computation during validation
            for val_data in val_loader:
                val_inputs, val_outputs = val_data
                val_outputs_preds = model(val_inputs)
                val_loss += criterion(val_outputs_preds, val_outputs).item()

        avg_val_loss = val_loss / len(val_loader)
        val_losses.append(avg_val_loss)
        print(f'Epoch [{epoch+1}/{num_epochs}], Validation Loss: {avg_val_loss:.4f}')

        # Save the model if validation loss improves
        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            best_model_path = os.path.join(save_dir, 'best_model.pth')
            torch.save(model.state_dict(), best_model_path)
            print(f'Best model saved with Validation Loss: {best_val_loss:.4f}')

        # Save the model at specified intervals
        if (epoch + 1) % save_iter == 0:
            save_path = os.path.join(save_dir, f'MLP_epoch_{epoch+1}.pth')
            torch.save(model.state_dict(), save_path)
            print(f'Model saved at epoch {epoch+1} to {save_path}')

    # Plotting the loss curves
    plt.figure(figsize=(10, 5))
    plt.plot(range(1, num_epochs + 1), train_losses, label='Train Loss')
    plt.plot(range(1, num_epochs + 1), val_losses, label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Training and Validation Loss over Epochs')
    plt.legend()
    plt.grid(True)
    plt.savefig(os.path.join(save_dir, 'loss_curve.png'))
    plt.show()
