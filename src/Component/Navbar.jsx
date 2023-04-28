import React,{useEffect, useState, useContext} from 'react'
import { Context } from "../Contexts/Context";

function Navbar() {
  const {test, setTest} = useContext(Context)
  const [isLogin , setIsLogin] = useState(false);

  useEffect(()=>{
    setIsLogin(localStorage.getItem('isLoggedIn'))
    console.log(localStorage.getItem('isLoggedIn'))
  },[])

  function handleLogin() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  function handelLogout(){
    localStorage.removeItem('isLoggedIn');
  }
  


  return (
    <div>
      <div className="navbar bg-base-100 bg-theme-green">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl text-white">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-white">
            {isLogin ? (
            <>
              <li><a href="/">Home</a></li>
              <li><a href="/read">Read</a></li>
              <li><a href="/write">Write</a></li>
              <li><a href="/analysis">Analysis</a></li>
              <li><a href="/logout" onClick={e => handelLogout()}>Logout</a></li>
            </>)
            :(<>
              <li><a href="/login" onClick={e => handleLogin()}>Login</a></li>
              <li><a href="/resiger">Resiger</a></li>
            </>)
            }

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar