import json
import random
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

def generate_random_profile():
    profile = {
        "Height": random.randint(1, 100),
        "Weight": random.randint(1, 100),
        "Body Mass Index (BMI)": random.randint(1, 100),
        "Skin Tone": random.randint(1, 5),
        "Hair Color": random.randint(1, 6),
        "Eye Color": random.randint(1, 6),
        "Extroversion": random.randint(1, 100),
        "Introversion": random.randint(1, 100),
        "Agreeableness": random.randint(1, 100),
        "Conscientiousness": random.randint(1, 100),
        "Neuroticism": random.randint(1, 100),
        "Openness to Experience": random.randint(1, 100),
        "Intelligence Quotient": random.randint(1, 100),
        "Verbalprehension": random.randint(1, 100),
        "Perceptual Reasoning": random.randint(1, 100),
        "Working Memory": random.randint(1, 100),
        "Processing Speed": random.randint(1, 100),
        "Self-Awareness": random.randint(1, 100),
        "Self-Regulation": random.randint(1, 100),
        "Motivation": random.randint(1, 100),
        "Empathy": random.randint(1, 100),
        "Social Skills": random.randint(1, 100),
        "Sociability": random.randint(1, 100),
        "Assertiveness": random.randint(1, 100),
        "Cooperativeness": random.randint(1, 100),
        "Conflict Resolution": random.randint(1, 100),
        "Leadership Ability": random.randint(1, 100),
        "Age": random.randint(18, 100),
        "Education Level": random.randint(1, 100),
        "Occupation": random.randint(1, 20),
        "Marital Status": random.randint(1, 5),
        "Number of Children": random.randint(0, 10),
        "Language Proficiency": random.randint(1, 5),
        "Musical Ability": random.randint(1, 100),
        "Artistic Ability": random.randint(1, 100),
        "Athletic Ability": random.randint(1, 100),
        "Technical Skills": random.randint(1, 100),
        "Physical Health": random.randint(1, 100),
        "Mental Health": random.randint(1, 100),
        "Chronic Conditions": random.randint(0, 10),
        "Disabilities": random.randint(0, 10),
        "Personality Type": random.randint(1, 16),
        "Learning Style": random.randint(1, 4),
        "Creativity": random.randint(1, 100),
        "Adaptability": random.randint(1, 100),
        "Race": random.randint(1, 6),
        "Ethnicity": random.randint(1, 12)
    }
    return profile

def generate_profiles():
    for ele in range(1000):
        
        profile = generate_random_profile()

        try:
            with open('data/profiles.json', 'r') as json_file:
                profiles = json.load(json_file)
        except FileNotFoundError:
            profiles = []

        profiles.append(profile)

        with open('data/profiles.json', 'w') as json_file:
            json.dump(profiles, json_file, indent=4)
        print('Created profile ' + str(ele))

def generate_reviews():
    query = "Generate a very short random Amazon product review that would say something about the person's attributes. This review will not include any personal information. Only give me the text."

    client = Groq(
        api_key=os.getenv("GROQ_API_KEY"),
    )

    for ele in range(339):
        success = False
        while not success:
            try:
                chat_completion = client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": query,
                        }
                    ],
                    model="llama3-8b-8192",
                )
                success = True
            except Exception as e:
                print(f"groq.APIConnectionError for iteration {ele}. Retrying...")
        review = chat_completion.choices[0].message.content

        try:
            with open('data/reviews.json', 'r') as json_file:
                reviews = json.load(json_file)
        except FileNotFoundError:
            reviews = []

        reviews.append(review)

        with open('data/reviews.json', 'w') as json_file:
            json.dump(reviews, json_file, indent=4)
        print('Created review ' + str(ele))


def generate_resulting_profile():
    client = Groq(
        api_key=os.getenv("GROQ_API_KEY"),
    )
    try:
        with open('data/profiles.json', 'r') as json_file:
            profiles = json.load(json_file)
    except FileNotFoundError:
        profiles = []
    try:
        with open('data/reviews.json', 'r') as json_file:
            reviews = json.load(json_file)
    except FileNotFoundError:
        reviews = []

    for profile_pos in range(0, 1000):
        profile = profiles[profile_pos]
        for review_pos in range(len(reviews)):
            try:
                with open('data/updated_profiles.json', 'r') as json_file:
                    updated = json.load(json_file)
            except FileNotFoundError:
                updated = {}
            if profile_pos not in updated:
                updated[profile_pos] = {}
            if review_pos not in updated[profile_pos]:
                query = 'Return only the updated profile json, no explanation text. If a user with the following profile:\n\n' + str(profile) + '\n\nLeaves the following review: ' + reviews[review_pos] + '\n\nWhat information do we get about the profile? Finetune their profile with this information. Do not add/remove any of the fields.'
                success = False
                while not success:
                    try:
                        chat_completion = client.chat.completions.create(
                            messages=[
                                {
                                    "role": "user",
                                    "content": query,
                                }
                            ],
                            model="llama3-8b-8192",
                        )
                        success = True
                    except Exception as e:
                        print(f"groq.APIConnectionError. Retrying...")

                updated[profile_pos][review_pos] = chat_completion.choices[0].message.content

                with open('data/updated_profiles.json', 'w') as json_file:
                    json.dump(updated, json_file, indent=4)
                print('Created updated profile for ' + str(profile_pos) + ' with review ' + str(review_pos))


# generate_profiles()
generate_reviews()