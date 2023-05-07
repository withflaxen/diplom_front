import {createForm} from 'effector-forms';
import {rules} from '../../shared/forms';
import {createEffect, createEvent, forward, restore, sample} from 'effector';
import {AuthService} from '../../shared/api/AuthService';

export const fxSignUp = createEffect(async({email,password,username}:{email: string, password: string,username:string})=>{
    const {data} = await AuthService.registration(email,password,username);
    return data
})

export const setSuccessMessage = createEvent<string>();
export const $successMessage = restore(setSuccessMessage,'');

export const setErrorMessage = createEvent<string>();
export const $errorMessage = restore(setErrorMessage,'');

export const signUpForm = createForm({
   fields:{
       email: {
            init: "",
            rules:[rules.email(),rules.required()],
       },
       password: {
           init: "",
           rules:[rules.required(),rules.maxLength(14),rules.minLength(4)],
       },
       username: {
           init: "",
           rules:[rules.required(),rules.maxLength(14),rules.minLength(4)],
       },
   }
});

sample({
    source: signUpForm.$values,
    clock: signUpForm.submit,
    filter: signUpForm.$eachValid,
    fn: ({email,password,username})=>({email,password,username}),
    target: fxSignUp
});
forward({
    from: fxSignUp.doneData,
    to: signUpForm.resetValues
});

forward({
    from: fxSignUp.doneData,
    to: setSuccessMessage.prepend(_=> "Вы успешно зарегистрировались!")
});

// sample({
//     clock: fxSignUp.failData,
//     filter: (res) => res.
// })