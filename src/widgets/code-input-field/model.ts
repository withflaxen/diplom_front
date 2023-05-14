import {TaskService} from '../../shared/api/TaskService';
import {createEffect, createEvent, createStore, forward, sample} from 'effector';
import {ISolutionsPayload, ITask, ITestPayload, IUser} from '../../shared/api/types';
import {restore} from 'effector/compat';
import {$task} from '../../entities/task/model';
import {parseFunction} from '../../shared/utils';
import {$user} from '../../pages/login/model';
import {NavigateFunction} from 'react-router-dom';
import {createGate} from 'effector-react';
import {SolutionsService} from '../../shared/api/SolutionsService';

const fxRedirectToSolutions = createEffect<{navigate:NavigateFunction,taskId:string},void>(({navigate,taskId})=>{
    navigate(`/solutions/${taskId}`);
});


export const CodeInputGate = createGate<NavigateFunction>();
const $navigate = createStore<NavigateFunction|null>(null);
export const reset = createEvent();
export const setTestPayload = createEvent<Partial<ITestPayload>>();
export const setSolution = createEvent<string>();
export const testTask = createEvent();
export const postSolution = createEvent();

export const fxTestTask = createEffect((payload:ITestPayload)=>TaskService.test(payload));
export const fxPostSolution = createEffect((payload:ISolutionsPayload)=>SolutionsService.postSolution(payload));

export const $testData = restore(fxTestTask.doneData.map(res=>res.data),{});
export const $testDataEmpty = $testData.map(data=>Object.values(data).length===0);

export const $solution = restore(setSolution,'');

export const $testPayload = restore(setTestPayload,{});
forward({
    from: CodeInputGate.state,
    to: $navigate
})
sample({
    //@ts-ignore
    source: [$solution,$task],
    fn: (source)=>{
        const [solution,task] = source as [ string, ITask];
        const parse = parseFunction(solution);
        return ({
            id:task.id,
            args: parse?.args||[],
            code:parse?.body ? parse?.body.replace(/(\r\n|\n|\r)/gm, "") :"",
        })
    },
    target:setTestPayload
})


sample({
    source: $testPayload,
    clock: testTask,
    filter: ({id,args,code}) => {
        console.log(!!id && !!code && !!args,'TEST')
        return !!id && !!code && !!args
    },
    fn: (payload) => payload as ITestPayload,
    target: fxTestTask
})

sample({
    //@ts-ignore
    source: [$task,$solution,$user],
    clock: postSolution,
    filter: ([task,solution])=>!!task && !!solution,
    fn: (source) => {
        const [task,solution, {username}] = source as [ITask,string,IUser];
        return {
            solution,
            taskID:task.id,
            username
        }
    },
    target: fxPostSolution
})

$solution.watch(e=>console.log('solution',e))



$testData.reset(reset);

const $stats = $testData.map(data=>data?.stats);
//@ts-ignore
export const $results = $testData.map(data=>{
    if (!data.results){
        return []
    }
    return data.results[0].suites[0].tests
})

export const $passedCount = $stats.map(stats=>stats.passes);
export const $failedCount = $stats.map(stats=>stats.failures);

sample({
    //@ts-ignore
    source: [$navigate,$task],
    clock: fxPostSolution.doneData,
    fn: (source) =>{
        const [navigate,task] = source as [NavigateFunction,ITask];
        console.log(navigate,task.id)
        return {navigate,taskId:task.id}
    },
    target: fxRedirectToSolutions
})

$testData.watch(e=>console.log(e));
$failedCount.watch(e=>console.log(e));
$passedCount.watch(e=>console.log(e));
$stats.watch(e=>console.log(e));
$results.watch(e=>console.log(e));