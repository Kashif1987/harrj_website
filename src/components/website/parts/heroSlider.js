import React from "react";
import Carousel from "react-bootstrap/Carousel";

const HeroSlider = ({ slides, className }) => {
  return (
    <div className={"home_slider hs-sl " + className}>
      <Carousel>
        {slides.map((item, index) => (
          <Carousel.Item key={index}>
            <img className="bg-banner" src={item.banner} alt="" />
            <Carousel.Caption>
              <div className="banner-innner container">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="hss-info">
                      <h3 className="wow fadeInDown">{item.title}</h3>
                      <p>{item.description}</p>
                      {item.handleButtonClick && (
                        <a
                          href="#"
                          className="wow fadeIn"
                          onClick={item.handleButtonClick}
                        >
                          {item.buttonTitle}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
