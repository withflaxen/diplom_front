import {createForm} from 'effector-forms';
import {rules} from '../../shared/forms';
import {createEffect, createEvent, createStore, forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {NavigateFunction} from 'react-router-dom';
import {AuthService} from '../../shared/api/AuthService';
import {AuthResponse, IUser} from '../../shared/api/types';
import axios from 'axios';
import {API_URL} from '../../shared/api/api';

export const loginGate = createGate<NavigateFunction>();

const $navigate = createStore<NavigateFunction|null>(null);
export const $user = createStore({} as IUser);
const fxRedirectTo = createEffect<{navigate:NavigateFunction,url:string},void>(({navigate,url})=>{
    navigate(url,{ replace: true });
})
const fxLogin = createEffect(async ({email,password}:{email: string, password: string})=>{
    const {data} = await AuthService.login(email,password);
    localStorage.setItem('token',data.accessToken);
    return data
})
const fxLogout = createEffect(async ()=>{
    await AuthService.logout();
    localStorage.removeItem('token')
});
export const fxCheckAuth = createEffect(async ()=>{
    const {data} = await axios.get<AuthResponse>(`${API_URL}/refresh`,{withCredentials:true});
    localStorage.setItem('token',data.accessToken);
    return data
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


sample({
    source:$navigate,
    clock: logout,
    filter: (navigate): navigate is NavigateFunction => !!navigate,
    fn:(navigate)=>({navigate,url:'/login'})  as {navigate:NavigateFunction,url:string},
    target: [fxRedirectTo,fxLogout]
});
sample({
    source: $navigate,
    clock: fxLogin.doneData,
    filter: (navigate) => !!navigate,
    fn: (navigate)=>({navigate,url:'/main'}) as {navigate:NavigateFunction,url:string},
    target: fxRedirectTo
});
forward({
    from: fxLogin.doneData.map(data=>data.user),
    to: $user
});

// forward({
//     from: fxCheckAuth.failData,
//     to: logout
// })

sample({
    clock:[fxCheckAuth.doneData,fxLogin.doneData],
    fn: (res) =>( {
      ...res.user
    }),
    target: $user
});

fxLogin.failData.watch(e=>console.log('failed',e))

fxLogin.doneData.watch(e=>console.log('fxLogin doneData',e))
fxCheckAuth.doneData.watch(e=>console.log('fxCheckAuth doneData',e))
