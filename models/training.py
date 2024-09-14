import torch
import autoencoder
import MLP
from torch.utils.data import DataLoader
from data.ProfileDataset import ProfileDataset
from data.ReviewDataset import ReviewDataset
import argparse
import yaml

parser = argparse.ArgumentParser(description="")
parser.add_argument('--model', type='str', default="autoencoder")
parser.add_argument('--config_path', type='str', default="autoencoder")



args = parser.parse_args()


if __name__ == "__main__":
    with open(args.config_path, 'r') as file:
        try:
            config = yaml.safe_load(file)
        except yaml.YAMLError as exc:
            print(exc)
    if args.model == "autoencoder":
        config = config["autoencoder"]
        dataset = ProfileDataset(json_file=config["json_file"])
        dataloader = DataLoader(dataset, batch_size=config["batch_size"], shuffle=True)
        autoencoder.train(dataloader, encoder_dims=config["encoder_dims"], decoder_dims=config["decoder_dims"], num_epochs=config["num_epochs"], save_dir=config["save_dir"], save_iter = 10, lr=0.001)
    else:
        config = config["MLP"]
        dataset = ReviewDataset(embeddings_file=config["embeddings_file"], delta_files=config["delta_files"])
        dataloader = DataLoader(dataset, batch_size=config["batch_size"], shuffle=True)
        MLP.train(dataloader, dims=config["dims"], num_epochs=config["num_epochs"], save_dir=config["save_dir"], save_iter = 10, lr=0.001)