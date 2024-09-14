import torch
from torch.utils.data import Dataset    
import json

class ReviewDataset(Dataset):
    
    def __init__(self, embeddings_file, delta_files):
        '''
        Will load the embeddings of the reviews, and the delta files (JSON files)
        '''
        with open(embeddings_file) as embeddings_data:
            self.embeddings = json.loads(embeddings_data)
            embeddings_data.close()
        with open(delta_files) as delta_data:
            self.deltas = json.loads(delta_data)
            delta_data.close()
    def __getitem__(self, idx):
        return torch.tensor(self.embeddings[idx]), torch.tensor(self.deltas[idx])
    def __len__(self):
        return len(self.embeddings)

        