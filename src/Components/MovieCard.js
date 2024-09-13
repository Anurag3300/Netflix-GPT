import React from 'react'
import { IMG_URL_POSTER } from '../utils/constant';

const MovieCard = ({poster}) => {
  return (
    <div className='w-48 pr-4 '>
      <img className=" rounded-lg" alt='Now PLaying' src={IMG_URL_POSTER+poster}/>
    </div>
  )
}

export default MovieCard;