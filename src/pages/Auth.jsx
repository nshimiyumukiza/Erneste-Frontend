

import Singup from '../components/Singup'
import Login from '../components/Login'
import { useState } from 'react'


const Auth = () => {
  const[isLogin,setIsLogin] = useState(true)
  const[isSignup,setIsSignup] = useState(false)

 const handleLogin = () => {
  setIsLogin(true)
  setIsSignup(false)
 }
 const handleSignup =() => {
  setIsLogin(false)
  setIsSignup(true)
 }
  return (
    <div>
      {isSignup &&(  <Singup onSignup ={handleLogin} />)}
      {isLogin &&(  <Login  onLogin = {handleSignup}/>)} 
      
        
    </div>
  )
}

export default Auth