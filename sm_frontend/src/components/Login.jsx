import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import {GoogleLogin} from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import { client } from '../client';

const Login = () => {

  const navigate = useNavigate();

  function responseGoogle(response){
    console.log(response );
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    const {picture, name, sub} = userObject;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true })
      })

  }   
  
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className="realtive w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div id="signInDiv"></div>

          <div className="shadow-2xl">
            
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              onSuccess={responseGoogle}
              onError={() => {
                console.log('Login Failed');
              }}
              cookiePolicy="single_host_origin"
              isSignedIn = {true}
            /> 

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login