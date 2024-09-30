import { devsAPI } from '@api';

const PRINT_LOGS_TO_CONSOLE = true;
const START_TIME_FOR_LONG_RENDERING_TASK = 50;
const WAIT_LOOP_LENGTH = 3000;

// import {
//     getKeyPressDuringLoad,
//     resetPerformanceList,
//     selectPerformanceId,
//     selectPerformanceList,
//     setKeyPressDuringLoad,
//     setPerformanceId,
// } from '@redux/performane/reducer';

// import { collectLocalUserBrowserInformation } from '@shared/performanceAnalysis/lib/collectLocalUserBrowserInformation';

// import { collectUserInformation } from '@shared/performanceAnalysis/lib/collectUserInformation';
// import { dataPrepareBeforeLog } from '@shared/performanceAnalysis/lib/dataPrepareBeforLog';

// import { ReRenderInterface } from '@types';
import { FC, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';

const PerformanceMetrics = () => {
    // const dispatch = useDispatch();
    const popRefTimer = useRef(0);
    const currentTimer = useRef();
    const currentLastEventEnd = useRef(0);
    const performanceId = useRef();
    const callList = useRef();

    // const keyPressDuringLoad = useSelector(getKeyPressDuringLoad);
    // const refKeyPressDuringLoad = useRef(keyPressDuringLoad);

    const refWriteLogEnable = useRef(true);
    // callList.current = useSelector((selectPerformanceList));

    // performanceId.current = useSelector(selectPerformanceId);


    // useEffect(() => {
    //     refKeyPressDuringLoad.current=keyPressDuringLoad;
    // }, [keyPressDuringLoad]);

    useEffect(() => {
        const checkTimeToInteractive = () => {
            if (PRINT_LOGS_TO_CONSOLE) console.log("!!! ** In checkTimeToInteractive => currentLastEventEnd.current =>", currentLastEventEnd.current);
            if (performance.now() - currentLastEventEnd.current >= WAIT_LOOP_LENGTH) {
                sendData(currentLastEventEnd.current);
            } else {
                currentTimer.current = setTimeout(checkTimeToInteractive, WAIT_LOOP_LENGTH);
            }
        };

        const performanceObserver = new window.PerformanceObserver(entryList => {
            const currentLongTaskEvent = [];
            const entries = entryList.getEntries();

            if (PRINT_LOGS_TO_CONSOLE) console.log('*^* !!! PerformanceObserver entryList =>', entries);
            if (PRINT_LOGS_TO_CONSOLE) console.log('*^* !!! performance.now, popRefTimer.current =>', performance.now(), popRefTimer.current);
            // if (PRINT_LOGS_TO_CONSOLE) console.log('*^* !!! keyPressDuringLoad =>', refKeyPressDuringLoad.current);

            entries.forEach((entry) => {
                if (entry.entryType === 'longtask' && entry.duration > START_TIME_FOR_LONG_RENDERING_TASK) {
                    currentLongTaskEvent.push(entry);
                }
            });
            const lastEvent = currentLongTaskEvent[currentLongTaskEvent.length - 1];
            if (lastEvent) {
                currentLastEventEnd.current = lastEvent ? lastEvent.startTime + lastEvent.duration : 0;
                if (currentTimer.current) {
                    clearTimeout(currentTimer.current as number);
                }
                if (PRINT_LOGS_TO_CONSOLE) console.log("!!! ** In Observer =>", currentLastEventEnd.current);
                checkTimeToInteractive();
            }
        });


        // const onKeyMouseDown = (event) => {
        //     if (PRINT_LOGS_TO_CONSOLE) console.log('*^* !!!! Pressing key', refKeyPressDuringLoad.current);
        //     dispatch(setKeyPressDuringLoad(true));
        // }

        // if (PRINT_LOGS_TO_CONSOLE) console.log('*^* !!! -- SetUP Event Listener  !!!');
        // document.addEventListener('keydown', onKeyMouseDown);
        // document.addEventListener('mousedown', onKeyMouseDown);

        performanceObserver.observe({ entryTypes: ['longtask', 'paint'], buffered: true });

        // const handlePopState = () => {
        //     if (PRINT_LOGS_TO_CONSOLE) console.log("----!!!!---- handlePopState");
        //     popRefTimer.current = performance.now();
        //     dispatch(resetPerformanceList());
        //     dispatch(setPerformanceId(uuidv4()));
        //     clearTimeout(currentTimer.current as number);
        //     currentTimer.current = setTimeout(checkTimeToInteractive, WAIT_LOOP_LENGTH);
        //     currentLastEventEnd.current = performance.now();
        //     refKeyPressDuringLoad.current = false;
        //     refWriteLogEnable.current = true;
        // };
        //
        // window.addEventListener('popstate', handlePopState);

        return () => {
            if (PRINT_LOGS_TO_CONSOLE) console.log("!!!! --- Unmount PerformanceMetrics.tsx");
            performanceObserver.disconnect();
            clearTimeout(currentTimer.current);
            // window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const sendData = (lastEventEnd) => {

        if (refWriteLogEnable.current) {
            const BasePerformanceInfo = {
                performanceId: performanceId.current,
                href: window.location.href,
                tti: lastEventEnd - popRefTimer.current,
                lastEventEnd,
                popRefTimer: popRefTimer.current,
                component_name: '',
                // ...collectLocalUserBrowserInformation(),
                // ...collectUserInformation(),
            };

            // const collectData = dataPrepareBeforeLog(
            //     BasePerformanceInfo,
            //     callList.current as ReRenderInterface[],
            //     'mount',
        // );

            if (PRINT_LOGS_TO_CONSOLE) console.log('*^* !! Before save data =>', BasePerformanceInfo);
            // if (PRINT_LOGS_TO_CONSOLE) console.log('*^* !! Before save data callList.current =>', callList.current);
            // devsAPI.postFrontEndLogs(collectData);

            // dispatch(resetPerformanceList());
            // if (refKeyPressDuringLoad.current) {
            //     refWriteLogEnable.current = false;
            // }
        }
    };

    return null;
};

export default PerformanceMetrics;
