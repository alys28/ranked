from sentence_transformers import SentenceTransformer
import json

# Load a pre-trained SBERT model
SBERT_embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Get sentence embeddings
embeddings = SBERT_embedding_model.encode("\"I'm a perfectionist by nature, and this product's attention to detail was music to my ears. The sturdy construction and seamless functionality made it a joy to use, and I must say, it's given me a newfound sense of confidence in my ability to tackle even the most daunting tasks. 5 stars!\"")

# # Check the shape of the embeddings
print(embeddings.shape)

# # Print the embeddings
# print(embeddings.tolist())
# if __name__ == "__main__":
#     file = "reviews.json"
#     with open(file) as f:
#         text_data = json.load(f)
#         f.close()
#     i = 0
#     for entry in text_data:
#         i += 1
#         try:
#             with open('reviews_embedded.json', 'r') as json_file:
#                 reviews = json.load(json_file)
#         except FileNotFoundError:
#             reviews = []
#         review_encoded = SBERT_embedding_model.encode(entry)
#         reviews.append({"embedding": review_encoded.tolist(), "sentence": entry})
#         with open('reviews_embedded.json', 'w') as json_file:
#             json.dump(reviews, json_file, indent=4)
#         print(i)
        