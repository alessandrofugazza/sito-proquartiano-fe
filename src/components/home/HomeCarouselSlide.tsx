interface HomeCarouselSlideProps {
  imgSrc: string;
  text: string;
}

function HomeCarouselSlide({imgSrc, text}: HomeCarouselSlideProps) {
  return(
    <div className="d-flex justify-content-center">
      <img
        style={{height: '500px', maxWidth: '100%', objectFit: 'contain'}}
        src={imgSrc}
        alt={text}
      />
    </div>
  )
}

export default HomeCarouselSlide;