import React, {useEffect} from 'react';
import SquareComponent from "../../components/SquareComponent/SquareComponent";

// Задаем параметры нагрузки
const DELAY_LOAD = 100;  // Эмуляция загрузки данных
const ITERATIONS = 1e2;  // Эмуляция вычислений
const DIVS_COUNT = 1e4;  // Количечтво элементов в списке

const PageOne = () => {
    const [dataSet01, setDataSet01] = React.useState(false);
    const [dataSet02, setDataSet02] = React.useState(false);
    const [dataSet03, setDataSet03] = React.useState(false);
    const [dataSet04, setDataSet04] = React.useState(false);

    const [divsArray, setDivsArray] = React.useState([]);

    useEffect(() => {
        performance.mark('navigation-start');
        setTimeout(() => {setDataSet01(true)}, DELAY_LOAD);
    }, []);

    useEffect(() => {
        if (dataSet01)
            setTimeout(() => {setDataSet02(true)}, DELAY_LOAD);
    }, [dataSet01]);

    useEffect(() => {
        if (dataSet02)
            setTimeout(() => {setDataSet03(true)}, DELAY_LOAD);
    }, [dataSet02]);

    useEffect(() => {
        if (dataSet03)
            setTimeout(() => {
                setDataSet04(true);
                // performance.mark('navigation-end');
                setDivsArray(Array.from({length:DIVS_COUNT}))
            }, DELAY_LOAD);
    }, [dataSet03]);

    return (
        <div className={"page"}>
            <h1>Page One</h1>
            <div className={'data-area'}>
                {dataSet01 &&
                    <SquareComponent iterations={ITERATIONS}>
                        Data box - 01
                    </SquareComponent>
                }
                {dataSet02 &&
                    <SquareComponent iterations={ITERATIONS}>
                        Data box - 02
                    </SquareComponent>
                }
                {dataSet03 &&
                    <SquareComponent iterations={ITERATIONS}>
                        Data box - 03
                    </SquareComponent>
                }
                {dataSet04 &&
                    <SquareComponent iterations={ITERATIONS} divs={divsArray}>
                        Data box - 04
                    </SquareComponent>
                }
            </div>
        </div>
    );
};

export default PageOne;