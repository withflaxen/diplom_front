import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {fxCheckAuth} from './pages/login/model';
import {routes} from './app/routes';
import {ProtectedRoute} from './shared/routes/ProtectedRoute';
import {NotLoggedOnly} from './shared/routes/NotLoggedOnly';
import {Spinner} from '@chakra-ui/react';
import {useStore} from 'effector-react';


function App() {
    const loading = useStore(fxCheckAuth.pending);
    useEffect(()=>{
        if (localStorage.getItem('token')){
            fxCheckAuth()
        }
    },[])

  if (loading) return <Spinner/>
  return (
      <Routes>
          {routes.map(({path,Component, isProtected, notLogged}) =>  {
              if (notLogged) return <Route key={path} path={path} element={<NotLoggedOnly><Component/></NotLoggedOnly>}/>
              if (isProtected) return <Route key={path} path={path} element={<ProtectedRoute><Component/></ProtectedRoute>}/>
              return <Route key={path} path={path} element={<Component/>}/>
          })}
      </Routes>
  );
}

export default App;
