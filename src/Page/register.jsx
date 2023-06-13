// import LoginButton from "./login/loginPage"
// import { useNavigate } from "react-router-dom"

// import { useState, useContext } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { Context } from "../Contexts/Context";

// function handleRegister() {
//   const username = document.getElementById('username').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const confirmPassword = document.getElementById('confirmPassword').value;

//   fetch('/register', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, email, password, confirmPassword })
//   })
//     .then(response => response.text())
//     .then(data => {
//       console.log(data);
//       // 在這裡可以對回傳的資料進行適當的處理
//     })
//     .catch(error => console.error(error));
// }


// function Register() {
//   const navigation = useNavigate()
//   const [showPassword, setShowPassword] = useState(false);

//   const { test, setTest } = useContext(Context)

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   function handleLogin() {
//     setTest(true)
//     navigation('/login')
//   }

//   return (
//     <div className="hero min-h-screen bg-base-200">
//       <div className="hero-content flex-col lg:flex-row-reverse">
//         <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//           <div className="card-body">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Username</span>
//               </label>
//               <input type="text" placeholder="username" className="input input-bordered" />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input type="text" placeholder="email" className="input input-bordered" />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <div style={{ position: "relative" }} className="flex items-center">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="password"
//                   className="input input-bordered pr-12"
//                   style={{ width: "100%" }}
//                 />
//                 <button
//                   style={{ position: "absolute", right: "8px" }}
//                   className="btn btn-sm btn-circle btn-ghost"
//                   onClick={handleTogglePassword}
//                 >
//                   <FontAwesomeIcon
//                     icon={showPassword ? faEyeSlash : faEye}
//                   />
//                 </button>
//               </div>

//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Confirm Password</span>
//               </label>
//               <input type="password" placeholder="confirm password" className="input input-bordered" />
//             </div>
//             <div className="form-control mt-6">
//               <button className="btn btn-primary" onClick={() => handleRegister()}>Sign Up</button>
//             </div>
//             <div className="divider">OR</div>
//             <LoginButton />
//           </div>
//         </div>
//         <div className="text-center lg:text-left">
//           <h1 className="text-5xl font-bold">
//             Welcome to <b className="text-primary">QA Generator</b> !
//           </h1>
//           <p className="py-6">
//             Test your English skills through our{" "}
//             <b className="text-secondary">reading test </b>and
//             <b className="text-secondary"> writing assessments</b>. With a variety of question types and difficulty levels, receive instant feedback and navigate with ease. Improve your English skills today by starting now!
//           </p>
//         </div>
//       </div>
//     </div >
//   );
// }

// export default Register;
import LoginButton from "./login/loginPage"
import { useNavigate } from "react-router-dom"

import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../Contexts/Context";
import Login from "./login";

import Finder from "../API/Finder.js"; //axios

function Register() {
  const navigation = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const { test, setTest } = useContext(Context)
  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // function handleLogin() {
  //   setTest(true)
  //   navigation('/login')
  // }
  function handleRegister() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // fetch('http://localhost:8003/api/user/create', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password, email })
    // })
    //   .then(response => response.text())
    //   .then(data => {
    //     console.log(data); // 在这里可以对返回的数据进行处理
    //     if (data === "Account created successfully.") {
    //       setSuccessMessage(data); // 导航到"/login"
    //     }
    //     else {
    //       setWarningMessage(data);
    //       setShowAlert(true);
    //       // 3秒后隐藏警报
    //       setTimeout(() => {
    //         setShowAlert(false);
    //       }, 3000);
    //     }
    //   })
    //   .catch(error => console.error(error));


    Finder.post('http://localhost:8003/api/user/create', { username, password, email }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const data = response.data;
        console.log(data);

        if (data === "Account created successfully.") {
          setSuccessMessage(data);
          // 導航到"/login"
        } else {
          setWarningMessage(data);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      })
      .catch(error => console.error(error));

  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {successMessage && (
              <div className="alert alert-success shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{successMessage}</span>
                  <button className="btn btn-sm btn-primary" onClick={() => navigation("/login")}>Accept</button>
                </div>
              </div>)}
            {warningMessage && showAlert && (
              <div className=" alert alert-error shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <span>{warningMessage}</span>
                </div>
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input id="username" type="text" placeholder="username" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input id="email" type="text" placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div style={{ position: "relative" }} className="flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered pr-12"
                  style={{ width: "100%" }}
                />
                <button
                  style={{ position: "absolute", right: "8px" }}
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
              <input id="confirmPassword" type="password" placeholder="confirm password" className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleRegister}>Sign Up</button>
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
    </div>
  );
}

export default Register;
