!function(){var e,t=document.createElement("canvas"),o='(function(c){var f=function(e,t,n,o,a){function s(e,t,n){e.innerHTML=t.join(",")+"&nbsp;",--N||(E.style.minHeight="",localStorage.getItem("fh")!=(n=E.clientHeight)&&localStorage.setItem("fh",n))}function c(e,p){"r"==e.charAt()?(e=e.slice(1),fetch("//backend-unified.mylirr.org/arrivals/"+e,{headers:{"accept-version":"3.0"}}).then(function(e){200==e.status&&e.json().then(function(e){var t,n,o,a,i=[],c=[];for(e=e.arrivals,n=0;n<e.length&&n<4;n++)t=e[n],o=new Date(1e3*(o=t.time)).toLocaleTimeString().replace(/:00 ([PA])M/,"$1")+" "+Math.ceil((o-(new Date).getTime()/1e3)/60)+"m"+((o=(o=t.status.otp)&&o/60|0)?0<o?"-E"+o:"-L"+-o:"")+"-Tk"+(t.track||"?")+"-<font color="+("string"==typeof(o=w[a=t.branch])?o:w[a]=g[0|o])+">"+("HM"==(o=(o=(o=t.stops)[o.length-1]).charAt()<58?o.slice(1):o)?"CH":"NYK"==o?"NYP":o)+"</font>",("E"==t.direction?c:i).push(o);s(p,c.concat(i))})})):(e=e.slice(1,4),fetch("//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:"+e).then(function(e){200==e.status&&e.json().then(function(e){var t,n,o,a,i,c,r,d=0,l={};if(e=e[0]){for(;o=e.groups[d++];)for(i=o.headsign,n=0;a=o.times[n++];)a.shortRouteName=o.route.shortName,a.timestamp>t&&(t=a.timestamp),(l[i]=l[i]||[]).push(a);for(d in l)l[d].sort(function(e,t){return e.departureFmt<t.departureFmt?-1:e.departureFmt>t.departureFmt?1:0});for(d in t=[],l)for(o=l[d],d=0;(a=o[d++])&&d<4;)t.push(("1"==a.directionId?"S":"N")+(c=a.shortRouteName,r=void 0,"<font color=")+(r="string"!=typeof(r=u[c])?u[c]=f[0|r]:r)+">"+c+"</font>"+function(e,t){for(e=e.split(/[: T-]/),t=0;t<e.length;t++)e[t]=+e[t];return"-"+(0|Math.abs((new Date(e[0],e[1]-1,e[2],e[3]||0,e[4]||0,e[5]||0,0)-new Date)/1e3)/60)}(a.departureFmt))}s(p,t)})}))}function r(e,t){setTimeout(function(){c(e,t)},0)}var d,l,p,m,h,f=["00933c","ff6319","fccc0a","2850ad","ee352e","6d6e71","b933ad","0078c6","996633"],u={FX:1,D:1,M:1,F:1,B:1,W:2,N:2,R:2,Q:2,E:3,C:3,A:3,2:4,1:4,3:4,H:5,GS:5,FS:5,7:6,"7X":6,SI:7,SIR:7,Z:8,J:8,G:"6cbe45",L:"a7a9ac"},g=["ee0034","006ec7","4d5357"],w={PJ:1,HH:1,CI:2,12:2,HA:"0039a6",BY:"00985f",HU:"009b3a",WH:"00a1de",OB:"00af3f",MK:"00b2a9",11:"60269e",FR:"6e3219",RK:"a626aa",PW:"c60c30",HM:"ce8e00",LB:"ff6319"},E=document.createElement("div"),C=E.appendChild(document.createElement("label")),N=0;if(e[3]?window.E||((h=document.createElement("img")).src="emoji_u2764.png",(p=h.style).height=p.width="1em",p.verticalAlign="middle",(p=h.cloneNode(0)).src="emoji_u231b.svg",(m=h.cloneNode(0)).src="emoji_u1f4a7.png",window.E=function(e){return 2==e?h:e?p:m.cloneNode(0)}):window.E=0,(d=document.createElement("input")).type="checkbox",d.checked=e[1],C.appendChild(d),C.appendChild(window.E&&window.E(2)||document.createTextNode("❤")),C=E.appendChild(document.createElement("label")),(d=document.createElement("input")).type="checkbox",d.checked=e[1]&&e[2],C.appendChild(d),C.appendChild(window.E&&window.E(1)||document.createTextNode("⌛ ")),C=e[1]?4==e.length?"No history yet":0:"History off")E.appendChild(document.createTextNode(C));else for(e[2]&&(C=localStorage.getItem("fh"))&&(E.style.minHeight=C+"px"),i=4;i<10&&(C=e[i]);i++)(d=E.appendChild(document.createElement("a"))).href=("r"==C[1].charAt()?"rstop.htm#":"stop.htm#")+C[1].slice(1),d.appendChild(document.createTextNode(C[0])),E.appendChild(document.createTextNode(" ")),e[2]&&(N++,(d=E.appendChild(document.createElement("span"))).style.display="inline",(a?r:c)(C[1],d));if((window.favDiv=E).draw_fav=t,n)n.parentNode.replaceChild(E,n),o(E);else{if(C=document.body,d=localStorage.getItem("as"))for(l=C.lastChild;l=l.previousSibling;)if("DIV"===l.nodeName&&!l.firstChild){l.style.minHeight=d+"px";break}C.appendChild(E)}};this.fetch?f(c,f):(this.w=function(){f(c,f)})})(';try{(t=t.getContext("2d")).canvas.width=t.canvas.height=1,t.fillText("💧",-4,4),e=t.getImageData(0,0,1,1).data[2]}catch(e){}e=0|!e,localStorage.setItem("fav",o+"[42,1,0,"+e+"])"),this.F(o,[1,[42,1,0,e]])}();