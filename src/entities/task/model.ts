import {createEffect} from 'effector/compat';
import {TaskService} from '../../shared/api/TaskService';
import {restore} from 'effector';

export const fxGetTasks = createEffect(()=> TaskService.getAllTasks());

export const fxGetTask = createEffect((id:string)=> TaskService.getTask(id));

export const $tasks = restore(fxGetTasks.doneData.map(res=>res.data),[]);
export const $task = restore(fxGetTask.doneData.map(res=>res.data),{}as any);

fxGetTasks.doneData.watch(e=>console.log('TASKS',e.data));
fxGetTask.doneData.watch(e=>console.log('TASK',e.data));
