(function() {
  var ver = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

  ver = ver ? parseInt(ver[2], 10) : false;
//https://bugs.chromium.org/p/chromium/issues/detail?id=1199012#c_ts1635192305
  if ((ver > 70 && ver < 84) || ver > 86) {
    window.onpageshow = function(event) {
      if (!event.persisted) {
        var cord = sessionStorage.getItem('sub1p');
        if (cord) {
          cord = JSON.parse(cord);
          if (cord.hasOwnProperty('scrollX') && cord.hasOwnProperty('scrollX')) {
            window.requestAnimationFrame(function() {
              window.scroll(cord.scrollX, cord.scrollY);
            });
          }
        }
      }
    };

    window.onpagehide = function(event) {
      if (!event.persisted) {
        sessionStorage.setItem('sub1p', JSON.stringify({
          scrollY: window.scrollY,
          scrollX: window.scrollX
        }));
      }
    };
  }
})();
