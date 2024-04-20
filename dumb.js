//don't bother with hotkeys < IE 9 cursor/mouse based
//all Chrome/Kai/FFs/ASOPs/webkits in history have addEventListener()
/* IE <9 doesn't have document.querySelector, and 4G no touch flips, are always
   FF/WEBK, not IE, lets ignore IE Windows Mobile flips from early 2000s, I dont
   have one to test with
*/
(function(){
if (history.pushState) {
  //IE 8-10 has AEL/QS but not document.head
  var head = document.documentElement.firstChild, el, newEl;
  
  var pageCache = {};
  var pageHistory = [];
  var pageHistoryIdx = 0;
  var curPathname = location.pathname;
  var curHash = location.hash;
  var curPathtype;
  var pagehideCB_1p;
  var onPGClosure;
  //array is in pagetype nums
  var preconPrefetElMap = [,[0,5],,[3,8],[2,7],[0,4],[0,4],[1,6]];
  //can't expose tiles2 oh well
  var preconPrefetEls = ['//backend-unified.mylirr.org', '//otp-mta-prod.camsys-apps.com', '//collector-otp-prod.camsys-apps.com', '//tiles1.tinymta.us.to', '/rstop.htm', '/rtrain.htm', '/stop.htm', '/status.htm', '/tileMap.htm'];

function STATE_BODY() {
  return 0;
}
function STATE_STYLE() {
  return 1;
}
function STATE_FNY() {
  return 2;
}
function STATE_PATHHASH() {
  return 3;
}
function STATE_PATHTYPE() {
  return 4;
}
function STATE_PGSHOWFN() {
  return 5;
}
function STATE_PC() {
  return 6;
}
function STATE_PF() {
  return 7;
}
        //save style, in body special case for /
        
        //TODO mk obj and array same time
        pageHistory[STATE_STYLE()] = document.documentElement.lastChild.getElementsByTagName('style')[0];
        //save BODY
        pageHistory[STATE_BODY()] = document.body;
        
        pageHistory[STATE_PATHHASH()] = curPathname+curHash;
        pageHistory[STATE_PATHTYPE()] = curPathtype = 4;
        //async race fav.js vs dumb.js
        if(el = window.onpageshow) {
          pageHistory[STATE_PGSHOWFN()] = el;
        } else {
          onPGClosure = [pageHistory];
          window.onpageshow = function (fn) {
            onPGClosure[0][STATE_PGSHOWFN()] = fn;
            onPGClosure[1].pg = fn;
            window.onpageshow = fn;
            onPGClosure = 0; //GC
          };
        }
        pageHistory[STATE_FNY()] = y;

        pageCache[curPathname] = {body:pageHistory[STATE_BODY()], style:pageHistory[STATE_STYLE()], pg: pageHistory[STATE_PGSHOWFN()]};
        if(onPGClosure) {
          onPGClosure[1] = pageCache[curPathname];
        }
        //mk global arr
        pageHistory = [pageHistory];
        window.history.pushState(pageHistoryIdx,0,location.href);

  //1p and dumb phone pages, don't naturally do XHR IO
  if (!this.fetch && !this.f) {
    f=1;//anti double load f.js in index.htm
    head.appendChild(document.createElement("script")).src = '/f.js';
  }

  function preload(evt) {
    var el, stacode, pathname, isTouchStart = evt.type === 'touchstart';
    var pathtype;
    var str;
    var spa;
    evt = evt.target;
    if (evt.nodeName === 'FONT') { //rstop.htm colored links
      evt = evt.parentNode;
    }
    if (evt.nodeName === 'A' && (isTouchStart || !evt.tmts)) {
      stacode = evt.hash;
      pathname = evt.pathname;
/* REMOVED CODE notes
use SS sessionStorage, window.name+fetch on modern chrome, often doesn't
update window.name, causing 2 network HTTP GET I/Os, if I do very
fast mousedown/mouseup click, it does work on "slow" clicks, but
because window.name update speed unreliable, just always use SS
*/
      if(pathname === location.pathname)
        return;
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
          return;
      }
      if (1) {
        var fResp;
        var fCB2;
        if(pathtype < 4) {
        stacode = stacode.slice(1);
        window.S = {t:Date.now(), s:stacode, f: function(cb){if(fResp){cb(fResp)} else {fCB2 = cb}}};
  /* race on old between f.js and mousedown/touchstart but IDC */
        console.log('s'+Date.now());
        fetch(
          pathtype === 3 ? '//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:' + stacode.slice(0, 3)
          : pathtype === 2 ? '//collector-otp-prod.camsys-apps.com/realtime/gtfsrt/ALL/alerts?type=json&apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'
          : pathtype === 1 ? '//backend-unified.mylirr.org/arrivals/' + stacode
          : '//backend-unified.mylirr.org/locations/'+stacode+'?geometry=NONE'
          , pathtype > 1 ? {} : {headers: {'accept-version': '3.0'}
        }).then(function(r){
          if(fCB2) {fCB2(r)}
          else {fResp = r}}
        );
        if(pathtype === 2) {
          //maybe unused/aborted R routes resp array obj, messes with status.htm code that protects race cond against routes.js
          R = 0;
          document.documentElement.firstChild.appendChild(document.createElement('script')).src = "routes.js";
        }
        }
        //reload 1p.js I/O prob earlier
        if((spa = pageCache[pathname]) && (pathtype < 5 || typeof pagehideCB_1p !== "undefined")) {
          0;
        } else {
          spaPrefetch(pathname, pathtype);
        }
        evt.tmts = isTouchStart;
      }
    }
  }
  addEventListener('touchstart', preload, {passive: true});
  addEventListener('mousedown', preload, {passive: true});
  
  addEventListener('click', function(e) {
    var htmlEl = document.documentElement;
    var head = htmlEl.firstChild;
    var str, spa, el, evt = e.target, pathname, hash, pathtype, histArr, hashNavFlag, fn;
    if (evt.nodeName === 'FONT') { //rstop.htm colored links
      evt = evt.parentNode;
    }
    if(evt.nodeName === "A") {
      pathname = evt.pathname;
      /*
      if(pathname === location.pathname && evt.hash != location.hash && pageHistory[pageHistoryIdx] && pageHistory[pageHistoryIdx][0] == document.body) {
        debugger;
        //hash only change, dup all saved info from last new state change (hash or fake nav irrel)
        histArr = pageHistory[pageHistoryIdx];
        pageHistoryIdx++;
        pageHistory[pageHistoryIdx] = histArr;
        pageHistory.length = pageHistoryIdx; //GC Fwd entries
        window.history.pushState(pageHistoryIdx,0,evt.href);
        return;
      }
      */
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
          return;
      }

      if(spa=pageCache[pathname]) {
        hash = evt.hash;
        hashNavFlag = pathname === location.pathname && hash != location.hash;

        histArr = pageHistory[pageHistoryIdx];

        if(curPathtype > 4 && pagehideCB_1p && curPathtype != pathtype) {
          pagehideCB_1p({}); //if(!evt.persisted) save scroll
        }

        //rmv STYLE
        if(!hashNavFlag) {
          if(el = histArr[STATE_STYLE()]) { //always HEAD except for / where its BODY
            el.parentNode.removeChild(el);
          }
          if(el = histArr[STATE_PC()]) { //always HEAD
            head.removeChild(el);
          }
          if(el = histArr[STATE_PF()]) { //always HEAD
            head.removeChild(el);
          }
        }
        //rmv BODY
        hashNavFlag || htmlEl.removeChild(histArr[STATE_BODY()]);

        //histArr[3] = location.pathname+location.hash;
        //histArr[4] = curPathtype; //bug / root is undef
        pageHistoryIdx++;
        histArr = pageHistory[pageHistoryIdx] = [];
        pageHistory.length = pageHistoryIdx + 1; //GC Fwd entries
        spa = pageCache[pathname];
        
        if(spa.js && pathtype !== 8) {
          histArr[STATE_BODY()] = htmlEl.appendChild(document.createElement('body'));
        } else if (!hashNavFlag) {
          histArr[STATE_BODY()] = htmlEl.appendChild(spa.body);
        } else {
          histArr[STATE_BODY()] = spa.body;
        }
        window.history.pushState(pageHistoryIdx,0,evt.href);


        //let A el hash nav event run if hash only even tho A el hash nav will
        //fire popstate event with evt.state as null, but curP and curH prevent
        //popstate CB from changing UI state
        if(!hashNavFlag) {
          e.preventDefault();
          if(str = spa.style) {
            histArr[STATE_STYLE()] = head.appendChild(str);
          }
          if(str = spa.pc) {
            histArr[STATE_PC()] = head.appendChild(str);
          }
          if(str = spa.pf) {
            histArr[STATE_PF()] = head.appendChild(str);
          }
          y = histArr[STATE_FNY()] = spa.y;
          window.onpageshow = histArr[STATE_PGSHOWFN()] = spa.pg;
          if(fn = spa.js) {
             //this must be window. not a meth call
             fn();
          }
          //dont use evt obj anymore, /li changes to /li/li after url chg
          curPathname = pathname;
          curHash = hash;
          curPathtype = pathtype;
        } else {
          histArr[STATE_STYLE()] = spa.style;
          histArr[STATE_PC()] = spa.pc;
          histArr[STATE_PF()] = spa.pf;
        }
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
  var htmlEl = document.documentElement;
  var head = htmlEl.firstChild;
  var newState;
  var newPathtype;
  if(e.state === null) {
    return;
  }
  e = e.state|0; //null if root/1st state/hist ent
  //hash only nav back or forwards
  if(curPathname == location.pathname && curHash != location.hash) {
    curPathname = location.pathname;
    curHash = location.hash;
    console.log('spa leave 1');
    return;
  }
  //a refresh
  if(e === pageHistoryIdx || e >= pageHistory.length
  ) //a refresh, or forward after refresh (no future state)
  {
    console.log('spa leave 2');
    location.reload();
    return;
  }

  var s = pageHistory[pageHistoryIdx];

  //load new from cache
  newState = pageHistory[e];
  newPathtype = newState[STATE_PATHTYPE()];
  curPathname = location.pathname;
  curHash = location.hash;

  if(curPathtype > 4 && pagehideCB_1p && curPathtype !== newPathtype) {
    pagehideCB_1p({}); //if(!evt.persisted) save scroll chrome bug
  }

  //rmv old style tag if any
  if(el = s[STATE_STYLE()]) {
    el.parentNode.removeChild(el);
  }
  if(el = s[STATE_PC()]) {
    head.removeChild(el);
  }
  if(el = s[STATE_PF()]) {
    head.removeChild(el);
  }

  //rmv old BODY dom tree
  htmlEl.removeChild(s[STATE_BODY()]);
  //set new page IDX to global
  pageHistoryIdx = e;

  curPathtype = newPathtype;
  //add style if any
  if(el = newState[STATE_STYLE()]) {
    head.appendChild(el);
  }
  if(el = newState[STATE_PC()]) {
    head.appendChild(el);
  }
  if(el = newState[STATE_PF()]) {
    head.appendChild(el);
  }
  htmlEl.appendChild(newState[STATE_BODY()]);
  y = newState[STATE_FNY()];
  onpageshow = el = newState[STATE_PGSHOWFN()];
  el && el({persisted:1});
};

//delete these prefetch Els, the .htm was loaded and parsed into JS/DOM long ago
//stop banging disk I/O or network I/O or the dom tree unneceserily
function purgePreFetchHTML(pathname) {
  (this.requestIdleCallback || this.requestAnimationFrame || function(callback){setTimeout(callback, 40)})(function(){
    var i, spa, el, pnl = pathname.length, pN_str;
    //spa.pf.href.lastIndexOf("/tileMap.htm") == (spa.pf.href.length-"/tileMap.htm".length)
    for(i in pageCache) {
      spa = pageCache[i];
      if((el=spa.pf) && (pN_str=el.href).lastIndexOf(pathname) === (pN_str.length-pnl)) {
        if(pN_str=el.parentNode) {
          pN_str.removeChild(el);
        }
        delete spa.pf;
      }
    }
    for(i = 0; i < pageHistory.length; i++) {
      spa = pageHistory[i];
      if((el=spa[STATE_PF()]) && (pN_str=el.href).lastIndexOf(pathname) === (pN_str.length-pnl)) {
        if(pN_str=el.parentNode) {
          pN_str.removeChild(el);
        }
        spa[STATE_PF()] = 0;
      }
    }
  });
}

//if != 200???
function spaPrefetch(pathname, pathtype) {
  var el, old_onpagehide, evt_cb_setter, fetch_js_all_cb, head;
  
  try {
    //get 1p.js for Chrome scroll restore bug, we can't find out if bad UA until
    //1p.js executes, todo, stations.htm prob preloaded to disk already
    //but 1p.js isnt, so start this I/O first if needed
    if (pathtype > 3) {
      if (typeof pagehideCB_1p === "undefined") {
        //win.pushS C5 FF4, O11.5, SF5, IE10
        //pagehide C4 FF6, O15, SF5, IE 11
        //must guard for UAs no win.onpagehide evt
        old_onpagehide = this.onpagehide;
        this.onpagehide = evt_cb_setter = function (evt_cb) {
          pagehideCB_1p = evt_cb;
          el.onerror = 0; //GC fn
          this.onpagehide = old_onpagehide;
          if(fetch_js_all_cb)
            fetch_js_all_cb();
          else
            fetch_js_all_cb = 1;
        };
        head = document.documentElement.firstChild;
        el = document.createElement('script');
        el.onerror = function () { //anti-UI-freeze
        //retry I/O eventually, use closure incase global corruption
          evt_cb_setter(undefined);
          head.removeChild(el);
        };
        el.src = "1p.js";
        head.appendChild(el);
      } else {
        fetch_js_all_cb = 1;
      }
    }
    fetch(pathname,{},1).then(function (r) {
      r.text().then(function (r) {
        var spa = {}, start, el, old_fn_y, old_pg_rel;
        //lazy inflate
        if(old_pg_rel = preconPrefetElMap[pathtype]) {
          start = old_pg_rel[0];
          old_fn_y = preconPrefetEls[start];
          if(old_fn_y.length) {
            el = document.createElement("link");
            el.href = old_fn_y;
            el.rel = 'preconnect'
            el.crossOrigin = 'anonymous';
            old_fn_y = preconPrefetEls[start] = el;
          }
          spa.pc = old_fn_y;
          start = old_pg_rel[1];
          old_fn_y = preconPrefetEls[start];
          if(old_fn_y.length) {
            el = document.createElement("link");
            el.href = old_fn_y;
            el.rel = 'prefetch';
            old_fn_y = preconPrefetEls[start] = el;
          }
          spa.pf = old_fn_y;
        }
        if((start = r.indexOf('<style>')) != -1) {
              el = document.createElement('style');
              start += '<style>'.length;
              el.textContent = r.slice(start, start = r.indexOf('</style>', start));
              spa.style = el
              start += 8;
        } else {
          start = 0;
        }
        //mk sure 100% JS no HTML "web page"
        if(start && (start = r.indexOf('No javascript', start)) != -1) {
          //status.htm don't exec inline SCRIPT in HEAD, that tag is for globals decl
          if((start = r.indexOf('<script>',start)) != -1) {
            start += '<script>'.length;
            old_fn_y = y;
            old_pg_rel = window.onpageshow;
            window.onpageshow = null;/*IE 11 doesnt like 0*/
            Function(r.slice(start, r.indexOf('</script>', start)))();
            spa.js = onhashchange;
            spa.y = y;
            spa.pg = window.onpageshow;
            y = old_fn_y;
            window.onpageshow = old_pg_rel;
            onhashchange = null;
          }
          pageCache[pathname] = spa;
          purgePreFetchHTML(pathname);
        } else {
          start = document.createElement('html');
          start.innerHTML = r; //time me
          el = spa.body = start.lastChild;
          if(pathtype === 8) {
            el.removeChild(el.lastElementChild);//unused in SPA SCRIPT
            r = el.removeChild(el.firstElementChild).textContent;
            old_fn_y = y;
            Function(r)();
            spa.js = onhashchange;
            spa.y = y;
            y = old_fn_y;
            onhashchange = null;
          }
          //1p.js already ran
          if(fetch_js_all_cb) {
            pageCache[pathname] = spa;
            purgePreFetchHTML(pathname);
          //wait for 1p.js before writing spa cache ent to global
          }
          else {
            fetch_js_all_cb = function() {
              pageCache[pathname] = spa;
              purgePreFetchHTML(pathname);
            };
          }
        }
      });//.text() CB
    }); //fet CB
  } catch (e) {}
}


function kph(e_realkey) {
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
}//end block if (this.pushState) {

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
}

})();
