import React, {useEffect} from 'react';
import SquareComponent from "../../components/SquareComponent/SquareComponent";

const DELAY_LOAD = 1000;

const PageOne = () => {
    const [dataSet01, setDataSet01] = React.useState(false);
    const [dataSet02, setDataSet02] = React.useState(false);
    const [dataSet03, setDataSet03] = React.useState(false);
    const [dataSet04, setDataSet04] = React.useState(false);

    useEffect(() => {
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
            setTimeout(() => {setDataSet04(true)}, DELAY_LOAD);
    }, [dataSet03]);

    return (
        <div className={"page"}>
            <h1>Page One</h1>
            <div className={'data-area'}>
                {dataSet01 &&
                    <SquareComponent>
                        Data box - 01
                    </SquareComponent>
                }
                {dataSet02 &&
                    <SquareComponent>
                        Data box - 02
                    </SquareComponent>
                }
                {dataSet03 &&
                    <SquareComponent>
                        Data box - 03
                    </SquareComponent>
                }
                {dataSet04 &&
                    <SquareComponent>
                        Data box - 04
                    </SquareComponent>
                }
            </div>
        </div>
    );
};

export default PageOne;