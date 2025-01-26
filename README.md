# Emotion-Based Music Recommendation App

## Overview
This application is a 24-hour hackathon project submitted for TAMUHack 2025. This project uses **facial expressions** and **text-based mood inputs** to recommend music that matches the user's emotional state. It combines AI-powered emotion detection with music recommendations from the Spotify API.

## Demo https://devpost.com/software/blah-9fw307?ref_content=my-projects-tab&ref_feature=my_projects
---

## Features
1. **Emotion Detection via Camera**:
   - Captures a 5-second live feed using the camera.
   - Detects emotions such as *anger*, *joy*, *sadness*, *fear*, etc., using DeepFace and OpenCV.

2. **Text-Based Emotion Analysis**:
   - Accepts user input in a text box to analyze emotions using Hugging Face Transformers.

3. **Spotify Music Recommendation**:
   - Recommends songs based on the user's mood using the Spotify API.

---

## How It Works
1. **Frontend**:
   - Built with **React**, the UI includes:
     - An input box for typing how you feel.
     - A camera button to analyze mood via facial expressions.
   - Sends mood data to the backend for analysis.

![image](https://github.com/user-attachments/assets/c557a36d-ce5a-43b3-90b0-ce65b9f45838)

2. **Backend**:
   - Powered by **Flask** with the following features:
     - Detects emotions from camera frames using DeepFace.
     - Processes text input to classify mood using Hugging Face models.
     - Communicates with the Spotify API to recommend tracks.
   - Uses WebSocket for real-time emotion updates from the camera.

3. **Spotify Integration**:
   - The user is authenticated via Spotify’s OAuth flow.
   - Recommends music based on the detected emotion.

---

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- Spotify Developer Account (to obtain `CLIENT_ID` and `CLIENT_SECRET`)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/emotion-music-recommendation.git
   cd emotion-music-recommendation
   ```

2. **Backend Setup**:
   - Install Python dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Set up environment variables in a `.env` file:
     ```env
     CLIENT_ID=<your_spotify_client_id>
     CLIENT_SECRET=<your_spotify_client_secret>
     REDIRECT_URI=http://localhost:5000/callback
     ```
   - Run the Flask server:
     ```bash
     python app.py
     ```

3. **Frontend Setup**:
   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

---

## Usage
1. Open the application in your browser at `http://localhost:3000`.
2. Log in to Spotify to authenticate.
3. Use the input box or camera button to share your mood.
4. View song recommendations based on your detected emotion.

---

## Technologies Used
- **Frontend**: React
- **Backend**: Flask, Flask-SocketIO
- **APIs**:
  - Spotify API for music recommendations.
  - Hugging Face Transformers for text-based emotion detection.
  - DeepFace for facial emotion analysis.

---

## Future Plans
- Reintroduce valence and arousal numbers for more precise song recommendations.
- Incorporate user preferences for better recommendations.
- Add support for other music APIs like Last.fm or Musixmatch.
- Enhance UI with additional features like playlist saving.

---

## License
This project is licensed under the MIT License.

