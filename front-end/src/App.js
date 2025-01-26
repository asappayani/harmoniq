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
    setCamVisible(prevState => !prevState);
  };

  return (
    <div className="App">
      <CamFeed socket={socketRef} camVisible={camVisible} setMood={setMood} />
      <h1>{mood}</h1>
      <ChatBox toggleCamera={toggleCamera}/>
    </div>
  );
}

export default App;
