import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/img/PQ_aprile2023.png';
import img2 from '../../assets/img/PQ_sagraW2023.jpg';
import img3 from '../../assets/img/PROQUARTIANO-libri-2023.png';
import HomeCarouselSlide from './HomeCarouselSlide';

function HomeCarousel() {
  return (
    <Carousel data-bs-theme="dark" >
      <Carousel.Item>
        <HomeCarouselSlide imgSrc={img1} text='p'/>
      </Carousel.Item>
      <Carousel.Item>
        <HomeCarouselSlide imgSrc={img2} text='p'/>
      </Carousel.Item>
      <Carousel.Item>
        <HomeCarouselSlide imgSrc={img3} text='p'/>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;