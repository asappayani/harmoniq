from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from analysis import analyze_frame

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message')
    print(f"Received message: {message}")

    return jsonify({"success": True, "message": "Message received"}), 200

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