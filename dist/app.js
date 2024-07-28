/*! For license information please see app.js.LICENSE.txt */
(()=>{"use strict";var e,t={470:(e,t,r)=>{const n=jQuery;var o=r.n(n);function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function a(){a=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n=Object.defineProperty||function(e,t,r){e[t]=r.value},o="function"==typeof Symbol?Symbol:{},c=o.iterator||"@@iterator",u=o.asyncIterator||"@@asyncIterator",l=o.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,r){return e[t]=r}}function f(e,t,r,o){var i=t&&t.prototype instanceof h?t:h,a=Object.create(i.prototype),c=new O(o||[]);return n(a,"_invoke",{value:E(e,r,c)}),a}function d(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=f;var p={};function h(){}function y(){}function v(){}var m={};s(m,c,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(q([])));b&&b!==t&&r.call(b,c)&&(m=b);var w=v.prototype=h.prototype=Object.create(m);function S(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function o(n,a,c,u){var l=d(e[n],e,a);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==i(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){o("next",e,c,u)}),(function(e){o("throw",e,c,u)})):t.resolve(f).then((function(e){s.value=e,c(s)}),(function(e){return o("throw",e,c,u)}))}u(l.arg)}var a;n(this,"_invoke",{value:function(e,r){function n(){return new t((function(t,n){o(e,r,t,n)}))}return a=a?a.then(n,n):n()}})}function E(e,t,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=k(a,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=d(e,t,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function k(e,t){var r=t.method,n=e.iterator[r];if(void 0===n)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=void 0,k(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var o=d(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,p;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,p):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,p)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function j(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function q(e){if(e){var t=e[c];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:P}}function P(){return{value:void 0,done:!0}}return y.prototype=v,n(w,"constructor",{value:v,configurable:!0}),n(v,"constructor",{value:y,configurable:!0}),y.displayName=s(v,l,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,s(e,l,"GeneratorFunction")),e.prototype=Object.create(w),e},e.awrap=function(e){return{__await:e}},S(L.prototype),s(L.prototype,u,(function(){return this})),e.AsyncIterator=L,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new L(f(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},S(w),s(w,l,"Generator"),s(w,c,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=q,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return a.type="throw",a.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),j(r),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:q(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},e}function c(e,t,r,n,o,i,a){try{var c=e[i](a),u=c.value}catch(e){return void r(e)}c.done?t(u):Promise.resolve(u).then(n,o)}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(o=n.key,a=void 0,a=function(e,t){if("object"!==i(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==i(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(o,"string"),"symbol"===i(a)?a:String(a)),n)}var o,a}var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.setupBoxes(),this.loadFromPermalink()}var t,r,n;return t=e,r=[{key:"setupBoxes",value:function(){this.addClickListeners(document.querySelectorAll("[data-permalink]"));var e=document.querySelector(".panel-page"),t=e.querySelector(".close"),r=e.querySelector(".payload");t.addEventListener("click",(function(){e.classList.add("hidden"),r.innerHTML="",history.pushState({},"","/")}))}},{key:"addClickListeners",value:function(e){var t=this,r=document.querySelector(".panel-page"),n=r.querySelector(".payload");e.forEach((function(e){e.addEventListener("click",function(){var o,i=(o=a().mark((function o(i){var c,u,l,s,f,d;return a().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(i.preventDefault(),c=e.getAttribute("data-permalink"),console.log(c),!c){o.next=31;break}return r.classList.remove("hidden"),r.scrollTo(0,0),n.innerHTML="",history.pushState({},"",c),o.prev=8,o.next=11,fetch(c);case 11:if((u=o.sent).ok){o.next=14;break}throw new Error("Network response was not ok");case 14:return o.next=16,u.text();case 16:l=o.sent,s=new DOMParser,f=s.parseFromString(l,"text/html"),d=f.querySelector(".payload-content").innerHTML,n.innerHTML=d,t.addClickListeners(n.querySelectorAll("[data-permalink]")),o.next=29;break;case 24:o.prev=24,o.t0=o.catch(8),console.error("Error fetching or parsing HTML:",o.t0),r.classList.add("hidden"),history.pushState({},"","/");case 29:o.next=33;break;case 31:console.error("No permalink found for this element"),r.classList.add("hidden");case 33:case"end":return o.stop()}}),o,null,[[8,24]])})),function(){var e=this,t=arguments;return new Promise((function(r,n){var i=o.apply(e,t);function a(e){c(i,r,n,a,u,"next",e)}function u(e){c(i,r,n,a,u,"throw",e)}a(void 0)}))});return function(e){return i.apply(this,arguments)}}())}))}},{key:"loadFromPermalink",value:function(){var e=document.querySelectorAll("[data-permalink]"),t=window.location.pathname;e.forEach((function(e){if(new URL(e.getAttribute("data-permalink"),window.location.origin).pathname===t){var r=new Event("click");e.dispatchEvent(r)}}))}}],r&&u(t.prototype,r),n&&u(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function f(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(o=n.key,i=void 0,i=function(e,t){if("object"!==s(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(o,"string"),"symbol"===s(i)?i:String(i)),n)}var o,i}var d=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.setupExplore()}var t,r,n;return t=e,(r=[{key:"setupExplore",value:function(){var e=this,t=document.querySelectorAll('.panel-explore input[type="checkbox"]'),r=document.querySelector(".panel-explore"),n=r.querySelector("button.close"),o=r.querySelector('input[type="submit"]'),i=document.querySelectorAll("[data-open-explore]");t.forEach((function(t){t.addEventListener("change",(function(){e.filterProjects()}))})),n.addEventListener("click",(function(){r.classList.add("hidden")})),o.addEventListener("click",(function(t){t.preventDefault(),r.classList.add("hidden"),e.filterProjects()})),i.forEach((function(e){e.addEventListener("click",(function(){r.classList.remove("hidden")}))})),this.filterProjects();var a=document.querySelector(".panel-explore .clear-filters");a&&a.addEventListener("click",(function(t){t.preventDefault(),document.querySelectorAll('.panel-explore input[type="checkbox"]').forEach((function(e){e.checked=!1})),e.filterProjects()}))}},{key:"filterProjects",value:function(){var e=Array.from(document.querySelectorAll('.panel-explore input[name^="category"]:checked')).map((function(e){return e.value})),t=Array.from(document.querySelectorAll('.panel-explore input[name^="year"]:checked')).map((function(e){return e.value})),r=Array.from(document.querySelectorAll('.panel-explore input[name^="material"]:checked')).map((function(e){return e.value})),n=document.querySelectorAll('[data-content-type="project"]'),o=document.querySelector(".total-projects"),i=document.querySelector(".total-projects-counter"),a=0;if(0===e.length&&0===t.length&&0===r.length)return n.forEach((function(e){e.classList.remove("explore-match")})),o.classList.add("hidden"),void(i.textContent=a);n.forEach((function(n){var o=n.getAttribute("data-project-categories").split(","),i=n.getAttribute("data-project-years").split(","),c=n.getAttribute("data-project-materials").split(","),u=0===e.length||e.some((function(e){return o.includes(e)})),l=0===t.length||t.some((function(e){return i.includes(e)})),s=0===r.length||r.some((function(e){return c.includes(e)}));u&&l&&s?(n.classList.add("explore-match"),a++):n.classList.remove("explore-match")})),i.textContent=a,a>0?o.classList.remove("hidden"):o.classList.add("hidden")}}])&&f(t.prototype,r),n&&f(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function h(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(o=n.key,i=void 0,i=function(e,t){if("object"!==p(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==p(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(o,"string"),"symbol"===p(i)?i:String(i)),n)}var o,i}var y=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.CLOSE_SEARCH_ON_PROJECT_OPEN=!1,this.setupSearch()}var t,r,n;return t=e,(r=[{key:"setupSearch",value:function(){var e=this,t=document.querySelector(".panel-search form"),r=document.querySelector(".search-results"),n=document.querySelector("[data-open-search]"),o=document.querySelector(".panel-search .close"),i=document.querySelector(".panel-search");t&&t.addEventListener("submit",(function(t){t.preventDefault();var n=document.querySelector("#keyword").value;e.performSearch(n,r)})),n&&i&&n.addEventListener("click",(function(){i.classList.remove("hidden")})),o&&i&&o.addEventListener("click",(function(){i.classList.add("hidden")})),r&&r.addEventListener("click",(function(t){var r=t.target.closest("a[data-post-id]");if(r){t.preventDefault();var n=r.getAttribute("data-post-id"),o=document.querySelector('#map [data-post-id="'.concat(n,'"]'));if(o){var a=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window});o.dispatchEvent(a),e.CLOSE_SEARCH_ON_PROJECT_OPEN&&i.classList.add("hidden")}}}))}},{key:"performSearch",value:function(e,t){var r=new URLSearchParams;r.append("action","search_action"),r.append("keyword",e),fetch("/wp-admin/admin-ajax.php",{method:"POST",body:r,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){return e.text()})).then((function(e){var r=(new DOMParser).parseFromString(e,"text/html"),n=r.querySelectorAll("li").length;t.innerHTML="<p>Total projects found: ".concat(n,"</p>"),document.querySelectorAll('[data-content-type="project"]').forEach((function(e){return e.classList.remove("explore-match")})),Array.from(r.querySelectorAll("li[data-post-id]")).map((function(e){return e.getAttribute("data-post-id")})).forEach((function(e){var t=document.querySelector('[data-content-type="project"][data-post-id="'.concat(e,'"]'));t&&t.classList.add("explore-match")}))})).catch((function(e){console.error("Error:",e),t.innerHTML="<p>There was an error processing your request.</p>"}))}}])&&h(t.prototype,r),n&&h(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function m(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(o=n.key,i=void 0,i=function(e,t){if("object"!==v(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==v(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(o,"string"),"symbol"===v(i)?i:String(i)),n)}var o,i}var g=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.setupImages()}var t,r,n;return t=e,(r=[{key:"setupImages",value:function(){var e=this;document.addEventListener("click",(function(t){var r=t.target.closest("[data-image-enlarge]"),n=t.target.closest(".close");r&&e.enlargeImage(r),n&&e.closeImage()}))}},{key:"enlargeImage",value:function(e){var t=document.querySelector(".panel-image");if(t){var r=e.querySelector("img"),n=e.querySelector(".caption");if(r){var o=r.src,i=t.querySelector(".image");i&&(i.style.backgroundImage="url(".concat(o,")"))}if(n){var a=n.innerHTML,c=t.querySelector(".caption");c&&(c.innerHTML=a,c.classList.remove("hidden"))}else{var u=t.querySelector(".caption");u&&(u.innerHTML="",u.classList.add("hidden"))}t.classList.remove("hidden")}}},{key:"closeImage",value:function(){var e=document.querySelector(".panel-image");if(e){var t=e.querySelector(".image"),r=e.querySelector(".caption");t&&(t.style.backgroundImage=""),r&&(r.innerHTML="",r.classList.add("hidden")),e.classList.add("hidden")}}}])&&m(t.prototype,r),n&&m(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();o(),new l,new d,new y,new g,document.addEventListener("keydown",(function(e){if("Escape"===e.key){var t=document.querySelectorAll('.panel[data-depth="2"]:not(.hidden)'),r=document.querySelectorAll('.panel[data-depth="1"]:not(.hidden)');t.length>0?t.forEach((function(e){return e.classList.add("hidden")})):r.length>0&&r.forEach((function(e){return e.classList.add("hidden")}))}}))},646:()=>{},38:()=>{}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,r,o,i)=>{if(!r){var a=1/0;for(s=0;s<e.length;s++){for(var[r,o,i]=e[s],c=!0,u=0;u<r.length;u++)(!1&i||a>=i)&&Object.keys(n.O).every((e=>n.O[e](r[u])))?r.splice(u--,1):(c=!1,i<a&&(a=i));if(c){e.splice(s--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[r,o,i]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={532:0,298:0,367:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,i,[a,c,u]=r,l=0;if(a.some((t=>0!==e[t]))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(u)var s=u(n)}for(t&&t(r);l<a.length;l++)i=a[l],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(s)},r=self.webpackChunkkudos_starter_theme=self.webpackChunkkudos_starter_theme||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.O(void 0,[298,367],(()=>n(470))),n.O(void 0,[298,367],(()=>n(646)));var o=n.O(void 0,[298,367],(()=>n(38)));o=n.O(o)})();