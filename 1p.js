(function() {
  var _onpagehide, _onpageshow, ver = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

  ver = ver ? parseInt(ver[2], 10) : false;
//https://bugs.chromium.org/p/chromium/issues/detail?id=1199012#c_ts1635192305
  if ((ver > 70 && ver < 84) || ver > 86) {
    _onpageshow = function ops1p (cord_event) {
      if (!cord_event.persisted) {
        if (cord_event = sessionStorage.getItem('1p'+location.pathname)) {
          cord_event = JSON.parse(cord_event);
          if (cord_event.hasOwnProperty('scrollX') && cord_event.hasOwnProperty('scrollX')) {
            console.log('g 1p');
            requestAnimationFrame(function() {
              scroll(cord_event.scrollX, cord_event.scrollY);
            });
          }
        }
      }
    };

    _onpagehide = function oph1p (event) {
      if (!event.persisted) {
        console.log('s 1p');
        sessionStorage.setItem('1p'+location.pathname, JSON.stringify({
          scrollY: scrollY,
          scrollX: scrollX
        }));
      }
    };
  }
  //SPA preloader CB
  if ((ver = this.onpopstate) && (ver = ver.o)) {
    ver(_onpagehide);
  } else if (_onpagehide) { //is buggy scroll restore chrome
    onpagehide = _onpagehide;
    onpageshow = _onpageshow;
  }


//DISABLED
if(/*this.addEventListener*/0) {
  //skip f=1 and this.f test, no y() on 1p htms
  if (!this.fetch) {
    //IE 5.5 and 6.0 don't have document.head
    document.documentElement.firstChild.appendChild(document.createElement("script")).src = '/f.js';
  }
  function preload(evt) {
    var el, stacode, pathname, isTouchStart = evt.type === 'touchstart';
    evt = evt.target;
    if (evt.nodeName === 'A' && (isTouchStart || !evt.tmts)) {
      stacode = evt.hash;
      pathname = evt.pathname;
      if (pathname === '/rstop.htm'
          //Saf 3 and Opera 10 have AEL but not SS
          && window.sessionStorage
          ) {
        stacode = stacode.slice(1);
  /* race on old between f.js and mousedown/touchstart but IDC */
        fetch('//backend-unified.mylirr.org/arrivals/' + stacode, {
          headers: {
            'accept-version': '3.0'
          }
        }, 1).then(function (r) {
          if (r.status == 200) {
            r.text().then(function (r) { //time pagetype stop contents
              sessionStorage.setItem('r', '{"t":' + Date.now() + ',"s":"' + stacode + '","c":' + r + '}');
              /* use SS, window.name+fetch on modern chrome, often doesn't
              update window.name, causing 2 network HTTP GET I/Os, if I do very
              fast mousedown/mouseup click, it does work on "slow" clicks, but
              because window.name update speed unreliable, just always use SS
              var s =  '{"t":' + Date.now() + ',"s":"' + stacode + '","c":' + r + '}';
                window.name = s;
                if(window.name != s) alert('bwn'+window.name);
                console.log(' set '+window.name.slice(0, 5)+' set ');
             */
            });
          }

        });
        evt.tmts = isTouchStart;
      }//end of sessionStorage+fetch b/c LIRR requires
       //custom headers which native <link> prefetch is impossible
      else {
        pathname = pathname === '/stop.htm' ?
          '//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:' + stacode.slice(1, 4)
           : '';
        if (pathname) {
          el = document.createElement('link');
          el.rel = 'prefetch';
          el.href = pathname;
          el.crossOrigin = 'anonymous';
          //Opera 10-12.1 has querySelector and addEventListener but not document.head
          document.documentElement.firstChild.appendChild(el);
          evt.tmts = isTouchStart;
        }
      }
    }
  }
  //addEventListener('touchstart', preload, {passive: true});
  //addEventListener('mousedown', preload, {passive: true});
}

if(!this.onpopstate) {(function (){
  var curPathname = location.pathname;
  var curHash = location.hash;
  this.onpopstate = function (evt) {
    if(curPathname == location.pathname && curHash != location.hash) {
      sessionStorage.removeItem('1p'+location.pathname);
    } else if(evt.state !== null){
      location.reload();
    }
  };
})();
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
}


})();
