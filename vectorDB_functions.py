import torch
from models.embed_reviews import SBERT_embedding_model
from pinecone.grpc import PineconeGRPC as Pinecone
from dotenv import load_dotenv
import os
from models.Autoencoder import Autoencoder
from models.MLP import MLP


load_dotenv()

pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
index = pc.Index("ranked")

autoencoder_model = Autoencoder(encoder_dims=[47, 32, 24, 20, 16, 10], decoder_dims=[10, 16, 20, 24, 32, 47])

autoencoder_model.load_state_dict(torch.load("model_checkpoints/autoencoder_best_model.pth", weights_only=True))
autoencoder_model.eval()

mlp_model = MLP(dims=[384, 256, 128, 64, 32, 16, 10])
mlp_model.load_state_dict(torch.load("model_checkpoints/mlp_best_model.pth", weights_only=True))
mlp_model.eval()

def update_profile(autoencoder, MLP, profile_id, review: str, product_id):
    '''
    profile: customer profile (not the latents)
    Updates the profile based on the new review
    '''
    review = torch.from_numpy(SBERT_embedding_model.encode(review))
    response = index.fetch(ids=[str(profile_id)])
    latent_profile = torch.tensor(response['vectors'][str(profile_id)]["values"])
    embeddings = MLP(review)
    new_latents = latent_profile + embeddings
    new_profile = autoencoder.decode(latent_profile) * 100
    current_metadata = response['vectors'][str(profile_id)]['metadata']
    product_ids = current_metadata["product_ids"]
    product_ids.append(str(product_id))
    index.update(
    id=str(profile_id),
    values=new_latents,
    set_metadata={
        "product_ids": product_ids,  # Update the 'tags' field in metadata
        "profile_id": profile_id
        }
    )
    return new_profile

def upload_profile(profile, product_ids, profile_id, autoencoder_model):
    value = autoencoder_model.encode(torch.tensor(profile, dtype=torch.float32)/100)
    index.upsert(
    vectors=[
        {
            "id": str(profile_id),
            "values": value, 
            "metadata": {"product_ids": product_ids, "profile_id": profile_id}
        },
    ],)
    return True

def fetch_profile(profile_id):
    return index.fetch([str(profile_id)])['vectors'][profile_id]

def query_profiles(product_id, profile_id):
    profile_vector = fetch_profile(str(profile_id))["values"]
    matches = index.query( 
        vector=profile_vector,
        top_k=100,
        include_values=True,
        include_metadata=True,
        filter={
            "product_ids": {"$in": [str(product_id)]}
        })
    output = []
    for match in matches["matches"]:
        output.append((match["metadata"]["profile_id"], match["score"])) 
    output.sort(key=lambda x: x[1])
    return output


# profile = [6, 52, 4, 3, 1, 1, 92, 50, 64, 34, 39, 23, 7, 11, 42, 60, 59, 64, 33, 75, 5, 99, 8, 75, 33, 19, 14, 91, 9, 16, 1, 7, 1, 5, 82, 3, 99, 96, 21, 5, 2, 9, 1, 68, 22, 2, 11]
# product_ids = []
# profile_id = 1

# # print(upload_profile(profile, product_ids, profile_id, autoencoder_model))
# # update_profile(autoencoder_model, mlp_model, profile_id, review="Amazing Product!", product_id=1)
# print(query_profiles(1, 1))