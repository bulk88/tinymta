!function(){var e,t,E,p,h,N,d,j,S,O,x,A,T,L,i,q,M,F,I,m=document.documentElement,z=m.firstChild;function D(){for(var e,t=0;t<M.length;t++)(e=M[t])[1]||(e[1]=e[0].cloneNode(0))}function V(e){var t;switch(e){case"/tileMap.htm":t=8;break;case"/stations.htm":t=7;break;case"/mn/stations.htm":t=6;break;case"/li/stations.htm":t=5;break;case"/":t=4;break;case"/stop.htm":t=3;break;case"/status.htm":t=2;break;case"/rstop.htm":t=1;break;case"/rtrain.htm":t=0;break;default:t=9}return t}function n(e){var n,t,o,i,a,r,s,l="touchstart"===e.type;if("A"===(e="FONT"===(e=e.target).nodeName?e.parentNode:e).nodeName&&(l||!e.tmts)&&e.origin===j&&(n=e.hash,(v="/"==(v=e.pathname).charAt(0)?v:"/"+v)!==location.pathname)){if(10<=(v="/"==v.charAt(0)?v:"/"+v).length&&v.lastIndexOf("/jsrdt.htm")===v.length-10&&(e.pathname=v=v.replace("/jsrdt.htm","/js/rt.htm")),(i=V(v))<4&&(n=n.slice(1),window.S={t:Date.now(),s:n,f:function(e){r?e(r):s=e}},fetch(3===i?"//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:"+n.slice(0,3):2===i?"//collector-otp-prod.camsys-apps.com/realtime/gtfsrt/ALL/alerts?type=json&apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP":1===i?"//backend-unified.mylirr.org/arrivals/"+n:"//backend-unified.mylirr.org/locations/"+n+"?geometry=NONE",1<i?{}:T).then(function(e){var t,n;s?s(e):r=200==e.status?(e.json().then(function(e){t?t(e):n=e}),{status:200,json:function(){return{then:function(e){n?setTimeout(e,0,n):t=e}}}}):e}),2===i)&&(R=0,z.appendChild(document.createElement("script")).src="routes.js"),8===i&&(t=function(e,t){t?o.pr=t:(window.S=o={t:Date.now(),s:n,pt:i,pr:e.body},e.js(0,n))}),!(a=E[v])||a.p1&&void 0===A){var c,p,h,d,m,f,u,g=v,v=i,w=t,C={},k=N,b=S;try{-1!=g.indexOf("/stations")&&(C.p1=f=1,void 0===A?(onpopstate.o=m=function(e,t){t?z.removeChild(d):A=e||0,d.onerror=0,onpopstate.o=0,u?u():u=1},z=document.documentElement.firstChild,(d=document.createElement("script")).onerror=function(){m(0,1)},d.src="1p.js",z.appendChild(d)):u=1),(c=L[v])&&(p=c[0],(h=q[p])&&h.length&&(h=B(p,0)),O=Y(O,C.pc=h),p=c[1],(h=q[p])&&h.length&&(h=B(p,1)),x=Y(x,C.pf=h),F(D)),fetch(g,{},1).then(function(e){e.text().then(function(e){var t,n,o,i,a,r,s;-1!=(t=e.indexOf("<style>"))?(a=e.slice(t+=7,t=e.indexOf("</style>",t)),t+=8,i=0,":root{color-scheme:light dark}"!=a||(i=I)||(r=1),i||(i=M[0][1],M[0][1]=0,F(D),i.textContent=a,r&&(I=i)),C.style=i):t=0,-1!=(n=e.indexOf("<script>",t))&&(a=y,r=window.onpageshow,window.onpageshow=null,o=e.indexOf("<\/script>",n+8),Function(e.slice(n+8,o))(),(s=(i=C.js=onhashchange).body)&&delete i.body,C.y=y,C.pg=window.onpageshow,y=a,window.onpageshow=r,onhashchange=null,w)&&w(C),-1==e.indexOf("No javascript",t)&&(e=-1!=n?e.slice(t,n)+e.slice(o+9):e.slice(t),i=M[2][1],M[2][1]=0,F(D),i.innerHTML=e,C.body=i=i.lastElementChild,w&&w(0,i),s)&&s(i),!f||u?(E[g]=C,P(k,g,b)):u=function(){E[g]=C,P(k,g,b)}})})}catch(e){}}else t&&t(a);e.tmts=l}}function P(r,s,l){i[s]=1,F(function(){var e,t,n,o,i=location.origin.length,a=E[r];if(e=a.pf)if("DIV"===e.nodeName){for(n=e.firstChild;n;){if(o=n.nextElementSibling,n.href.slice(i)==s){e.removeChild(n);break}n=o}e.firstChild||((t=e.parentNode)&&t.removeChild(e),delete a.pf,x===e&&(x=null),q[L[l][1]]=null)}else e.href.slice(i)==s&&((t=e.parentNode)&&t.removeChild(e),delete a.pf,x===e&&(x=null),q[L[l][1]]=null)})}function r(e,t){var n,o;return e&&i[t]?0:((o=(n=M[5+e])[1])?n[1]=0:o=n[0].cloneNode(0),e?".png"!=(n=t.slice(-4))&&".gif"!=n||(o.rel="preload",o.as="image"):t.indexOf("//tiles")||(o.crossOrigin=null),o.href=t,o)}function B(e,t){var n,o,i,a=q[e];if("string"==typeof a)i=r(t,a);else{for(i=M[3+t][1],n=M[3+t][1]=0;n<a.length;n++)(o=r(t,a[n]))&&i.appendChild(o);i.firstChild||(i=0)}return q[e]=i}function Y(e,t){return e!==t&&(e&&t?z.replaceChild(t,e):(e&&z.removeChild(e),t&&z.appendChild(t))),t}function o(e){32===e.keyCode&&"INPUT"===e.target.nodeName||+(e=[,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,0,1,2,3,4,5,6,7,8,9,,,,,,,,2,,,3,,,4,,,5,,,6,,,7,,,,8,,,9,,,,,,,,,,2,,,3,,,4,,,5,,,6,,,7,,,,8,,,9][e.keyCode])===e&&(e=document.querySelector('[accesskey="'+e+'"]'))&&e.click()}for(history.pushState&&(E={},h=0,N=location.pathname,d=location.hash,j=location.origin,S=V(location.pathname),T={headers:{"accept-version":"3.0"}},L=[,[0,5],,[3,8],[2,7],[0,4],[0,4],[1,6],[,9],[]],i={},q=["//backend-unified.mylirr.org","//otp-mta-prod.camsys-apps.com","//collector-otp-prod.camsys-apps.com",["//tiles1.tinymta.us.to","//tiles2.tinymta.us.to"],"/rstop.htm","/rtrain.htm","/stop.htm","/status.htm","/tileMap.htm",["/bk.png","/zo.png","/zi.png","/ts.gif"]],M=["style","body","html","div",,"link",0],F=this.requestIdleCallback||(this.requestAnimationFrame?function(e){requestAnimationFrame(function(){requestAnimationFrame(e)})}:function(e){return setTimeout(e,40)}),this.fetch||this.f||(f=1,z.appendChild(document.createElement("script")).src="/f.js"),function(){for(var e,t,n,o,i={body:document.body,style:z.getElementsByTagName("style")[0],y:this.y},a=[i,i.body,N+d,S],r=0;r<M.length;r++)t=(e=M[r])?document.createElement(e):t.cloneNode(0),M[r]=[t];if(M[6][0].rel="prefetch",(t=M[5][0]).rel="preconnect",t.crossOrigin="anonymous",D(),(n=z.querySelectorAll('link[rel="preconnect"]')).length){if(1<n.length){for(o=M[3][1],r=M[3][1]=0;r<n.length;r++)o.appendChild(n[r]);z.appendChild(o)}else o=n[0];O=q[L[S][0]]=i.pc=o}if((n=z.querySelectorAll('link[rel="prefetch"]')).length){if(1<n.length){for(o=M[4][1],r=M[4][1]=0;r<n.length;r++)o.appendChild(n[r]);z.appendChild(o)}else o=n[0];x=q[L[S][1]]=i.pf=o}F(D),(el_fn=window.onpageshow)?i.pg=el_fn:window.onpageshow=function(e,t){i.pg=t,window.onpageshow=t},E[N]=i,p=[a],history.state!==h&&history.replaceState(h,0,location.href)}(),addEventListener("touchstart",n,{passive:!0}),addEventListener("mousedown",n,{passive:!0}),addEventListener("click",function(e){var t,n,o,i,a,r,s,l,c=e.target;"A"===(c="FONT"===c.nodeName?c.parentNode:c).nodeName&&c.origin===j&&(10<=(n="/"==(n=c.pathname).charAt(0)?n:"/"+n).length&&n.lastIndexOf("/jsrdt.htm")===n.length-10&&(c.pathname=n=n.replace("/jsrdt.htm","/js/rt.htm")),i=V(n),(t=E[n])?(o=c.hash,r=n===location.pathname&&o!=location.hash,(s=(a=p[h])[0]).p1&&A&&S!==i&&A({},N),r||(m.removeChild(a[1]),Y(s.style,t.style),O=Y(O,t.pc),x=Y(x,t.pf)),a=p[++h]=[],(s=window.S)&&s.pr&&(window.S=0,s.pt===i)&&s.s===o&&Date.now()-s.t<3e3&&(l=s.pr),8!=i&&(s=(s=this.T)&&s.GC)&&s(),p.length=h+1,l?a[1]=m.appendChild(l):t.body?a[1]=r?t.body:m.appendChild(t.body):(a[1]=m.appendChild(M[1][1]),M[1][1]=0,F(D)),history.pushState(h,0,c.href),r||(e.preventDefault(),y=t.y,window.onpageshow=t.pg,(s=t.js)&&!l&&s(),N=n,d=o,8==(S=i)&&t.pf&&(P(n,"/bk.png",8),P(n,"/zo.png",8),P(n,"/zi.png",8),P(n,"/ts.gif",8))),a[0]=t,a[2]=n+o,a[3]=i):console.log("on click no cache spa ent"))}),onpopstate=function(e){var t,n,o,i,a,r=location.pathname,s=location.hash;null===(e=e.state)?console.log("spa leave 3 "+r):N==r&&d!=s?(d=s,console.log("spa leave 1 "+r)):e===h||e>=p.length?(console.log("spa leave 2 "+r),location.reload()):(n=(t=p[h])[0],i=(o=p[e])[3],a=o[0],n.p1&&A&&S!==i&&A({},N),N=r,d=s,m.removeChild(t[1]),Y(n.style,a.style),O=Y(O,a.pc),x=Y(x,a.pf),h=e,S=i,m.appendChild(o[1]),y=a.y,onpageshow=r=a.pg,r&&r({persisted:1}))}),this.addEventListener&&(addEventListener("keyup",o,0),addEventListener("keypress",o,0)),e=z.firstChild;e;)"preconnect"===e.rel&&((t=document.createElement("link")).rel="dns-prefetch",t.href=e.href,z.appendChild(t)),e=e.nextElementSibling;this.ScriptEngineMajorVersion&&(ScriptEngineMajorVersion()<5||5===ScriptEngineMajorVersion()&&ScriptEngineMinorVersion()<5)&&(onload=function(){for(var e,t,n,o,i=document.links,a=i.length,r=0;r<a;r++)e=(t=i[r]).pathname,n?n===e&&(t.pathname=o):(t=e.length-8,"s"!==(o=e.charAt(t))&&"a"!==o||!~e.indexOf("s"===o?"stop":"atus",t)||(o=(n=e).slice(0,-4)+"ie50.htm",r--));onload=null})}();