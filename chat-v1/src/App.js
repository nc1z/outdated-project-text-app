import React from 'react'
import Signup from './routes/Signup';
import Signin from './routes/Signin';
import Home from './routes/Home';
import { Route, Routes } from 'react-router';
import { UserAuth } from './context/AuthContext';
import { Navigate } from 'react-router';

const App = () => {
  const {user} = UserAuth();

  const ProtectedRoute = ({children}) => {
    if(!user){
      return <Navigate to="/Signin"/>
    } else {
      return children;
    }
  }

  return (
      <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path='/Signin' element={<Signin />}/>
          <Route path='/Signup' element={<Signup />}/>
      </Routes>
  )
}

export default App