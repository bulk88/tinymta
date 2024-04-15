(function(){
function DRAW_VER() { return 115; };
  var favDiv;
  var config;
  var prefixFn;
//https://stackoverflow.com/questions/45576748/how-can-i-detect-rendering-support-for-emoji-in-javascript
  var dont_have_clr_emoji;
  var ctx = document.createElement("canvas");
  var prefix =
/*STARTINSERTDRAW*/
"(function(e,t){function h(e,t){e.innerHTML=t.join(\",\")+\"&nbsp;\",--l||((e=e.parentNode).style.minHeight=\"\",localStorage.getItem(\"fh\")!=(t=e.clientHeight)&&localStorage.setItem(\"fh\",t))}function s(e,l){\"r\"==e.charAt()?(e=e.slice(1),fetch(\"//backend-unified.mylirr.org/arrivals/\"+e,{headers:{\"accept-version\":\"3.0\"}}).then(function(e){200==e.status&&e.json().then(function(e){var t,a,n,r=0,i=[],o=[],c=Date.now()/1e3;for(e=e.arrivals;r<e.length&&r<4;r++)t=e[r],a=new Date(1e3*(a=t.time)).toLocaleTimeString().replace(/:00 ([PA])M/,\"$1\")+\" \"+Math.ceil((a-c)/60)+\"m\"+((a=(a=t.status.otp)&&a/60|0)?0<a?\"-E\"+a:\"-L\"+-a:\"\")+\"-Tk\"+(t.track||\"?\")+\"-<font color=\"+(\"string\"==typeof(a=N[n=t.branch])?a:N[n]=C[0|a])+\">\"+(\"HM\"==(a=(a=(a=t.stops)[a.length-1]).charAt()<58?a.slice(1):a)?\"CH\":\"NYK\"==a?\"NYP\":a)+\"</font>\",(\"E\"==t.direction?o:i).push(a);h(l,o.concat(i))})})):(e=e.slice(1,4),fetch(\"//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:\"+e).then(function(e){200==e.status&&e.json().then(function(e){var t,a,n,r,i,o,c,s=0,d={};if(e=e[0]){for(;n=e.groups[s++];)for(i=n.headsign,a=0;r=n.times[a++];)r.shortRouteName=n.route.shortName,r.timestamp>t&&(t=r.timestamp),(d[i]=d[i]||[]).push(r);for(s in d)d[s].sort(function(e,t){return e.departureFmt<t.departureFmt?-1:e.departureFmt>t.departureFmt?1:0});for(s in t=[],f=Date.now(),d)for(n=d[s],s=0;(r=n[s++])&&s<4;)t.push((\"1\"==r.directionId?\"S\":\"N\")+(o=r.shortRouteName,c=void 0,\"<font color=\")+(c=\"string\"!=typeof(c=v[o])?v[o]=g[0|c]:c)+\">\"+o+\"</font>\"+function(e,t){for(e=e.split(/[: T-]/),t=0;t<e.length;t++)e[t]=+e[t];return\"-\"+(0|Math.abs((new Date(e[0],e[1]-1,e[2],e[3]||0,e[4]||0,e[5]||0,0)-f)/1e3)/60)}(r.departureFmt))}h(l,t)})}))}function d(e,t,a){a-1?setTimeout(s,0,e,t):((a=this.w)||((a=this.w=function(){for(var e=0;e<a.length;)s(a[e++],a[e++]);this.w=void 0}).arr=[]),(a=a.arr)[a.length]=e,a[a.length]=t)}var f,l,p=document,m=p.createElement(\"label\"),u=m.appendChild(p.createElement(\"input\"));u.type=\"checkbox\",u=m.cloneNode(1),e[3]?((C=p.createElement(\"img\")).setAttribute(\"style\",\"height:1em;width:1em;vertical-align:middle;\"),(g=C.cloneNode(0)).src=\"ht.png\",(v=C.cloneNode(0)).src=\"hg.svg\",C.src=\"dp.png\"):(C=0,g=p.createTextNode(\"❤️\"),v=p.createTextNode(\"⌛ \")),m.appendChild(g),u.appendChild(v),window.E=C,function e(t,a,n){var r,i,o,c=p.createElement(\"div\");c.appendChild(m).firstChild.checked=t[1];c.appendChild(u).firstChild.checked=t[1]&&t[2];if(l=t.length-4)for(t[2]&&(r=localStorage.getItem(\"fh\"))&&(c.style.minHeight=r+\"px\"),o=4;o<10&&(r=t[o]);o++)(i=c.appendChild(p.createElement(\"a\"))).href=(\"r\"==r[1].charAt()?\"rstop.htm#\":\"stop.htm#\")+r[1].slice(1),i.textContent=r[0],c.appendChild(p.createTextNode(\" \")),t[2]&&((i=c.appendChild(p.createElement(\"span\"))).style.display=\"inline\",(n?d:s)(r[1],i,n));else c.appendChild(p.createTextNode(t[1]?\"No history yet\":\"History off\"));window.favDiv=c;c.draw_fav=e;if(a)a(c);else{if(r=p.body,i=localStorage.getItem(\"as\"))for(o=r.lastChild;o=o.previousSibling;)if(\"DIV\"===o.nodeName){o.style.minHeight=i;break}r.appendChild(c)}}(e,t,!this.fetch);var g=[\"00933c\",\"ff6319\",\"fccc0a\",\"286ded\",\"6d6e71\",\"ee352e\",\"0078c6\",\"996633\",\"b933ad\"],v={B:1,D:1,F:1,FX:1,M:1,R:2,Q:2,W:2,N:2,E:3,A:3,C:3,GS:4,FS:4,H:4,2:5,1:5,3:5,SI:6,SIR:6,J:7,Z:7,\"7X\":8,7:8,G:\"6cbe45\",L:\"a7a9ac\"},C=[\"ee0034\",\"006ec7\",\"4d5357\"],N={PJ:1,HH:1,CI:2,12:2,BY:\"00985f\",HU:\"009b3a\",WH:\"00a1de\",OB:\"00af3f\",MK:\"00b2a9\",HA:\"066afe\",11:\"60269e\",FR:\"6e3219\",RK:\"a626aa\",PW:\"c60c30\",HM:\"ce8e00\",LB:\"ff6319\"}})("
/*ENDINSERTDRAW*/
;

try {
  ctx = ctx.getContext("2d");
  ctx.canvas.width = ctx.canvas.height = 1;
  ctx.fillText("\ud83d\udca7", -4, 4);
  dont_have_clr_emoji = ctx.getImageData(0, 0, 1, 1).data[2]; //RGBA, [2] is blue
} catch (e) {}

  dont_have_clr_emoji = (!dont_have_clr_emoji)|0;
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