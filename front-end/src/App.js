import CamFeed from './camFeed';
import React, { useState, useEffect, useRef } from 'react';
import io from "socket.io-client";

function App() {

  const [mood, setMood] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    socketRef.current = io("http://localhost:5000");

    // Listen for the emotion detected event from the backend
    socketRef.current.on("emotion_detected", (data) => {
        setMood(data.emotion); // Update detected emotion
      }
    );

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="App">
      <CamFeed socket={socketRef} setMood={setMood} />
      <h1>{mood}</h1>
    </div>
  );
}

export default App;
