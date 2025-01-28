from flask import Flask, request, jsonify, session, url_for, redirect
from flask_cors import CORS
from flask_socketio import SocketIO
import os
from dotenv import load_dotenv
from spotipy.oauth2 import SpotifyOAuth
from spotapi import Song
from faceAnalysis import analyze_frame
from textAnalysis import analyze_text
from pprint import pprint as pp
import random


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

app.secret_key = os.urandom(24)

SCOPES = "user-library-read user-top-read playlist-modify-public"

sp_oauth = SpotifyOAuth(client_id=CLIENT_ID,
                        client_secret=CLIENT_SECRET,
                        redirect_uri=REDIRECT_URI,
                        scope=SCOPES)

def get_songs_for_mood(emotion):
    if emotion == "anger" or emotion == "angry":
        query = "genre:rock"

    elif emotion == "disgust":
        query = "genre:funk"

    elif emotion == "fear":
        query = "genre:metal"

    elif emotion == "joy" or emotion == "happy":
        query = "genre:pop"

    elif emotion == "neutral":
        query = "genre:instrumental"

    elif emotion == "sadness" or emotion == "sad":
        query = "genre:jazz"

    elif emotion == "surprise":
        query = "genre:electronic"

    else:
        query = "genre:pop"

    return query

### Spotify Authorization

@app.route('/')
def index():
    if session.get('token_info') == None:
        return redirect(url_for('login'))
    return 'Logged in with Spotify!'

@app.route('/login')
def login():
    print("Logging in")
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    # get auth code from url
    auth_code = request.args.get('code')
    
    # get the access token
    token_info = sp_oauth.get_access_token(auth_code)
    
    # store the token info in session for later use
    session['token_info'] = token_info
    
    # send the access token and refresh token as a JSON response to React frontend
    access_token = token_info['access_token']
    refresh_token = token_info['refresh_token']
    
    print("Logged in with Spotify")
    redirect_url = f"http://localhost:3000/?access_token={access_token}&refresh_token={refresh_token}"
    return redirect(redirect_url)
   
@app.route('/refresh_token', methods=['POST'])
def refresh_token():

    # refresh the access token using the refresh token
    token_info = session.get('token_info')
    if not token_info:
        return jsonify({"error": "No token info found"}), 400
    
    refresh_token = token_info['refresh_token']
    new_token_info = sp_oauth.refresh_access_token(refresh_token)
    
    # xtore the new token in session
    session['token_info'] = new_token_info
    
    return jsonify(new_token_info)

### Chat and Emotion Detection

@app.route('/chat', methods=['POST']) # receives the chats from front-end
def chat():
    try:
        data = request.get_json()
        message = data.get('text')
        emotion = analyze_text(message)
        song = Song()

        songs = song.query_songs(get_songs_for_mood(emotion), limit=100)
        data = songs["data"]["searchV2"]["tracksV2"]["items"]
        random.shuffle(data) #double shuffle to get random songs

        return jsonify({"success": True, "emotion": emotion, "songs": data[:7]}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error analyzing text: {str(e)}"}), 400

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

    # song = Song()

    # songs = song.query_songs(get_songs_for_mood("happy"), limit=100)
    # data = songs["data"]["searchV2"]["tracksV2"]["items"]

    # random.shuffle(data)

    # pp(data)