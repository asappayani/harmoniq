import React, { useState, useEffect, useRef } from 'react';
import io from "socket.io-client";
import axios from 'axios';
import './CamFeed.css';

function CamFeed({ socket, camVisible, setMood, toggleCamera, setSongsList, mood }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraOn, setCameraOn] = useState(false);

    const startLiveCamera = async () => { // start the camera feed
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing webcam:', err);
        }
      };

    const stopLiveCamera = () => { // stop the camera feed
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          videoRef.current.srcObject = null;  // disconnect the video feed
        }
      }
    };

    const captureFrame = () => { // capture a frame from the camera feed and send it to the backend for emotion detection
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg');
      socket.current.emit('send_frame', { image: base64Image});
    };

    const getSongs = async () => { // get song recommendations based on the detected mood
      const text = mood;
      try {
          const response = await axios.post('http://localhost:5000/chat', { text }, {
            headers: {
              'Content-Type': 'application/json'  // ensure the content type is set correctly
            } 
          });

        const songsList = response.data.songs;
        setSongsList(songsList);
      
      } catch (error) {
          console.error(error);
      }
    };

    useEffect(() => { // start the camera feed and set up the WebSocket connection when the component mounts
      if (camVisible) {
        startLiveCamera();
        setCameraOn(true);

        socket.current = io("http://localhost:5000");
        socket.current.on("emotion_detected", (data) => {
          setMood(data.emotion);
        });

        const interval = setInterval(() => {
          captureFrame();
        }, 550);

        const timeoutId = setTimeout(() => {
          stopLiveCamera();
          socket.current.disconnect();
          clearInterval(interval);
          setCameraOn(false);
          toggleCamera();
          getSongs();
        }, 5000);

        return () => {
          clearTimeout(timeoutId);
          clearInterval(interval);
          stopLiveCamera();
        };
      } else {
        stopLiveCamera();
        setCameraOn(false);
      }
    }, [socket, camVisible, setMood]);

    return ( // Display the camera feed
        <div className={`cameraBox ${cameraOn ? 'cameraBox--visible' : ''}`}>
          {cameraOn && (
            <>
              <video className="cameraFeed" ref={videoRef} autoPlay playsInline></video>
              <canvas className="cameraCanvas" ref={canvasRef}></canvas>  
            </>
      )}
        </div>
    );
  }

export default CamFeed; //hello?
