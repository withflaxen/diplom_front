import React, {useEffect} from 'react';
import {SignUpPage} from './pages/signup/page';
import {createBrowserRouter, Route, Routes} from 'react-router-dom';
import {ErrorPage} from './pages/error-page/page';
import {LoginPage} from './pages/login/page';
import {Main} from './pages/main/page';
import {fxCheckAuth} from './pages/login/model';
import {routes} from './app/routes';
import {ProtectedRoute} from './shared/routes/ProtectedRoute';
import {NotLoggedOnly} from './shared/routes/NotLoggedOnly';


function App() {
    useEffect(()=>{
        if (localStorage.getItem('token')){
            fxCheckAuth()
        }
    },[])
  return (
      <Routes>
          {routes.map(({path,Component, isProtected, notLogged}) =>  {
              if (notLogged) return <Route path={path} element={<NotLoggedOnly><Component/></NotLoggedOnly>}/>
              if (isProtected) return <Route path={path} element={<ProtectedRoute><Component/></ProtectedRoute>}/>
              return <Route path={path} element={<Component/>}/>
          })}
      </Routes>
  );
}

export default App;
