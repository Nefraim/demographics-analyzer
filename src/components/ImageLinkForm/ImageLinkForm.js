import React from 'react';
import './ImageLinkForm.css';
import { ClipLoader } from 'react-spinners';

const ImageLinkForm = ({ onChange, onSubmit }) => {
    return (
        <div className="image-link-form ma2">
            <p className='f3 intro navy'>
                This Magic Brain will detect demographics of the person in your picture. Give it a try.
            </p>
            <div className="pa3 input-form">
                <input onChange={onChange} type="text" className="f5 pa-2 w-70"/>
                <button onClick={onSubmit} className="grow ml3 w-30 f6 link ph3 pv2 dib white bg-navy">Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;