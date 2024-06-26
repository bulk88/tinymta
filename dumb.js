//don't bother with hotkeys < IE 9 cursor/mouse based
//all Chrome/Kai/FFs/ASOPs/webkits in history have addEventListener()
/* IE <9 doesn't have document.querySelector, and 4G no touch flips, are always
   FF/WEBK, not IE, lets ignore IE Windows Mobile flips from early 2000s, I dont
   have one to test with
*/
(function(){
var _document = document;
//IE 8-10 has AEL/QS but not document.head+var el, newEl;
//var head = _document.documentElement.firstChild; // May 2024 disabled
var el, newEl;

if (this.addEventListener) {
  function kph(e) {
    //ZTE flip Chrome 0 key conflicts with checkbox's
    //space key
    var realkey = e.keyCode;
    if(realkey=== 32
       && e.target.nodeName === 'INPUT')
      return;
    realkey = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,0,1,2,3,4,5,6,7,8,9,,,,,,,,2,,,3,,,4,,,5,,,6,,,7,,,,8,,,9,,,,,,,,,,2,,,3,,,4,,,5,,,6,,,7,,,,8,,,9][realkey];

    //gz 978 to 971 chg, +x===x vs typeof x === 'number'
    if (+realkey===realkey) {
      realkey = _document.querySelector('[accesskey="' + realkey + '"]');
      //avoid err console noise for "called method click on undef"
      if (realkey) {
        if(onpopstate) {
          e = e.type;
          onpopstate.p[+(e == "keydown" || e == "keypress")]({target:realkey,preventDefault:function(){}});
        } else {
          realkey.click();
        }
      }
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
  addEventListener('keydown', kph, 0);
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

  //el = head.firstChild;
  /* may 2024 disabled, spa.js does this now UA User Agent ver specifically now */
  while (el, 0) {
  //link tag, its rel/href attrs, all 3 defined HTML 3.02, dont use .getAttribute()
  //don't test el.nodeName === 'LINK', to save wire bytes
  //upper case chars esp bad for GZ, undef === "str" good enough and perf enough (vs ==)
      if (el.rel === 'preconnect') {
        newEl = _document.createElement('link');
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
    var arr = _document.links, len = arr.length, i = 0
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
