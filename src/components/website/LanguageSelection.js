import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./../../assets/css/bootstrap.min.css";
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css";
import "./../../assets/css/custom.css";

import flagImgUS from "./../../assets/img/flags/us.png";
import flagImgFR from "./../../assets/img/flags/fr.png";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const [selectedLang, setselectedLang] = useState("Arabic");
  const [togglePopup, setTogglePopup] = useState(false);

  const handleTogglePopup = (e) => {
    e.preventDefault();
    setTogglePopup((prev) => !prev);
  };

  const changeLanguage = (name) => {
    localStorage.setItem("lang", name);
    setselectedLang(name);
    switch (name) {
      case "English":
        i18n.changeLanguage("en");
        break;
      case "Arabic":
        i18n.changeLanguage("zh-hk");
        break;
      default:
      // code block
    }
    setTogglePopup(false);
  };

  useEffect(() => {
    var lang = localStorage.getItem("lang");
    if (lang === "English") {
      setselectedLang("English");
      i18n.changeLanguage("en");
    } else {
      setselectedLang("Arabic");
      i18n.changeLanguage("zh-hk");
    }
  }, []);
  return (
    <div className="language-dropdown">
      <a href="#" className="ld-btn" onClick={handleTogglePopup}>
        <img
          src={selectedLang === "English" ? flagImgUS : flagImgFR}
          alt=""
          className="img-language "
        />{" "}
        <span className="englishcolor">{t(selectedLang)}</span>
      </a>
      <div
        className={`dropdown-menu dropdown-menu-right ${
          togglePopup ? "show" : ""
        }`}
      >
        <a
          className={`dropdown-item ${
            selectedLang === "English" ? "di-active" : ""
          }`}
          name="English"
          value="en"
          onClick={() => changeLanguage("English")}
        >
          <img src={flagImgUS} alt="" className="img-language " />{" "}
          <span>English</span>
        </a>
        <a
          className={`dropdown-item ${
            selectedLang === "Arabic" ? "di-active" : ""
          }`}
          name="Arabic"
          value="zh-hk"
          onClick={() => changeLanguage("Arabic")}
        >
          <img src={flagImgFR} alt="" className="img-language" />{" "}
          <span>{t("Arabic")}</span>
        </a>
      </div>
    </div>
  );
};

export default LanguageSelector;
