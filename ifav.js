(function(){
function DRAW_VER() { return 111; };
  var favDiv;
  var config;
  var prefixFn;
//https://stackoverflow.com/questions/45576748/how-can-i-detect-rendering-support-for-emoji-in-javascript
  var dont_have_clr_emoji;
  var ctx = document.createElement("canvas");
  var prefix =
/*STARTINSERTDRAW*/
"(function(e,t){function h(e,t){e.innerHTML=t.join(\",\")+\"&nbsp;\",--s||((e=e.parentNode).style.minHeight=\"\",localStorage.getItem(\"fh\")!=(t=e.clientHeight)&&localStorage.setItem(\"fh\",t))}function d(e,s){\"r\"==e.charAt()?(e=e.slice(1),fetch(\"//backend-unified.mylirr.org/arrivals/\"+e,{headers:{\"accept-version\":\"3.0\"}}).then(function(e){200==e.status&&e.json().then(function(e){var t,n,o,a=0,r=[],i=[],c=Date.now()/1e3;for(e=e.arrivals;a<e.length&&a<4;a++)t=e[a],n=new Date(1e3*(n=t.time)).toLocaleTimeString().replace(/:00 ([PA])M/,\"$1\")+\" \"+Math.ceil((n-c)/60)+\"m\"+((n=(n=t.status.otp)&&n/60|0)?0<n?\"-E\"+n:\"-L\"+-n:\"\")+\"-Tk\"+(t.track||\"?\")+\"-<font color=\"+(\"string\"==typeof(n=C[o=t.branch])?n:C[o]=v[0|n])+\">\"+(\"HM\"==(n=(n=(n=t.stops)[n.length-1]).charAt()<58?n.slice(1):n)?\"CH\":\"NYK\"==n?\"NYP\":n)+\"</font>\",(\"E\"==t.direction?i:r).push(n);h(s,i.concat(r))})})):(e=e.slice(1,4),fetch(\"//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:\"+e).then(function(e){200==e.status&&e.json().then(function(e){var t,n,o,a,r,i,c,d=0,l={};if(e=e[0]){for(;o=e.groups[d++];)for(r=o.headsign,n=0;a=o.times[n++];)a.shortRouteName=o.route.shortName,a.timestamp>t&&(t=a.timestamp),(l[r]=l[r]||[]).push(a);for(d in l)l[d].sort(function(e,t){return e.departureFmt<t.departureFmt?-1:e.departureFmt>t.departureFmt?1:0});for(d in t=[],f=Date.now(),l)for(o=l[d],d=0;(a=o[d++])&&d<4;)t.push((\"1\"==a.directionId?\"S\":\"N\")+(i=a.shortRouteName,c=void 0,\"<font color=\")+(c=\"string\"!=typeof(c=g[i])?g[i]=u[0|c]:c)+\">\"+i+\"</font>\"+function(e,t){for(e=e.split(/[: T-]/),t=0;t<e.length;t++)e[t]=+e[t];return\"-\"+(0|Math.abs((new Date(e[0],e[1]-1,e[2],e[3]||0,e[4]||0,e[5]||0,0)-f)/1e3)/60)}(a.departureFmt))}h(s,t)})}))}function l(e,t,n){n-1?setTimeout(d,0,e,t):((n=this.w)||((n=this.w=function(){for(var e=0;e<n.length;)d(n[e++],n[e++]);this.w=void 0}).arr=[]),(n=n.arr)[n.length]=e,n[n.length]=t)}var s,f=performance.now(),p=document.createElement(\"label\"),m=p.appendChild(document.createElement(\"input\"));m.type=\"checkbox\",m=p.cloneNode(1),e[3]?((v=document.createElement(\"img\")).setAttribute(\"style\",\"height:1em;width:1em;vertical-align:middle;\"),(u=v.cloneNode(0)).src=\"ht.png\",(g=v.cloneNode(0)).src=\"hg.svg\",v.src=\"dp.png\"):(v=0,u=document.createTextNode(\"❤️\"),g=document.createTextNode(\"⌛ \")),p.appendChild(u),m.appendChild(g),window.E=v,console.log(\"emj whole ld \"+(performance.now()-f)),function e(t,n,o){var a,r,i,c=document.createElement(\"div\");c.appendChild(p).firstChild.checked=t[1];c.appendChild(m).firstChild.checked=t[1]&&t[2];if(s=t.length-4)for(t[2]&&(a=localStorage.getItem(\"fh\"))&&(c.style.minHeight=a+\"px\"),i=4;i<10&&(a=t[i]);i++)(r=c.appendChild(document.createElement(\"a\"))).href=(\"r\"==a[1].charAt()?\"rstop.htm#\":\"stop.htm#\")+a[1].slice(1),r.textContent=a[0],c.appendChild(document.createTextNode(\" \")),t[2]&&((r=c.appendChild(document.createElement(\"span\"))).style.display=\"inline\",(o?l:d)(a[1],r,o));else c.appendChild(document.createTextNode(t[1]?\"No history yet\":\"History off\"));window.favDiv=c;c.draw_fav=e;if(n)n(c);else{if(a=document.body,r=localStorage.getItem(\"as\"))for(i=a.lastChild;i=i.previousSibling;)if(\"DIV\"===i.nodeName){i.style.minHeight=r;break}a.appendChild(c)}}(e,t,!this.fetch);var u=[\"00933c\",\"ff6319\",\"fccc0a\",\"286ded\",\"6d6e71\",\"ee352e\",\"0078c6\",\"996633\",\"b933ad\"],g={B:1,D:1,F:1,FX:1,M:1,R:2,Q:2,W:2,N:2,E:3,A:3,C:3,GS:4,FS:4,H:4,2:5,1:5,3:5,SI:6,SIR:6,J:7,Z:7,\"7X\":8,7:8,G:\"6cbe45\",L:\"a7a9ac\"},v=[\"ee0034\",\"006ec7\",\"4d5357\"],C={PJ:1,HH:1,CI:2,12:2,BY:\"00985f\",HU:\"009b3a\",WH:\"00a1de\",OB:\"00af3f\",MK:\"00b2a9\",HA:\"066afe\",11:\"60269e\",FR:\"6e3219\",RK:\"a626aa\",PW:\"c60c30\",HM:\"ce8e00\",LB:\"ff6319\"}})("
/*ENDINSERTDRAW*/
;

try {
  ctx = ctx.getContext("2d");
  ctx.canvas.width = ctx.canvas.height = 1;
  ctx.fillText("\ud83d\udca7", -4, 4);
  dont_have_clr_emoji = ctx.getImageData(0, 0, 1, 1).data[2]; //RGBA, [2] is blue
} catch (e) {}

  dont_have_clr_emoji = (!dont_have_clr_emoji)|0;
  if(navigator.userAgent == 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0') {
    dont_have_clr_emoji = 1;
  }
  localStorage.setItem("fav", prefix + '[' + DRAW_VER() + ',1,0,'+dont_have_clr_emoji+'])');
  config = [DRAW_VER(), 1, 0, dont_have_clr_emoji];

if(location.pathname == '/') {
  prefixFn = new Function(
  /*args  */ prefix.slice(10, prefix.indexOf(")", 10)).split(","),
  /*fnbody*/ prefix.slice(15,prefix.lastIndexOf('}'))
  );

  //fav obj ver upgrade happpened
  favDiv = this.favDiv;
  if (favDiv) {
    prefixFn(config, function(newFDiv) {
      //draw first for UI latency, adding handlers can wait some MS
      favDiv.parentNode.replaceChild(newFDiv, favDiv);
      this.F(prefix, [newFDiv, config]);
    });
  }
  //virgin user/browser, draw favs very late first time ever
  else {
    favDiv = document.body.lastChild;
    while (favDiv) { //last el is NEVER it
      if (favDiv.nodeName == "STYLE") {
        break;
      }
      favDiv = favDiv.previousElementSibling; //eventually null
    }
    if (favDiv) {
      prefixFn(config, function(newFDiv) {
        //draw first for UI latency, adding handlers can wait some MS
        favDiv.parentNode.insertBefore(newFDiv, favDiv);
        this.F(prefix, [newFDiv, config]);
      });
    }
  }
} else {
  this.F(prefix, [1, config]);
}

})();