import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next'

import './../../assets/css/bootstrap.min.css'
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
//import "./../../App.css";
import flagImgUS from './../../assets/img/flags/us.png';
import flagImgFR from './../../assets/img/flags/fr.png';
import flagImgES from './../../assets/img/flags/es.png';
import flagImgDE from './../../assets/img/flags/de.png';

const LanguageSelector = (event) => {
    console.log(event)
    console.log("language come")
    const { t, i18n } = useTranslation()
    console.log(i18n.language)
    //const [selectedLang, setselectedLang] = useState(i18n.language  ==='en'? "En":"Ar");
    //const [selectedLang, setselectedLang] = useState(localStorage.getItem("lang")  ==='en'? "En":"Ar");
    const [selectedLang, setselectedLang] = useState("");
  // const [selectedLang, setselectedLang] = useState(localStorage.getItem("lang")  ===null?"English":localStorage.getItem("lang"));
    const [lang, setLang] = useState("");
  useEffect(() => {
    console.log("useEffect: ")
    console.log("localStorage.getItem: ", localStorage.getItem("lang"))
    var lang = localStorage.getItem("lang");
    if (lang === "English") {
      setselectedLang("English");
      i18n.changeLanguage("en");
    } else {
      setselectedLang("Arabic");
      i18n.changeLanguage("zh-hk");
    }
    setselectedLang(localStorage.getItem("lang"))
      switch(localStorage.getItem("lang")) {
        case "En":
            i18n.changeLanguage("en")
           
          break;
        case "Ar":
            i18n.changeLanguage('zh-hk')
          break;
          
        default:
          // code block
      }

  }, []);

  const changeLanguage = (event) => { 
    let name=event.target.name
    // this.setState({
    //   lang:event.target.name
    // })
    window.location.reload();
    localStorage.setItem("lang", name);

    console.log("changeLanguage: ")
    console.log("localStorage.getItem: ", localStorage.getItem("lang"))
       setLang(event.target.name)
      setselectedLang(event.target.name)
      switch(event.target.name) {
        case "En":
            i18n.changeLanguage("en")
      
          break;
        case "Ar":
            i18n.changeLanguage('zh-hk')
            
          break;
          
        default:
          // code block
         
      }
    
  }

  
  return (
    <div >
        {/* <div>Hello</div> */}
        {/* <ul> */}
        <li className="nav-item dropdown has-arrow flag-nav">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
              {/* <img src={flagImgUS} alt="" height="20" />  */}
              <span className='language'>{selectedLang}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right language">
              <a href="javascript:void(0);" className="dropdown-item" name="En" value='en' onClick={changeLanguage}>
                {/* <img src={flagImgUS} alt="" height="16" />  */}
                En
              </a>
              <a href="javascript:void(0);" className="dropdown-item" name ="Ar" value='zh-hk' onClick={changeLanguage}>
                {/* <img src={flagImgFR} alt="" height="16" />  */}
                Ar
              </a>
              {/* <a href="javascript:void(0);" className="dropdown-item" name ="Spanish" onClick={changeLanguage}>
                <img src={flagImgES} alt="" height="16" /> Spanish
              </a>
              <a href="javascript:void(0);" className="dropdown-item" name="German" onClick={changeLanguage}>
                <img src={flagImgDE} alt="" height="16" /> German
              </a> */}
            </div>
          </li>
        {/* </ul> */}
      {/* <input type="radio" value="en" name="language" defaultChecked /> English */}
      {/* <input type="radio" value="zh-hk" name="language"/> Traditional Chinese */}
    </div>
  )
}

export default LanguageSelector