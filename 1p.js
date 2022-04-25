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
})();
