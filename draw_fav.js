this.draw_fav_ld=function(config, insertFDivFn) {
//alot of closures in this func
function postDrawArv(span,arrHTMLLines) {
  span.innerHTML = arrHTMLLines.join(',')+"&nbsp;";
  pendingFetch--; //private global
  //update cached height
  if (!pendingFetch) {
    //.pN is UI attached fav div
    (span = span.parentNode).style.minHeight = '';
    //defer call to span.clientHeight until next paint cycle by UA to prevent sync paint
    //requestIdleCallback is C47, FF55, no SF in 2024
    //requestAnimationFrame no pfx is C24, FF23, SF 6.1
    //fetch is C42, FF 39, SF 10.1 (will then have PF for requestAnimationFrame)
    (this.requestIdleCallback || requestAnimationFrame)(function (ch) {
      if (_localStorage.getItem('fh') != (ch = span.clientHeight)) {
        _localStorage.setItem('fh', ch);
      }
    });
  }
}

function mkSubFontTag(text) {
  var tag = colorRoutesSUB[text];
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
        - curTime) / 1e3) / 60));
}

function RTS (sta, span) {
  if(sta.charAt() == 'r') {
    sta = sta.slice(1);
    fetch('//backend-unified.mylirr.org/arrivals/'+sta, lirr_headers).then(
    function (r) {
    r.status == 200 &&
    r.json().then(function (r /*r=resp*/) {
    var i, n = 0, l, branch, w = [], h = [], curTime = Date.now()/1000;
    /*w=west, t=train, l=lineofhtml, h=html*/
    r = r.arrivals;
    /* DO NOT convert to for( in ) {}, because Array.prototype. PFs show up
       in the loop, and object.defineProperty unavail IE <= 8 */
    for (; n < r.length && n < 4; n++) {
        i = r[n];
        //note to self, ceil is round up, |0 is round down
        //console.log('x'+Math.ceil((t.time - ((new Date().getTime()/1000))) / 60)+'   '+(((t.time - ((new Date().getTime()/1000))) / 60)|0));
        l = new Date((l=i.time) * 1000).toLocaleTimeString().replace(/:00 ([PA])M/, '$1')
        + " " +Math.ceil((l-curTime) / 60)+'m'
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
    curTime = Date.now();
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

//delayTypeCode_fn_arr is int 2, or bool false
function doDelayedFetch (sta, span, delayTypeCode_fn_arr) {
  if(delayTypeCode_fn_arr-1) {//is 2, pagevis evt chrome bug
    setTimeout(RTS,0,sta,span);
  } else { //is f.js PF fetch()
    delayTypeCode_fn_arr = this.w;
    if(!delayTypeCode_fn_arr) {
      delayTypeCode_fn_arr = this.w = function () {
        //in CB from f.js load-ed, now can fetch()
        for(var i=0;i<delayTypeCode_fn_arr.length;) {
          RTS(delayTypeCode_fn_arr[i++],delayTypeCode_fn_arr[i++]);
        }
        //free memory/free span elements
        this.w = undefined;
      };
      delayTypeCode_fn_arr.arr=[];
    }
    delayTypeCode_fn_arr=delayTypeCode_fn_arr.arr;
    delayTypeCode_fn_arr[delayTypeCode_fn_arr.length] = sta;
    delayTypeCode_fn_arr[delayTypeCode_fn_arr.length] = span;
  }// is f.js
}

var lirr_headers = {headers: {'accept-version': '3.0'}},
    curTime = this.R,
    pendingFetch,
    doc = document,
    _localStorage = localStorage,
    heart = doc.createElement('label'),
    hourglass = heart.appendChild(doc.createElement('input'));
//IE 8 does NOT allow changing .type after tree insert, but rn, these els are unattached
//short var reuse
hourglass.type = "checkbox";
hourglass = heart.cloneNode(1);
//"any emoji config" templates now done
//now add colored emoji setting specific el's
  if(config[3]) {
    //png files and svg are from https://github.com/googlefonts/noto-emoji
    //THIS BRANCH USED TO BE A IIFE/CLOSURE, BUT UGLIFY JS UNROLLED/INLINED IT
    //AND NEVER REFERENCED/USED THE VARS AGAIN, VAR REUSE UGLY BUT SAVES BYTES
    //b4
    //docs/fav.js          uc  1962 gz  950
    //docs/ifav.js         uc  3933 gz 2079

    //af
    //docs/fav.js          uc  1962 gz  952
    //docs/ifav.js         uc  3927 gz 2075
    colorStrsRAIL /*l_drop*/ = doc.createElement('img');
    //do NOT set .src before cloneNode(0), benchmarked faster, chk notes in .txt

    //add CSS for sizing, NOTE sA("style","") benchmarked as 1-3 ms faster vs
    //.style.height on forced <IMG> emj on FF115
    //and .03 to .05 ms faster on <IMG> emj C109
    //note .style = str is 1-2 ms on FF, sA('style') always fast on FF
    //C109 .style = str is 0.05 or 0.06 ms, sA() is 0.02 to 0.03
    //so sA() faster on both browsers

    colorStrsRAIL /*l_drop*/.setAttribute("style","height:1em;width:1em;vertical-align:middle;");
    colorStrsSUB /*l_heart*/ = colorStrsRAIL /*l_drop*/.cloneNode(0);
    colorStrsSUB /*l_heart*/.src = "ht.png";
    colorRoutesSUB /*l_hourglass*/ = colorStrsRAIL /*l_drop*/.cloneNode(0);
    colorRoutesSUB /*l_hourglass*/.src = "hg.svg"

    //at end of cN()s, finally set .src on root template <IMG>
    //start network I/O of rail drop last, drawing rain drop req I/O XHR
    //but fav check marks are more important b/c they are drawn sync/no I/O to DOM
    //hopefully HTTP Cache makes chkbx imgs instant load to user 99% of time
    colorStrsRAIL /*l_drop*/.src = "dp.png";
  } else {//use native emoji
    //stop f.js from later trying to put the emoji PF
    colorStrsRAIL /*l_drop*/ = 0;
    //heart, fe0f req for FF 115 to be red
    colorStrsSUB /*l_heart*/ = doc.createTextNode("\u2764\ufe0f");
    //hourglass
    colorRoutesSUB /*l_hourglass*/ = doc.createTextNode("\u231B ");
  }
  heart.appendChild(colorStrsSUB /*l_heart*/);
  hourglass.appendChild(colorRoutesSUB /*l_hourglass*/);
  //set window. rain drop ctor/flag/el, false if using text emojis
  this.E = colorStrsRAIL /*l_drop*/;

  //maybe run as.js
  this.R=curTime&&curTime();
  curTime = !curTime;

//first run, probably eval() LS (2nd arg undef)
//but cud be a ver change or virgin no LS draw with 2nd arg
//3rd arg is wait/defer for f.js to run the fetch()es if any
draw_fav(config,insertFDivFn, !this.fetch);

//fetchDelayTypeCode is bool true/false, or INT 2 (page vis chrome bug)
function draw_fav (config, insertFDivFn, fetchDelayTypeCode) {
  var e, e2, i,
  d = doc.createElement('div');

//if this a re-draw, recycle checkmark tags for perf
  d.appendChild(heart).firstChild.checked = config[1];
//RT flag is secretly saved, even tho thru 1st flag (heart) the history
//was cleared by user
  d.appendChild(hourglass).firstChild.checked = config[1] && config[2];

//private global, note pndFet gbl set even if no ft will happen, to save code
  if (!(pendingFetch = config.length-4)) {
    d.appendChild(doc.createTextNode(config[1] ? "No history yet" : "History off"));
  } else {
    //if RT checking on, add cached minHeight so weather div doesn't jerk
    if(config[2]) {
      if(e = _localStorage.getItem('fh')) {
        d.style.minHeight = e+'px';
      }
    }
    for (i = 4; i < 10 && (e = config[i]); i++) {
      //todo template A tag
      (e2 = d.appendChild(doc.createElement('a'))).href = (e[1].charAt() == 'r' ? "rstop.htm#" : "stop.htm#") + e[1].slice(1);
      e2.textContent = e[0];
      d.appendChild(doc.createTextNode(" "));
      if(config[2]) {
        e2 = d.appendChild(doc.createElement('span'));
        e2.style.display = 'inline';
//Chrome 109 Win32, all fetch()es started from pageshow event hang as "pending" forever
//set a 0 ms timer to fix it, but don't do the timer, on initial page load (perf)
        (fetchDelayTypeCode ? doDelayedFetch : RTS)(e[1], e2, fetchDelayTypeCode);
      }
    }//end for
  }

  //DO NOT USE this., this obj is sometimes a div b/c callers did divEl.draw_fav()
  window.favDiv = d;
  d.draw_fav = draw_fav;
  if (insertFDivFn) { //not first LS eval() but some other kind of draw from other code
    insertFDivFn(d);
  } else {
    e = doc.body;
    //push cached height of AS Name div, to prevent layout shift/jerk of
    //fav checkmarks and station list (which is a no I/O sync draw) if AS Name
    //text happens to be 2 or 3 lines, wrapped, on mobile UAs
    //skip LS & loop if as.js already drew to screen
    e2 = curTime && _localStorage.getItem("as");
    if (e2) {
      for (i = e.lastChild; i = i.previousSibling; /*empty*/) {
        if ("DIV" === i.nodeName) {
          i.style.minHeight = e2;
          break;
        }
      }
    }
    e.appendChild(d);
  }
}//end function draw_fav()

//initialize after draw_fav call
/*STARTSUBCOLOR*/
var colorStrsSUB = ["ff6319","00933c","fccc0a","6d6e71","ee352e","286ded","0078c6","996633","b933ad"];
var colorRoutesSUB = {/*"B":0,*//*"M":0,*//*"D":0,*//*"FX":0,*//*"F":0,*/"5X":1,"5":1,"4":1,"6X":1,"6":1,"R":2,"N":2,"W":2,"Q":2,"FS":3,"S":3,"H":3,"GS":3,"2":4,"3":4,"1":4,"A":5,"C":5,"E":5,"SIR":6,"SI":6,"J":7,"Z":7,"7":8,"7X":8,"G":"6cbe45","L":"a7a9ac"};
/*ENDSUBCOLOR*/
/*STARTRAILCOLOR*/
var colorStrsRAIL = ["ee0034","4d5357","006ec7"];
var colorRoutesRAIL = {/*"DN":0,*//*"NH":0,*//*"WB":0,*//*"NC":0,*/"CI":1,"12":1,"HH":2,"PJ":2,"BY":"00985f","HU":"009b3a","WH":"00a1de","OB":"00af3f","MK":"00b2a9","HA":"066afe","11":"60269e","S":"6d6e71","FR":"6e3219","RK":"a626aa","PW":"c60c30","HM":"ce8e00","LB":"ff6319"};
/*ENDRAILCOLOR*/
}


