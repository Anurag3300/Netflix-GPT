import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { addPopularMovies } from "../utils/movieSlice";
import { useDispatch } from "react-redux";

const usePopularMovies = ()=>{
    const dispatch = useDispatch();
    const getPopularMovies = async()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
    const json  = await data.json();
    // (json.results);
    // console.log(json.results);
    dispatch(addPopularMovies(json.results));
   };
   useEffect(()=>{
    getPopularMovies();
   },[]);
}

export default usePopularMovies;