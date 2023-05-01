import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter, createBrowserRouter, RouterProvider} from 'react-router-dom';
import './pages/model';
import {theme} from './app/chakra';
import {ErrorPage} from './pages/error-page/page';
import {AuthProvider} from './pages/login/AuthProvider';
import {LoginPage} from './pages/login/page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
    <BrowserRouter >
        <AuthProvider>
            <ChakraProvider theme={theme}>
                <App/>
            </ChakraProvider>
        </AuthProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
