import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'
import client from '../utils/openai';

const GptSearchBar = () => {
  const langkey = useSelector(store=>store.config.lang);
  const searchText = useRef(null);
  const handleGptSearchClick = async()=>{
    const gptQuery =
    "Act as a Movie Recommendation system and suggest some movies for the query : " +
    searchText.current.value +
    ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
   const gptResults =  await client.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    console.log(gptResults);
  }
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12 rounded-sm' onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type='text' placeholder={lang[langkey].gptSearchPlaceholder} className='p-4 m-4 col-span-9 rounded-md  text-xl'/>
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-md  text-xl' onClick={handleGptSearchClick}>{lang[langkey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar