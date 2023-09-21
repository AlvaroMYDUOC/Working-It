import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../assets/css/Carrusel.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
};
const sliderData = [
  {
    title: "Cocina nueva",
    description: "Descripción de la Película 1",
    url:
      "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1",
    link: "Enlace a Película 1",
  },
  {
    title: "Renovación de baño",
    description: "Descripción de la Película 2",
    url:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*",
    link: "Enlace a Película 2",
  },
  {
    title: "Ampliación cocina",
    description: "Descripción de la Película 3",
    url:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*",
    link: "Enlace a Película 3",
  },
  {
    title: "Manuel hola",
    description: "Descripción de la Película 4",
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU",
    link: "Enlace a Película 4",
  },
  {
    title: "Como estas",
    description: "Descripción de la Película 5",
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU",
    link: "Enlace a Película 5",
  },
];

const Slider = () => {
  return (
    <div className="cont-slider">
      <div className="parent">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          {sliderData.map((item, index) => {
            return (
              <div className="slider" key={index}>
                <div className="card">
                  <img src={item.url} alt="movie" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.link}>Ver más</a>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
