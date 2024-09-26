from flask import Flask, request, jsonify
from rerank import rerank
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def resize_image():
    try:
        link = request.args.get('link')
        if not link:
            return jsonify({"error": "No link provided :("}), 400
        print('hi')
        rerank(link)
        return jsonify({"message": "Link sent successfully"}), 200
    
    except Exception as e:
        return jsonify({"Error:": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)