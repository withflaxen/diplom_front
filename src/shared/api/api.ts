import {createEffect} from 'effector';
import axios from 'axios';

import {AuthResponse} from "../models/response/AuthResponse";

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;














type MockArgs <T> = T & {
    shouldThrow?: boolean
};
type Credentials = {
    email: string;
    password: string;
};
type HttpResponse = {
    statusCode: number;
}


const createMockEffect = <Args extends {shouldThrow?: boolean},Response,Error> (res:Response,err:Error) =>
    createEffect<Args ,Response & HttpResponse, Error & HttpResponse>((args)=>{
    return new Promise( (resolve, reject) =>{
        setTimeout(()=>{
            if (args.shouldThrow){
                reject({statusCode:500,...err})
            }
            if (!args.shouldThrow){
                resolve({statusCode:200,...res})
            }
        },250);
    })
});


export const fxSignUp = createMockEffect<MockArgs<Credentials>,{message:string},{errorText:string}>({message:'Goood'},{errorText:'Baad'});
export const fxLogin = createMockEffect<MockArgs<Credentials>,{message:string},{errorText:string}>({message:'Goood'},{errorText:'Baad'});

