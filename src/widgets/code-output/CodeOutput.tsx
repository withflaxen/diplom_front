import React, {FC} from 'react';
import {Box} from '@chakra-ui/react';
import './mocha.css';
import {useGate, useStore} from 'effector-react';
import {$failedCount, $passedCount, $results, $testDataEmpty, CodeInputGate} from '../code-input-field/model';
import {useNavigate} from 'react-router-dom';

type TestItemProps = {
    passed: boolean;
    title: string;
    duration: number;
    errorMessage?:string;
}
const TestItem:FC<TestItemProps> = ({passed,title,duration,errorMessage}) => {
    return (
        <ul id="mocha-report">
            <li className="suite"><h1><a href="#">getCelcius</a> <span className="duration">{`${duration}ms`}</span></h1>
                <ul>
                    <li className={`test ${passed?'pass':'fail'} fast`}>
                        <h2>{title}</h2>
                        {errorMessage&&  <h2>{errorMessage}</h2>}
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export const CodeOutput = () => {
    const countPassed = useStore($passedCount);
    const countFailed = useStore($failedCount);
    const testDataEmpty = useStore($testDataEmpty);
    const results = useStore($results);
    const navigate = useNavigate();
    useGate(CodeInputGate,navigate)
    return (
        <Box border='2px solid grey' borderRadius='1rem' padding={2} height='100%'>
            {/*{str ? parse(str) : }*/}
            {testDataEmpty? 'Your results will be shown here.' : (
                <div id="mocha">
                    <ul id="mocha-stats">
                        <li className="progress">
                            <canvas width="40" height="40"></canvas>
                        </li>
                        <li className="passes"><a href="#">passes:</a> <em>{countPassed}</em></li>
                        <li className="failures"><a href="#">failures:</a> <em>{countFailed}</em></li>
                    </ul>
                    {
                        results.map((result:any,i:number)=>{
                            const passed = result.state === "passed";
                            return <TestItem key={i} passed={passed} title={result.fullTitle}duration={result.duration} errorMessage={result.err.message}/>
                        })
                    }
                </div>
            ) }


        </Box>
    );
};

