import {createGate} from 'effector-react';
import {createStore, forward} from 'effector';
import {fxGetTask} from '../../entities/task/model';


export const TaskPageGate = createGate<string>();

const $taskId = createStore('');

forward({
    from:TaskPageGate.state,
    to: $taskId
})

forward({
    from:$taskId,
    to: fxGetTask
})

