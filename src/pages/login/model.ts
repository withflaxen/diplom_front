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
export const $user = createStore<null | IUser>(null);
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

forward({
    from: logout,
    to: fxLogout
})

sample({
    source:$navigate,
    clock: fxLogout.doneData,
    filter: (navigate): navigate is NavigateFunction => !!navigate,
    fn:(navigate)=>({navigate,url:'/'})  as {navigate:NavigateFunction,url:string},
    target: fxRedirectTo
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


sample({
    clock:[fxCheckAuth.doneData,fxLogin.doneData],
    fn: (res) =>( {
      ...res.user
    }),
    target: $user
});

sample({
    clock: fxCheckAuth.failData,
    //@ts-ignore
    filter: ({response})=> response.status === 401,
    target: logout
})
$user.reset(logout);
