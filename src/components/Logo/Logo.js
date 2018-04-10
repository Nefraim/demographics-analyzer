import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma3">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{height: 75, width: 75 }}>
                <div className="Tilt-inner pa2">
                    <img src={brain} alt="Brain logo"/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;