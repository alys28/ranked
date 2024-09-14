import torch
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as DataLoader
import torchvision.transforms as transforms
import torchvision.datasets as datasets
import matplotlib.pyplot as plt

# Define the Autoencoder
class Autoencoder(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(Autoencoder, self).__init__()
        # Encoder
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 512),
            nn.ReLU(True),
            nn.Linear(512, 256),
            nn.ReLU(True),
            nn.Linear(256, 128),
            nn.ReLU(True),
            nn.Linear(128, 64),
            nn.ReLU(True),
            nn.Linear(64, output_dim)  # Latent space representation (3 dimensions)
        )
        # Decoder
        self.decoder = nn.Sequential(
            nn.Linear(output_dim, 64),
            nn.ReLU(True),
            nn.Linear(64, 128),
            nn.ReLU(True),
            nn.Linear(128, 256),
            nn.ReLU(True),
            nn.Linear(256, 512),
            nn.Linear(512, input_dim),
        )

    def encode(self, x):
        return self.encoder(x)
    def forward(self, x):
        x = self.encoder(x)
        x = self.decoder(x)
        return x


def train(dataloader, num_epochs, lr=0.001):
    train_loader = dataloader
    # Initialize the model, loss function, and optimizer
    model = Autoencoder()
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

    # Plot original and reconstructed images
