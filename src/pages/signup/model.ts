import {createForm} from 'effector-forms';
import {rules} from '../../shared/forms';
import {createEffect, forward, sample} from 'effector';
import {AuthService} from '../../shared/api/AuthService';

export const fxSignUp = createEffect(({email,password}:{email: string, password: string,username:string})=>{
    return AuthService.registration(email,password)
})

export const signUpForm = createForm({
   fields:{
       email: {
            init: "",
            rules:[rules.email(),rules.required()],
       },
       password: {
           init: "",
           rules:[rules.required()],
       },
       username: {
           init: "",
           rules:[rules.required()],
       },
   }
});

sample({
    source: signUpForm.$values,
    clock: signUpForm.submit,
    filter: signUpForm.$eachValid,
    fn: ({email,password,username})=>({email,password,username}),
    target: fxSignUp
})
forward({
    from: fxSignUp.doneData,
    to: signUpForm.resetValues
})
signUpForm.submit.watch(e=>console.log('submit'))
signUpForm.$eachValid.watch(e=>console.log(e,'$eachValid'))

fxSignUp.doneData.watch(e=>console.log(e,'registration'))