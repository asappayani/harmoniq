import { FaCamera } from "react-icons/fa";

function CamButton({ toggleCamera }) {
    return (
        <div className='CamButton'>
            <button onClick={toggleCamera}>
                <FaCamera />
            </button>
        </div>
    );
}

export default CamButton;