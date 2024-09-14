from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import json
json_path = 'products.json'

def get_sentiment_score(review):
    analyzer = SentimentIntensityAnalyzer()
    sentiment_score = analyzer.polarity_scores(review)
    # -1 -> 0 -> 1 = negative -> neural -> positive
    return sentiment_score['compound']

# Iterate through the products to get weighted average of each
def iterate():
    product_dict = {}

    with open(json_path, 'r') as file:
        data = json.load(file)
    
    for product in data:
        reviews = product['reviews']
        scores = []
        for review in reviews:
            scores.append(get_sentiment_score(review))

        # {id:sentiment score}
        product_dict[product['product_id']] = calculate_weighted_average(scores)
    
    # sort based on highest score (positive) to lowest (negative)
    product_dict = dict(sorted(product_dict.items(), key=lambda item: item[1], reverse=True))
    return product_dict

def calculate_weighted_average(scores):
    weights = list(range(len(scores), 0, -1))
    weighted_sum = sum(score * weight for score, weight in zip(scores, weights))
    total_weight = sum(weights)
    weighted_average = weighted_sum / total_weight
    return weighted_average


def main():
    product_dict = iterate()

    for id in product_dict:
        print(product_dict)

if __name__ == "__main__":
    main()
    