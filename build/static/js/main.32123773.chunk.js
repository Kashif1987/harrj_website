(this["webpackJsonpvirtual-shopping"]=this["webpackJsonpvirtual-shopping"]||[]).push([[5],{11:function(e,n,t){"use strict";t.d(n,"h",(function(){return a})),t.d(n,"g",(function(){return o})),t.d(n,"e",(function(){return r})),t.d(n,"d",(function(){return l})),t.d(n,"c",(function(){return c})),t.d(n,"b",(function(){return i})),t.d(n,"f",(function(){return u})),t.d(n,"i",(function(){return s})),t.d(n,"a",(function(){return m}));var a="REGISTER_SUCCESS",o="REGISTER_FAIL",r="LOGIN_SUCCESS",l="LOGIN_FAIL",c="DATA_SUCCESS",i="DATA_FAIL",u="LOGOUT",s="SET_MESSAGE",m="CLEAR_MESSAGE"},46:function(e,n,t){},47:function(e,n,t){},48:function(e,n,t){},49:function(e,n,t){},50:function(e,n,t){e.exports=t(61)},58:function(e,n,t){},61:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(17),l=t.n(r),c=t(23),i=t(16),u=t(13),s=t(42),m=t(43),d=t(44),h=t(9),b=t(11),p=JSON.parse(localStorage.getItem("user")),f=p?{isLoggedIn:!0,user:p}:{isLoggedIn:!1,user:null},g={},O=Object(u.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,n=arguments.length>1?arguments[1]:void 0,t=n.type,a=n.payload;switch(t){case b.h:case b.g:return Object(h.a)(Object(h.a)({},e),{},{isLoggedIn:!1});case b.e:return Object(h.a)(Object(h.a)({},e),{},{isLoggedIn:!0,user:a.user});case b.d:case b.f:return Object(h.a)(Object(h.a)({},e),{},{isLoggedIn:!1,user:null});default:return e}},message:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,n=arguments.length>1?arguments[1]:void 0,t=n.type,a=n.payload;switch(t){case b.i:return{message:a};case b.a:return{message:""};default:return e}}}),E=[m.a],y=Object(d.createLogger)(),j=Object(u.createStore)(O,Object(s.composeWithDevTools)(u.applyMiddleware.apply(void 0,E.concat([y])))),S=(t(58),t(30)),v=t(31),z=t(33),P=t(32),k=t(2),x=t(25),I=t(45),L=t(63);x.a.use(I.a).use(L.e).init({lng:"zh-hk",backend:{loadPath:"/assets/i18n/{{ns}}/{{lng}}.json"},fallbackLng:"zh-hk",debug:!0,ns:["translations"],defaultNS:"translations",keySeparator:!1,interpolation:{escapeValue:!1,formatSeparator:","},react:{wait:!0}});x.a,t(15),t(34);var T=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(22)]).then(t.bind(null,2066))})),w=(Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(25)]).then(t.bind(null,2067))})),Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(23),t.e(4),t.e(26)]).then(t.bind(null,2077))}))),A=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(17)]).then(t.bind(null,2068))})),F=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(8)]).then(t.bind(null,2069))})),C=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(20)]).then(t.bind(null,2078))})),_=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(13)]).then(t.bind(null,2070))})),G=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(18)]).then(t.bind(null,2071))})),N=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(14)]).then(t.bind(null,2079))})),R=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(16)]).then(t.bind(null,2072))})),D=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(15)]).then(t.bind(null,2080))})),J=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(11)]).then(t.bind(null,2075))})),M=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(21)]).then(t.bind(null,2081))})),U=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(12)]).then(t.bind(null,2082))})),W=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(19)]).then(t.bind(null,2073))})),B=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(24)]).then(t.bind(null,2074))})),K=(Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(4),t.e(27)]).then(t.bind(null,2076))})),Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(7),t.e(9)]).then(t.bind(null,2083))}))),V=function(e){Object(z.a)(t,e);var n=Object(P.a)(t);function t(e){var a;return Object(S.a)(this,t),(a=n.call(this,e)).state={isTokenFound:!1,isloading:!1},a}return Object(v.a)(t,[{key:"componentDidMount",value:function(){var e=this,n=JSON.parse(localStorage.getItem("user"));n&&""!==n&&"undefined"!==typeof n?this.setState({isTokenFound:!0},(function(){console.log("ISTOKEN",e.state.isTokenFound)})):this.setState({isTokenFound:!1})}},{key:"render",value:function(){return o.a.createElement(a.Suspense,{fallback:o.a.createElement("div",null)},o.a.createElement(k.c,null,0==this.state.isTokenFound&&o.a.createElement(k.a,{exact:!0,path:"/admin",component:B}),this.state.isTokenFound&&o.a.createElement(k.a,{exact:!0,path:"/admin",component:w}),o.a.createElement(k.a,{exact:!0,path:"/admin/login",component:T}),o.a.createElement(k.a,{exact:!0,path:"/admin/dashboard",component:w}),o.a.createElement(k.a,{exact:!0,path:"/admin/category/list",component:A}),o.a.createElement(k.a,{exact:!0,path:"/admin/subcategory/list",component:F}),o.a.createElement(k.a,{exact:!0,path:"/admin/banner/list",component:C}),o.a.createElement(k.a,{exact:!0,path:"/admin/brand/list",component:_}),o.a.createElement(k.a,{exact:!0,path:"/admin/model/list",component:N}),o.a.createElement(k.a,{exact:!0,path:"/admin/country/list",component:G}),o.a.createElement(k.a,{exact:!0,path:"/admin/state/list",component:R}),o.a.createElement(k.a,{exact:!0,path:"/admin/city/list",component:D}),o.a.createElement(k.a,{exact:!0,path:"/admin/product/list",component:J}),o.a.createElement(k.a,{exact:!0,path:"/admin/client/list",component:M}),o.a.createElement(k.a,{exact:!0,path:"/admin/user/list",component:U}),o.a.createElement(k.a,{exact:!0,path:"/admin/year",component:W}),o.a.createElement(k.a,{path:"/",component:K})))}}]),t}(a.Component);var $=Object(i.b)((function(e){return{user:e.auth.user}}))(V);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(60),t(29),t(47),t(46),t(48),t(49);l.a.render(o.a.createElement(i.a,{store:j},o.a.createElement(c.a,null,o.a.createElement($,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,6,10]]]);
//# sourceMappingURL=main.32123773.chunk.js.map