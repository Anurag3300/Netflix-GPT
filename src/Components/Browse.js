import Header from './Header';
import useNowPlayingMovies from '../Hook/useNowPlayingMovies';
import MainMovies from './MainMovies';
import SecondayMovies from './SecondayMovies';


const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header/>
      <MainMovies/>
      <SecondayMovies/>
    </div>
  )
}

export default Browse;