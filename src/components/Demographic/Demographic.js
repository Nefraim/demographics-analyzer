import React from 'react';
import Results from '../Results/Results';
import './Demographic.css';

const Demographic = (props) => {
    const { imageURL, box, results } = props;
    if(imageURL === '' || box === '' || results === '') return (null); 
    return (
        <div className="result dt container pb5 pv5 pl3 pr3">
            <div className="dtc-ns v-mid-ns">
                <div className="dib" id="image-holder">
                    <img id="inputimage" src={imageURL} alt="Input"/>
                    <div 
                        className="bounding-box" 
                        style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
                    </div>
                </div>
            </div>
            <Results results={ results }/>
        </div>
    );
}

export default Demographic;