import CamFeed from './CamFeed';
import ChatBox from './ChatBox';
import SongList from './SongList';
import React, { useState, useEffect, useRef } from 'react';

function App() {

  const [mood, setMood] = useState(null);
  const [camVisible, setCamVisible] = useState(false);
  const [songsList, setSongsList] = useState([]);
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
      <h1 className={`Emotion ${camVisible ? 'move-up' : ''}`}>Today, you're feeling{mood ? ` ${mood}!` : "..."}</h1>
      <CamFeed socket={socketRef} camVisible={camVisible} setMood={setMood} toggleCamera={toggleCamera} setSongsList={setSongsList} mood={mood}/>
      <ChatBox toggleCamera={toggleCamera} setMood={setMood} setSongsList={setSongsList} />
      {!camVisible && songsList.length > 0 && <SongList data={songsList} />}
    </div>
  );
}

export default App;
