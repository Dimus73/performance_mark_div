import React, {useEffect} from 'react';
import TowPartComponent from "../../components/TowPartComponent/TowPartComponent";

const DELAY_LOAD = 1000;

const PageTwo = () => {
    const [dataSet01, setDataSet01] = React.useState(false);
    const [dataSet02, setDataSet02] = React.useState(false);
    const [dataSet03, setDataSet03] = React.useState(false);
    const [dataSet04, setDataSet04] = React.useState(false);

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
                setDataSet04(true)
                performance.mark('navigation-end');
            }, DELAY_LOAD);
    }, [dataSet03]);

    return (
        <div className={"page"}>
            <h1>Page One</h1>
            <div className={'data-area'}>
                {dataSet01 &&
                    <TowPartComponent>
                        Data box - 01
                    </TowPartComponent>
                }
                {dataSet02 &&
                    <TowPartComponent>
                        Data box - 02
                    </TowPartComponent>
                }
                {dataSet03 &&
                    <TowPartComponent>
                        Data box - 03
                    </TowPartComponent>
                }
                {dataSet04 &&
                    <TowPartComponent>
                        Data box - 04
                    </TowPartComponent>
                }
            </div>
        </div>
    );
};

export default PageTwo;