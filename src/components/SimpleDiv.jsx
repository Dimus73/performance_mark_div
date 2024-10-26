import React from 'react';

const SimpleDiv = (props) => {
    const {
        text,
        id,
        setElementRef
    } = props;

    return (
        <div id={id} ref={setElementRef} style={{border: '1px solid black', width: 'fit-content'}}>
            {text}
        </div>
    );
};

export default SimpleDiv;