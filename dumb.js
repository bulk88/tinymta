//don't bother with hotkeys < IE 9 cursor/mouse based
//all Chrome/Kai/FFs/ASOPs/webkits in history have addEventListener()
/* IE <9 doesn't have document.querySelector, and 4G no touch flips, are always
   FF/WEBK, not IE, lets ignore IE Windows Mobile flips from early 2000s, I dont
   have one to test with
*/
(function(){
if (document.addEventListener && document.querySelector) {
  function kph(e_realkey) {
    switch (e_realkey.keyCode) {
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
      case 190: //asci period
      case 46: //asci peroid
        e_realkey = '*';
        break;
      default:
        e_realkey = null;
    }
    //note table above can be used by 3rd parties for something else
    //I only need 0-9, not a map app or game
    if (typeof e_realkey === 'number') {
      e_realkey = document.querySelector('[accesskey="' + e_realkey + '"]');
      //avoid err console noise for "called method click on undef"
      e_realkey && e_realkey.click()
    }
  }
  //FF3.0 throws exception "not enough arguments" if #3 missing
  document.addEventListener('keyup', kph, 0);
  document.addEventListener('keypress', kph, 0);
}

if (!this.fetch) {
  //IE 5.5 and 6.0 don't have document.head
  document.documentElement.firstChild.appendChild(document.createElement("script")).src = 'f.js';
}

var passiveSupported = false;

try {
  var options = {
    get passive() {
      // This function will be called when the browser
      // attempts to access the passive property.
      passiveSupported = true;
      return false;
    },
  };

  window.addEventListener("test", null, options);
  window.removeEventListener("test", null, options);
} catch (err) {
  passiveSupported = false;
}

function preload(evt, el) {
  evt = evt.target;
  if (evt.nodeName === 'A') {
    //evt = evt.pathname;
    if (evt.pathname === '/rstop.htm') {
/* race on old between f.js and mousedown/touchstart but IDC */
      fetch('//backend-unified.mylirr.org/arrivals/' + evt.hash.slice(1), {
        headers: {
          'accept-version': '3.0'
        }
      }, 0, 1).then(function (r) {
        if (r.status == 200) {
          r.text().then(function (r) { //time pagetype stop contents
            sessionStorage.setItem('r', '{"t":' + Date.now() + ',"p":"s","s":"' + evt.hash.slice(1) + '","c":' + r + '}');
          });
        }

      });
    } else {
      evt =
        evt.pathname === '/status.htm' ?
        '//collector-otp-prod.camsys-apps.com/realtime/gtfsrt/ALL/alerts?type=json&apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'
         : evt.pathname === '/stop.htm' ?
        '//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:' + evt.hash.slice(1, 4)
         : '';
      if (evt) {
        el = document.createElement('link');
        el.rel = 'prefetch';
        el.href = evt;
        el.crossOrigin = 'anonymous';
        //Opera 10-12.1 has querySelector and addEventListener but not document.head
        document.documentElement.firstChild.appendChild(el);
      }
    }
  }
}
window.addEventListener('touchstart', preload, passiveSupported ? {
  passive: true
}
   : false);
window.addEventListener('mousedown', preload, passiveSupported ? {
  passive: true
}
  : false);

})();
