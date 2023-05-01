import React from 'react';
import {SignUpPage} from './pages/signup/page';
import {createBrowserRouter, Route, Routes} from 'react-router-dom';
import {ErrorPage} from './pages/error-page/page';
import {LoginPage} from './pages/login/page';
import {Main} from './pages/main/page';


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
function App() {
  return (
      <Routes>

              <Route path="/" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/main" element={<Main />} />

      </Routes>
  );
}

export default App;
