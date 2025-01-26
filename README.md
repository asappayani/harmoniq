# Emotion-Based Music Recommendation App

## Overview
This application uses **facial expressions** and **text-based mood inputs** to recommend music that matches the user's emotional state. It combines AI-powered emotion detection with music recommendations from the Spotify API.

---

## Features
1. **Emotion Detection via Camera**:
   - Captures a 5-second live feed using the camera.
   - Detects emotions such as *anger*, *joy*, *sadness*, *fear*, etc., using DeepFace and OpenCV.

2. **Text-Based Emotion Analysis**:
   - Accepts user input in a text box to analyze emotions using Hugging Face Transformers.

3. **Spotify Music Recommendation**:
   - Recommends songs based on the user's mood using the Spotify API.
   - Leverages mood-related attributes like **valence** and **arousal** to fetch relevant tracks.

---

## How It Works
1. **Frontend**:
   - Built with **React**, the UI includes:
     - An input box for typing how you feel.
     - A camera button to analyze mood via facial expressions.
   - Sends mood data to the backend for analysis.

2. **Backend**:
   - Powered by **Flask** with the following features:
     - Detects emotions from camera frames using DeepFace.
     - Processes text input to classify mood using Hugging Face models.
     - Communicates with the Spotify API to recommend tracks.
   - Uses WebSocket for real-time emotion updates from the camera.

3. **Spotify Integration**:
   - The user is authenticated via Spotify’s OAuth flow.
   - Recommends music based on the detected emotion and its corresponding **valence** and **arousal** values.

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
