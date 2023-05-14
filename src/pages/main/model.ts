import {createGate} from 'effector-react';
import {fxGetTasks} from '../../entities/task/model';
import {$tasks} from '../../entities/task/model';
import {sample} from 'effector';

export const MainPageGate = createGate();

sample({
    clock:[MainPageGate.open],
    source:$tasks,
    filter: (tasks)=> !tasks.length,
    target: fxGetTasks
})