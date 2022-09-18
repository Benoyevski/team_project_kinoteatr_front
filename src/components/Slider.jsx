import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
export default function Slider() {
  return (
    <MDBCarousel interval={3000} showControls showIndicators dark fade>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='https://sun9-3.userapi.com/impg/EgFKKbKuCUMMny0nQJkQVz3l66mQ8bR2qAQ_gQ/_N3vSkYNxb8.jpg?size=1280x720&quality=95&sign=312be0a8d37acdfdc797c940531eef92&type=album'
        alt='...'
      >
        <Link to={`/movie/6320338bc17753bff3095d3d`}>
           <button><h1>Смотреть</h1></button>
        </Link>
      </MDBCarouselItem>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://sun9-27.userapi.com/impg/oApTAUOukAyf1HM0rdUzh6af4udK8pRutJjy5w/iuzzUn10LCo.jpg?size=1280x720&quality=95&sign=4887221d358650bd380ab46363aa9aa5&type=album'
        alt='...'
      >
         <Link to={`/movie/63202e43c17753bff3095d2b`}>
           <button><h1>Смотреть</h1></button>
        </Link>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://sun9-69.userapi.com/impg/zZ5IkI9UcmL5-bQb4xNyGSg3e2S-2b2z9UtHOQ/W8NThTJka44.jpg?size=1280x720&quality=95&sign=7685b54f1f32c64ee1394739fdcf778e&type=album'
        alt='...'
      >
         <Link to={`/movie/632035c6c17753bff3095d43`}>
           <button><h1>Смотреть</h1></button>
        </Link>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={4}
        src='https://sun9-49.userapi.com/impg/n6rML4VdUXNf1NN8bNtI8NxFLn8syTrps4lpWg/_uaVa3PHIbE.jpg?size=1280x720&quality=95&sign=1ea3b9754037e54c923cd8a681d40d14&type=album'
        alt='...'
      >
         <Link to={`//movie/632032adc17753bff3095d39`}>
           <button><h1>Смотреть</h1></button>
        </Link>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}