(function(){
function DRAW_VER() { return 132; };
  var _document = document;
  var favDiv;
  var config;
  var prefixFn;
//https://stackoverflow.com/questions/45576748/how-can-i-detect-rendering-support-for-emoji-in-javascript
  var dont_have_clr_emoji;
  var ctx = _document.createElement("canvas");
  var prefix =
/*STARTINSERTDRAW*/
"(function(e,t){function l(t,e){t.innerHTML=e.join(\",\")+\"&nbsp;\",--h||((t=t.parentNode).style.minHeight=\"\",(this.requestIdleCallback||requestAnimationFrame)(function(e){m.getItem(\"fh\")!=(e=t.clientHeight)&&m.setItem(\"fh\",e)}))}function s(e,h){\"r\"==e.charAt()?(e=e.slice(1),fetch(\"//backend-unified.mylirr.org/arrivals/\"+e,n).then(function(e){200==e.status&&e.json().then(function(e){var t,n,a,i=0,r=[],o=[],c=Date.now()/1e3;for(e=e.arrivals;i<e.length&&i<4;i++)t=e[i],n=new Date(1e3*(n=t.time)).toLocaleTimeString().replace(/:00 ([PA])M/,\"$1\")+\" \"+Math.ceil((n-c)/60)+\"m\"+((n=(n=t.status.otp)&&n/60|0)?0<n?\"-E\"+n:\"-L\"+-n:\"\")+\"-Tk\"+(t.track||\"?\")+\"-<font color=\"+(\"string\"==typeof(n=y[a=t.branch])?n:y[a]=N[0|n])+\">\"+(\"HM\"==(n=(n=(n=t.stops)[n.length-1]).charAt()<58?n.slice(1):n)?\"CH\":\"NYK\"==n?\"NYP\":n)+\"</font>\",(\"E\"==t.direction?o:r).push(n);l(h,o.concat(r))})})):(e=e.slice(1,4),fetch(\"//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:\"+e).then(function(e){200==e.status&&e.json().then(function(e){var t,n,a,i,r,o,c,s=0,d={};if(e=e[0]){for(;a=e.groups[s++];)for(r=a.headsign,n=0;i=a.times[n++];)i.shortRouteName=a.route.shortName,i.timestamp>t&&(t=i.timestamp),(d[r]=d[r]||[]).push(i);for(s in d)d[s].sort(function(e,t){return e.departureFmt<t.departureFmt?-1:e.departureFmt>t.departureFmt?1:0});for(s in t=[],f=Date.now(),d)for(a=d[s],s=0;(i=a[s++])&&s<4;)t.push((\"1\"==i.directionId?\"S\":\"N\")+(o=i.shortRouteName,c=void 0,\"<font color=\")+(c=\"string\"!=typeof(c=C[o])?C[o]=v[0|c]:c)+\">\"+o+\"</font>\"+function(e,t){for(e=e.split(/[: T-]/),t=0;t<e.length;t++)e[t]=+e[t];return\"-\"+(0|Math.abs((new Date(e[0],e[1]-1,e[2],e[3]||0,e[4]||0,e[5]||0,0)-f)/1e3)/60)}(i.departureFmt))}l(h,t)})}))}function d(e,t,n){n-1?setTimeout(s,0,e,t):((n=this.w)||((n=this.w=function(){for(var e=0;e<n.length;)s(n[e++],n[e++]);this.w=void 0}).arr=[]),(n=n.arr)[n.length]=e,n[n.length]=t)}var h,n={headers:{\"accept-version\":\"3.0\"}},f=this.R,p=document,m=localStorage,u=p.createElement(\"label\"),g=u.appendChild(p.createElement(\"input\"));g.type=\"checkbox\",g=u.cloneNode(1),e[3]?((N=p.createElement(\"img\")).setAttribute(\"style\",\"height:1em;width:1em;vertical-align:middle;\"),(v=N.cloneNode(0)).src=\"ht.png\",(C=N.cloneNode(0)).src=\"hg.svg\",N.src=\"dp.png\"):(N=0,v=p.createTextNode(\"❤️\"),C=p.createTextNode(\"⌛ \")),u.appendChild(v),g.appendChild(C),this.E=N,this.R=f&&f(),f=!f,function e(t,n,a){var i,r,o,c=p.createElement(\"div\");c.appendChild(u).firstChild.checked=t[1];c.appendChild(g).firstChild.checked=t[1]&&t[2];if(h=t.length-4)for(t[2]&&(i=m.getItem(\"fh\"))&&(c.style.minHeight=i+\"px\"),o=4;o<10&&(i=t[o]);o++)(r=c.appendChild(p.createElement(\"a\"))).href=(\"r\"==i[1].charAt()?\"rstop.htm#\":\"stop.htm#\")+i[1].slice(1),r.textContent=i[0],c.appendChild(p.createTextNode(\" \")),t[2]&&((r=c.appendChild(p.createElement(\"span\"))).style.display=\"inline\",(a?d:s)(i[1],r,a));else c.appendChild(p.createTextNode(t[1]?\"No history yet\":\"History off\"));window.favDiv=c;c.draw_fav=e;if(n)n(c);else{if(i=p.body,r=f&&m.getItem(\"as\"))for(o=i.lastChild;o=o.previousSibling;)if(\"DIV\"===o.nodeName){o.style.minHeight=r;break}i.appendChild(c)}}(e,t,!this.fetch);var v=[\"ff6319\",\"00933c\",\"fccc0a\",\"6d6e71\",\"ee352e\",\"286ded\",\"0078c6\",\"996633\",\"b933ad\"],C={\"5X\":1,5:1,4:1,\"6X\":1,6:1,R:2,N:2,W:2,Q:2,FS:3,S:3,H:3,GS:3,2:4,3:4,1:4,A:5,C:5,E:5,SIR:6,SI:6,J:7,Z:7,7:8,\"7X\":8,G:\"6cbe45\",L:\"a7a9ac\"},N=[\"ee0034\",\"4d5357\",\"006ec7\"],y={CI:1,12:1,HH:2,PJ:2,BY:\"00985f\",HU:\"009b3a\",WH:\"00a1de\",OB:\"00af3f\",MK:\"00b2a9\",HA:\"066afe\",11:\"60269e\",S:\"6d6e71\",FR:\"6e3219\",RK:\"a626aa\",PW:\"c60c30\",HM:\"ce8e00\",LB:\"ff6319\"}})("
/*ENDINSERTDRAW*/
;

try {
  ctx = ctx.getContext("2d");
  ctx.canvas.width = ctx.canvas.height = 1;
  ctx.fillText("\ud83d\udca7", -4, 4);
  dont_have_clr_emoji = ctx.getImageData(0, 0, 1, 1).data[2]; //RGBA, [2] is blue
} catch (e) {}

  localStorage.clear();//anti-leak/old code/dev code etc
  localStorage.setItem("fav", prefix + '[' + DRAW_VER() + ',1,0,'+(dont_have_clr_emoji = +!dont_have_clr_emoji)+'])');
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
    favDiv = _document.body.lastChild;
    if(dont_have_clr_emoji) {
      ctx = _document.createElement('img');
      ctx.setAttribute("style","height:1em;width:1em;vertical-align:middle;");
      ctx.src = "dp.png";
      dont_have_clr_emoji = favDiv.firstChild;
      while (dont_have_clr_emoji) {
        dont_have_clr_emoji.replaceChild(ctx.cloneNode(0),dont_have_clr_emoji.childNodes[5]);
        dont_have_clr_emoji = dont_have_clr_emoji.nextSibling;
      }
    }
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