import React, { useState } from 'react';
import axios from 'axios';
import CamButton from './CamButton.js';
import './ChatBox.css';
import { FaArrowUp } from "react-icons/fa";

function ChatBox({ toggleCamera, setMood, setSongsList }) {
    const [text, setText] = useState(); // state of the input field

    const handleInputChange = (e) => { // update the state of the input field whenever its typed in
        setText(e.target.value);
    }

    const handleSubmit = async (e) => { // send the message to the backend
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/chat', { text }, {
                headers: {
                  'Content-Type': 'application/json'
                  }
            });
            const detectedEmotion = response.data.emotion;
            const songsList = response.data.songs.data.searchV2.tracksV2.items;
            setSongsList(songsList);
        
            setMood(detectedEmotion);
            setText('');

        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className="ChatBox">
        <form onSubmit={handleSubmit}>
            <div className='input-button-wrapper'>
                <input 
                    type="text"
                    value={text}
                    onChange={handleInputChange}
                    placeholder="How're you feeling today?" />
                <button type="submit">
                    <FaArrowUp style={{color: 'black'}}/>
                </button>
                <CamButton toggleCamera={toggleCamera}/>
            </div>
        </form>
 
    </div>
  );
}

export default ChatBox;