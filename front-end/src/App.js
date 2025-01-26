import CamFeed from './CamFeed';
import ChatBox from './ChatBox';
import React, { useState, useEffect, useRef } from 'react';


function App() {

  const [mood, setMood] = useState(null);
  const [camVisible, setCamVisible] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Cleanup WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const toggleCamera = () => {
    if (camVisible) {
      setCamVisible(false);
    } else {
      setCamVisible(true);
    }

  };

  return (
    <div className="App">
      <h1 className='Emotion'>Today, you're feeling{mood ? ` ${mood}!` : "..."}</h1>
      <CamFeed socket={socketRef} camVisible={camVisible} setMood={setMood} toggleCamera={toggleCamera}/>
      <ChatBox toggleCamera={toggleCamera} setMood={setMood} />
    </div>
  );
}

export default App;
