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
  var c =
/*STARTSUBCOLOR*/
{"4":"00933c","5":"00933c","5X":"00933c","6":"00933c","6X":"00a65c","A":"2850ad","C":"2850ad","E":"2850ad","G":"6cbe45","GS":"6d6e71","J":"996633","Z":"996633","L":"a7a9ac","7":"b933ad","7X":"b933ad","1":"ee352e","2":"ee352e","3":"ee352e","N":"fccc0a","Q":"fccc0a","R":"fccc0a","W":"fccc0a","B":"ff6319","D":"ff6319","F":"ff6319","FX":"ff6319","M":"ff6319"}
/*ENDSUBCOLOR*/
  [text];
  return c ?'<font color='+c+'>'+text+'</font>':text;
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
    var i, n, l, w = [], h = [];
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
/*STARTRAILCOLOR*/
{"HA":"0039a6","HH":"006ec7","PJ":"006ec7","BY":"00985f","HU":"009b3a","WH":"00a1de","OB":"00af3f","MK":"00b2a9","12":"4d5357","CI":"4d5357","11":"60269e","FR":"6e3219","RK":"a626aa","PW":"c60c30","HM":"ce8e00","DN":"ee0034","NC":"ee0034","NH":"ee0034","WB":"ee0034","LB":"ff6319"}
/*ENDRAILCOLOR*/
//lower than 58 is a digit
        )[i.branch] + ">" + ((l=((l=((l=i.stops)[l.length - 1])).charAt() < 58 ? l.slice(1) : l))=="HM"?"CH":l=="NYK"?"NYP":l)
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
  var e2,
  d = document.createElement('div'),
  e = d.appendChild(document.createElement('label')),
  pendingFetch = 0;
  (e2 = e.appendChild(document.createElement('input'))).type = "checkbox";
  e2.checked = config[1];
  v = e.appendChild(document.createElement('font'));
  v.color='red';
  v.appendChild(document.createTextNode(
  //heart
  "\u2764"
  ));
  e = d.appendChild(document.createElement('label'));
  (e2 = e.appendChild(document.createElement('input'))).type = "checkbox";
  //secret save RT flag, thru 1st flag history clear sequence by user
  e2.checked = config[1] && config[2];
  //hourglass
  e.appendChild(document.createTextNode("\u231B "));
  if (!config[1])
    e = "History off";
  else if (config.length == 3) {
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
    for (i = 3; i < 9 && (e = config[i]); i++) {
      (e2 = d.appendChild(document.createElement('a'))).href = (e[1].charAt() == 'r' ? "rstop.htm#" : "stop.htm#") + e[1].slice(1);
      e2.appendChild(document.createTextNode(e[0]));
      d.appendChild(document.createTextNode(" "));
      if(config[2]) {
        pendingFetch++;
        e2 = d.appendChild(document.createElement('span'));
        e2.style.display = 'inline';
//Chrome 109 Win32, all fetch()es started from pageshow event hang as "pending" forever
//set a 0 ms timer to fix it, but don't do the timer, on initial page load (perf)
        (!this.fetch || isPageShowEvt ? doDelayedFetch : RTS)(e[1], e2);
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


