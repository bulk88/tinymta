!function(){function i(){try{var e=localStorage.getItem("fav");return e&&0==e.indexOf(t+"[0,")?[0,JSON.parse(e.slice(t.length,e.length-1))]:(localStorage.setItem("fav",t+"[0,1,0])"),[1,[0,1,0]])}catch(e){return 0}}function d(e){return localStorage.setItem("fav",t+JSON.stringify(e)+")"),e}function r(e){(e=e.firstChild).firstChild.onchange=function(e){var t=i()[1];(e=e.target).checked?t[1]=1:(t[1]=0,t.length=3),(e=e.parentNode.parentNode).draw_fav(d(t),e.draw_fav,e,r)},e.nextSibling.firstChild.onchange=function(e){var t=i()[1];(e=e.target).checked?t[2]=t[1]=1:t[2]=0,(e=e.parentNode.parentNode).draw_fav(d(t),e.draw_fav,e,r)}}function e(e,t){var a,n,r,c=i(),o=3;if(c&&(c=c[1])[1]){for(r=c.length;o<r;o++)if((f=c[o])[1]==t){f[2]++,3<o&&f[2]>(n=c[o-1])[2]&&(c[o-1]=f,c[o]=n),a=1;break}a||(c[9==r?8:r]=[e,t,1]),d(c)}}var c='function(e,t,a,n,c){function o(e,f){"r"==e.charAt()?(e=e.slice(1),fetch("//backend-unified.mylirr.org/arrivals/"+e,{headers:{"accept-version":"3.0"}}).then(function(e){200==e.status&&e.json().then(function(e){for(var t,a,n=[],c=[],o=0;o<e.arrivals.length&&o<4;o++)t=e.arrivals[o],a=new Date(1e3*(a=t.time)).toLocaleTimeString().replace(":00 "," ").replace(" PM","P").replace(" AM","A")+" "+Math.ceil((a-(new Date).getTime()/1e3)/60)+"m"+((a=(a=t.status.otp)&&a/60|0)?0<a?"-E"+a:"-L"+-a:"")+"-Tk"+(t.track||"?")+"-<font class=b color="+{HA:"0039a6",HH:"006ec7",PJ:"006ec7",BY:"00985f",HU:"009b3a",WH:"00a1de",OB:"00af3f",MK:"00b2a9",12:"4d5357",CI:"4d5357",11:"60269e",FR:"6e3219",RK:"a626aa",PW:"c60c30",HM:"ce8e00",DN:"ee0034",NC:"ee0034",NH:"ee0034",WB:"ee0034",LB:"ff6319"}[t.branch]+">"+("HM"==(a=(a=(a=t.stops)[a.length-1]).charAt()<58?a.slice(1):a)?"CH":"NYK"==a?"NYP":a)+"</font>",("E"==t.direction?c:n).push(a);f.innerHTML=c.concat(n).join(",")+"&nbsp;"})})):(e=e.slice(1,4),fetch("//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:"+e).then(function(e){200==e.status&&e.json().then(function(e){var t,a,n,c,o,r,d,i=0,p={};if(e=e[0]){for(;n=e.groups[i++];)for(o=n.headsign,a=0;c=n.times[a++];)c.shortRouteName=n.route.shortName,c.timestamp>t&&(t=c.timestamp),(p[o]=p[o]||[]).push(c);for(i in p)p[i].sort(function(e,t){return e.departureFmt<t.departureFmt?-1:e.departureFmt>t.departureFmt?1:0});for(i in t=[],p)for(n=p[i],i=0;(c=n[i++])&&i<4;)t.push(("1"==c.directionId?"S":"N")+(r=c.shortRouteName,(d={4:"00933c",5:"00933c","5X":"00933c",6:"00933c","6X":"00a65c",A:"2850ad",C:"2850ad",E:"2850ad",G:"6cbe45",GS:"6d6e71",J:"996633",Z:"996633",L:"a7a9ac",7:"b933ad","7X":"b933ad",1:"ee352e",2:"ee352e",3:"ee352e",N:"fccc0a",Q:"fccc0a",R:"fccc0a",W:"fccc0a",B:"ff6319",D:"ff6319",F:"ff6319",FX:"ff6319",M:"ff6319"}[(d=void 0)||r])?"<font color="+d+">"+r+"</font>":r)+function(e,t){for(e=e.split(/[: T-]/),t=0;t<e.length;t++)e[t]=+e[t];return"-"+(0|Math.abs((new Date(e[0],e[1]-1,e[2],e[3]||0,e[4]||0,e[5]||0,0)-new Date)/1e3)/60)}(c.departureFmt))}f.innerHTML=t.join(",")+"&nbsp;"})}))}function r(e,t){setTimeout(function(){o(e,t)},0)}var d,p=document.createElement("div"),f=p.appendChild(document.createElement("label"));if((d=f.appendChild(document.createElement("input"))).type="checkbox",d.checked=e[1],(v=f.appendChild(document.createElement("font"))).color="red",v.appendChild(document.createTextNode("❤")),(d=(f=p.appendChild(document.createElement("label"))).appendChild(document.createElement("input"))).type="checkbox",d.checked=e[1]&&e[2],f.appendChild(document.createTextNode("⌛ ")),f=e[1]?3==e.length?"No history yet":0:"History off")p.appendChild(document.createTextNode(f));else for(i=3;i<9&&(f=e[i]);i++)(d=p.appendChild(document.createElement("a"))).href=("r"==f[1].charAt()?"/rstop.htm#":"/stop.htm#")+f[1].slice(1),d.appendChild(document.createTextNode(f[0])),p.appendChild(document.createTextNode(" ")),e[2]&&((d=p.appendChild(document.createElement("span"))).style.display="inline",(c?r:o)(f[1],d));(window.favDiv=p).draw_fav=t,a?(a.parentNode.replaceChild(p,a),n(p)):document.body.appendChild(p)}',t="(function(c){var f="+c+";f(c,f)})(",a,f;if(a=this.rF)for(f=0;f<a.length;f+=2)e(a[f],a[f+1]);this.rF={push:e};var n=location.pathname,o;"/"!=n.charAt(n.length-1)&&n.indexOf("/index")||(a=document.documentElement.firstChild,n=document.createElement("link"),n.rel="preload",n.as="script",n.href="routes.js",a.appendChild(n),n=document.createElement("link"),n.rel="prefetch",n.href="stop.htm",n=a.appendChild(n).cloneNode(0),n.href="rstop.htm",a.appendChild(n),window.onpageshow=function(e){e.persisted&&(e=this.favDiv)&&e.draw_fav(i()[1],e.draw_fav,e,r,1)},o=function(){var e=i(),t=this.favDiv,a,n;if(e)if(e[0])if(a=eval("("+c+")"),t)a(e[1],a,t,r);else{for(n=document.body.lastChild;n&&"STYLE"!=n.nodeName;)n=n.previousElementSibling;n&&a(e[1],a,n.parentNode.insertBefore(document.createElement("div"),n),r)}else t?r(t):alert("no div but saw fav draw code")},document.body?o():this.x=o)}();