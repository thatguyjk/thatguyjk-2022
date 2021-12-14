import React from 'react';
import './title.scss';

const Title = ({name, description}) => {
    return (
        <div className="titleContainer">
            <figure className='logoGroup'>
                <h1>THT</h1>
                <h1>GUY</h1>
                <h1>JK.</h1>
            </figure>
            <p className='description'>{description}</p>        
        </div>
    );
}

export default Title;
