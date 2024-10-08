import React, { useState,useRef } from 'react'
import Header from './Header'
import { checkVaildData } from '../utils/Validation';
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constant';
const Login = () => {
    const [isSignInForm, setIsSignInFrom] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const handelValidation = ()=>{
        const message = checkVaildData(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message) return;

        // signIn /signup Logic
        if(!isSignInForm){
            // signUp logic
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name.current.value,
                    photoURL:USER_AVATAR,
                  }).then(() => {
                    const {uid,email,displayName,photoURL} = auth.currentUser;
                    dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
                  }).catch((error) => {
                   setErrorMessage(error.message);
                });
                
                
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage);
               
              });

        }
        else{
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage);
            });
        }

    }
    const toggleHandler = ()=>{
        setIsSignInFrom(!isSignInForm);
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img src={BG_URL}
         alt='Bg-image'/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='absolute w-3/12 bg-black p-12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg'>
            <h1 className='font-bold text-4xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {
                !isSignInForm && (<input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-800 rounded-lg'/>)
            }
            <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-800 rounded-lg' />
            <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-800 rounded-lg' />
            <p className='text-red-500 font-bold text-lg'>{errorMessage}</p>
            <button className='p-4 my-4 w-full bg-red-700 rounded-lg' onClick={handelValidation}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleHandler}>{isSignInForm ? "New to Netflix? Sign up now.":"Already Registered?Sign In Now"}</p>
            
        </form>
    </div>
  )
}

export default Login;