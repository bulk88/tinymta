!function(){if(history.pushState){var e,t,h,E,k,N,S,s,d,c=document.documentElement,j=c.firstChild,x={},m=0,T=location.pathname,g=location.hash,A=location.origin,O=q(location.pathname),I=[,[0,5],,[3,8],[2,7],[0,4],[0,4],[1,6],[,9],[]],L=["//backend-unified.mylirr.org","//otp-mta-prod.camsys-apps.com","//collector-otp-prod.camsys-apps.com",["//tiles1.tinymta.us.to","//tiles2.tinymta.us.to"],"/rstop.htm","/rtrain.htm","/stop.htm","/status.htm","/tileMap.htm",["/mapTileBackground.png","/zoom_out.png","/zoom_in.png","/transparentTile.gif"]],M=document.createElement("style"),u=document.createElement("body");function q(e){var t;switch(e){case"/tileMap.htm":t=8;break;case"/stations.htm":t=7;break;case"/mn/stations.htm":t=6;break;case"/li/stations.htm":t=5;break;case"/":t=4;break;case"/stop.htm":t=3;break;case"/status.htm":t=2;break;case"/rstop.htm":t=1;break;case"/rtrain.htm":t=0;break;default:t=9}return t}function n(e){var t,n,o,i,a,r,l="touchstart"===e.type;if("A"===(e="FONT"===(e=e.target).nodeName?e.parentNode:e).nodeName&&(l||!e.tmts)&&e.origin===A&&(t=e.hash,(u="/"==(u=e.pathname).charAt(0)?u:"/"+u)!==location.pathname)){if((u="/"==u.charAt(0)?u:"/"+u).length>="/jsrdt.htm".length&&u.lastIndexOf("/jsrdt.htm")===u.length-"/jsrdt.htm".length&&(e.pathname=u=u.replace("/jsrdt.htm","/js/rt.htm")),(o=q(u))<4&&(t=t.slice(1),window.S={t:Date.now(),s:t,f:function(e){a?e(a):r=e}},fetch(3===o?"//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:"+t.slice(0,3):2===o?"//collector-otp-prod.camsys-apps.com/realtime/gtfsrt/ALL/alerts?type=json&apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP":1===o?"//backend-unified.mylirr.org/arrivals/"+t:"//backend-unified.mylirr.org/locations/"+t+"?geometry=NONE",1<o?{}:{headers:{"accept-version":"3.0"}}).then(function(e){r?r(e):a=e}),2===o)&&(R=0,j.appendChild(document.createElement("script")).src="routes.js"),8===o&&(n=function(e){window.S={t:Date.now(),s:t,pt:o,pr:e.body},e.js(e.body,t)}),!(i=x[u])||i.p1&&void 0===N){var s,d,p,h,c,m,f,g=u,u=o,C=n,v={},w=T,b=O;try{-1!=g.indexOf("/stations")&&(v.p1=m=1,void 0===N?(onpopstate.o=c=function(e,t){t?j.removeChild(h):N=e||0,h.onerror=0,onpopstate.o=0,f?f():f=1},j=document.documentElement.firstChild,(h=document.createElement("script")).onerror=function(){c(0,1)},h.src="1p.js",j.appendChild(h)):f=1),(s=I[u])&&(d=s[0],(p=L[d])&&p.length&&(p=V(d,0)),(v.pc=p)&&(E&&j.removeChild(E),E=j.appendChild(p)),d=s[1],(p=L[d])&&p.length&&(pFIdxToFree=d,p=V(d,1)),v.pf=p)&&(k&&j.removeChild(k),k=j.appendChild(p)),fetch(g,{},1).then(function(e){e.text().then(function(e){var t,n,o,i,a,r;-1!=(t=e.indexOf("<style>"))?(i=e.slice(t+="<style>".length,t=e.indexOf("</style>",t)),t+=8,o=0,":root{color-scheme:light dark}"!=i||(o=S)||(a=1),o||((o=M.cloneNode(0)).textContent=i,a&&(S=o)),v.style=o):t=0,-1!=(scriptStart=e.indexOf("<script>",t))&&(i=y,a=window.onpageshow,window.onpageshow=null,n=e.indexOf("<\/script>",scriptStart+"<script>".length),Function(e.slice(scriptStart+"<script>".length,n))(),(r=(o=v.js=onhashchange).body)&&delete o.body,v.y=y,v.pg=window.onpageshow,y=i,window.onpageshow=a,onhashchange=null),-1==e.indexOf("No javascript",t)&&(e=-1!=scriptStart?e.slice(t,scriptStart)+e.slice(n+"<\/script>".length):e.slice(t),(o=document.createElement("html")).innerHTML=e,v.body=o=o.lastElementChild,r&&r(o),"SCRIPT"==(e=o.lastElementChild).nodeName)&&o.removeChild(e),!m||f?(x[g]=v,C&&C(v),D(w,g,b)):f=function(){x[g]=v,C&&C(v),D(w,g,b)}})})}catch(e){}}else n&&n(i);e.tmts=l}}function D(r,l,s){(this.requestIdleCallback||this.requestAnimationFrame||function(e){setTimeout(e,40)})(function(){var e,t,n,o,i=location.origin.length,a=x[r];if(e=a.pf)if("DIV"===e.nodeName){for(n=e.firstChild;n;){if(o=n.nextElementSibling,n.href.slice(i)==l){e.removeChild(n);break}n=o}e.firstChild||((t=e.parentNode)&&t.removeChild(e),delete a.pf,k===e&&(k=null),L[I[s][1]]=null)}else e.href.slice(i)==l&&((t=e.parentNode)&&t.removeChild(e),delete a.pf,k===e&&(k=null),L[I[s][1]]=null)})}function V(e,t){var n,o,i,a,r,l=L[e];if("string"==typeof l)i=(t?d:s).cloneNode(0),".png"!=(r=l.slice(-4))&&".gif"!=r||(i.rel="preload",i.as="image"),i.href=l;else for(i=document.createElement("div"),n=0;n<l.length;n++)o=(t?d:s).cloneNode(0),".png"!=(r=(a=l[n]).slice(-4))&&".gif"!=r||(o.rel="preload",o.as="image"),o.href=a,i.appendChild(o);return L[e]=i}function o(e){+(e=[,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,0,1,2,3,4,5,6,7,8,9,,,,,,,,2,,,3,,,4,,,5,,,6,,,7,,,,8,,,9,,,,,,,,,,2,,,3,,,4,,,5,,,6,,,7,,,,8,,,9][e.keyCode])===e&&(e=document.querySelector('[accesskey="'+e+'"]'))&&e.click()}for(this.fetch||this.f||(f=1,j.appendChild(document.createElement("script")).src="/f.js"),!function(){var e,t,n={body:document.body,style:j.getElementsByTagName("style")[0],y:this.y},o=[n,n.body,T+g,O],i=j.querySelectorAll('link[rel="preconnect"]');if(i.length){if(1<i.length){for(t=document.createElement("div"),e=0;e<i.length;e++)t.appendChild(i[e]);j.appendChild(t)}else t=i[0];t="DIV"===(E=L[I[O][0]]=n.pc=t).nodeName?E.firstChild:E,(s=t.cloneNode(0)).removeAttribute("href")}else alert("bug");if((i=j.querySelectorAll('link[rel="prefetch"]')).length){if(1<i.length){for(t=document.createElement("div"),e=0;e<i.length;e++)t.appendChild(i[e]);j.appendChild(t)}else t=i[0];t="DIV"===(E=L[I[O][1]]=n.pf=t).nodeName?E.firstChild:E,(d=t.cloneNode(0)).removeAttribute("href")}else alert("bug");(el_fn=window.onpageshow)?n.pg=el_fn:window.onpageshow=function(e){n.pg=e,window.onpageshow=e},x[T]=n,h=[o],history.state!==m&&history.pushState(m,0,location.href)}(),addEventListener("touchstart",n,{passive:!0}),addEventListener("mousedown",n,{passive:!0}),addEventListener("click",function(e){var t,n,o,i,a,r,l,s,d,p=e.target;"A"===(p="FONT"===p.nodeName?p.parentNode:p).nodeName&&p.origin===A&&((o="/"==(o=p.pathname).charAt(0)?o:"/"+o).length>="/jsrdt.htm".length&&o.lastIndexOf("/jsrdt.htm")===o.length-"/jsrdt.htm".length&&(p.pathname=o=o.replace("/jsrdt.htm","/js/rt.htm")),a=q(o),(t=x[o])?(i=p.hash,l=o===location.pathname&&i!=location.hash,(s=(r=h[m])[0]).p1&&N&&O!==a&&N({}),l||(c.removeChild(r[1]),(n=s.style)!==(s=t.style)&&(n&&j.removeChild(n),s)&&j.appendChild(s),E!==(s=t.pc)&&(E&&j.removeChild(E),E=s)&&j.appendChild(s),k!==(s=t.pf)&&(k&&j.removeChild(k),k=s)&&j.appendChild(s)),r=h[++m]=[],(d=(s=window.S)&&s.pr&&(window.S=0,s.pt===a)&&s.s===i&&Date.now()-s.t<3e3?s.pr:d)||(n=(n=this.T)&&n.GC)&&n(),h.length=m+1,d?r[1]=c.appendChild(d):t.body?r[1]=l?t.body:c.appendChild(t.body):r[1]=c.appendChild(u.cloneNode(0)),history.pushState(m,0,p.href),l||(e.preventDefault(),y=t.y,window.onpageshow=t.pg,(s=t.js)&&!d&&s(),T=o,g=i,8==(O=a)&&t.pf&&(D(o,"/mapTileBackground.png",8),D(o,"/zoom_out.png",8),D(o,"/zoom_in.png",8),D(o,"/transparentTile.gif",8))),r[0]=t,r[2]=o+i,r[3]=a):console.log("on click no cache spa ent"))}),onpopstate=function(e){var t,n,o,i,a=location.pathname,r=location.hash;null!==(e=e.state)&&(T==a&&g!=r?(g=r,console.log("spa leave 1")):e===m||e>=h.length?(console.log("spa leave 2"),location.reload()):(n=(t=h[m])[0],i=(o=h[e])[3],T=a,g=r,a=o[0],n.p1&&N&&O!==i&&N({}),c.removeChild(t[1]),(r=n.style)!==(t=a.style)&&(r&&j.removeChild(r),t)&&j.appendChild(t),E!==(t=a.pc)&&(E&&j.removeChild(E),E=t)&&j.appendChild(t),k!==(t=a.pf)&&(k&&j.removeChild(k),k=t)&&j.appendChild(t),m=e,O=i,c.appendChild(o[1]),y=a.y,onpageshow=r=a.pg,r&&r({persisted:1})))},addEventListener("keyup",o,0),addEventListener("keypress",o,0),e=j.firstChild;e;)"preconnect"===e.rel&&((t=document.createElement("link")).rel="dns-prefetch",t.href=e.href,j.appendChild(t)),e=e.nextElementSibling}this.ScriptEngineMajorVersion&&(ScriptEngineMajorVersion()<5||5===ScriptEngineMajorVersion()&&ScriptEngineMinorVersion()<5)&&(onload=function(){for(var e,t,n,o,i=document.links,a=i.length,r=0;r<a;r++)e=(t=i[r]).pathname,n?n===e&&(t.pathname=o):(t=e.length-8,"s"!==(o=e.charAt(t))&&"a"!==o||!~e.indexOf("s"===o?"stop":"atus",t)||(o=(n=e).slice(0,-4)+"ie50.htm",r--));onload=null})}();