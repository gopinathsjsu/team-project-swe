import React from 'react'

const MovieCard = ({thumbnail,MovieName}) => {
  return (
    <div >
        <img src={thumbnail}/>
        <h5 className='text-white py-[5px]'>{MovieName}</h5>
    </div>
  )
}

export default MovieCard