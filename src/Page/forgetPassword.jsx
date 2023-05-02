import LoginButton from "./login/loginPage"
import { useEffect, useContext, useState } from 'react';
import { gapi } from 'gapi-script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom"
import { Context } from "../Contexts/Context";


function ForgetPassword() {
    const navigation = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const { test, setTest } = useContext(Context)

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        setTest(true)
        navigation('/')
    }
    // useEffect(() => {
    //     function start() {
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: ""
    //         })
    //     };
    //     gapi.load('client:auth2', start);
    // });
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary" onClick={() => handleLogin()}>Find Password</button>
                            </div>
                            <div className="divider">OR</div>
                            <LoginButton />
                        </div>
                    </div>
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Welcome to <b className="text-primary">QA Generator</b> !</h1>
                        <p className="py-6">Test your English skills through our <b className="text-secondary">reading test </b>and
                            <b className="text-secondary"> writing assessments</b>. With a variety of question types and difficulty levels, receive instant feedback and navigate with ease. Improve your English skills today by starting now!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;