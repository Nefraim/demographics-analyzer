import React from 'react';
import './Alert.css';

const Alert = ({ type, message  }) => {
    let color;
    if(type === 'error') color = 'dark-red';
    else if(type === 'info') color='dark-green';

    if(type !== ''){
        return (
            <div className={"flex items-center justify-center ph4 pv2 " + color}>
                <svg className="w1" data-icon="info" viewBox="0 0 32 32" style={{"fill":"currentcolor"}}>
                    <title>info icon</title>
                    <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
                </svg>
                <span className="lh-title ml3">{message}</span>
            </div>
        );
    } else {
        return (null);
    }
    
}

export default Alert;