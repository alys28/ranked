from flask import Flask, request, jsonify # type: ignore
import requests  # type: ignore
import os
from flask_cors import CORS # type: ignore
import urllib.parse

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, origins=["chrome-extension://koncaljepgibdofflmbomffmhhbkfmec"])


def extract_between(url):
    base = 'https://www.amazon.ca/'
    dp_segment = '/dp/'
    
    start = url.find(base) + len(base)
    end = url.find(dp_segment)
    
    return url[start:end]

@app.route('/', methods=['GET'])
def get_reviews():
    try:
        link = urllib.parse.unquote(request.args.get('link'))
        link = extract_between(link)
        
        if not link:
            return jsonify({"error": "No link provided :("}), 400
        
        new_entry = {
            "product_name": link
        }
        endpoint_url = "https://runk-backend.vercel.app/add_product"
        headers = {'Content-Type': 'application/json'}
        # try:
        #     reviews = requests.post(endpoint_url, json=new_entry, headers=headers)['message']
        # except:
        #     reviews = None
        reviews = [('Amazing shoes for Pilates! Perfect for everyday fitness.',5),('I wear them to my office job every day, they’ve been very reliable!',8),
                   ('Amazing for morning walks & roughing it with the kids at camp!',8),('Shoes are terrible!! Wore down after TWO adventure hike trails. ',8),
                   ('Perfect for my commute.',8)]
        return jsonify({"message": reviews}), 200
    
    except Exception as e:
        return jsonify({"Error:": str(e)}), 500

# @app.route('/email', methods=['GET'])
# def get_email():
#     try:
#         print(get_email())
#         return jsonify({"message": get_email()}), 200
#     except Exception as e:
#         return jsonify({"Error:": str(e)}), 500

# def get_email():
#     desktop_path = os.path.join(os.path.expanduser('~'), 'Desktop')
#     file_name = 'runk.txt'
#     file_path = os.path.join(desktop_path, file_name)
#     if os.path.isfile(file_path):
#         with open(file_path, 'r') as file:
#             content = file.read()
#         return content

if __name__ == '__main__':
    app.run(debug=False)