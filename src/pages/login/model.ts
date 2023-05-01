import {createForm} from 'effector-forms';
import {rules} from '../../shared/forms';
import {createEffect, createEvent, createStore, forward, sample} from 'effector';
import {localStorageFactory} from '../../shared/hooks/handleLocalStorage';
import {createGate} from 'effector-react';
import {NavigateFunction} from 'react-router-dom';
import {AuthService} from '../../shared/api/AuthService';

export const loginGate = createGate<NavigateFunction>();

const $navigate = createStore<NavigateFunction|null>(null);
const fxRedirectTo = createEffect<{navigate:NavigateFunction,url:string},void>(({navigate,url})=>{
    navigate(url,{ replace: true });
})
const fxLogin = createEffect(({email,password}:{email: string, password: string})=>{
    return AuthService.login(email,password)
})

export const logout = createEvent();

forward({
    from:loginGate.open,
    to: $navigate
})

export const loginForm = createForm({
    fields:{
        email: {
            init: "",
            rules:[rules.required()],
        },
        password: {
            init: "",
            rules:[rules.required()],
        },
    }
});

sample({
    source: loginForm.$values,
    clock: loginForm.submit,
    filter: loginForm.$eachValid,
    fn: (values)=>({email: values.email,password: values.password}),
    target: fxLogin
})

export const {$value:$user,setValue:setUser,resetValue} = localStorageFactory("userId",null,loginGate.open);



sample({
    source:$navigate,
    clock: logout,
    filter: (navigate): navigate is NavigateFunction => !!navigate,
    fn:(navigate)=>({navigate,url:'/'}),
    target: [resetValue,fxRedirectTo]
});
sample({
    source: $navigate,
    clock: fxLogin.doneData,
    filter: (navigate) => !!navigate,
    fn: (navigate)=>({navigate,url:'/main'}) as {navigate:NavigateFunction,url:string},
    target: fxRedirectTo
});
forward({
    from: fxLogin.doneData,
    to: setUser
});

fxLogin.failData.watch(e=>console.log('failed',e))
setUser.watch(e=>console.log(e))