!function(){"use strict";var g=window,v=document,l=Array.prototype,e=Date;g.log=function(){try{console.log.apply(console,arguments)}catch(e){try{opera.postError.apply(opera,arguments)}catch(e){for(var t,n,r,o=0,i="";o<arguments.length;o++)if(i+=(r=arguments[o])+" | ",r&&"object"==typeof r){for(t in n="Obj(",r){n+=t+" ";try{n+=(r[t]+"").slice(0,20)+" | "}catch(e){n+="EXP "+e.message+" | "}}i+=n+")"}alert(i)}}},g.JSON||(g.JSON={parse:function(e){return new Function("return "+e)()}}),g.requestAnimationFrame||(g.requestAnimationFrame=g.mozRequestAnimationFrame||g.webkitRequestAnimationFrame||g.oRequestAnimationFrame||g.msRequestAnimationFrame||function(e){g.setTimeout(e,33)}),g.requestIdleCallback||(g.requestIdleCallback=function(e){requestAnimationFrame(function(){requestAnimationFrame(e)})}),l.forEach||(l.forEach=function(e,t){for(var n=0,r=this.length;n<r;++n)void 0!==this[n]&&e.call(t,this[n],n,this)}),l.find||(l.find=function(e){if(null===this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof e)throw new TypeError("callback must be a function");for(var t=Object(this),n=t.length>>>0,r=arguments[1],o=0;o<n;o++){var i=t[o];if(e.call(r,i,o,t))return i}}),l.push||(l.push=function(){for(var e=0;e<arguments.length;e++)this[this.length]=arguments[e];return this.length}),Object.values||(Object.values=function(e){var t,n=[];for(t in e)n.push(e[t]);return n}),l=e.prototype,l.toLocaleTimeString||(l.toLocaleTimeString=function(){var e=this.getHours(),t=e<12?"AM":"PM";return(e%12||12)+":"+this.getMinutes()+":"+this.getSeconds()+" "+t}),e.now||(e.now=function(){return(new e).getTime()}),!function(){var e,p;l=Function.prototype,l.call||(l.call=function(e,t,n,r){var o,i;return"object"==typeof e?(e[i="j"+((new Date).getTime()+m++)]=this,o=e[i](t,n,r),delete e[i]):o=this(t,n,r),o}),!function(){var s;l.apply||(s=[],l.apply=function(e,t){var n=this,r,o,i,a,c=t.length,l;if(!(r=s[c])){if(i=[],c)for(a=0;a<c;a++)i[a]="a["+a+"]";r=s[c]=eval("(function(){return function(f,a){return f("+i.join(",")+")}})();")}if(e&&"object"==typeof e){for(l="f"+Math.random();void 0!==e[l];)l="f"+Math.random();e[l]=r,o=e[l](n,t),delete e[l]}else o=r(n,t);return o})}(),"a".replace(/a/,function(){return""})&&(String.prototype.replace=function(s){return function(e,t){if("function"!=typeof t)return s.call(this,e,t);for(var n,r,o="",i=String(this),a=i.length,c=0,l=0;(r=e.exec(i.slice(l)))&&(n=r.index+l,o+=i.slice(c,n),c=n+r[0].length,r.push(n,i),o+=t.apply(null,r),void 0===e.lastIndex?l=c:e.lastIndex=c,"boolean"!=typeof e.global||e.global);)if(c===n){if(c===a)break;void 0===e.lastIndex?l=c:e.lastIndex=c,o+=i.charAt(++c)}return c<a&&(o+=i.slice(c,a)),o}}(String.prototype.replace)),g.encodeURIComponent||!function(){var o="0123456789ABCDEF";g.encodeURIComponent=function(e){var t="";"string"!=typeof e&&(e=String(e));for(var n,r=0;r<e.length;r++)-1=="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-".indexOf(e.charAt(r))?t+="%"+(n=e.charCodeAt(r),o.charAt(n>>4)+o.charAt(15&n)):t+=e.charAt(r);return t}}(),"/"!=location.pathname||g.E||0===g.E||(e=g.E=v.createElement("img"),e.setAttribute("style","height:1em;width:1em;vertical-align:middle;"),e.src="dp.png"),g.fetch||(p=v.documentElement.firstChild,p.children||(p.children=p.childNodes),p.children[1].nodeName.charCodeAt()<65&&function(){for(var e,t=p.firstChild;t;)e=t.nextSibling,(1!==t.nodeType||t.nodeName.charCodeAt()<65)&&p.removeChild(t),t=e}(),p.children[3].nodeName.charCodeAt()<65&&alert("c fail"),g.fetch=function(u,f,h){return f=f&&f.headers,{then:function(n,e){var r,o,i,a,c={then:function(e){void 0!==o?e(o,!!a):o=e}},l=g.XMLHttpRequest?new g.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");function s(e,t){t&&(g[a]=0),n({status:e,json:function(){if(h)throw"mismatch .json() vs .text() fetch hint";return c},text:function(){if(h)return i=1,c;throw"mismatch .json() vs .text() fetch hint"}})}try{if(d&&u.lastIndexOf(".htm")!=u.length-4)throw 0;if(l.open("get",u,1),!h)try{l.responseType="json"}catch(e){}if(l.onreadystatechange=function(){var e=l.readyState,t=l.status;2==e?t&&("boolean"==typeof l.withCredentials||l.getResponseHeader("Date")?s(l.status):r(n,1)):4==e&&(t?200==t&&(l=l.response||l.responseText,l=i||"object"==typeof l?l:JSON.parse(l),o?o(l):o=l):(d=1,r(n)))},e&&l.setRequestHeader("if-modified-since",new Date(0)),h||l.setRequestHeader("accept","application/json"),f)for(r in f)l.setRequestHeader(r,f[r]);r=this.then,l.send()}catch(t){if(a="j"+((new Date).getTime()+m++),f)for(r in l=[],f)l.push('"'+r+'":"'+f[r]+'"'),l="{"+l.join(",")+"}";else l=0;(t=v.createElement("script")).src="/jsp?url="+encodeURIComponent(u)+"&callback="+a+(l?"&headers="+encodeURIComponent(l):"")+(h?"&type=text":""),t.onerror=function(e){alert("JSONP network error "+(JSON.stringify?JSON.stringify(e):"")),t.parentNode.removeChild(t),s(0,1)},d=p,g[a]=function(e){t.parentNode.removeChild(t),s(e.http_code,1),o?o(e.contents,1):o=e.contents},d.appendChild(t)}}}});var d,m=0,t=g.navigator.userAgent,n=t.indexOf("MSIE "),r=0<n,o=(r&&(n+=5,t=t.slice(n,t.indexOf(";",n)).split("."),t=5==t[0]&&5<=t[1]||5<t[0],t||(n=v.styleSheets,n.length&&(n=n[n.length-1],n.addRule("table","display:inline")))),v.implementation&&v.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")?0:".png"),i=r&&!t?function(e){return e.appendChild(v.createElement("table")).appendChild(v.createElement("tbody")).appendChild(v.createElement("tr")).appendChild(v.createElement("td"))}:0,a=!v.createDocumentFragment||r&&!t?function(){return v.createElement("div")}:0,c;g.y?(y(o,i,a),g.w&&(w(),w=0),g.x&&x()):(c=onload,onload=function(){c&&c(),g.y&&y(o,i,a),g.w&&(w(g.ScriptEngineMajorVersion&&function(e){return{pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY}}),w=0),g.x&&x()})}()}();