import {createEffect, createEvent, forward, restore, sample} from 'effector';
import UserService from '../../shared/api/UserService';
import {fxSignUp} from '../signup/model';

export const fxFetchUsers = createEffect(()=>UserService.fetchUsers());


export const $users = restore(fxFetchUsers.doneData.map(res=>res.data),[]);
export const saveUser = createEvent<any>();


forward({
    from: saveUser,
    to: fxSignUp
})

forward({
    from: fxSignUp.finally,
    to: fxFetchUsers
})