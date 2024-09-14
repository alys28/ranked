import torch
from data.embed_reviews import SBERT_embedding_model

def update_profile(autoencoder, MLP, profile: list, review: str):
    '''
    profile: customer profile (not the latents)
    '''
    review = SBERT_embedding_model.encode(review)
    latent_profile = autoencoder.encode(profile)
    embeddings = MLP(review)
    new_latents = latent_profile + embeddings
    new_profile = autoencoder.decode(latent_profile)
    return new_profile, new_latents