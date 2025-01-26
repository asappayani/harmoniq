import React, { useState } from 'react';

function CamButton({ toggleCamera }) {
    return (
        <div>
            <button onClick={toggleCamera}>📷</button>
        </div>
    );
}

export default CamButton;