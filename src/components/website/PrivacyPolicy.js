import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "../../actions/message";

import { history } from "../../helpers/history";

import HeroSlider from "./parts/heroSlider";
import coverImg from "./../../assets/website/img/co.jpg";
import logo from "./../../assets/website/img/livebid/logo.png";

import "./../../assets/css/bootstrap.min.css";

// Category slider
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { withTranslation } from "react-i18next";
import "./../../assets/website/css/sliderstyle.css";

toast.configure();

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {}

  render() {
    const slider = [
      {
        banner: coverImg,
        title: "",
        description: "",
      },
    ];

    return (
      <React.Fragment>
        <HeroSlider className={"ap-hero"} slides={slider} />

        <section className="middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="abu-logo">
                  <NavLink exact to="/">
                    <img src={logo} />
                  </NavLink>
                </div>
              </div>
              <div className="col-md-8">
                <h2 className="abu-title">{this.props.t("PrivacyPolicy")}</h2>
                {localStorage.getItem("lang") === "English" ? (
                  <div className="abu-content">
                    <p>
                      The user must agree to be bound by everything contained in
                      these terms when using the site, accessing it, or
                      registering for the service.
                    </p>
                    <p>
                      Terms of use With your consent and to benefit from the
                      services of the site, you must abide by the following
                    </p>
                    <ul>
                      <li>
                        Not to use any illegal means to access advertisements or
                        other users' data, violate the policy and rights of the
                        website, access the content of the site, or collect and
                        collect information and data about the site or the
                        site's customers, and benefit from it in any way or
                        re-publish it.
                      </li>
                      <li>
                        Do not use the Site if you are not legally qualified,
                        under 18 years old.
                      </li>
                      <li>
                        Not to manipulate the prices of goods, whether in buying
                        or selling, and causing harm to other users.
                      </li>
                      <li>
                        Not to post false, inaccurate, misleading, deceptive,
                        defamatory, or defamatory advertisements or comments.
                      </li>
                      <li>
                        Not to be exposed to international policies or
                        sovereigns, or esteemed personalities, or any
                        discussions not related to legitimate buying and
                        selling.
                      </li>
                      <li>
                        Not to infringe copyright, trademark, patent,
                        advertising, database or other proprietary or
                        intellectual rights not to infringe others' proprietary,
                        intellectual or patent rights.
                      </li>
                      <li>
                        Not to announce the prohibited goods. The prohibited
                        goods must be viewed.
                      </li>
                      <li>
                        Commitment to the real estate advertising controls set
                        by the responsible authorities.
                      </li>
                      <li>Not violating wildlife protection regulations.</li>
                      <li>
                        Not to collect information about other site users for
                        commercial purposes. Prohibited Goods:
                      </li>
                      <li>
                        All goods prohibited by the laws of the Kingdom of Saudi
                        Arabia.
                      </li>
                      <li> Installment and banking products.</li>
                      <li> Medicines, medical and health products.</li>
                      <li> Web Marketing</li> <li> Weapons.</li>
                      <li>
                        Stocks, portfolio management, currencies, marketing and
                        everything related to that.
                      </li>
                      <li> Spy and eavesdropping devices.</li>
                      <li> Tobacco Products</li>
                    </ul>
                  </div>
                ) : (
                  <div className="abu-content">
                    <p>
                      يجب أن يوافق المستخدم على الالتزام بكل شيء وارد في هذه
                      الشروط عند استخدام الموقع أو الوصول إليه أو التسجيل في
                      الخدمة.
                    </p>
                    <p>
                      شروط الاستخدام بموافقتك وللاستفادة من خدمات الموقع ، يجب
                      عليك الالتزام بما يلي
                    </p>
                    <ul>
                      <li>
                        عدم استخدام أي وسيلة غير قانونية للوصول إلى الإعلانات أو
                        بيانات المستخدمين الآخرين ، أو انتهاك سياسة وحقوق الموقع
                        ، أو الوصول إلى محتوى الموقع ، أو جمع وجمع المعلومات
                        والبيانات حول الموقع أو عملاء الموقع ، والاستفادة منها.
                        بأي شكل من الأشكال أو إعادة نشرها.
                      </li>
                      <li>
                        لا تستخدم الموقع إذا لم تكن مؤهلاً قانونياً ، وعمرك أقل
                        من 18 عامًا.
                      </li>
                      <li>
                        عدم التلاعب بأسعار السلع سواء في البيع أو الشراء وإلحاق
                        الضرر بالمستخدمين الآخرين.
                      </li>
                      <li>
                        عدم نشر إعلانات أو تعليقات كاذبة أو غير دقيقة أو مضللة
                        أو خادعة أو تشهيرية أو تشهيرية.
                      </li>
                      <li>
                        عدم التعرض لسياسات دولية أو جهات سيادية أو شخصيات محترمة
                        أو أي مناقشات لا تتعلق بالشراء والبيع المشروعين.
                      </li>
                      <li>
                        عدم التعدي على حقوق الطبع والنشر أو العلامات التجارية أو
                        براءات الاختراع أو الإعلانات أو قواعد البيانات أو غيرها
                        من حقوق الملكية أو حقوق الملكية الفكرية حتى لا تنتهك
                        حقوق الملكية أو الملكية أو حقوق براءات الاختراع للآخرين.
                      </li>
                      <li>
                        عدم الإعلان عن البضائع الممنوعة. يجب عرض البضائع
                        الممنوعة.
                      </li>
                      <li>
                        الالتزام بضوابط الإعلان العقاري التي تضعها الجهات
                        المسؤولة.
                      </li>
                      <li>عدم مخالفة أنظمة حماية الحياة الفطرية.</li>
                      <li>
                        عدم جمع معلومات عن مستخدمي الموقع الآخرين لأغراض تجارية.
                        البضائع المحظورة:
                      </li>
                      <li>
                        جميع البضائع الممنوعة بموجب قوانين المملكة العربية
                        السعودية.
                      </li>
                      <li> منتجات التقسيط والمصرفية.</li>
                      <li> الأدوية والمنتجات الطبية والصحية.</li>
                      <li> التسويق الشبكي</li>
                      <li> أسلحة.</li>
                      <li>
                        الأسهم وإدارة المحافظ والعملات والتسويق وكل ما يتعلق
                        بذلك.
                      </li>
                      <li> أجهزة التجسس والتنصت.</li>
                      <li> منتجات التبغ</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    user,
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(withTranslation()(PrivacyPolicy));
