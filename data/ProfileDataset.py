import torch
from torch.utils.data import Dataset
from torch.utils.data import DataLoader
import json


class GalaxyDataset(Dataset):
    def __init__(self, json_file):
        '''
        loads data from json_file, convert the entries into a 2D array
        '''   
        with open(json_file) as json_data:
            self.entries = json.loads(json_data)
            json_data.close()
        self.entries = [list(d.values()) for d in self.entries]
    def __getitem__(self, idx):
        return torch.tensor(self.entries[idx])
    def __len__(self):
        return len(self.entries)
