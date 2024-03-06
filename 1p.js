(function() {
  var ver = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

  ver = ver ? parseInt(ver[2], 10) : false;
//https://bugs.chromium.org/p/chromium/issues/detail?id=1199012#c_ts1635192305
  if ((ver > 70 && ver < 84) || ver > 86) {
    onpageshow = function(cord_event) {
      if (!cord_event.persisted) {
        if (cord_event = sessionStorage.getItem('1p'+location.pathname)) {
          cord_event = JSON.parse(cord_event);
          if (cord_event.hasOwnProperty('scrollX') && cord_event.hasOwnProperty('scrollX')) {
            requestAnimationFrame(function() {
              scroll(cord_event.scrollX, cord_event.scrollY);
            });
          }
        }
      }
    };

    onpagehide = function(event) {
      if (!event.persisted) {
        sessionStorage.setItem('1p'+location.pathname, JSON.stringify({
          scrollY: scrollY,
          scrollX: scrollX
        }));
      }
    };
  }

if(this.addEventListener) {
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
        }, 'ra/'+stacode, 1).then(function (r) {
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
  addEventListener('touchstart', preload, {passive: true});
  addEventListener('mousedown', preload, {passive: true});
}
})();
