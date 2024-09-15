import torch
from data.embed_reviews import SBERT_embedding_model
from pinecone.grpc import PineconeGRPC as Pinecone
from dotenv import load_dotenv
import os

load_dotenv()

pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
index = pc.Index("ranked")


def update_profile(autoencoder, MLP, profile_id, profile: list, review: str, product_id):
    '''
    profile: customer profile (not the latents)
    Updates the profile based on the new review
    '''
    review = SBERT_embedding_model.encode(review)
    latent_profile = autoencoder.encode(profile)
    embeddings = MLP(review)
    new_latents = latent_profile + embeddings
    new_profile = autoencoder.decode(latent_profile)
    response = index.fetch(ids=[profile_id])
    current_metadata = response['vectors'][profile_id]['metadata']
    product_ids = current_metadata["product_ids"]
    product_ids.append(product_id)
    index.update(
    id=new_latents,
    set_metadata={
        "product_ids": product_ids,  # Update the 'tags' field in metadata
        "profile_id": profile_id
        }
    )
    return new_profile

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
    return index.fetch([profile_id])['vectors'][profile_id]

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


