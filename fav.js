(function(){
//don't touch next 4 lines, they are matched by adj_fav.pl
function DRAW_VER() { return 3; };
function DRAW_VER_STR() { return "3"; };
function DRAW_VER_LEN() { return 1; };
function PREFIX_LEN() { return 3493; };
//returns array [createdNewFavsBool,favsConfig]
function read_fav() {
  if(PREFIX_LEN() != prefix.length){alert('b l '+PREFIX_LEN()+' '+prefix.length)}
  try {
    //localStorage.removeItem("fav");
    var l_prefix;
    var c = localStorage.getItem("fav");
    //+1 is [
    if (!c || c.substr(PREFIX_LEN()+1,DRAW_VER_LEN()) !== DRAW_VER_STR()) {
      //initial default/first ever!!! (cookie/LS clear) favs obj on particular user
      //version int, keep hist bool, realtime bool, sta#1, sta#2
      localStorage.setItem("fav", prefix + '[' + DRAW_VER() + ',1,0])');
      return [1,[DRAW_VER(), 1, 0]];
    } else {
      l_prefix = c.slice(0,PREFIX_LEN());
      if(l_prefix !== prefix) {
        alert('bad')
      }
      prefix = l_prefix;
      return [0,JSON.parse(c.slice(PREFIX_LEN()+0, c.length - 1))];
    }
  } catch (e) {
    //favs not supported on browser
    return 0;
  }
}

function store_fav(config) {
  localStorage.setItem("fav", prefix+JSON.stringify(config)+')');
  return config;
}

//add event handers to checkmarks, so less draw code in LS
function extend_fav(divEl,left) {
  divEl = divEl.firstChild;
  left = divEl.nextSibling.firstChild;
  divEl = divEl.firstChild;
  //IE 8 fix
  left.onclick = divEl.onclick = function() {
    this.blur();
  };
  //first checkmark (left), then right
  left.onchange = divEl.onchange = function (evt_div) {
    var c = read_fav()[1],
    //IE 8 has arg undef, all other UAs have event obj
    chked = (evt_div = this).checked;
    evt_div = evt_div.parentNode;
    if(evt_div.lastChild.color/*"red" or undef*/) {
      //1st checkmark
      if (chked) {
        c[1] = 1;
      } else {
        c[1] = 0;
        //wipe history
        c.length = 3;
        localStorage.removeItem('fh');
      }
    } else {
      //2nd checkmark
      if (chked) {
        //turn on both checkmarks, implied save history if want RT
        c[2] = c[1] = 1;
      } else {
        c[2] = 0;
      }
    }
    //closure free design, get input from from misc globals
    evt_div = evt_div.parentNode;
    evt_div.draw_fav(store_fav(c), evt_div.draw_fav, evt_div, extend_fav);
  };
}
function _recordFavStopHit(sta_name, fav_url) {
  var found;
  var minus_1_sta;
  var c = read_fav();
  var c_len;
  var n = 3;
  if (c) { // if UA supports favs/LS
    if ((c=c[1])[1]) {//if fav enabled
      for (c_len = c.length; n < c_len; n++) {
        i = c[n];
        if (i[1] == fav_url) {
          i[2]++; //boost view count
          //resort stations
          if(n > 3) { //if cur sta not first sta
          //if hit count of cur sta higher than next higher sta in list
            if(i[2] > (minus_1_sta = c[n-1])[2]) {
              //swap stations, pushing cur up, and -1 down
              c[n-1] = i;
              c[n] = minus_1_sta;
            }
          }
          found = 1;
          break;
        }
      }//end sta search loop
      if (!found) {
        //add to end, unless full, if full wipe last sta
        c[c_len == 9 ? 8 : c_len] = [sta_name, fav_url, 1];
      }
      store_fav(c);
    } //fav enabled
  } //fav UA supported
}

  var prefix =
  /*STARTINSERTDRAW*/
"(function(c){var f=function(e,t,n,a,o){function s(e,t,n){e.innerHTML=t.join(\",\")+\"&nbsp;\",--g||(p.style.minHeight=\"\",localStorage.getItem(\"fh\")!=(n=p.clientHeight)&&localStorage.setItem(\"fh\",n))}function r(e,p){\"r\"==e.charAt()?(e=e.slice(1),fetch(\"//backend-unified.mylirr.org/arrivals/\"+e,{headers:{\"accept-version\":\"3.0\"}}).then(function(e){200==e.status&&e.json().then(function(e){var t,n,a,o,i=[],r=[];for(e=e.arrivals,n=0;n<e.length&&n<4;n++)t=e[n],a=new Date(1e3*(a=t.time)).toLocaleTimeString().replace(/:00 ([PA])M/,\"$1\")+\" \"+Math.ceil((a-(new Date).getTime()/1e3)/60)+\"m\"+((a=(a=t.status.otp)&&a/60|0)?0<a?\"-E\"+a:\"-L\"+-a:\"\")+\"-Tk\"+(t.track||\"?\")+\"-<font color=\"+(\"string\"==typeof(a=m[o=t.branch])?a:m[o]=l[0|a])+\">\"+(\"HM\"==(a=(a=(a=t.stops)[a.length-1]).charAt()<58?a.slice(1):a)?\"CH\":\"NYK\"==a?\"NYP\":a)+\"</font>\",(\"E\"==t.direction?r:i).push(a);s(p,r.concat(i))})})):(e=e.slice(1,4),fetch(\"//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:\"+e).then(function(e){200==e.status&&e.json().then(function(e){var t,n,a,o,i,r,c,d=0,l={};if(e=e[0]){for(;a=e.groups[d++];)for(i=a.headsign,n=0;o=a.times[n++];)o.shortRouteName=a.route.shortName,o.timestamp>t&&(t=o.timestamp),(l[i]=l[i]||[]).push(o);for(d in l)l[d].sort(function(e,t){return e.departureFmt<t.departureFmt?-1:e.departureFmt>t.departureFmt?1:0});for(d in t=[],l)for(a=l[d],d=0;(o=a[d++])&&d<4;)t.push((\"1\"==o.directionId?\"S\":\"N\")+(r=o.shortRouteName,c=void 0,\"<font color=\")+(c=\"string\"!=typeof(c=f[r])?f[r]=h[0|c]:c)+\">\"+r+\"</font>\"+function(e,t){for(e=e.split(/[: T-]/),t=0;t<e.length;t++)e[t]=+e[t];return\"-\"+(0|Math.abs((new Date(e[0],e[1]-1,e[2],e[3]||0,e[4]||0,e[5]||0,0)-new Date)/1e3)/60)}(o.departureFmt))}s(p,t)})}))}function c(e,t){setTimeout(function(){r(e,t)},0)}var d,h=[\"00933c\",\"ff6319\",\"fccc0a\",\"2850ad\",\"ee352e\",\"6d6e71\",\"b933ad\",\"0078c6\",\"996633\"],f={FX:1,D:1,M:1,F:1,B:1,W:2,N:2,R:2,Q:2,E:3,C:3,A:3,2:4,1:4,3:4,H:5,GS:5,FS:5,7:6,\"7X\":6,SI:7,SIR:7,Z:8,J:8,G:\"6cbe45\",L:\"a7a9ac\"},l=[\"ee0034\",\"006ec7\",\"4d5357\"],m={PJ:1,HH:1,CI:2,12:2,HA:\"0039a6\",BY:\"00985f\",HU:\"009b3a\",WH:\"00a1de\",OB:\"00af3f\",MK:\"00b2a9\",11:\"60269e\",FR:\"6e3219\",RK:\"a626aa\",PW:\"c60c30\",HM:\"ce8e00\",LB:\"ff6319\"},p=document.createElement(\"div\"),u=p.appendChild(document.createElement(\"label\")),g=0;if((d=document.createElement(\"input\")).type=\"checkbox\",d.checked=e[1],u.appendChild(d),(v=u.appendChild(document.createElement(\"font\"))).color=\"red\",v.appendChild(document.createTextNode(\"❤\")),u=p.appendChild(document.createElement(\"label\")),(d=document.createElement(\"input\")).type=\"checkbox\",d.checked=e[1]&&e[2],u.appendChild(d),u.appendChild(document.createTextNode(\"⌛ \")),u=e[1]?3==e.length?\"No history yet\":0:\"History off\")p.appendChild(document.createTextNode(u));else for(e[2]&&(u=localStorage.getItem(\"fh\"))&&(p.style.minHeight=u+\"px\"),i=3;i<9&&(u=e[i]);i++)(d=p.appendChild(document.createElement(\"a\"))).href=(\"r\"==u[1].charAt()?\"rstop.htm#\":\"stop.htm#\")+u[1].slice(1),d.appendChild(document.createTextNode(u[0])),p.appendChild(document.createTextNode(\" \")),e[2]&&(g++,(d=p.appendChild(document.createElement(\"span\"))).style.display=\"inline\",(o?c:r)(u[1],d));if((window.favDiv=p).draw_fav=t,n)n.parentNode.replaceChild(p,n),a(p);else{if(u=document.body,d=localStorage.getItem(\"as\"))for(v=u.lastChild;v=v.previousSibling;)if(\"DIV\"===v.nodeName&&!v.firstChild){v.style.minHeight=d+\"px\";break}u.appendChild(p)}};this.fetch?f(c,f):(this.w=function(){f(c,f)})})("
/*ENDINSERTDRAW*/
,
  delayedStaHits_head,
  i;
  //debugging
  //var prefix = '(function(c){var f=function(e,t,d,n,a){return window.draw_fav(e,t,d,n,a)};this.fetch?f(c,f):(this.w=function(){f(c,f)})})(';
  if(delayedStaHits_head = this.rF) {
    for(i=0;i<delayedStaHits_head.length;i+=2) {
      _recordFavStopHit(delayedStaHits_head[i], delayedStaHits_head[i+1]);
    }
  }
  //fake the Array API so delayed and direct callers r simpler
  this.rF = {push:_recordFavStopHit};

var pathname_newEl = location.pathname;
//match "/" "/docs/" and "/index" "/index.htm" "/index.html" etc
//"abc"[2] string as array, doesn't work IE 5.0, its undef, use .charAt()
if (pathname_newEl.slice(-1) == '/' || !pathname_newEl.indexOf('/index')) {
  //not index.htm render critical files
  delayedStaHits_head = document.documentElement.firstChild;
/*
routes.js takes a while to generate b/c its a CFW, so start it early
it doesn't cause congestion on the wire b/c CFW latency, its also small
vs MTA alerts file, which is gz LARGER than this entire web site!!! gz-ed
*/
  pathname_newEl = document.createElement('link');
  pathname_newEl.rel = 'preload';
  pathname_newEl.as = 'script';
  pathname_newEl.href = 'routes.js';
  delayedStaHits_head.appendChild(pathname_newEl);
  pathname_newEl = document.createElement('link');
  pathname_newEl.rel = 'prefetch';
  pathname_newEl.href = 'stop.htm';
  pathname_newEl = delayedStaHits_head.appendChild(pathname_newEl).cloneNode(0);
  pathname_newEl.href = 'rstop.htm';
  delayedStaHits_head.appendChild(pathname_newEl);

  window.onpageshow = function (event_div){
    if (event_div.persisted) {
      event_div = this.favDiv;
      if(event_div) {
        event_div.draw_fav(read_fav()[1],event_div.draw_fav, event_div, extend_fav, 1);
      }
    }
  };
  var checkDOMFn = function () {
    var config = read_fav();
    var favDiv = this.favDiv;
    var prefixFn;
    var el;
    //LS global created new, defaults loaded in read_fav();
    if(config) { //false is too old/no LS browser
      if (config[0]) {//[0] is result flag from read_fav, it made/wiped the config
        prefixFn = new Function(
        /*args  */ prefix.slice(28,prefix.indexOf(')',28)).split(','),
        /*fnbody*/ prefix.slice(39,prefix.lastIndexOf(';')-1) //for } rmv
        );
        //fav obj ver upgrade happpened
        if (favDiv) { //dont de dup config[1], extra code bytes after mini
          prefixFn(config[1], prefixFn, favDiv, extend_fav);
        }
        //virgin user/browser, draw favs very late first time ever
        else {
          el = document.body.lastChild;
          while (el) { //last el is NEVER it
            if (el.nodeName == "STYLE") {
              break;
            }
            el = el.previousElementSibling; //eventually null
          }
          if (el) {
            prefixFn(config[1], prefixFn, el.parentNode.insertBefore(document.createElement('div'), el), extend_fav);
          }
        }
      } else {
        //remove fav div test eventually, this can only hit if syntax error in LS JS code
        if(!favDiv) {
          alert('no div but saw fav draw code');
        }
        else extend_fav(favDiv); //add checkmark event handlers, 99% time this branch
      }
    }
  };
  if(document.body && this.fetch) //async script tags supported
    checkDOMFn();
  else //defer the run
    this.x = checkDOMFn;
}// if index.htm
})();




