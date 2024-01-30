import React, { useEffect, useState } from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";

import user from "../../../assets/website/img/user.svg";

const Reviews = ({ product_id, userID, addBy, t,props }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [limitReview, setLimitReview] = useState(4);
  const [activeTab, setActiveTab] = useState(1);
  //const noReviewAvailable = props("noReviewAvailable");

  const handleActiveTab = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const viewAllReview = (e, length) => {
    e.preventDefault();
    setLimitReview(length);
  };

  useEffect(() => {
    if (product_id) {
      async function getReview() {
        try {
          await axios
            .get(
              `${process.env.REACT_APP_API_URL}website/comment/list?product_id=${product_id}`
            )
            .then((response) => {
              if (response.data.success === true) {
                setAllReviews(response.data.data);
              } else {
                setAllReviews([]);
              }
            });
        } catch (error) {
          console.error(error);
        }
      }
      getReview();
    }
  }, [product_id]);

  return (
    <section className="related-review">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="exTab2" className="container">
              <ul className="nav nav-tabs">
                <li className={activeTab === 1 ? "active" : ""}>
                  <a
                    href="#1"
                    onClick={(e) => {
                      handleActiveTab(e, 1);
                    }}
                  >
                    {t("Comments")}
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className={`tab-pane ${activeTab === 1 ? "active" : ""}`}
                  id="1"
                >
                  {allReviews && allReviews.length > 0 ? (
                    <div className="row review-list">
                      {allReviews.slice(0, limitReview).map((item, index) => (
                        <div className="col-md-6 rl-col" key={index}>
                          <div className="review-1">
                            <div className="review-img">
                              <img src={user} alt="" />
                            </div>
                            <div className="review-con">
                              <div className="review-nenb">
                                <span>{t("name")}: </span>
                                {item.name}
                              </div>
                              {addBy === userID ? (
                                <>
                                  <div className="review-nenb">
                                    <span>{t("Email")}: </span>
                                    {item.email_id}
                                  </div>
                                  <div className="review-nenb">
                                    <span>{t("Mobile_No")}: </span>
                                    {item.mobile_no}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                              <div className="review-nenb">
                                <span>{t("Bid_Amount")}: </span>
                                {item.bid_amount}
                              </div>
                              {/* <div className="star-1">
                    <div className="rate-point">
                      <span>5.0</span>
                      <div className="our-star">
                        <ul>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
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
                        <div className="col-md-12">
                          <div className="lode-more-review">
                            {allReviews.length !== limitReview ? (
                              // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
                  ) : (
                    <div className="no-review">
                    
                      {
                         localStorage.getItem("lang") === "English"?
                        <> No Review Available</>
                         :
                        <>لا توجد مراجعة متاحة</>
                      }
                      
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(Reviews);
