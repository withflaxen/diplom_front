export interface IUser {
    email: string;
    username: string;
    isActivated: boolean;
    id: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
