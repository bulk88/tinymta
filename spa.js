(function(){
var _window = window;
var _location = location;
//IE 8-10 has AEL/QS but not document.head
var htmlEl = document.documentElement;
var head = htmlEl.firstChild;
var el, newEl;

//if(history.pushState) {

  var pageCache = {};
  var pageHistory;
  var pageHistoryIdx = 0;
  var curPathname = _location.pathname;
  var curHash = _location.hash;
  /* h.pS C5 SF5 FF4 Op 11.5 IE 10
    loc.origin C8 SF5.1 FF 21 Op 15 IE 11
  */
  var _origin = _location.origin;
/*  
  var originPF = "origin" in HTMLAnchorElement.prototype ? 0 : function (url) {
          var expectedPort = { 'http:': 80, 'https:': 443, 'ftp:': 21 }[url.protocol];
          var addPortToOrigin = url.port != expectedPort &&
            url.port !== '';

          return url.protocol +
            '//' +
            url.hostname +
            (addPortToOrigin ? (':' + url.port) : '');
  };*/
  var curPathtype = getPathType(curPathname);
  var curPCEl;
  var curPFEl;
  var pagehideCB_1p;
  var haveRoutesJS;
  var lastPLURL;

  var lirr_headers = {headers: {'accept-version': '3.0'}};
  //array is in pagetype nums [PC,PF,.JS] .JS is a bitfield
  //JSNEED_FJS is int 1, only put a object value for FJS, if it is
  //NOT window.fetch or greater than, since spa.js loads f.js if no window.fetch
  var preconPrefetElMap = [,[0,5,JSNEED_FAV()|JSNEED_DUMB()],[,,!Object.values],[3,8,JSNEED_FAV()],[2,7,JSNEED_FAV()],[0,4,JSNEED_1P()],[0,4,JSNEED_1P()],[1,6,JSNEED_1P()],[,9,!_window.requestIdleCallback],[]];

  //rethink tileMap and rIC dep b/c its PFed in spa.js here
  var preconPrefetPurgedHtm = {};
  var preconPrefetEls = ['//backend-unified.mylirr.org', '//otp-mta-prod.camsys-apps.com', '//collector-otp-prod.camsys-apps.com', ['//tiles1.tinymta.us.to','//tiles2.tinymta.us.to'], '/rstop.htm', '/rtrain.htm', '/stop.htm', '/status.htm', '/tileMap.htm',['/bk.png','/zo.png','/zi.png','/ts.gif']];
  var prefetJS = [
    ['/f.js'],
    ['/1p.js',
    function() {
      pagehideCB_1p = history.pushState.p1[0];
      //dont let undef cause reloads if UA not chrome
      !pagehideCB_1p && (pagehideCB_1p = null);
      delete history.pushState.p1;
    }],
    ['/fav.js'],
    ['/dumb.js']
  ];
  var hasLinkPF;
  var hasLinkPLImg; //imgs
  var hasLinkPC;
  var searchForAppCache;

  var genericDarkMStyle;
  var genericEls = ['style', 'body', 'html', 'div', , 'link',0];
  var requestIdleCallbackPF =
    _window.requestIdleCallback
    || ( _window.requestIdleCallback = //global for tileMap.htm
      ( // note, RAF can't be cancelled, rewrite maybe
        _window.requestAnimationFrame
        && function (cb) {
          requestAnimationFrame(function () {
            requestAnimationFrame(cb);
          });
        }
      )
      || function (callback) {
           return setTimeout(callback, 40)
        }
    );
  ;


function GENERIC_STYLE() {
  return 0;
}
function GENERIC_BODY() {
  return 1;
}
function GENERIC_HTML() {
  return 2;
}
function GENERIC_DIVONE() {
  return 3;
}
function GENERIC_DIVTWO() {
  return 4;
}
function GENERIC_PC() {
  return 5;
}
function GENERIC_PF() {
  return 6;
}


function JSNEED_FJS() {
  return 1; //MUST STAY as 1
}
function JSNEED_1P() {
  return 2;
}
function JSNEED_FAV() {
  return 4;
}
function JSNEED_DUMB() {
  return 8;
}


/*duplicate master template el, into a hot and ready to use el,
  to skip .cloneNode(), in performance critical areas*/
function reallocGenericEls() {
  var twoElArr;
  for(var i=0;i<genericEls.length;i++) {
    twoElArr = genericEls[i];
    if(!twoElArr[1]) {
      twoElArr[1] = twoElArr[0].cloneNode(0);
    }
  }
}

function STATE_PFHTMCACHE() {
  return 0;
}
function STATE_BODY() {
  return 1;
}
function STATE_PATHHASH() {
  return 2;
}
function STATE_PATHTYPE() {
  return 3;
}
  //1p and dumb phone pages, don't naturally do XHR IO
  if (!_window.fetch && !_window.f) {
    _window.f=1;//anti double load f.js in index.htm
    head.appendChild(document.createElement("script")).src = '/f.js';
  }

/*
  if(!_origin) { //PF
    _origin = originPF(_location);
  }
*/

(function(){
  var el, newEl;
  var spa = {body: document.body, style: head.getElementsByTagName('style')[0], y: _window.y};
  var state = [spa, spa.body, curPathname+curHash, curPathtype];
  var i, arr;
  var div;
  var origin_len = _origin.length;
  var ua = getInfoBrowser();

  //prefetch (htm docs) C8, Edge 12, no SFs, FF2, Opera 15, IE 11
  if((ua.name == "Chrome" && ua.major >=8) || (ua.name == "Firefox" && ua.major >=2) || (ua.name == "Opera" && ua.major >=15) || (ua.name == "Explorer" && ua.major >=11)) {
    hasLinkPF = 1;
  }

  if (el = _window.applicationCache) {
    el.onupdateready = function () {
      console.log('spa ac swap ',(_window.performance && _window.performance.now()) || Date.now());
      var ac = _window.applicationCache;
      ac.swapCache();
      ac.onupdateready = null;
    };
    searchForAppCache = !hasLinkPF;
  }

  if(
    (ua.name == "Chrome" && ua.major >=50)
    || (ua.name == "Firefox" && (ua.major == 56 || ua.major >= 85))
    || (ua.name == "Opera" && ua.major >=37)
    || (ua.name == "Safari" && ((ua.major == 11 && ua.minor >= 1) || ua.major > 11))) {
    hasLinkPLImg = 1;
  }

  if(
    (ua.name == "Chrome" && ua.major >=46)
    || (ua.name == "Firefox" && ((ua.major >= 40 && ua.major <= 70) || ua.major >= 115))
    || (ua.name == "Opera" && ua.major >=33)
    || (ua.name == "Safari" && ((ua.major == 11 && ua.minor >= 1) || ua.major > 11))) {
    hasLinkPC = 1;
  }

  for(i=0;i<genericEls.length;i++) {
    if(el = genericEls[i]) {
      newEl = document.createElement(el);
    } else {
      newEl = newEl.cloneNode(0);
    }
    genericEls[i] = [newEl];
  }
  genericEls[GENERIC_PF()][0].rel = "prefetch";
  newEl = genericEls[GENERIC_PC()][0];
  if(hasLinkPC) {
    newEl.rel = "preconnect";
    newEl.crossOrigin = "anonymous";
  } else {
    newEl.rel = "dns-prefetch";
    if(curPathname == "/") { //index.htm -> later status.htm
      el = newEl.cloneNode(0);
      el.href = "//collector-otp-prod.camsys-apps.com";
      head.appendChild(el);
    }
  }

  /* double in the array from 1 el to 2 els */
  reallocGenericEls();

  arr = head.querySelectorAll('link[rel="preconnect"]')
  if(arr.length) {
    if(arr.length > 1) {
      div = genericEls[GENERIC_DIVONE()][1];
      genericEls[GENERIC_DIVONE()][1] = 0;
      for(i=0;i<arr.length;i++) {
        div.appendChild(arr[i]);
      }
      head.appendChild(div);
    } else {
      div = arr[0];
    }
    curPCEl = preconPrefetEls[preconPrefetElMap[curPathtype][0]] = spa.pc = div;
  }

  arr = head.querySelectorAll('link[rel="prefetch"]');
  if(arr.length) {
    if(arr.length > 1) {
      div = genericEls[GENERIC_DIVTWO()][1];
      genericEls[GENERIC_DIVTWO()][1] = 0;
      for(i=0;i<arr.length;i++) {
        div.appendChild(arr[i]);
      }
      head.appendChild(div);
    } else {
      div = arr[0];
    }
    curPFEl = preconPrefetEls[preconPrefetElMap[curPathtype][1]] = spa.pf = div;
  }
//get 1p.js for Chrome scroll restore bug and any other root .js files
  div = {}; //url str to idx map
  for(i=0; i< prefetJS.length; i++) {
    div[prefetJS[i][0]] = i+1;
  }

 //h.pS FF 4 Op 11.5 , d.scripts FF 9 Op 12.1
  arr = head.getElementsByTagName('script');
  for(i=0; i < arr.length; i++) {
    newEl = arr[i];
    newEl = newEl.src.slice(origin_len);
    if(newEl = div[newEl]) {
      newEl--;
      (el = prefetJS[newEl][1]) && el(); //1p.js cb
      prefetJS[newEl] = 0;
    }
  }

  requestIdleCallbackPF(reallocGenericEls);

  spa.pg = _window.onpageshow;// usually index.htm, rare stations.htm root load
  spa.pgh = _window.onpagehide; //1p.js

  pageCache[curPathname] = spa;
  //mk global arr
  pageHistory = [state];
  if(history.state !== pageHistoryIdx)
    history.replaceState(pageHistoryIdx,0,_location.href);
})();

// from https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
function getInfoBrowser() {
  var ua = navigator.userAgent,
  tem,
  M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)\.(\d+)/g.exec(ua) || [];
    return {
      name: 'Explorer',
      major: parseInt((tem[1] || '')),
      minor: parseInt((tem[2] || ''))
    };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)\.(\d+)/);
    if (tem != null) {
      var app = tem.slice(1).toString().split(',');
      return {
        name: app[0].replace('OPR', 'Opera'),
        major: parseInt(app[1]),
        minor: parseInt(app[2])
      };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)\.(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
    M[2] = tem[2];
  }
  return {
    name: M[0],
    major: parseInt(M[1]),
    minor: parseInt(M[2])
  };
}

function getPathType(pathname) {
  var pathtype;
  switch(pathname) {
    case '/tileMap.htm':
      pathtype = 8;
      break;
    case '/stations.htm':
      pathtype = 7;
      break;
    case '/mn/stations.htm':
      pathtype = 6;
      break;
    case '/li/stations.htm':
      pathtype = 5;
      break;
    case '/':
      pathtype = 4;
      break;
    case '/stop.htm':
      pathtype = 3;
      break;
    case '/status.htm':
      pathtype = 2;
      break;
    case '/rstop.htm':
      pathtype = 1;
      break;
    case '/rtrain.htm':
      pathtype = 0;
      break;
    default:
      pathtype = 9;
      break;
  }
  return pathtype;
}
  function preload(e) {
    var el, stacode, pathname;
    var preren;
    var prerenState;
    var pathtype;
    var str;
    var spa;
    el = e.target;
    if(el.window)
      return;
    if (el.nodeName === 'FONT') { //rstop.htm colored links
      el = el.parentNode;
    }
    /* debounce dedup touchstart mousedown keypress/down */
    if (el.nodeName === 'A' && el.href != lastPLURL) {
      lastPLURL = el.href;
      if(el.href.indexOf(_origin)) //not 0
        return;
      stacode = el.hash;
      pathname = el.pathname;
      console.log('in pl', pathname);
      //IE 11 fix, no initial /
      pathname = (pathname.charAt(0) == "/") ? pathname : "/" + pathname;
/* REMOVED CODE notes
use SS sessionStorage, window.name+fetch on modern chrome, often doesn't
update window.name, causing 2 network HTTP GET I/Os, if I do very
fast mousedown/mouseup click, it does work on "slow" clicks, but
because window.name update speed unreliable, just always use SS
*/

    if(pathname === _location.pathname) /* hash nav */
      return;

    pathtype = getPathType(pathname);
      var fResp;
      var fCB1;
      /* focus assume kbd nav with tab, getting .htm is safe, 1x operation
         JSON/API calls hell no */
    if(e.type != "focus") {
      if(pathtype < 4) {
        stacode = stacode.slice(1);
        _window.S = {
          t: Date.now(),
          s: stacode,
          f: function w_S_f(cb) {
            if (fResp) {
              cb(fResp)
            } else {
              fCB1 = cb
            }
          }
        };
  /* race on old between f.js and mousedown/touchstart but IDC */
        fetch(
          pathtype === 3 ? '//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:' + stacode.slice(0, 3)
          : pathtype === 2 ? '//collector-otp-prod.camsys-apps.com/realtime/gtfsrt/ALL/alerts?type=json&apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'
          : pathtype === 1 ? '//backend-unified.mylirr.org/arrivals/' + stacode
          : '//backend-unified.mylirr.org/locations/'+stacode+'?geometry=NONE'
          , pathtype > 1 ? {} : lirr_headers
        ).then(function pLApiF1(r){
          var fCB2;
          var respJSON;
          if(fCB1) {
            fCB1(r);
          } else {
            //dwn and JSON parse in preload time gap before onClick
            //if network I/O latency vs finger is fast enough
            //preconnected and CORS-preflight cached LIRR resps are very fast
            //30 ms-40 ms on cable modem, subway times are 40-80 ms
            if(r.status == 200) {
              r.json().then(function pLApiF2 (r) {
                if(fCB2) {
                  fCB2(r);
                } else {
                  respJSON = r;
                }
              });
              fResp = {
                status: 200,
                json: function pLFkFJsn() {
                  return {
                    then: function pLFkThen(fn) {
                      if(respJSON) {
/*
spin event loop because child's onNewURL/y() assumes fetch CBs are always
real I/O deferred/called async, and child onNewURL/y() wants to do
fake__or_real_fetch(fnCB); then syncronously do
document.body.innerHTML = "IO not finished UI";
then onNewURL/y() assumes that LATER fnCB() execs, and it aka fnCB()
can do document.body.innerHTML += more_html;

slightly inefficient for onNewURL/y()/fnCB() to call "body.innerHTML =" twice
but for now all the API I/O child htm's assume 2 ".innerHTML = " even if
API resp is preloaded to full inflated json obj
*/
                        setTimeout(fn,0,respJSON);
                      } else {
                        fCB2 = fn;
                      }
                    }
                  };
                }
              };
            } else {
            fResp = r;
            }
          }
        });
        if(pathtype === 2) {
          //maybe unused/aborted R routes resp array obj, messes with status.htm code that protects race cond against routes.js
          R = void 0;
          haveRoutesJS = 1;
          head.appendChild(document.createElement('script')).src = "routes.js";
        }
      }
      //preren tilemap
      if(pathtype === 8) {
        preren = function (spa, deferredNewBody) {
          if(deferredNewBody) {
            //set delay body, b/c the SPA initial load's HTML body parse happens
            //after JS run where Net I/O started, .pr is used by our
            //onclick()/pushState to know if there is a PR-ed body el or not
            //in theory there could be a fetch() obj, but no <BODY>
            prerenState.pr = deferredNewBody;
          } else {
            _window.S = prerenState = {t:Date.now(), s:stacode, pt: pathtype, pr: spa.body};
            spa.js(0,stacode);
          }
        }
      }
    } /* evt.type != "focus" */
    /* if focus was first (kbd), with no prior touchstart/mousedown,
       let preload() run again for JSON API PLing if possible
       (not seen on Win32 desktop Chrome) */
    else {
      lastPLURL = "";
    }
      //reload 1p.js if need, was I/O prob earlier
      if((spa = pageCache[pathname]) && (!spa.pgh || typeof pagehideCB_1p !== "undefined")) {
        preren && preren(spa);
      }
      else if (spa !== 0) {
      /* kbd mode, prevent .htm being twice fetched()
         b/c focus FIRST is .htm only, 2nd call is JSON API */
        pageCache[pathname] = 0;
        spaPrefetch(pathname, pathtype, preren);
      }
    }
  }
  addEventListener('touchstart', preload, {passive: true});
  addEventListener('mousedown', preload, {passive: true});
  /* kbd tab key, desktop Chrome Win32 evt seq is
     -"keydown" old A tag,
     -"focus" new A tag
     20 ms later
     -"keyup" new A tag
  */
  addEventListener('focus', preload, {passive: true, capture: true});
  
  addEventListener('click', aELonClick);
  function aELonClick(e) {
    var str, oldspa, spa, el, el2, evt = e.target, pathname, hash, pathtype, histArr, hashNavFlag, fn, ls, prerenBody;
    lastPLURL = "";
    if (evt.nodeName === 'FONT') { //rstop.htm colored links
      evt = evt.parentNode;
    }
    if(evt.nodeName === "A") {
      if(evt.href.indexOf(_origin)) //not 0
        return;
      pathname = evt.pathname;
    //IE 11 fix, no initial /
    pathname = (pathname.charAt(0) == "/") ? pathname : "/" + pathname;

    pathtype = getPathType(pathname);

      if(spa=pageCache[pathname]) {
        hash = evt.hash;
        hashNavFlag = pathname === _location.pathname && hash != _location.hash;

        histArr = pageHistory[pageHistoryIdx];

        oldspa = histArr[STATE_PFHTMCACHE()];
        if(fn = oldspa.pgh) {
          //arg 2 non-std arg
          fn({},curPathname); //probably 1p.js if(!evt.persisted) save scroll
        }
        if(pathtype === 2) {
          //somehow a onClick happened WITHOUT onMouseDown/onTouchStart
          //keyboard TAB/ENTER or a flip phone
          if(!haveRoutesJS) {
            //maybe unused/aborted R routes resp array obj, messes with status.htm code that protects race cond against routes.js
            R = void 0;
            haveRoutesJS = 1;
            head.appendChild(document.createElement('script')).src = "routes.js";
          } else {
            haveRoutesJS = 0;
          }
        }

        if(!hashNavFlag) {
          //remove body first so no repaint attempt by browser after
          //STYLE removed
          htmlEl.removeChild(histArr[STATE_BODY()]);

          swapElMaybe(oldspa.style, spa.style);
          curPCEl = swapElMaybe(curPCEl, spa.pc);
          curPFEl = swapElMaybe(curPFEl, spa.pf);
        }
        pageHistoryIdx++;
        histArr = pageHistory[pageHistoryIdx] = [];


        ls = _window.S; //inflight prerender maybe
        if(ls && ls.pr) {
          _window.S = 0;
          if(ls.pt === pathtype && ls.s === hash
            && (Date.now()-ls.t < 3000)
          ) {
            prerenBody = ls.pr;
          }
        }

        //special GC/free images CB to tileMap.htm, if tM.htm wants a gc evt
        if(pathtype != 8) {
          (el = _window.T) && el();
        }
        pageHistory.length = pageHistoryIdx + 1; //GC Fwd entries
        
        if(prerenBody) {
          el = prerenBody;
        } else {
          el = spa.body;
          if(!el) {//add new empty BODY
            el = genericEls[GENERIC_BODY()][1];
            genericEls[GENERIC_BODY()][1] = 0;
            requestIdleCallbackPF(reallocGenericEls);
          }
        }

        histArr[STATE_BODY()] = !hashNavFlag ? htmlEl.appendChild(el) : el;

        history.pushState(pageHistoryIdx,0,evt.href);


        //let A el hash nav event run if hash only even tho A el hash nav will
        //fire popstate event with evt.state as null, but curP and curH prevent
        //popstate CB from changing UI state
        if(!hashNavFlag) {
          e.preventDefault();

          _window.y = spa.y;
          _window.onpageshow = spa.pg;
          _window.onpagehide = spa.pgh;

          if((fn = spa.js) && !prerenBody) {
             //in fn() "this." must be window. not a meth call
             fn();
          }
          //dont use evt obj anymore, /li changes to /li/li after url chg
          curPathname = pathname;
          curHash = hash;
          curPathtype = pathtype;
          //tileMap has images, b/c imgs are never real or faux-nav-ed to,
          //and PL only schedules purges for LINK rel=PF AFTER a fetch() of the
          //.htm, the purge must be scheduled explictly here
          if(pathtype == 8 && spa.pf) {
            purgePreFetchHTML(pathname, '/bk.png', 8);
            purgePreFetchHTML(pathname, '/zo.png', 8);
            purgePreFetchHTML(pathname, '/zi.png', 8);
            purgePreFetchHTML(pathname, '/ts.gif', 8);
          }
        }
        histArr[STATE_PFHTMCACHE()] = spa;
        histArr[STATE_PATHHASH()] = pathname+hash;
        histArr[STATE_PATHTYPE()] = pathtype;
        console.log('on click have ent ', (_window.performance && _window.performance.now()) || Date.now());
      } else {
       console.log('on click no cache spa ent ',(_window.performance && _window.performance.now()) || Date.now());
       //alert('on click no cache spa ent ');
                 e.preventDefault();
      }
    }
  }
  
onpopstate = function (e) {
  var evt = e;
  var el;
  var el2;
  var newState;
  var newPathtype;
  var newPathname = _location.pathname;
  var newHash = _location.hash;
  //null if errors/problems, very old safari always calls oPS with
  //null on "onload" new page
  e = e.state;

  if(e === null) {
    //console.log('spa leave 3 '+newPathname);
    return;
  }

  //hash only nav back or forwards
  if(curPathname == newPathname && curHash != newHash) {;
    curHash = newHash;
    //console.log('spa leave 1 '+newPathname);
    return;
  }

  var s = pageHistory[pageHistoryIdx];
  var oldspa = s[STATE_PFHTMCACHE()];
  /* must run oph with old URL before possible location.reload() below */
  if(el = oldspa.pgh) {
    //arg 2 non-std arg
    el({},curPathname);  //probably 1p.js if(!evt.persisted) save scroll
  }
  //a refresh
  if(e === pageHistoryIdx || e >= pageHistory.length
  ) //a refresh, or forward after refresh (no future state)
  {
    //console.log('spa leave 2 '+newPathname, location.pathname, curPathname, performance.now());
    /* disarm oph, it fires with aborted (THIS RN window.location) URL AFTER
       this ops evt hand exec/returns, and oph has "WRONG" url in location
       and a real event obj, not our "curPathname" fakery */
    _window.onpagehide = null;
    _location.reload();
    return;
  }

  //load new from cache
  newState = pageHistory[e];
  newPathtype = newState[STATE_PATHTYPE()];
  var spa = newState[STATE_PFHTMCACHE()];


  curPathname = newPathname;
  curHash = newHash;

  //rmv old BODY dom tree
  htmlEl.removeChild(s[STATE_BODY()]);
  swapElMaybe(oldspa.style, spa.style);
  curPCEl = swapElMaybe(curPCEl, spa.pc);
  curPFEl = swapElMaybe(curPFEl, spa.pf);

  //set new page IDX to global
  pageHistoryIdx = e;

  curPathtype = newPathtype;

  htmlEl.appendChild(newState[STATE_BODY()]);
  _window.y = spa.y;
  _window.onpageshow = el = spa.pg;
  _window.onpagehide = spa.pgh;
  el && el({persisted:1});
};
onpopstate.p = [aELonClick, preload]; /*for dumb.js*/

//delete these prefetch Els, the .htm was loaded and parsed into JS/DOM long ago
//stop banging disk I/O or network I/O or the dom tree unneceserily
function purgePreFetchHTML(parentPathname, pathname, pFIdxToFree) {

  //todo test tilemap vs its images
  preconPrefetPurgedHtm[pathname] = 1;
  requestIdleCallbackPF(function(){

     var pf, pn, el, el2;
     var origin_len = _origin.length;
     var href;

      var spa = pageCache[parentPathname];
      if(pf=spa.pf) {
        if(pf.nodeName === 'DIV') {
          el = pf.firstChild;
          while(el) {
           el2 = el.nextElementSibling;
            href = el.href; //href .htms more common vs tileMap
            if(!href) //img el
              href = el.src;
            href = href.slice(origin_len);
            if(href == pathname) {
              pf.removeChild(el);
              break;
            }
            el = el2;
          }
          if(!pf.firstChild) {
           if(pn = pf.parentNode) {
              pn.removeChild(pf);
            }
            delete spa.pf;
            if(curPFEl === pf) {
              curPFEl = null;
            }
            preconPrefetEls[preconPrefetElMap[pFIdxToFree][1]] = null;
          }
        } else {
          href = pf.href; //href .htms more common vs tileMap
          if(!href) //img el
            href = pf.src;
          href = href.slice(origin_len);
          if(href == pathname) {
            if(pn = pf.parentNode) {
              pn.removeChild(pf);
            }
            delete spa.pf;
            if(curPFEl === pf) {
              curPFEl = null;
            }
            preconPrefetEls[preconPrefetElMap[pFIdxToFree][1]] = null;
          }
        }
      }
  }); //end CB to .rIdleC/.rAF
}
function setLinkEl(linkType /*0 PC 1 PF*/, href) {
  var hrefSuffix, el, isImg;
  if (linkType && preconPrefetPurgedHtm[href]) {
    return 0;
  }
  if(linkType) {
    hrefSuffix = href.slice(-4);
    /*for tileMap */
    if (hrefSuffix == '.png' || hrefSuffix == '.gif') {
      isImg = 1;
    }
    if (isImg && !hasLinkPLImg) {
      el = document.createElement('img');
      el.src = href;
      return el;
    }
  }
  hrefSuffix = genericEls[GENERIC_PC()+linkType];
  if(el = hrefSuffix[1]) {
    hrefSuffix[1] = 0;
  } else {
    el = hrefSuffix[0].cloneNode(0); //rareish, clone from real master El
  }
  if (linkType) {
    if(isImg) {
    /* for tileMap */
      el.rel = 'preload';
      el.as = 'image';
    }
  } else {
    if (/*startsWith*/!href.indexOf('//tiles')) {
       el.crossOrigin = null; //null from UA JS DOM, 0 will trig "anon"
     }
  }
 
  el.href = href;
  return el;
}

function inflateLinkElsPcPF(strArrIdx, linkType /*0 PC 1 PF*/) {
  var
  i,
  el,
  div,
  strArr = preconPrefetEls[strArrIdx];

  if (typeof strArr == "string") {
    div = setLinkEl(linkType, strArr);
    if(linkType) div.onload = function(e) {
      //debugger
      };
  } else {
    //DIVONE or DIVTWO
    div = genericEls[GENERIC_DIVONE()+linkType][1];
    genericEls[GENERIC_DIVONE()+linkType][1] = 0;
    for (i = 0; i < strArr.length; i++) {
      el = setLinkEl(linkType, strArr[i]);
      el && div.appendChild(el);
          if(linkType && el) el.onload = function(e) {
      //debugger
      };
    }
/* I assume .fC faster than .cN.length and dont want a JS bool var here for
   JS code size */
    if(!div.firstChild) {
      div = 0;
    }
  }
  return preconPrefetEls[strArrIdx] = div;
}

function swapElMaybe(el,el2) {
  if(el !== el2) {
    if(el && el2) {
      head.replaceChild(el2, el);
    } else {
      if(el)
        head.removeChild(el);
      if(el2)
        head.appendChild(el2);
    }
  }
  return el2;
}
function loadJS(idx, finArr) {
  var el = document.createElement('script');
  el.onerror = //anti-UI-freeze
  el.onload =  //onload runs AFTER script body execs
    function (evt) {
      if(evt.type == "error") {
        //retry I/O eventually
        head.removeChild(el);
      } else {
        //optional CB, used by 1p.js
        (evt = prefetJS[idx][1]) && evt()
        prefetJS[idx] = 0;
        el.onerror = el.onload = 0; //GC fn
      }
      if(!--finArr[0])
        finArr[1]();
  };
  el.src = prefetJS[idx][0];
  console.log('spa ld .js ', el.src, (_window.performance && _window.performance.now()) || Date.now());
  head.appendChild(el);
  finArr[0]++;
}

//if != 200???
function spaPrefetch(pathname, pathtype, prerenFn) {
  var spa = {}, pCpFArr, pCpFIdx, pCpFEl, el, origin_len, str, loadJSCBArr, evt_cb_setter, fetch_js_all_cb;
  var parentPathname = curPathname;
  var parentPathtype = curPathtype;
  
  try {
        if(pCpFArr = preconPrefetElMap[pathtype]) {
          //JS_NEED
          pCpFEl = pCpFArr[2];
          for(pCpFIdx=0; pCpFEl; pCpFIdx++) {
            if(pCpFEl & 1) {
              if(prefetJS[pCpFIdx]) {
                if(!loadJSCBArr) {
                  loadJSCBArr = [0,
                  function () {
                    if(fetch_js_all_cb !== 1)
                    fetch_js_all_cb();
                    fetch_js_all_cb = 0;
                  }];
                }
                loadJS(pCpFIdx, loadJSCBArr);
                fetch_js_all_cb = 1;
              }
            }
            pCpFEl >>= 1;
          }
        }
        
    //arg 3 private API want text resp
    console.log('pl f ', pathname, (_window.performance && _window.performance.now()) || Date.now());
    fetch(pathname,{},1).then(function pLFetCB(r) {
    console.log('pl f 2 ', pathname, (_window.performance && _window.performance.now()) || Date.now());
      r.text().then(function pLFetTextCB(r) {
    console.log('pl f 3 ', pathname, (_window.performance && _window.performance.now()) || Date.now());
        // .p1 for grep
        var start, scriptStart, scriptEnd, el, old_fn_y, old_pg_rel, haveBodyElCB, need1pjs;
        if((start = r.indexOf("<script async defer src=")) != -1) {
          start += 24;
          old_fn_y = r.slice(start, start = r.indexOf('>', start));
          if(old_fn_y == "/1p.js") {
            need1pjs = 1;
          }
        } else {
          start = 0;
        }

        if((start = r.indexOf('<style>', start)) != -1) {
          start += 7 /*'<style>'.length*/;
          old_fn_y = r.slice(start, start = r.indexOf('</style>', start));
          start += 8;
          el = 0;
          //de dup common STYLE el for perf
          if(old_fn_y == ":root{color-scheme:light dark}") {
            el = genericDarkMStyle;
            if(!el)
              old_pg_rel = 1;
          }
          if(!el) {
            el = genericEls[GENERIC_STYLE()][1];
            genericEls[GENERIC_STYLE()][1] = 0;
            requestIdleCallbackPF(reallocGenericEls);
            el.textContent = old_fn_y;
            if(old_pg_rel) {
              genericDarkMStyle = el;
            }
          }
          spa.style = el;
        } else {
          start = 0;
        }
        //status.htm don't exec inline SCRIPT in HEAD, that tag is for globals decl
        //STYLE parse advs var start to almost end of HEAD/start of BODY
        if((scriptStart = r.indexOf('<script>',start)) != -1) {
          old_fn_y = _window.y;
          scriptEnd = r.indexOf('</script>', scriptStart+8 /*'<script>'.length*/);
          Function(r.slice(scriptStart+8 /*'<script>'.length*/, scriptEnd))();
          //tmp var
          el = spa.js = onhashchange;
          if(haveBodyElCB = el.body) {
            delete el.body; //anti-leak, el is really onDrawURL() fn obj
          }
          spa.y = _window.y;
          _window.y = old_fn_y;
          onhashchange = null;
          //run new page's drawUrl/SPA body-less
          prerenFn && prerenFn(spa);
        }
        //dont parse an html BODY if this .htm is bodyless API viewer
        if(r.indexOf('No javascript', start) == -1) {
          //don't send large script TAG thru HTM parser
          //also skips 98% of HEAD contents, by starting after STYLE
          //unclosed </head> in not-mini sent thru innerHTML but no diff
          //htm parsers deal with unclosed tags on the regular
          if(scriptStart != -1) {
            r = r.slice(start,scriptStart)
                +r.slice(scriptEnd+9 /*'</script>'.length*/);
          } else {
            r = r.slice(start);
          }
          //can't do bodyEl.innerHTML = , tileMap has BODY attrs
          el = genericEls[GENERIC_HTML()][1];
          genericEls[GENERIC_HTML()][1] = 0;
          //dupe rIC call
          requestIdleCallbackPF(reallocGenericEls);
          el.innerHTML = r; //time me
          //extract body
          spa.body = el = el.lastElementChild;
          //maybe delivery body to a inflight prerender obj
          //does NOT call onNewURL
          prerenFn && prerenFn(0/*unused spa arg*/, el);
          if(haveBodyElCB) {
            haveBodyElCB(el);
          }
        }
        if(!fetch_js_all_cb) {
          if(need1pjs) {
            spa.pgh = pagehideCB_1p
          }
          pageCache[pathname] = spa;
          purgePreFetchHTML(parentPathname,pathname,parentPathtype);
        //wait for 1p.js before writing spa cache ent to global
        } else {
          fetch_js_all_cb = function() {
            if(need1pjs) {
              spa.pgh = pagehideCB_1p
            }
            pageCache[pathname] = spa;
            purgePreFetchHTML(parentPathname,pathname,parentPathtype);
          };
        }
      });//.text() CB
    }); //fet CB

    /* this is for NEXT future nav some seconds/mins away, not current maybe
    nav/PL, appendChild(SCRIPT) is marked "low" in chrome, API fetch() marked
    "high", and the PC/PFs below just waste microseocnds/ms before time critical
    I/O hits UA I/O stack, too many PCs and PFs can trigger a Chrome throttle
    I think */
    if(pCpFArr){
      //LINK preconnect
      pCpFIdx = pCpFArr[0];
      pCpFEl = preconPrefetEls[pCpFIdx];
      if(pCpFEl && pCpFEl.length) {
        pCpFEl = inflateLinkElsPcPF(pCpFIdx,0);
      }
      curPCEl = swapElMaybe(curPCEl, spa.pc = pCpFEl);

      //LINK prefetch
      pCpFIdx = pCpFArr[1];
      pCpFEl = preconPrefetEls[pCpFIdx];
      if(pCpFEl && pCpFEl.length) {
        pCpFEl = inflateLinkElsPcPF(pCpFIdx,1);
      }
      curPFEl = swapElMaybe(curPFEl, spa.pf = pCpFEl);
      requestIdleCallbackPF(reallocGenericEls);
    }
    if(searchForAppCache && pathtype == 3) { //stop.htm
      //idea from https://blog.jamesdbloom.com/TipsForUsingApplicationCache.html
      el = document.createElement('iframe');
      el.src = "/stopac.htm";
      console.log('add stopac el ',(_window.performance && _window.performance.now()) || Date.now());
      head.appendChild(el);
    }
  } catch (e) {}
} // end function spaPrefetch(pathname, pathtype, prerenFn) {

//}//end block if (history.pushState) {
})();
