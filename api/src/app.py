from flask import Flask, jsonify
from flask_cors import CORS
from search import search_video

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "API LISTEN ON PORT 5001!"

@app.route('/search/<title>')
def search(title):
    videos = search_video(title)
    return jsonify(videos)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5001)