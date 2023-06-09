import {AxiosResponse} from 'axios';
import {AuthResponse} from './types';
import $api from './api';

export class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email, password})
    }

    static async registration(email: string, password: string, username: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {email, password, username})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

}

