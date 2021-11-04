(function() {
  var ver = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

  ver = ver ? parseInt(ver[2], 10) : false;
//https://bugs.chromium.org/p/chromium/issues/detail?id=1199012#c_ts1635192305
  if ((ver > 70 && ver < 84) || ver > 86) {
    onpageshow = function(event) {
      if (!event.persisted) {
        var cord = sessionStorage.getItem('1p'+location.pathname);
        if (cord) {
          cord = JSON.parse(cord);
          if (cord.hasOwnProperty('scrollX') && cord.hasOwnProperty('scrollX')) {
            requestAnimationFrame(function() {
              scroll(cord.scrollX, cord.scrollY);
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
