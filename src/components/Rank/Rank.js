import React from 'react';

const Rank = ({ name, entries }) => {
    return (
       <div >
            <p className="navy f3">{`${name}, your current count of analyzed pictures is:`}</p>
            <p className="navy f2">{entries}</p>
       </div> 
    );
}

export default Rank;