import React from 'react';
import NavBar from '../components/NavBar';
import UpcomingMovies from '../components/UpcomingMovies';
import CarouselComponent from '../components/CarouselComponent';


const Home = () => {
  return (
   <div>
    <NavBar/>
    <CarouselComponent/>
    <UpcomingMovies/>
   </div>
  );
}

export default Home;
