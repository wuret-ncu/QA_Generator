import React from 'react'
import GoogleLogin from 'react-google-login';
import './loginButton.css'
import { FcGoogle } from 'react-icons/fc';

const googleId = "985748016447-spqqd66n7uu0n4d0liap4dmv0dmqof75.apps.googleusercontent.com"
const facebookId = "264710595984830"
const LoginPage = () => {
  const handleFacebookLogin = (response) => {
    // 處理 Facebook 登入成功後的邏輯
  };

  const handleGoogleLogin = (response) => {
    // 處理 Google 登入成功後的邏輯
  };

  const handleGithubLogin = (response) => {
    // 處理 GitHub 登入成功後的邏輯
  };

  return (
    <div>
      <GoogleLogin
        clientId={googleId}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="google-login-button"
          >
            <FcGoogle />
          </button>
        )}
        buttonText=""
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
};

export default LoginPage;