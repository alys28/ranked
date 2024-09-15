import torch
from torch.utils.data import Dataset    
import json

class ReviewDataset(Dataset):
    
    def __init__(self, embeddings_file, delta_files):
        '''
        Will load the embeddings of the reviews, and the delta files (JSON files)
        '''
        with open(embeddings_file) as embeddings_data:
            self.embeddings = json.load(embeddings_data)
        with open(delta_files) as delta_data:
            self.deltas = json.load(delta_data)
    def __getitem__(self, idx):
        embed_idx = int(self.deltas[idx]["index"])
        return torch.tensor(self.embeddings[embed_idx]["embedding"], dtype=torch.float32), torch.tensor(self.deltas[idx]["delta"], dtype=torch.float32)
    def __len__(self):
        return len(self.deltas)

        