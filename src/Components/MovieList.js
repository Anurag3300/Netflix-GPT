import React from 'react'
import MovieCard from './MovieCard'
const MovieList = ({title,movies}) => {
  return (
    <div className='px-9'>
       <h1 className='text-3xl py-4 text-white'>{title}</h1>
      <div className='flex  [&::-webkit-scrollbar]:[width:0px]
            overflow-scroll ' >
        <div className='flex '>
        {
          movies?.map((movie)=><MovieCard key={movie.id} poster={movie.poster_path}/>)
        }
        </div>
      </div>
    </div>
  )
}

export default MovieList