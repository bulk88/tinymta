(function(){
//returns array [createdNewFavsBool,favsConfig]
function read_fav() {
  //bump if incompat fav obj in Tinymta new release
  function DRAW_VER() { return 0; };
  try {
    var c = localStorage.getItem("fav");
    if (!c || c.indexOf(prefix + '[' + DRAW_VER() + ',') != 0) {
      //initial default/first ever!!! (cookie/LS clear) favs obj on particular user
      //version, keep hist, realtime (unimplemented), sta#1, sta#2
      localStorage.setItem("fav", prefix + '[' + DRAW_VER() + ',1,0])');
      return [1,[DRAW_VER(), 1, 0]];
    } else {
      return [0,JSON.parse(c.slice(prefix.length, c.length - 1))];
    }
  } catch (e) {
    //favs not supported on browser
    return 0;
  }
}

function store_fav(config) {
/*
  var oC = localStorage.getItem("fav");
  oC = oC.slice(0, oC.lastIndexOf('([')+1);
  localStorage.setItem("fav", oC+JSON.stringify(config)+')');
*/
  localStorage.setItem("fav", prefix+JSON.stringify(config)+')');
  return config;
}

//add event handers to checkmarks, so less draw code in LS
function extend_fav(divEl) {
  divEl = divEl.firstChild;
  //first checkmark (left)
  divEl.nextSibling.firstChild.onchange = divEl.firstChild.onchange = function (evt_div) {
    var c = read_fav()[1],
    chked = (evt_div = evt_div.target).checked;
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

  var prefixFnStr =
/*STARTINSERTDRAW*/
"function(e,t,a,n,c){function p(e,t,a){e.innerHTML=t.join(\",\")+\"&nbsp;\",--s||(l.style.minHeight=\"\",localStorage.getItem(\"fh\")!=(a=l.clientHeight)&&localStorage.setItem(\"fh\",a))}function o(e,f){\"r\"==e.charAt()?(e=e.slice(1),fetch(\"//backend-unified.mylirr.org/arrivals/\"+e,{headers:{\"accept-version\":\"3.0\"}}).then(function(e){200==e.status&&e.json().then(function(e){var t,a,n,c=[],o=[];for(e=e.arrivals,a=0;a<e.length&&a<4;a++)t=e[a],n=new Date(1e3*(n=t.time)).toLocaleTimeString().replace(/:00 ([PA])M/,\"$1\")+\" \"+Math.ceil((n-(new Date).getTime()/1e3)/60)+\"m\"+((n=(n=t.status.otp)&&n/60|0)?0<n?\"-E\"+n:\"-L\"+-n:\"\")+\"-Tk\"+(t.track||\"?\")+\"-<font color=\"+{HA:\"0039a6\",HH:\"006ec7\",PJ:\"006ec7\",BY:\"00985f\",HU:\"009b3a\",WH:\"00a1de\",OB:\"00af3f\",MK:\"00b2a9\",12:\"4d5357\",CI:\"4d5357\",11:\"60269e\",FR:\"6e3219\",RK:\"a626aa\",PW:\"c60c30\",HM:\"ce8e00\",DN:\"ee0034\",NC:\"ee0034\",NH:\"ee0034\",WB:\"ee0034\",LB:\"ff6319\"}[t.branch]+\">\"+(\"HM\"==(n=(n=(n=t.stops)[n.length-1]).charAt()<58?n.slice(1):n)?\"CH\":\"NYK\"==n?\"NYP\":n)+\"</font>\",(\"E\"==t.direction?o:c).push(n);p(f,o.concat(c))})})):(e=e.slice(1,4),fetch(\"//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:\"+e).then(function(e){200==e.status&&e.json().then(function(e){var t,a,n,c,o,i,r,d=0,l={};if(e=e[0]){for(;n=e.groups[d++];)for(o=n.headsign,a=0;c=n.times[a++];)c.shortRouteName=n.route.shortName,c.timestamp>t&&(t=c.timestamp),(l[o]=l[o]||[]).push(c);for(d in l)l[d].sort(function(e,t){return e.departureFmt<t.departureFmt?-1:e.departureFmt>t.departureFmt?1:0});for(d in t=[],l)for(n=l[d],d=0;(c=n[d++])&&d<4;)t.push((\"1\"==c.directionId?\"S\":\"N\")+(i=c.shortRouteName,r=void 0,(r={4:\"00933c\",5:\"00933c\",\"5X\":\"00933c\",6:\"00933c\",\"6X\":\"00a65c\",A:\"2850ad\",C:\"2850ad\",E:\"2850ad\",G:\"6cbe45\",GS:\"6d6e71\",J:\"996633\",Z:\"996633\",L:\"a7a9ac\",7:\"b933ad\",\"7X\":\"b933ad\",1:\"ee352e\",2:\"ee352e\",3:\"ee352e\",N:\"fccc0a\",Q:\"fccc0a\",R:\"fccc0a\",W:\"fccc0a\",B:\"ff6319\",D:\"ff6319\",F:\"ff6319\",FX:\"ff6319\",M:\"ff6319\"}[i])?\"<font color=\"+r+\">\"+i+\"</font>\":i)+function(e,t){for(e=e.split(/[: T-]/),t=0;t<e.length;t++)e[t]=+e[t];return\"-\"+(0|Math.abs((new Date(e[0],e[1]-1,e[2],e[3]||0,e[4]||0,e[5]||0,0)-new Date)/1e3)/60)}(c.departureFmt))}p(f,t)})}))}function r(e,t){setTimeout(function(){o(e,t)},0)}var d,l=document.createElement(\"div\"),f=l.appendChild(document.createElement(\"label\")),s=0;if((d=f.appendChild(document.createElement(\"input\"))).type=\"checkbox\",d.checked=e[1],(v=f.appendChild(document.createElement(\"font\"))).color=\"red\",v.appendChild(document.createTextNode(\"❤\")),(d=(f=l.appendChild(document.createElement(\"label\"))).appendChild(document.createElement(\"input\"))).type=\"checkbox\",d.checked=e[1]&&e[2],f.appendChild(document.createTextNode(\"⌛ \")),f=e[1]?3==e.length?\"No history yet\":0:\"History off\")l.appendChild(document.createTextNode(f));else for(e[2]&&(f=localStorage.getItem(\"fh\"))&&(l.style.minHeight=f+\"px\"),i=3;i<9&&(f=e[i]);i++)(d=l.appendChild(document.createElement(\"a\"))).href=(\"r\"==f[1].charAt()?\"rstop.htm#\":\"stop.htm#\")+f[1].slice(1),d.appendChild(document.createTextNode(f[0])),l.appendChild(document.createTextNode(\" \")),e[2]&&(s++,(d=l.appendChild(document.createElement(\"span\"))).style.display=\"inline\",(!this.fetch||c?r:o)(f[1],d));if((window.favDiv=l).draw_fav=t,a)a.parentNode.replaceChild(l,a),n(l);else{if(f=document.body,d=localStorage.getItem(\"as\"))for(v=f.lastChild;v=v.previousSibling;)if(\"DIV\"===v.nodeName&&!v.firstChild){v.style.minHeight=d+\"px\";break}f.appendChild(l)}}"
/*ENDINSERTDRAW*/

  //var prefixFnStr = 'function(e,t,d,n,a){return window.draw_fav(e,t,d,n,a)}';

  var prefix = '(function(c){var f='+prefixFnStr+';f(c,f)})(',
  delayedStaHits_head,
  i;

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
        //change to Function() for perf, low priority
        prefixFn = eval('('+prefixFnStr+')');
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
  if(document.body) //async script tags supported
    checkDOMFn();
  else //defer the run
    this.x = checkDOMFn;
}// if index.htm
})();




