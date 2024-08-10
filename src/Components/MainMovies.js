import React from 'react'
import VideoBackground from './VideoBackground'
import VideoTilte from './VideoTilte'
import { useSelector } from 'react-redux'

const MainMovies = ()=> {
    const movies = useSelector((store)=>store.movies?.nowPlayingMovies);
    if(!movies)return;
    const mainMovie = movies[0];
    const {original_title, overview,id} = mainMovie;
  return (
    <div>
        <VideoTilte title={original_title} overview={overview}/>
        <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainMovies;