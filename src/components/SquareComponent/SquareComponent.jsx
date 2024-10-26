import React, {useState} from 'react';
import SimpleDiv from "../SimpleDiv";


const performHeavyComputation = (iterations) => {
    let total = 0;
    for (let i = 0; i < iterations; i++) {
        total += Math.sqrt(i);
    }
    return total;
};

const SquareComponent = (props) => {
    const {
        iterations,
        divs,
    } = props
    const [isHover, setIsHover] = useState(false)


    const result = performHeavyComputation(iterations);

    const setElementRef = (id) =>
        (element) => {
            if (element && id === divs.length-1){
                // console.log("Draw element", element)
                const start_marks = performance.getEntriesByName('navigation-start');
                if (start_marks && start_marks.length)
                    performance.mark('navigation-end');
            }
        }

    const inStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'auto',
    }

    return (
        <div
            className={"data-box"}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {props.children}
            <p>Результат вычисления: {result}</p>

            <div
                className={'data-box-fon'}
                style={isHover ? {"backgroundColor": "cyan", ...inStyle} : {...inStyle}}
            >
                {
                    divs ?
                    divs.map((_, key, arr) =>
                        <SimpleDiv
                            id={key}
                            key={key}
                            text={key}
                            setElementRef={ key === (arr.length-1) ? setElementRef(key) : null }
                        />)
                    :
                    null
                }
            </div>
        </div>
    );
};

export default SquareComponent;