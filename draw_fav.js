this.draw_fav=function(config, draw_fav_fn, replaceEl, extend_fav, isPageShowEvt) {
//alot of closures in this func
function postDrawArv(span,arrHTMLLines,i/*cheaper than var SPACE*/) {
  span.innerHTML = arrHTMLLines.join(',')+"&nbsp;";
  pendingFetch--;
  //update cached height
  if (!pendingFetch) {
    d.style.minHeight = ''; 
    if (localStorage.getItem('fh') != (i = d.clientHeight)) {
      localStorage.setItem('fh', i);
    }
  }
}

function mkSubFontTag(text) {
  var tag;
  tag = colorRoutesSUB[text];
  if(typeof tag !== 'string') {
    tag = colorRoutesSUB[text] = colorStrsSUB[tag|0]; //undef to 0
  }
  return '<font color='+tag+'>'+text+'</font>';
}

/* mislabeled now */
function parseIsoDatetime(dt,i) {
    dt = dt.split(/[: T-]/);
    for (i=0; i < dt.length; i++)
        //cast string to num
        dt[i] = +dt[i];
    //return //modified by bulk88 to be mins away instead of parse, Math.floor->0|
    //factoring out Math.abs to x < 0 ? -x : x primative increased gz 4 bytes
    return '-'+(0|(Math.abs((
        new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0)
        - (new Date)) / 1e3) / 60));
}

function RTS (sta, span) {
  if(sta.charAt() == 'r') {
    sta = sta.slice(1);
    fetch('//backend-unified.mylirr.org/arrivals/'+sta, {headers: {'accept-version': '3.0'}}).then(
    function (r) {
    r.status == 200 &&
    r.json().then(function (r /*r=resp*/) {
    var i, n, l, branch, w = [], h = [];
    /*w=west, t=train, l=lineofhtml, h=html*/
    r = r.arrivals;
    /* DO NOT convert to for( in ) {}, because Array.prototype. PFs show up
       in the loop, and object.defineProperty unavail IE <= 8 */
    for (n=0; n < r.length && n < 4; n++) {
        i = r[n];
        //note to self, ceil is round up, |0 is round down
        //console.log('x'+Math.ceil((t.time - ((new Date().getTime()/1000))) / 60)+'   '+(((t.time - ((new Date().getTime()/1000))) / 60)|0));
        l = new Date((l=i.time) * 1000).toLocaleTimeString().replace(/:00 ([PA])M/, '$1')
        + " " +Math.ceil((l- (new Date().getTime()/1000)) / 60)+'m'
        + ((l=i.status.otp) && (l=(l/60)|0) ? (l > 0 ? '-E'+l : '-L'+-l):'')
        + '-Tk' + (i.track || '?')
        + "-<font color=" + (
          typeof (l = colorRoutesRAIL[branch = i.branch]) === 'string' ? l : (colorRoutesRAIL[branch] = colorStrsRAIL[l|0])
//lower than 58 is a digit
        ) + ">" + ((l=((l=((l=i.stops)[l.length - 1])).charAt() < 58 ? l.slice(1) : l))=="HM"?"CH":l=="NYK"?"NYP":l)
        + "</font>";
        i.direction == 'E' ? h.push(l) : w.push(l);
    }

    postDrawArv(span,h.concat(w));
})});
  }
  else {
  sta = sta.slice(1,4);
  fetch('//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:'+sta).then(
    function (r) {
    r.status == 200 &&
    r.json().then(function (r/*r=resp*/) {
    /*h=html and timestamp*/
    var h,i=0,n,route,trip,alerts_headsign,o = {};
if (r = r[0]) {//if(r.length) { shorter alternative
    //initial array is for a geosearch with multiple stations, not exact sta, so go 1 level deep
    //server returns sorted by route, we want sort by dir
    while(route = r.groups[i++]) {
        alerts_headsign = route.headsign;
        n=0;
        while(trip = route.times[n++]){
            trip.shortRouteName = route.route.shortName;
            trip.timestamp > h && (h = trip.timestamp);
            (o[alerts_headsign] = o[alerts_headsign] || []).push(trip);
        }
    }

    for (i in o) //object keys
        //alpha sort ISO 8601 timestamps
        o[i].sort(function(a, b) {
            return a.departureFmt < b.departureFmt ? -1 :
                a.departureFmt > b.departureFmt ? 1 :
                0;
        });

    h = [];
    for (i in o) { //object keys
        //route is dir really
        route = o[i];
        i=0;
        while((trip = route[i++]) && i < 4){ //3 trips per dir UI limit
            h.push(
//"0" is north "1" is south, directionId is a STRING, do NOT USE !! or ?
            (trip.directionId == '1' ? "S" :"N")+
            mkSubFontTag(trip.shortRouteName)+
            parseIsoDatetime(trip.departureFmt));
        }
    }

} /*else
    h = ["station not found"];
*/

    postDrawArv(span,h);
    })})}}
    
  function doDelayedFetch (u,s) {
    setTimeout(function () {RTS(u, s)},0);
  }
/*STARTSUBCOLOR*/
var colorStrsSUB = ["00933c","ff6319","fccc0a","2850ad","ee352e","6d6e71","b933ad","0078c6","996633"];
var colorRoutesSUB = {/*"4":0,*//*"5":0,*//*"6X":0,*//*"5X":0,*//*"6":0,*/"FX":1,"D":1,"M":1,"F":1,"B":1,"W":2,"N":2,"R":2,"Q":2,"E":3,"C":3,"A":3,"2":4,"1":4,"3":4,"H":5,"GS":5,"FS":5,"7":6,"7X":6,"SI":7,"SIR":7,"Z":8,"J":8,"G":"6cbe45","L":"a7a9ac"};
/*ENDSUBCOLOR*/
/*STARTRAILCOLOR*/
var colorStrsRAIL = ["ee0034","006ec7","4d5357"];
var colorRoutesRAIL = {/*"DN":0,*//*"WB":0,*//*"NH":0,*//*"NC":0,*/"PJ":1,"HH":1,"CI":2,"12":2,"HA":"0039a6","BY":"00985f","HU":"009b3a","WH":"00a1de","OB":"00af3f","MK":"00b2a9","11":"60269e","FR":"6e3219","RK":"a626aa","PW":"c60c30","HM":"ce8e00","LB":"ff6319"};
/*ENDRAILCOLOR*/
  var e2,
  d = document.createElement('div'),
  e = d.appendChild(document.createElement('label')),
  pendingFetch = 0,
  v;

  if(config[3] && !window.E) {
    (function(){
      var heart, hourglass, drop;
      heart = document.createElement('img');
      heart.src = "emoji_u2764.png";
      (hourglass = heart.style).height = hourglass.width = '1em';
      hourglass.verticalAlign = 'middle';
      hourglass = heart.cloneNode(0);
      hourglass.src = "emoji_u231b.svg"
      drop = heart.cloneNode(0);
      drop.src = "emoji_u1f4a7.png";
    //DO NOT USE this., this obj is sometimes a div b/c callers did divEl.draw_fav()
      window.E = function (idx) {
        return idx == 2 ? heart : idx ? /*1*/ hourglass : /*0*/ drop.cloneNode(0);
      };
    })();
  } else {
    window.E = 0; //stop f.js from trying to put the emj PF
  }
  (e2 = document.createElement('input')).type = "checkbox";
  e2.checked = config[1];
  //IE 8 does NOT allow changing .type after tree insert, don't optimize expr
  e.appendChild(e2);
  
  e.appendChild((window.E && window.E(2)) || document.createTextNode(
  //heart
  "\u2764"
  ));
  e = d.appendChild(document.createElement('label'));
  (e2 = document.createElement('input')).type = "checkbox";
  //secret save RT flag, thru 1st flag history clear sequence by user
  e2.checked = config[1] && config[2];
  //IE 8 does NOT allow changing .type after tree insert, don't optimize expr
  e.appendChild(e2);
  //hourglass
  e.appendChild((window.E && window.E(1)) || document.createTextNode("\u231B "));
  if (!config[1])
    e = "History off";
  else if (config.length == 4) {
    e = "No history yet";
  } else
    e = 0;
  if (e) {
    d.appendChild(document.createTextNode(e));
  } else {
    //if RT checking on, add cached minHeight so weather div doesn't jerk
    if(config[2] && (e = localStorage.getItem('fh'))) {
      d.style.minHeight = e+'px';
    }
    for (i = 4; i < 10 && (e = config[i]); i++) {
      (e2 = d.appendChild(document.createElement('a'))).href = (e[1].charAt() == 'r' ? "rstop.htm#" : "stop.htm#") + e[1].slice(1);
      e2.appendChild(document.createTextNode(e[0]));
      d.appendChild(document.createTextNode(" "));
      if(config[2]) {
        pendingFetch++;
        e2 = d.appendChild(document.createElement('span'));
        e2.style.display = 'inline';
//Chrome 109 Win32, all fetch()es started from pageshow event hang as "pending" forever
//set a 0 ms timer to fix it, but don't do the timer, on initial page load (perf)
        (isPageShowEvt ? doDelayedFetch : RTS)(e[1], e2);
      }
    }
  }
  //todo copy checkbox FNs if possible
  //DO NOT USE this., this obj is sometimes a div b/c callers did divEl.draw_fav()
  window.favDiv = d;
  d.draw_fav = draw_fav_fn;
  if (replaceEl) {
    replaceEl.parentNode.replaceChild(d, replaceEl);
    extend_fav(d);
  } else {
    e = document.body;
    //push cached height of AS Name div, to prevent layout shift/jerk of
    //fav checkmarks and station list (which is a no I/O sync draw) if AS Name
    //text happens to be 2 or 3 lines, wrapped, on mobile UAs
    e2 = localStorage.getItem("as");
    if (e2) {
      for (v = e.lastChild; v = v.previousSibling; ) {
        if ("DIV" === v.nodeName && !v.firstChild) {
          v.style.minHeight = e2 + 'px';
          break;
        }
      }
    }
    e.appendChild(d);
  }
}


