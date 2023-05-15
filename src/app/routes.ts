import {Main} from '../pages/main/page';
import {GetStarted} from '../pages/get-started/page';
import {LoginPage} from '../pages/login/page';
import {SignUpPage} from '../pages/signup/page';
import {TaskPage} from '../pages/task-page/page';
import {SolutionsPage} from '../pages/solutions/page';
import {CreateUserPage} from '../pages/create-user/page';
import {CreateTaskPage} from '../pages/create-task/page';

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
    },
    {
        path: '/signup',
        Component: SignUpPage,
        notLogged: true,
    },
    {
        path: '/main',
        Component: Main,
        isProtected: true,
    },
    {
        path: '/task/:id',
        Component: TaskPage,
        isProtected: true,
    },
    {
        path: '/solutions/:id',
        Component: SolutionsPage,
        isProtected: true,
    },
    {
        path: '/createUser',
        Component: CreateUserPage,
        isProtected: true,
    },
    {
        path: '/createTask',
        Component: CreateTaskPage,
        isProtected: true,
    },
];