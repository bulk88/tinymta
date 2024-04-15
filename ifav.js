(function(){
function DRAW_VER() { return 110; };
  var favDiv;
  var config;
  var prefixFn;
//https://stackoverflow.com/questions/45576748/how-can-i-detect-rendering-support-for-emoji-in-javascript
  var dont_have_clr_emoji;
  var ctx = document.createElement("canvas");
  var prefix =
/*STARTINSERTDRAW*/
"(function(e,t){function h(e,t){e.innerHTML=t.join(\",\")+\"&nbsp;\",--l||((e=e.parentNode).style.minHeight=\"\",localStorage.getItem(\"fh\")!=(t=e.clientHeight)&&localStorage.setItem(\"fh\",t))}function d(e,l){\"r\"==e.charAt()?(e=e.slice(1),fetch(\"//backend-unified.mylirr.org/arrivals/\"+e,{headers:{\"accept-version\":\"3.0\"}}).then(function(e){200==e.status&&e.json().then(function(e){var t,n,a,o=0,r=[],i=[],c=Date.now()/1e3;for(e=e.arrivals;o<e.length&&o<4;o++)t=e[o],n=new Date(1e3*(n=t.time)).toLocaleTimeString().replace(/:00 ([PA])M/,\"$1\")+\" \"+Math.ceil((n-c)/60)+\"m\"+((n=(n=t.status.otp)&&n/60|0)?0<n?\"-E\"+n:\"-L\"+-n:\"\")+\"-Tk\"+(t.track||\"?\")+\"-<font color=\"+(\"string\"==typeof(n=C[a=t.branch])?n:C[a]=v[0|n])+\">\"+(\"HM\"==(n=(n=(n=t.stops)[n.length-1]).charAt()<58?n.slice(1):n)?\"CH\":\"NYK\"==n?\"NYP\":n)+\"</font>\",(\"E\"==t.direction?i:r).push(n);h(l,i.concat(r))})})):(e=e.slice(1,4),fetch(\"//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:\"+e).then(function(e){200==e.status&&e.json().then(function(e){var t,n,a,o,r,i,c,d=0,s={};if(e=e[0]){for(;a=e.groups[d++];)for(r=a.headsign,n=0;o=a.times[n++];)o.shortRouteName=a.route.shortName,o.timestamp>t&&(t=o.timestamp),(s[r]=s[r]||[]).push(o);for(d in s)s[d].sort(function(e,t){return e.departureFmt<t.departureFmt?-1:e.departureFmt>t.departureFmt?1:0});for(d in t=[],f=Date.now(),s)for(a=s[d],d=0;(o=a[d++])&&d<4;)t.push((\"1\"==o.directionId?\"S\":\"N\")+(i=o.shortRouteName,c=void 0,\"<font color=\")+(c=\"string\"!=typeof(c=g[i])?g[i]=u[0|c]:c)+\">\"+i+\"</font>\"+function(e,t){for(e=e.split(/[: T-]/),t=0;t<e.length;t++)e[t]=+e[t];return\"-\"+(0|Math.abs((new Date(e[0],e[1]-1,e[2],e[3]||0,e[4]||0,e[5]||0,0)-f)/1e3)/60)}(o.departureFmt))}h(l,t)})}))}function s(e,t,n){n-1?setTimeout(d,0,e,t):((n=this.w)||((n=this.w=function(){for(var e=0;e<n.length;)d(n[e++],n[e++]);this.w=void 0}).arr=[]),(n=n.arr)[n.length]=e,n[n.length]=t)}var f,l,p=document.createElement(\"label\"),m=p.appendChild(document.createElement(\"input\"));m.type=\"checkbox\",m=p.cloneNode(1),e[3]?((v=document.createElement(\"img\")).setAttribute(\"style\",\"height:1em;width:1em;vertical-align:middle;\"),(u=v.cloneNode(0)).src=\"ht.png\",(g=v.cloneNode(0)).src=\"hg.svg\",v.src=\"dp.png\"):(v=0,u=document.createTextNode(\"❤️\"),g=document.createTextNode(\"⌛ \")),p.appendChild(u),m.appendChild(g),window.E=v,function e(t,n,a){var o,r,i,c=document.createElement(\"div\");c.appendChild(p).firstChild.checked=t[1];c.appendChild(m).firstChild.checked=t[1]&&t[2];if(l=t.length-4)for(t[2]&&(o=localStorage.getItem(\"fh\"))&&(c.style.minHeight=o+\"px\"),i=4;i<10&&(o=t[i]);i++)(r=c.appendChild(document.createElement(\"a\"))).href=(\"r\"==o[1].charAt()?\"rstop.htm#\":\"stop.htm#\")+o[1].slice(1),r.textContent=o[0],c.appendChild(document.createTextNode(\" \")),t[2]&&((r=c.appendChild(document.createElement(\"span\"))).style.display=\"inline\",(a?s:d)(o[1],r,a));else c.appendChild(document.createTextNode(t[1]?\"No history yet\":\"History off\"));window.favDiv=c;c.draw_fav=e;if(n)n(c);else{if(o=document.body,r=localStorage.getItem(\"as\"))for(i=o.lastChild;i=i.previousSibling;)if(\"DIV\"===i.nodeName){i.style.minHeight=r;break}o.appendChild(c)}}(e,t,!this.fetch);var u=[\"00933c\",\"ff6319\",\"fccc0a\",\"286ded\",\"6d6e71\",\"ee352e\",\"0078c6\",\"996633\",\"b933ad\"],g={B:1,D:1,F:1,FX:1,M:1,R:2,Q:2,W:2,N:2,E:3,A:3,C:3,GS:4,FS:4,H:4,2:5,1:5,3:5,SI:6,SIR:6,J:7,Z:7,\"7X\":8,7:8,G:\"6cbe45\",L:\"a7a9ac\"},v=[\"ee0034\",\"006ec7\",\"4d5357\"],C={PJ:1,HH:1,CI:2,12:2,BY:\"00985f\",HU:\"009b3a\",WH:\"00a1de\",OB:\"00af3f\",MK:\"00b2a9\",HA:\"066afe\",11:\"60269e\",FR:\"6e3219\",RK:\"a626aa\",PW:\"c60c30\",HM:\"ce8e00\",LB:\"ff6319\"}})("
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