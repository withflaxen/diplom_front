import {createEffect, createEvent, forward, restore, sample} from 'effector';
import {TaskService} from '../../shared/api/TaskService';

export const fxFetchTasks = createEffect(()=>TaskService.getAllTasks());
export const fxSaveTask = createEffect((payload:any)=>TaskService.saveTask(payload))

export const $tasks = restore(fxFetchTasks.doneData.map(res=>res.data),[]);
export const saveTask = createEvent<any>();


forward({
    from: saveTask,
    to: fxSaveTask
})

forward({
    from: fxSaveTask.finally,
    to: fxFetchTasks
})