from sentence_transformers import SentenceTransformer
import json

# Load a pre-trained SBERT model
SBERT_embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Get sentence embeddings
# embeddings = SBERT_embedding_model.encode(sentences)

# # Check the shape of the embeddings
# print(embeddings.shape)

# # Print the embeddings
# print(embeddings)
if __name__ == "__main__":
    file = "reviews.json"
    with open(file) as f:
        text_data = json.loads(f)
        f.close()
    for entry in text_data:
        try:
            with open('reviews_embedded.json', 'r') as json_file:
                reviews = json.load(json_file)
        except FileNotFoundError:
            reviews = []
        review_encoded = SBERT_embedding_model.encode(entry)
        reviews.append({"embedding": entry, "sentence": entry})
        with open('reviews_embedded.json', 'w') as json_file:
            json.dump(reviews, json_file, indent=4)