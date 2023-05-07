import {Main} from '../pages/main/page';
import {GetStarted} from '../pages/get-started/page';
import {LoginPage} from '../pages/login/page';
import {SignUpPage} from '../pages/signup/page';

export const routes = [
    {
        path: '/',
        Component: GetStarted,
        notLogged: true,
    },
    {
        path: '/login',
        Component: LoginPage,
        notLogged: true,
    },    {
        path: '/signup',
        Component: SignUpPage,
        notLogged: true,
    },    {
        path: '/main',
        Component: Main,
        isProtected: true,
    },
];