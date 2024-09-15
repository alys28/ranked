import json
import torch
import numpy as np
from models.autoencoder import Autoencoder

autoencoder_model = Autoencoder(encoder_dims=[47, 32, 24, 20, 16, 10], decoder_dims=[10, 16, 20, 24, 32, 47])

autoencoder_model.load_state_dict(torch.load("checkpoints/autoencoder/best_model.pth", weights_only=True))
autoencoder_model.eval()

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
        initial_array = torch.tensor(list(initial_profile.values()), dtype=torch.float32)/100
        initial_latents = autoencoder_model.encode(initial_array)
        for k, value in values.items():
            if len(value) == 47:
                values_array = torch.tensor(list(value.values()), dtype=torch.float32)/100
                final_latents = autoencoder_model.encode(values_array)
                delta_val = final_latents - initial_latents
                deltas.append({"delta": delta_val.tolist(), "index": k})
            else:
                continue
    with open(output_file, "w") as f:
        json.dump(deltas, f, indent=4)
    print("Done!")

generate_delta_files(autoencoder_model, "data/profiles.json", "data/updated_profiles.json")

def combine_initial_and_final_profiles(input_file, output_file):
    with open(input_file, "r") as f:
        initial = json.load(f)
    with open(output_file, "r") as f:
        output = json.load(f)
    for _, values in initial.items():
        for _, value in values.items():
            output.append(value)
    with open(output_file, "w") as f:
        json.dump(output, f, indent=4)


def check_for_dims(file):
    with open(file, "r") as f:
        data = json.load(f)
    new_data = []
    for i in range(len(data)):
        if len(data[i]) == 47:
            new_data.append(data[i])
    with open(file, "w") as f:
        data = json.dump(new_data, f, indent=4)
