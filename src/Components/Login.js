import React, { useState,useRef } from 'react'
import Header from './Header'
import { checkVaildData } from '../utils/Validation';
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [isSignInForm, setIsSignInFrom] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const navigate = useNavigate();
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
                    displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/140556347?s=96&v=4"
                  }).then(() => {
                    navigate("/Browes");
                    console.log(user);
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
                console.log(user);
                navigate("/Browes");
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
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_large.jpg'
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

export default Login