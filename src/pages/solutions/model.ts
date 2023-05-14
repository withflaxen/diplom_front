import {createEffect, createEvent, restore, sample} from 'effector';
import {SolutionsService} from '../../shared/api/SolutionsService';
import {createGate} from 'effector-react';
import {forward} from 'effector/compat';
import {TaskService} from '../../shared/api/TaskService';
import {IComment, IDeleteComment, ILike} from '../../shared/api/types';


export const SolutionPageGate = createGate<string>();
export const clickLikeBtn = createEvent<ILike>();
export const clickDeleteComment = createEvent<IDeleteComment>();
export const addComment = createEvent<IComment>();
export const fxGetAllSolutions = createEffect((id:string)=>TaskService.getSolutionsByTaskId(id));
export const fxLike = createEffect((payload:ILike)=>SolutionsService.like(payload));
export const fxDeleteComment = createEffect((payload:IDeleteComment)=>SolutionsService.deleteComment(payload));
export const fxAddComment = createEffect((payload:IComment)=>SolutionsService.addComment(payload));

export const $solutions = restore(fxGetAllSolutions.doneData.map(res=>res.data),[]);


forward({
    from:SolutionPageGate.open,
    to: fxGetAllSolutions
})

forward({
    from:clickLikeBtn,
    to:fxLike
})

forward({
    from:addComment,
    to:fxAddComment
})
forward({
    from: clickDeleteComment,
    to:fxDeleteComment
})

sample({
    clock: [fxAddComment,fxDeleteComment],
    source: SolutionPageGate.state,
    target: fxGetAllSolutions
})

$solutions.on(fxLike.doneData.map(res=>res.data),(solutions,newSolution)=>{
    return solutions.map(el=> el.id===newSolution.id ? newSolution : el)
})
