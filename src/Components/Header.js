import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { LOGO , SUPPORTED_LANGUAGES} from '../utils/constant';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);
  const showGptSearch  = useSelector(store=>store.gpt.showGptSearch);
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
  const handleGptSearch = ()=>{
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange = (e)=>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className='absolute w-full px-12 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className="w-44" src={LOGO}
        alt='logo'/>
      {user && <div className='flex p-2 gap-6'>
      { showGptSearch &&
        <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
          {
            SUPPORTED_LANGUAGES.map((lang)=><option key={lang.identifier} value={lang.identifier} >{lang.name}</option>)
          }
        </select>
      }
       
        <button className='font-bold bg-purple-500 p-2 w-25 h-12 text-black hover:bg-slate-100  transition-all rounded-lg' onClick={handleGptSearch}>{showGptSearch ?"Home Page":"GPT Search"}</button>
        <img className="w-12 h-12 " src={user?.photoURL}
        alt='usericon'/>
        <button className='font-bold text-slate-950 bg-purple-500 p-2 w-25 h-12 hover:bg-slate-100 transition-all rounded-lg' onClick={handleSignOut}>Sign Out</button>
      </div>}
    </div>
  )
}

export default Header;