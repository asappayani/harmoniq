import React, { useState, useEffect, useRef } from 'react';

function CamFeed({ socket, setMood }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const getWebcamStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing webcam:', err);
        }
      };

    getWebcamStream();

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const captureFrame = () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const base64Image = canvas.toDataURL('image/jpeg');
            socket.current.emit('send_frame', { image: base64Image});
        };

        const interval = setInterval(captureFrame, 700);

        return () => {
            clearInterval(interval);
        };
    }, [socket]);

    return (
        <div className="cameraBox">
            <video className="cameraFeed" ref={videoRef} autoPlay playsInline></video>
            <canvas className="cameraCanvas" ref={canvasRef}></canvas>
        </div>
    );
}

export default CamFeed;