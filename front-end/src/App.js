import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [text, setText] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:5000/test');
      const json = await response.json();
      setText(json.message);
    }

    fetchData();
  },[]);

  return (
    <div className="App">
      <h1>{text}</h1>
    </div>
  );
}

export default App;
