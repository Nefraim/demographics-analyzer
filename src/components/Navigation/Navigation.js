import React from 'react';
import Logo from '../Logo/Logo';
import 'tachyons';

import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
        return (
            <nav className="container">
                <Logo />
                <p onClick={() => onRouteChange('signout')} className='f3 link dim navy underline pointer'>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav className="container">
                <Logo />
            </nav>
        );
    }
}

export default Navigation;