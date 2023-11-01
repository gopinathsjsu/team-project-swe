import React from 'react'
import { Paper } from '@mui/material'

const CarouselItem = ({item}) => {
    const Paperstyle={
        height:"350px"
    }
  return (
   <Paper style={Paperstyle}>
        <img alt='scrollImage' className='w-full h-[390px] ' src={item.imageLink} />
   </Paper>
  )
}

export default CarouselItem