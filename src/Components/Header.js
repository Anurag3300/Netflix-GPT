import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constant';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);
  const handleSignOut = ()=>{
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      navigate("/error");
    });
  }
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) 
        {
        const {uid,email,displayName,photoURL} = user;
        dispatch(
          addUser(
            {uid:uid,
              email:email,
              displayName:displayName,
              photoURL:photoURL}
          )
        );
        navigate("/Browse");
      } 
      else 
      {
       dispatch(removeUser());
       navigate("/");
      }
    });
    // the component is unmounting 
    return () => unsubscribe();
  },[]);
  return (
    <div className='absolute w-full px-12 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className="w-44" src={LOGO}
        alt='logo'/>
      {user && <div className='flex p-2 gap-6'>
        <img className="w-12 h-12 " src={user?.photoURL}
        alt='usericon'/>
        <button className='font-bold text-slate-950 bg-red-500 p-2 w-25 h-12 hover:bg-slate-100 transition-all rounded-lg' onClick={handleSignOut}>Sign Out</button>
      </div>}
    </div>
  )
}

export default Header;