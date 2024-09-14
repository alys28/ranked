import torch

def update_profile(autoencoder, MLP, profile: list, review: torch.Tensor):
    '''
    profile: customer profile (not the latents)
    '''
    latent_profile = autoencoder.encode(profile)
    embeddings = MLP(review)
    new_latents = latent_profile + embeddings
    new_profile = autoencoder.decode(latent_profile)
    return new_profile, new_latents