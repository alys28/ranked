import torch
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as DataLoader
import torchvision.transforms as transforms
import torchvision.datasets as datasets
import os

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
                for i in range(1, len(decoder_dims))
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
    

def train(dataloader, encoder_dims, decoder_dims, num_epochs, save_dir, save_iter = 10, lr=0.001):
    train_loader = dataloader
    # Initialize the model, loss function, and optimizer
    model = Autoencoder(encoder_dims, decoder_dims)
    criterion = nn.MSELoss()  # Mean Squared Error Loss for reconstruction
    optimizer = optim.Adam(model.parameters(), lr=lr)

    # Training the Autoencoder
    for epoch in range(num_epochs):
        for data in train_loader:
            profile_input = data        
            # Forward pass
            output = model(profile_input)
            loss = criterion(output, profile_input)
            
            # Backward pass
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
        
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')
        
        if (epoch + 1) % save_iter == 0:
            save_path = os.path.join(save_dir, f'MLP_epoch_{epoch+1}.pth')
            torch.save(model.state_dict(), save_path)
            print(f'Model saved at epoch {epoch+1} to {save_path}')