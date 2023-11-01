import React from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'

const CarouselComponent = () => {
    var items = [
        {
            imageLink:"https://anniehaydesign.weebly.com/uploads/9/5/4/6/95469676/landscape-poster-2_orig.jpg"
        },
        {
            imageLink:"https://pbs.twimg.com/media/FmpAuNeWQAA6Lp_?format=jpg&name=large"
        },
        {
            imageLink:"https://thecollision.org/wp-content/uploads/2023/07/Movie-Review-thumbnails-7.png"
        },
        {
            imageLink:"https://wallpapers.com/images/hd/the-avengers-vm16xv4a69smdauy.jpg"
        }
    ]


  return (
    <Carousel>
        {
            items.map( (item, i) => <CarouselItem key={i} item={item} /> )
        }
    </Carousel>

  )
}

export default CarouselComponent

