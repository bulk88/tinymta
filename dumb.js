//don't bother with hotkeys < IE 9 cursor/mouse based
//all Chrome/Kai/FFs/ASOPs/webkits in history have addEventListener()
/* IE <9 doesn't have document.querySelector, and 4G no touch flips, are always
   FF/WEBK, not IE, lets ignore IE Windows Mobile flips from early 2000s, I dont
   have one to test with
*/
(function(){
//IE 8-10 has AEL/QS but not document.head+var el, newEl;
var htmlEl = document.documentElement;
var head = htmlEl.firstChild;
var el, newEl;

if(history.pushState) {

  var pageCache = {};
  var pageHistory;
  var pageHistoryIdx = 0;
  var curPathname = location.pathname;
  var curHash = location.hash;
  var _origin = location.origin;
  var curPathtype = getPathType(curPathname);
  var curPCEl;
  var curPFEl;
  var pagehideCB_1p;

  var lirr_headers = {headers: {'accept-version': '3.0'}};
  //array is in pagetype nums
  var preconPrefetElMap = [,[0,5],,[3,8],[2,7],[0,4],[0,4],[1,6],[,9],[]];
  var preconPrefetPurgedHtm = {};
  var preconPrefetEls = ['//backend-unified.mylirr.org', '//otp-mta-prod.camsys-apps.com', '//collector-otp-prod.camsys-apps.com', ['//tiles1.tinymta.us.to','//tiles2.tinymta.us.to'], '/rstop.htm', '/rtrain.htm', '/stop.htm', '/status.htm', '/tileMap.htm',['/bk.png','/zo.png','/zi.png','/ts.gif']];
  var genericDarkMStyle;
  var genericEls = ['style', 'body', 'html', 'div', , 'link',0];
  var requestIdleCallbackPF =
    this.requestIdleCallback
    || ( // note, RAF can't be cancelled, rewrite maybe
      this.requestAnimationFrame
      && function (cb) {
        requestAnimationFrame(function () {
          requestAnimationFrame(cb);
        });
      }
    )
    || function (callback) {
         return setTimeout(callback, 40)
      }
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
  if (!this.fetch && !this.f) {
    f=1;//anti double load f.js in index.htm
    head.appendChild(document.createElement("script")).src = '/f.js';
  }

(function(){
  var el, newEl;
  var spa = {body: document.body, style: head.getElementsByTagName('style')[0], y: this.y};
  var state = [spa, spa.body, curPathname+curHash, curPathtype];
  var i, arr;
  var div;

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
  newEl.rel = "preconnect";
  newEl.crossOrigin = "anonymous";

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
  requestIdleCallbackPF(reallocGenericEls);

  if(el_fn = window.onpageshow) {
    spa.pg = el_fn;
  } else {
    //fav.js delayed exec
    window.onpageshow = function (unused_evt, fn) {
      spa.pg = fn;
      window.onpageshow = fn;
    };
  }

  pageCache[curPathname] = spa;
  //mk global arr
  pageHistory = [state];
  if(history.state !== pageHistoryIdx)
    history.replaceState(pageHistoryIdx,0,location.href);
})();


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
  function preload(evt) {
    var el, stacode, pathname, isTouchStart = evt.type === 'touchstart';
    var preren;
    var prerenState;
    var pathtype;
    var str;
    var spa;
    evt = evt.target;
    if (evt.nodeName === 'FONT') { //rstop.htm colored links
      evt = evt.parentNode;
    }
    if (evt.nodeName === 'A' && (isTouchStart || !evt.tmts)) {
      if(evt.origin !== _origin)
        return;
      stacode = evt.hash;
      pathname = evt.pathname;
      //IE 11 fix, no initial /
      pathname = (pathname.charAt(0) == "/") ? pathname : "/" + pathname;
/* REMOVED CODE notes
use SS sessionStorage, window.name+fetch on modern chrome, often doesn't
update window.name, causing 2 network HTTP GET I/Os, if I do very
fast mousedown/mouseup click, it does work on "slow" clicks, but
because window.name update speed unreliable, just always use SS
*/

    if(pathname === location.pathname)
      return;

    if(pathname.length >= (10 /*'/jsrdt.htm'.length*/)
      && (pathname.lastIndexOf('/jsrdt.htm') === (pathname.length-(10 /*'/jsrdt.htm'.length*/)))){
      evt.pathname = pathname = pathname.replace('/jsrdt.htm', '/js/rt.htm');
    }
    pathtype = getPathType(pathname);
      var fResp;
      var fCB1;
      if(pathtype < 4) {
        stacode = stacode.slice(1);
        window.S = {
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
          R = 0;
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
            window.S = prerenState = {t:Date.now(), s:stacode, pt: pathtype, pr: spa.body};
            spa.js(0,stacode);
          }
        }
      }
      //reload 1p.js if need, was I/O prob earlier
      if((spa = pageCache[pathname]) && (!spa.p1 || typeof pagehideCB_1p !== "undefined")) {
        preren && preren(spa);
      } else {
        spaPrefetch(pathname, pathtype, preren);
      }
      evt.tmts = isTouchStart;
    }
  }
  addEventListener('touchstart', preload, {passive: true});
  addEventListener('mousedown', preload, {passive: true});
  
  addEventListener('click', function aELonClick(e) {
    var str, oldspa, spa, el, el2, evt = e.target, pathname, hash, pathtype, histArr, hashNavFlag, fn, ls, prerenBody;
    if (evt.nodeName === 'FONT') { //rstop.htm colored links
      evt = evt.parentNode;
    }
    if(evt.nodeName === "A") {
      if(evt.origin !== _origin)
        return;
      pathname = evt.pathname;
    //IE 11 fix, no initial /
    pathname = (pathname.charAt(0) == "/") ? pathname : "/" + pathname;
    if(pathname.length >= (10 /*'/jsrdt.htm'.length*/)
      && (pathname.lastIndexOf('/jsrdt.htm') === (pathname.length-(10 /*'/jsrdt.htm'.length*/)))){
      evt.pathname = pathname = pathname.replace('/jsrdt.htm', '/js/rt.htm');
    }
    pathtype = getPathType(pathname);

      if(spa=pageCache[pathname]) {
        hash = evt.hash;
        hashNavFlag = pathname === location.pathname && hash != location.hash;

        histArr = pageHistory[pageHistoryIdx];

        oldspa = histArr[STATE_PFHTMCACHE()];

        if(oldspa.p1 && pagehideCB_1p && curPathtype !== pathtype) {
          //arg 2 non-std arg
          pagehideCB_1p({},curPathname); //if(!evt.persisted) save scroll
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


        ls = window.S; //inflight prerender maybe
        if(ls && ls.pr) {
          window.S = 0;
          if(ls.pt === pathtype && ls.s === hash
            && (Date.now()-ls.t < 3000)
          ) {
            prerenBody = ls.pr;
          }
        }

        //special GC/free images CB to tileMap.htm, if tM.htm wants a gc evt
        if(pathtype != 8) {
          (el = this.T) && (el = el.GC) && el();
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

          y = spa.y;
          window.onpageshow = spa.pg;

          if((fn = spa.js) && !prerenBody) {
             //this must be window. not a meth call
             fn();
          }
          //dont use evt obj anymore, /li changes to /li/li after url chg
          curPathname = pathname;
          curHash = hash;
          curPathtype = pathtype;
          //tileMap has images
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
      } else {
       console.log('on click no cache spa ent');
      }
    }
  });
  
onpopstate = function (e) {
  var evt = e;
  var el;
  var el2;
  var newState;
  var newPathtype;
  var newPathname = location.pathname;
  var newHash = location.hash;
  //null if errors/problems, very old safari always calls oPS with
  //null on "onload" new page
  e = e.state;

  if(e === null) {
    console.log('spa leave 3 '+newPathname);
    return;
  }

  //hash only nav back or forwards
  if(curPathname == newPathname && curHash != newHash) {;
    curHash = newHash;
    console.log('spa leave 1 '+newPathname);
    return;
  }
  //a refresh
  if(e === pageHistoryIdx || e >= pageHistory.length
  ) //a refresh, or forward after refresh (no future state)
  {
    console.log('spa leave 2 '+newPathname);
    location.reload();
    return;
  }

  var s = pageHistory[pageHistoryIdx];
  var oldspa = s[STATE_PFHTMCACHE()];

  //load new from cache
  newState = pageHistory[e];
  newPathtype = newState[STATE_PATHTYPE()];
  var spa = newState[STATE_PFHTMCACHE()];

  if(oldspa.p1 && pagehideCB_1p && curPathtype !== newPathtype) {
    //arg 2 non-std arg
    pagehideCB_1p({},curPathname); //if(!evt.persisted) save scroll chrome bug
  }

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
  y = spa.y;
  onpageshow = el = spa.pg;
  el && el({persisted:1});
};

//delete these prefetch Els, the .htm was loaded and parsed into JS/DOM long ago
//stop banging disk I/O or network I/O or the dom tree unneceserily
function purgePreFetchHTML(parentPathname, pathname, pFIdxToFree) {

  //todo test tilemap vs its images
  preconPrefetPurgedHtm[pathname] = 1;
  requestIdleCallbackPF(function(){

     var pf, pn, el, el2;
     var origin_len = location.origin.length;
     var href;

      var spa = pageCache[parentPathname];
      if(pf=spa.pf) {
        if(pf.nodeName === 'DIV') {
          el = pf.firstChild;
          while(el) {
           el2 = el.nextElementSibling;
            href = el.href.slice(origin_len);
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
          href = pf.href.slice(origin_len);
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
  var hrefSuffix, el;
  if (linkType && preconPrefetPurgedHtm[href]) {
    return 0;
  }
  hrefSuffix = genericEls[GENERIC_PC()+linkType];
  if(el = hrefSuffix[1]) {
    hrefSuffix[1] = 0;
  } else {
    el = hrefSuffix[0].cloneNode(0); //rareish, clone from real master El
  }
  if (linkType) {
    hrefSuffix = href.slice(-4);
    /*for tileMap */
    if (hrefSuffix == '.png' || hrefSuffix == '.gif') {
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
  } else {
    //DIVONE or DIVTWO
    div = genericEls[GENERIC_DIVONE()+linkType][1];
    genericEls[GENERIC_DIVONE()+linkType][1] = 0;
    for (i = 0; i < strArr.length; i++) {
      el = setLinkEl(linkType, strArr[i]);
      el && div.appendChild(el);
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

//if != 200???
function spaPrefetch(pathname, pathtype, prerenFn) {
  var spa = {}, pCpFArr, pCpFIdx, pCpFEl, el, evt_cb_setter, is1pjs, fetch_js_all_cb;
  var parentPathname = curPathname;
  var parentPathtype = curPathtype;
  
  try {
    //get 1p.js for Chrome scroll restore bug, we can't find out if bad UA until
    //1p.js executes, todo, stations.htm prob preloaded to disk already
    //but 1p.js isnt, so start this I/O first if needed
    
    if (pathname.indexOf('/stations') != -1) {
      spa.p1 = is1pjs = 1;
      if (typeof pagehideCB_1p === "undefined") {
        //win.pushS C5 FF4, O11.5, SF5, IE10
        //pagehide C4 FF6, O15, SF5, IE 11
        //must guard for UAs no win.onpagehide evt
        onpopstate.o /*one*/ = evt_cb_setter = function (evt_cb,err) {
          if(err) {
            //retry I/O eventually
            head.removeChild(el);
          } else {
            //dont let undef cause reloads if UA not chrome
            pagehideCB_1p = evt_cb ? evt_cb : 0;
          }
          el.onerror = 0; //GC fn
          onpopstate.o = 0;
          if(fetch_js_all_cb)
            fetch_js_all_cb();
          else
            fetch_js_all_cb = 1;
        };
        el = document.createElement('script');
        el.onerror = function () { //anti-UI-freeze
        //retry I/O eventually
          evt_cb_setter(0,1);
        };
        el.src = "1p.js";
        head.appendChild(el);
      } else {
        fetch_js_all_cb = 1;
      }
    }

        if(pCpFArr = preconPrefetElMap[pathtype]) {

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
        
    //arg 3 private API want text resp
    fetch(pathname,{},1).then(function pLFetCB(r) {
      r.text().then(function pLFetTextCB(r) {
        // .p1 for grep
        var start, scriptStart, scriptEnd, el, old_fn_y, old_pg_rel, haveBodyElCB;

        if((start = r.indexOf('<style>')) != -1) {
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
          old_fn_y = y;
          old_pg_rel = window.onpageshow;
          window.onpageshow = null;/*IE 11 doesnt like 0*/
          scriptEnd = r.indexOf('</script>', scriptStart+8 /*'<script>'.length*/);
          Function(r.slice(scriptStart+8 /*'<script>'.length*/, scriptEnd))();
          //tmp var
          el = spa.js = onhashchange;
          if(haveBodyElCB = el.body) {
            delete el.body; //anti-leak, el is really onDrawURL() fn obj
          }
          spa.y = y;
          spa.pg = window.onpageshow;
          y = old_fn_y;
          window.onpageshow = old_pg_rel;
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
        if(!is1pjs || fetch_js_all_cb) {
          pageCache[pathname] = spa;
          purgePreFetchHTML(parentPathname,pathname,parentPathtype);
        //wait for 1p.js before writing spa cache ent to global
        } else {
          fetch_js_all_cb = function() {
            pageCache[pathname] = spa;
            purgePreFetchHTML(parentPathname,pathname,parentPathtype);
          };
        }
      });//.text() CB
    }); //fet CB
  } catch (e) {}
}

}//end block if (this.pushState) {

if (this.addEventListener) {
  function kph(e_realkey) {
    //ZTE flip Chrome 0 key conflicts with checkbox's
    //space key
    if(e_realkey.keyCode === 32
       && e_realkey.target.nodeName === 'INPUT')
      return;
    e_realkey = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,0,1,2,3,4,5,6,7,8,9,,,,,,,,2,,,3,,,4,,,5,,,6,,,7,,,,8,,,9,,,,,,,,,,2,,,3,,,4,,,5,,,6,,,7,,,,8,,,9][e_realkey.keyCode];

    //gz 978 to 971 chg, +x===x vs typeof x === 'number'
    if (+e_realkey===e_realkey) {
      e_realkey = document.querySelector('[accesskey="' + e_realkey + '"]');
      //avoid err console noise for "called method click on undef"
      e_realkey && e_realkey.click()
    }
    return;
//ODL CODE bigger wire format, optimized above
    //note table below can be used by 3rd parties for something else
    //I only need 0-9, not a map app or game
    switch (e_realkey.keyCode) {
/*
      case 38: //up arrow
        e_realkey = 'Up';
        break;
      case 39: //right arrow
        e_realkey = 'Right';
        break;
      case 40: //down arrow
        e_realkey = 'Down';
        break;
      case 37: //left arrow
        e_realkey = 'Left';
        break;
      case 13: //center
        e_realkey = 'Enter';
        break;
      case 8: //C button
        e_realkey = 'Backspace';
        break;
*/
      case 49: //asci 1
        e_realkey = 1;
        break;
      case 50: //asci 2
      case 65: //asci A
      case 97: //asci a
        e_realkey = 2;
        break
      case 51: //asci 3
      case 68: //ascii D
      case 100: //ascii d
        e_realkey = 3;
        break;
      case 52: //asci 4
      case 71: //asci G
      case 103: //asci g
        e_realkey = 4;
        break;
      case 53: //asci 5
      case 74: //asci J
      case 106: //asci j
        e_realkey = 5;
        break;
      case 54: //asci 6
      case 77: //asci M
      case 109: //asci m
        e_realkey = 6;
        break;
      case 55: //asci 7
      case 80: //asci P
      case 112: //asci p
        e_realkey = 7;
        break;
      case 56: //asci 8
      case 84: //asci T
      case 116: //asci t
        e_realkey = 8;
        break;
      case 57: //asci 9
      case 87: //asci W
      case 119: //asci w
        e_realkey = 9;
        break;
      case 48: //asci 0 KaiOS
      case 32: //asci SPACE ZTE Chrome
        e_realkey = 0;
        break;
/*
      case 190: //asci period
      case 46: //asci peroid
        e_realkey = '*';
        break;
*/
      default:
        e_realkey = null;
    }
  }
  //FF3.0 throws exception "not enough arguments" if #3 missing
  addEventListener('keyup', kph, 0);
  addEventListener('keypress', kph, 0);
}// end if (this.addEventListener) {

/*
use nextElementSibling for perf/native/C++,
naturally FALSE if UA too old
NES is C4, S4, FF3.5, Op10, IE9
FF 2 has PF nav but abandon support for perf
PC and DNS-F r newer than .NES


PL (sme) C50, S11.1,            FF 55, FF >=85, no IE
PF (nav) C 8, S13.1 >_ all bkn, FF 2, IE 11 full, DNS only since 9
PC       C46, S11.1,            FF 39-70 >=115, no IE
DNS-F    C 4, S5,               FF 3.5-126 typ bkn, IE 10-11, IE 9 use PF (don't)
*/

  el = head.firstChild;
  while (el) {
  //link tag, its rel/href attrs, all 3 defined HTML 3.02, dont use .getAttribute()
  //don't test el.nodeName === 'LINK', to save wire bytes
  //upper case chars esp bad for GZ, undef === "str" good enough and perf enough (vs ==)
      if (el.rel === 'preconnect') {
        newEl = document.createElement('link');
        newEl.rel = 'dns-prefetch';
        newEl.href = el.href;
        head.appendChild(newEl);
      }
      //link preload as=document unimplimented and console warns on Chrome.
      //as=script testing shows FF 115 double downloads, BAD
      //but C109 does preload as=script static tag in index.htm
      //AND DOES CACHE for navigates to stations.htm, but Chrome will probably
      //break one day like FF and double download for cache purity/security,
      //B/C Chrome 109 (obv FF too) for <script> vs fetch() the req headers are
      //"sec-fetch-dest: script" vs "sec-fetch-dest: empty"
      //"sec-fetch-mode: no-cors" vs "sec-fetch-mode: cors"
      //even tho BOTH are "sec-fetch-site: same-origin"

      //B/c I cant test modern SF, and very old browsers and SF 17 have .appcache
      //don't bother with any fallback navigate prefetches strategies

      //SF 3.1 has AEL/QS but no NES and no DNS-PF, old SF will
      //quietly die here, no exceptions thrown
    el = el.nextElementSibling;
  }

//.SEMV() is IE only FN all vers
if(this.ScriptEngineMajorVersion
  && (
    (ScriptEngineMajorVersion() < 5)
    || (ScriptEngineMajorVersion() === 5 && ScriptEngineMinorVersion() < 5)
  )) {
  onload = function () {
    //warning, d.anchors is ONLY name="#" hash nav elements, d.links correct
    //cache arr.length b/c this a live node list/overhead
    var arr = document.links, len = arr.length, i = 0
      , el, pn, pnlen, needle, newpn;
    for(;i<len;i++){
      el = arr[i];
      pn = el.pathname;
      //match only 1 filename for perf reasons once path IDed, var needle
      //deals with variable ".."s and "/"s
      //fav sta feat in index.htm is only place with MORE THAN ONE unique
      //not IE 5.0 compat <A></A> links, but IE 5.0 def not compat with
      //fav feat, so optimize for perf (1 needle)
      if (needle) {
        if(needle === pn) {
          el.pathname = newpn;
        }
      } else {
//      status.htm
//       rstop.htm
//        stop.htm
//"stop.htm".length is 8, note for tags <a href=# name=RQ> and <a href=#7X>
//el.pathname is NOT "" "/" but the full LONG URL bar file, can't optimize
//for el.pathname.length
        pnlen = pn.length-8;
        newpn = pn.charAt(pnlen);
        //"s" in "stop.htm" or "rstop.htm", counted from right, for code size,
        //don't check the "r" in rstop or fully check "a" aka "status.htm"
        //~.iF() is "!== -1", IDC abt _.htm urls, they arent used in sta pickers
        if((newpn === 's' || newpn === 'a') && ~pn.indexOf(newpn === 's' ? "stop" : "atus", pnlen)) {
           newpn = (needle = pn).slice(0,-4)+'ie50.htm';
           // gz bytes 978 with 2nd "el.pathname = "
           // vs 976 gz bytes with "i--" trick to rerun loop
           i--;
        }
      }//no needle
    }// el loop
    onload = null; //GC FWIW
  };
}// end if(this.ScriptEngineMajorVersion

})();
