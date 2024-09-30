import React, {useState} from 'react';

const TowPartComponent = (props) => {

    const [isHover, setIsHover] = useState(false)
    return (
        <div
            className={"data-box"}
            onMouseEnter={()=>setIsHover(true)}
            onMouseLeave={()=>setIsHover(false)}
        >
            { props.children }
            {
                isHover ?
                    <div
                        className={'data-left-right left'}
                    >
                        Left
                    </div>
                    :
                    <div
                        className={'data-left-right right'}
                    >
                        Right
                    </div>
            }
        </div>
    );
};

export default TowPartComponent;