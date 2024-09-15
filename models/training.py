import torch
import autoencoder
import MLP
from torch.utils.data import DataLoader, random_split
from data.ProfileDataset import ProfileDataset
from data.ReviewDataset import ReviewDataset
import argparse
import yaml

parser = argparse.ArgumentParser(description="")
parser.add_argument('--model', type=str, default="autoencoder")
parser.add_argument('--config_path', type=str, default="autoencoder")



args = parser.parse_args()

def get_train_val_loaders(dataset, batch_size, val_split=0.2):
    dataset_size = len(dataset)
    val_size = int(val_split * dataset_size)
    train_size = dataset_size - val_size

    train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)

    return train_loader, val_loader

if __name__ == "__main__":
    with open(args.config_path, 'r') as file:
        try:
            config = yaml.safe_load(file)
        except yaml.YAMLError as exc:
            print(exc)
    if args.model == "autoencoder":
        config = config["autoencoder"]
        dataset = ProfileDataset(json_file=config["json_file"])
        train_loader, val_loader = get_train_val_loaders(dataset, config["batch_size"], val_split=0.2)
        autoencoder.train(train_loader, val_loader, encoder_dims=config["encoder_dims"], decoder_dims=config["decoder_dims"], num_epochs=config["num_epochs"], save_dir=config["save_dir"], save_iter = 100, lr=0.0001)
    else:
        config = config["MLP"]
        dataset = ReviewDataset(embeddings_file=config["embeddings_file"], delta_files=config["delta_file"])
        train_loader, val_loader = get_train_val_loaders(dataset, config["batch_size"], val_split=0.2)
        MLP.train(train_loader, val_loader, dims=config["dims"], num_epochs=config["num_epochs"], save_dir=config["save_dir"], save_iter = 10, lr=0.0001)