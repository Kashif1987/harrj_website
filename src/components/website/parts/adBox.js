import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/website/img/livebid/logo.png";
import live from "../../../assets/website/img/livebid/live.png";
import order from "../../../assets/website/img/livebid/order.png";
import dateImg from "../../../assets/website/img/livebid/date.png";
import loc from "../../../assets/website/img/livebid/loc.png";
import clock from "../../../assets/website/img/livebid/clock.png";

const AdBox = ({
  link,
  image,
  liveLable,
  bidCount,
  title,
  brandLabel,
  brand_name,
  priceLabel,
  price,
  date,
  time,
  location,
  auction_type,
}) => {
  return (
    <div className="live-bid-content">
      <Link to={link}>
        {image ? (
          <img className="live-bid-img" src={image} alt="" />
        ) : (
          <img
            className="live-bid-img"
            src={logo}
            style={{ objectFit: "contain" }}
            alt=""
          />
        )}
      </Link>
      <div className="live mt-2">
        {liveLable ? <img src={live} alt="" /> : ""}
        {bidCount ? (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <img src={order} alt="" /> {bidCount}
          </a>
        ) : (
          ""
        )}
      </div>
      <div className="bid-heading">
        <h2>{title}</h2>
      </div>
      <div className="date-time">
        <ul>
          <li>
            {brandLabel}: {brand_name}
          </li>
          {auction_type === "offline" ? (
            <li className="tim">
              {priceLabel}: {price}
            </li>
          ) : (
            ""
          )}
          <li>
            <img src={dateImg} alt="" /> {date}
          </li>
          <li className="loc">
            <img src={loc} alt="" /> {location}
          </li>
          {time ? (
            <li className="tim">
              <img src={clock} alt="" /> {time}
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdBox;
