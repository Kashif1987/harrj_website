import React, { useEffect, useState } from "react";
import axios from "axios";

import user from "../../../assets/website/img/user.svg";

const Reviews = ({ product_id }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [limitReview, setLimitReview] = useState(4);

  const viewAllReview = (e, length) => {
    e.preventDefault();
    setLimitReview(length);
  };

  useEffect(() => {
    async function getReview() {
      try {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}website/comment/list?product_id=${product_id}`
          )
          .then((response) => {
            setAllReviews(response.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    }
    getReview();
  }, [product_id]);

  return (
    <section class="related-review pb-5">
      <div class="container">
        <div class="row">
          {allReviews.slice(0, limitReview).map((item, index) => (
            <div class="col-md-6" key={index}>
              <div class="review-1  ">
                <div class="review-img">
                  <img src={user} />
                </div>
                <div class="review-con">
                  <span>{item.name}</span>
                  {/* <div class="star-1">
                    <div class="rate-point">
                      <span>5.0</span>
                      <div class="our-star">
                        <ul>
                          <li>
                            <i class="fa fa-star"></i>
                          </li>
                          <li>
                            <i class="fa fa-star"></i>
                          </li>
                          <li>
                            <i class="fa fa-star"></i>
                          </li>
                          <li>
                            <i class="fa fa-star"></i>
                          </li>
                          <li>
                            <i class="fa fa-star"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  <p>{item.comment}</p>
                </div>
              </div>
            </div>
          ))}
          {allReviews.length > 4 ? (
            <div class="col-md-12">
              <div class="lode-more-review">
                {allReviews.length !== limitReview ? (
                  <a
                    href="#"
                    onClick={(e) => {
                      viewAllReview(e, allReviews.length);
                    }}
                  >
                    LOAD MORE REVIEW
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
