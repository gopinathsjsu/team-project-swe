import React from 'react';
import HomeContainer from '../containers/HomeContainer';


const Home = ({ isAdmin }) => {
  return (
   <div>
    <HomeContainer isAdmin={isAdmin} />
   </div>
  );
}

export default Home;
