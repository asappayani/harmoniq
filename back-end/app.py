from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from faceAnalysis import analyze_frame
from textAnalysis import analyze_text

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/chat', methods=['POST']) # receives the chats from front-end
def chat():
    try:
        data = request.get_json()
        message = data.get('text')
        emotion = analyze_text(message)
        return jsonify({"success": True, "emotion": emotion}), 200
    except:
        return jsonify({"success": False, "message": "Error analyzing text"}), 400

@app.route('/callback')

@socketio.on('send_frame')
def handleFrame(data):
    try:
        emotion_detected = analyze_frame(data)
        socketio.emit('emotion_detected', {'emotion': emotion_detected})
    except:
        print("Error analyzing frame")
        socketio.emit('emotion_detected', {'emotion': 'error'})

if __name__ == "__main__":
    socketio.run(app, debug=True)