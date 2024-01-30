import React, { Component } from "react";
// import "../slider/slider.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class Slider extends Component {
  _isMounted = false;

  state = {
    awsApiData: [],
    loading: false,
    lightboxIsOpen: false,
    // selectedIndex: 0,
    selectedImage: {}
  };

  componentDidMount() {
    this._isMounted = true;
    // console.log("app mounted");
    this.setState({ loading: true });
    /*global fetch */
    // fetch("https://onelbip0e6.execute-api.eu-west-2.amazonaws.com/xxxxx")
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((data) => data.json())
      .then((data) =>
        // this.setState({ awsApiData: data[0], loading: false }, () =>
        this.setState(
          {
            // awsApiData: data.map(item => ({source: item.download_url })),
            awsApiData: data.map((item) => ({
              ...item,
              source: item.download_url
            })),
            loading: false
          },
          () => console.log(data)
        )
      );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleLightbox = (post, selectedIndex) => {
    // this.setState(state => ({
    //   lightboxIsOpen: !state.lightboxIsOpen,
    //   selectedIndex
    // }));
    this.setState((state) => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      selectedImage: { author: post.author, index: selectedIndex }
    }));
  };

  render() {
    return (
      <div>
        <>
          <Carousel
            additionalTransfrom={0}
            showDots={false}
            arrows={true}
            autoPlaySpeed={3000}
            autoPlay={true}
            centerMode={false}
            className="slider"
            containerClass="container-with-dots"
            dotListClass="dots"
            draggable
            focusOnSelect={false}
            infinite
            itemClass="carousel-top"
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside
            responsive={responsive}
          >
            {Object.values(this.state.awsApiData).map((post, indx) => {
              return (
                <div
                  className="mt-5"
                  key={indx}
                  // onClick={() => this.toggleLightbox(indx)}
                  onClick={() => this.toggleLightbox(post, indx)}
                >
                  <img
                    className="media-img card-img-top card-img-hero"
                    src={post.download_url}
                    alt="Alt text"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              );
            })}
          </Carousel>
        </>
      </div>
    );
  }
}

export default Slider;