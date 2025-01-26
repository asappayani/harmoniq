import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CamButton from './CamButton.js';

function ChatBox({toggleCamera}) {
    const [text, setText] = useState('not locked in'); // state of the input field

    const handleInputChange = (e) => { // update the state of the input field whenever its typed in
        setText(e.target.value);
    }

    const handleSubmit = async (e) => { // send the message to the backend
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/chat', {text});
            setText('');

        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={text}
                onChange={handleInputChange}
                placeholder="How're you feeling today?" />
        </form>
        <CamButton toggleCamera={toggleCamera}/>
    </div>
  );
}

export default ChatBox;