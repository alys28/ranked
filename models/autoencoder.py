import torch
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as DataLoader
import torchvision.transforms as transforms
import torchvision.datasets as datasets
import os
import matplotlib.pyplot as plt

# Define the Autoencoder
class Autoencoder(nn.Module):
    def __init__(self, encoder_dims, decoder_dims):
        super(Autoencoder, self).__init__()
        # Encoder
        self.encoder = nn.Sequential(
            *[
                layer 
                for i in range(1, len(encoder_dims) - 1)
                for layer in (nn.Linear(encoder_dims[i-1], encoder_dims[i]), nn.ReLU())
            ],
            nn.Linear(encoder_dims[-2], encoder_dims[-1])
        )
        # Decoder
        self.decoder = nn.Sequential(
            *[
                layer 
                for i in range(1, len(decoder_dims) - 1)
                for layer in (nn.Linear(decoder_dims[i-1], decoder_dims[i]), nn.ReLU())
            ],
            nn.Linear(decoder_dims[-2], decoder_dims[-1])
        )
    def decode(self, x):
        return self.decoder(x)
    def encode(self, x):
        return self.encoder(x)
    def forward(self, x):
        x = self.encoder(x)
        x = self.decoder(x)
        return x
    

def train(train_loader, val_loader, encoder_dims, decoder_dims, num_epochs, save_dir, save_iter=10, lr=0.0001):
    # Initialize the model, loss function, and optimizer
    model = Autoencoder(encoder_dims, decoder_dims)
    criterion = nn.MSELoss()  # Mean Squared Error Loss for reconstruction
    optimizer = optim.Adam(model.parameters(), lr=lr)

    best_val_loss = float('inf')  # To track the best validation loss

    # Lists to store losses for plotting
    train_losses = []
    val_losses = []

    # Training the Autoencoder
    for epoch in range(num_epochs):
        model.train()  # Set the model to training mode
        running_loss = 0.0

        # Training loop
        for data in train_loader:
            profile_input = data        
            # Forward pass
            output = model(profile_input)
            loss = criterion(output, profile_input)
            
            # Backward pass
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
        
        avg_train_loss = running_loss / len(train_loader)
        train_losses.append(avg_train_loss)
        print(f'Epoch [{epoch+1}/{num_epochs}], Train Loss: {avg_train_loss:.4f}')

        # Validation step
        model.eval()  # Set the model to evaluation mode (no dropout, batchnorm, etc.)
        val_loss = 0.0

        with torch.no_grad():  # Disable gradient computation during validation
            for val_data in val_loader:
                val_input = val_data
                val_output = model(val_input)
                val_loss += criterion(val_output, val_input).item()

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
            save_path = os.path.join(save_dir, f'autoencoder_epoch_{epoch+1}.pth')
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