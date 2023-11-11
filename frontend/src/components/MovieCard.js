import React from 'react'
import ScheduleCard from "./schedule/ScheduleCard";

// TODO: pass in movieId instead of MovieName
const MovieCard = ({thumbnail,MovieName}) => {

    // // TODO: get movie by id (axios call)
    // // TODO: get title and other properties from movie object retrieved
    //
    // // dummy movie object to be passed to ScheduleCard
    // const movie = {
    //     title: "Movie Title",
    //     rating: "3",
    //     duration: "1h",
    //     times: [
    //         "1:00pm",
    //         "2:00pm",
    //         "3:00pm",
    //         "7:30pm"
    //     ],
    //     genre: "Action",
    //     description: "lorem ipsum",
    // };

  return (
    <div >
        <img alt='movieThumbnail' src={thumbnail}/>
        <h5 className='text-white py-[5px]'>{MovieName}</h5>
        {/*<ScheduleCard movie={movie} />*/}

    </div>
  )
}

export default MovieCard