import Header from './Header';
import useNowPlayingMovies from '../Hook/useNowPlayingMovies';
import MainMovies from './MainMovies';
import SecondayMovies from './SecondayMovies';
import usePopularMovies from '../Hook/usePopularMovies';
import useTopRatedMovies from '../Hook/useTopRatedMovies';
import useUpcomingMovies from '../Hook/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


const Browse = () => {
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch)
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header/>
      {
        showGptSearch ? <GptSearch/> : <> <MainMovies/>
        <SecondayMovies/></>
      }
    </div>
  )
}

export default Browse;