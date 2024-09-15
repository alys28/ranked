import json
import torch
import numpy as np


def generate_delta_files(autoencoder_model, initial_file, final_file, output_file="delta.json"):
    with open(initial_file, "r") as f:
        initial = json.load(f)
        f.close()
    with open(final_file, "r") as f:
        final = json.load(f)
        f.close()
    deltas = []
    for key, values in final.items():
        key = int(key)
        initial_profile = initial[key]
        initial_array = torch.tensor(list(initial_profile.values()))
        initial_latents = autoencoder_model.encode(initial_array)
        for value in values:
            values_array = torch.tensor(list(value.values()))
            final_latents = autoencoder_model.encode(values_array)
            delta_val = final_latents - initial_latents
            deltas.append(delta_val)
    with open(output_file, "w") as f:
        json.dump(deltas, f, indent=4)



def combine_initial_and_final_profiles():
    pass