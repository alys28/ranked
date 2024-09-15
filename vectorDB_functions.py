import torch
from data.embed_reviews import SBERT_embedding_model
from pinecone.grpc import PineconeGRPC as Pinecone
from dotenv import load_dotenv
import os

load_dotenv()

pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
index = pc.Index("ranked")


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

def upload_profile(profile, product_ids, profile_id, autoencoder_model):
    value = autoencoder_model.encode(profile)
    index.upsert(
    vectors=[
        {
            "id": profile_id,
            "values": value, 
            "metadata": {"product_ids": product_ids, "profile_id": profile_id}
        },
    ],)

def fetch_profile(profile_id):
    return index.fetch([profile_id])

def update_profile(profile_id, profile, autoencoder_model):
    value = autoencoder_model.encode(profile)
    index.update(id=profile_id, values=value)


def query_profiles(product_id, profile_id):
    profile_vector = fetch_profile(profile_id)
    matches = index.query( 
        vector=profile_vector,
        top_k=100,
        include_values=True,
        include_metadata=True,
        filter={
            "product_ids": {"$in": [product_id]}
        })
    output = []
    for match in matches["matches"]:
        output.append((match["metadata"]["profile_id"], match["score"])) 
    output.sort(key=lambda x: x[1])
    return output


