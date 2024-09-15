from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from chrome.find_item import check_id
import urllib.parse

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

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
        reviews = check_id(link)
        if reviews=="does not exist":
            reviews = None
            
        return jsonify({"message": reviews}), 200
    
    except Exception as e:
        return jsonify({"Error:": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)