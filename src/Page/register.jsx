import LoginButton from "./login/loginPage"
import { useNavigate } from "react-router-dom"

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const navigation = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  function handleLogin() {
    
    navigation('/login')
    localStorage.setItem('isLoggedIn', 'true');
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" placeholder="username" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div style={{ position: "relative" }} className = "flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered pr-12"
                  style={{ width: "100%" }}
                />
                <button
                  style={{ position: "absolute", right: "8px"}}
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={handleTogglePassword}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input type="password" placeholder="confirm password" className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={()=>handleLogin()}>Sign Up</button>
            </div>
            <div className="divider">OR</div>
            <LoginButton />
          </div>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Welcome to <b className="text-primary">QA Generator</b> !
          </h1>
          <p className="py-6">
            Test your English skills through our{" "}
            <b className="text-secondary">reading test </b>and
            <b className="text-secondary"> writing assessments</b>. With a variety of question types and difficulty levels, receive instant feedback and navigate with ease. Improve your English skills today by starting now!
          </p>
        </div>
      </div>
    </div >
  );
}

export default Register;
