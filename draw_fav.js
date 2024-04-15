this.draw_fav_ld=function(config, insertFDivFn) {
//alot of closures in this func
function postDrawArv(span,arrHTMLLines_height) {
  span.innerHTML = arrHTMLLines_height.join(',')+"&nbsp;";
  pendingFetch--; //private global
  //update cached height
  if (!pendingFetch) {
    //.pN is UI attached fav div
    (span = span.parentNode).style.minHeight = '';
    if (localStorage.getItem('fh') != (arrHTMLLines_height = span.clientHeight)) {
      localStorage.setItem('fh', arrHTMLLines_height);
    }
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
    fetch('//backend-unified.mylirr.org/arrivals/'+sta, {headers: {'accept-version': '3.0'}}).then(
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

var curTime,
    pendingFetch,
    heart = document.createElement('label'),
    hourglass = heart.appendChild(document.createElement('input'));
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
    colorStrsRAIL /*l_drop*/ = document.createElement('img');
    //do NOT set .src before cloneNode(0), benchmarked faster, chk notes in .txt

    //add CSS for sizing, NOTE sA("style","") benchmarked as 1-3 ms faster vs
    //.style on forced <IMG> emj on FF115
    //and .03 to .05 ms faster on <IMG> emj C109
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
    colorStrsSUB /*l_heart*/ = document.createTextNode("\u2764\ufe0f");
    //hourglass
    colorRoutesSUB /*l_hourglass*/ = document.createTextNode("\u231B ");
  }
  heart.appendChild(colorStrsSUB /*l_heart*/);
  hourglass.appendChild(colorRoutesSUB /*l_hourglass*/);
  window.E = colorStrsRAIL /*l_drop*/;


//first run, probably eval() LS (2nd arg undef)
//but cud be a ver change or virgin no LS draw with 2nd arg
//3rd arg is wait/defer for f.js to run the fetch()es if any
draw_fav(config,insertFDivFn, !this.fetch);

//fetchDelayTypeCode is bool true/false, or INT 2 (page vis chrome bug)
function draw_fav (config, insertFDivFn, fetchDelayTypeCode) {
  var e, e2, i,
  d = document.createElement('div');

//if this a re-draw, recycle checkmark tags for perf
  d.appendChild(heart).firstChild.checked = config[1];
//RT flag is secretly saved, even tho thru 1st flag (heart) the history
//was cleared by user
  d.appendChild(hourglass).firstChild.checked = config[1] && config[2];

//private global, note pndFet gbl set even if no ft will happen, to save code
  if (!(pendingFetch = config.length-4)) {
    d.appendChild(document.createTextNode(config[1] ? "No history yet" : "History off"));
  } else {
    //if RT checking on, add cached minHeight so weather div doesn't jerk
    if(config[2]) {
      if(e = localStorage.getItem('fh')) {
        d.style.minHeight = e+'px';
      }
    }
    for (i = 4; i < 10 && (e = config[i]); i++) {
      //todo template A tag
      (e2 = d.appendChild(document.createElement('a'))).href = (e[1].charAt() == 'r' ? "rstop.htm#" : "stop.htm#") + e[1].slice(1);
      e2.textContent = e[0];
      d.appendChild(document.createTextNode(" "));
      if(config[2]) {
        e2 = d.appendChild(document.createElement('span'));
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
    e = document.body;
    //push cached height of AS Name div, to prevent layout shift/jerk of
    //fav checkmarks and station list (which is a no I/O sync draw) if AS Name
    //text happens to be 2 or 3 lines, wrapped, on mobile UAs
    e2 = localStorage.getItem("as");
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
var colorStrsSUB = ["00933c","ff6319","fccc0a","286ded","6d6e71","ee352e","0078c6","996633","b933ad"];
var colorRoutesSUB = {/*"6":0,*//*"6X":0,*//*"5X":0,*//*"5":0,*//*"4":0,*/"B":1,"D":1,"F":1,"FX":1,"M":1,"R":2,"Q":2,"W":2,"N":2,"E":3,"A":3,"C":3,"GS":4,"FS":4,"H":4,"2":5,"1":5,"3":5,"SI":6,"SIR":6,"J":7,"Z":7,"7X":8,"7":8,"G":"6cbe45","L":"a7a9ac"};
/*ENDSUBCOLOR*/
/*STARTRAILCOLOR*/
var colorStrsRAIL = ["ee0034","006ec7","4d5357"];
var colorRoutesRAIL = {/*"WB":0,*//*"NC":0,*//*"NH":0,*//*"DN":0,*/"PJ":1,"HH":1,"CI":2,"12":2,"BY":"00985f","HU":"009b3a","WH":"00a1de","OB":"00af3f","MK":"00b2a9","HA":"066afe","11":"60269e","FR":"6e3219","RK":"a626aa","PW":"c60c30","HM":"ce8e00","LB":"ff6319"};
/*ENDRAILCOLOR*/

}


