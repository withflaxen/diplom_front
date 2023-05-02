import React, {useEffect} from 'react';
import {SignUpPage} from './pages/signup/page';
import {createBrowserRouter, Route, Routes} from 'react-router-dom';
import {ErrorPage} from './pages/error-page/page';
import {LoginPage} from './pages/login/page';
import {Main} from './pages/main/page';
import {fxCheckAuth} from './pages/login/model';
import axios from 'axios'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement:<ErrorPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
        errorElement:<ErrorPage/>,
    },
]);
const cfg = {
    headers: {
        'Content-Type': 'application/json',
        'client-secret': '787c6cc542b82df469a2b09d4b6772f3bf33376a'
    }
};
const getCode = axios.post<any>('https://api.hackerearth.com/v4/partner/code-evaluation/submissions/',{
    "lang": "JAVASCRIPT_NODE",
    "source": "const getNumber = (n) => n\n" +
        "return getNumber(44)",
    "input": "22",
}, {
    headers: {
        'Content-Type': 'application/json',
        'client-secret': '787c6cc542b82df469a2b09d4b6772f3bf33376a'
    }
}).then(e=> {
        console.log('THEN', e.data.status_update_url);
        return e.data.status_update_url
    }
)
    .then(e=>axios.get(e,cfg))
    .then(res=>{
        console.log(res.data,'RES GET')
    })
function App() {
    useEffect(()=>{
        if (localStorage.getItem('token')){
            fxCheckAuth()
        }
    },[])
  return (
      <Routes>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/main" element={<Main />} />
      </Routes>
  );
}

export default App;
