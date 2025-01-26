import React, { useState, useEffect, useRef, use } from 'react';
import io from "socket.io-client";

function CamFeed({ socket, camVisible, setMood }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraOn, setCameraOn] = useState(false);

    const startLiveCamera = async () => { // Start the camera feed
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing webcam:', err);
        }
      };

    const stopLiveCamera = () => { // Stop the camera feed
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          videoRef.current.srcObject = null;  // Disconnect the video feed
        }
      }
    };

    const captureFrame = () => { // Capture a frame from the camera feed and send it to the backend for emotion detection
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg');
      socket.current.emit('send_frame', { image: base64Image});
    };

    useEffect(() => { // Start the camera feed and set up the WebSocket connection when the component mounts
      if (camVisible) {
        startLiveCamera();
        setCameraOn(true);

        socket.current = io("http://localhost:5000");
        socket.current.on("emotion_detected", (data) => {
          setMood(data.emotion);
        });

        const interval = setInterval(() => {
          captureFrame();
        }, 500);

        const timeoutId = setTimeout(() => {
          stopLiveCamera();
          setCameraOn(false);
          socket.current.disconnect();
          clearInterval(interval);
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
        <div className="cameraBox">
          {cameraOn && (
            <>
              <video className="cameraFeed" ref={videoRef} autoPlay playsInline></video>
              <canvas className="cameraCanvas" ref={canvasRef}></canvas>  
            </>
      )}
        </div>
    );
  }

export default CamFeed;