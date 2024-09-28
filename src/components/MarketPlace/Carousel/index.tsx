import React, { useState, useEffect } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import './index.css';

interface CarouselProps {
  images: { src: string; description: string }[];
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handleClick = (index: number) => {
    setCurrentIndex(index); // 更新为点击的图片索引
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + images.length) % images.length;
          const isNext = index === (currentIndex + 1) % images.length;

          return (
            <div
              key={index}
              className={`carousel-card ${isActive ? 'active' : ''} ${isPrev ? 'prev' : ''} ${
                isNext ? 'next' : ''
              }`}
              onClick={() => handleClick(index)} // 点击图片时切换
            >
              <PhotoProvider>
                <PhotoView src={image.src} >
                  <img src={image.src} alt={`carousel-${index}`} />
                </PhotoView>
              </PhotoProvider>
              
            </div>
          );
        })}
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleClick(index)} // 点击指示器按钮时切换图片
          ></span>
        ))}
      </div>
      <div className="carousel-description">
        {images[currentIndex].description}
      </div>
      <button className="carousel-button prev" onClick={handlePrev}>
        ‹
      </button>
      <button className="carousel-button next" onClick={handleNext}>
        ›
      </button>
    </div>
  );
};

export default Carousel;
