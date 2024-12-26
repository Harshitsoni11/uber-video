import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Start from './pages/Start'
import Home from './pages/Home'
import Captionlogin from './pages/Captainlogin'
import CaptionSignup from './pages/CaptionSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptionRiding from './pages/CaptionRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/caption-login' element={<Captionlogin />}></Route>
        <Route path='/caption-signup' element={<CaptionSignup />}></Route>
        <Route path='/signup' element={<UserSignup />}></Route>
        <Route path='/riding' element={<Riding />}></Route>
        <Route path='/login' element={<UserLogin />}></Route>
        <Route path='/home' element={
          <UserProtectWrapper><Home /></UserProtectWrapper>
        }></Route>
        <Route path='/user/logout' element={
          <UserProtectWrapper><UserLogout /></UserProtectWrapper>
        }></Route>
         <Route path='/captain-home' element={
         <CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>
         }></Route> 

         <Route path='/captain-riding' element={<CaptionRiding />}></Route> 
       
      </Routes>
    </div>
  )
}

export default App
