from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/test")
def test_function():
    try:
        data = {'message' : 'Bro is connected'}
        return jsonify(data)
    except:
        return jsonify({'message' : 'An error occurred!'})

if __name__ == "__main__":
    app.run(debug=True)