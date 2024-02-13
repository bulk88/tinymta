/* 2 polyfills for status.htm
 fetch added Chrome 42, Array.forEach added way before
*/
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn, scope) {
    'use strict';
    var i,
    len;
    for (i = 0, len = this.length; i < len; ++i) {
      //not IE 5, only 5.5 // if (i in this) {
      if (typeof this[i] !== 'undefined') {
        fn.call(scope, this[i], i, this);
      }
    }
  };
}

/* fetch added Chrome 42, Date.now added Chrome 4 */
if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

/* fetch() added in Chrome 42, Array.find in Chrome 45, f.js sometimes called
   for just Array.find */
if (!Array.prototype.find) {
  Array.prototype.find = function(callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  var list = Object(this);
  // Makes sures is always has an positive integer as length.
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  for (var i = 0; i < length; i++) {
    var element = list[i];
    if ( callback.call(thisArg, element, i, list) ) {
      return element;
    }
  }
}
}

/* IE 5.0 polyfill, 5.5 has array push() */
if (!Array.prototype.push) {
  Array.prototype.push = function (a) {
  this[this.length] = a;
  }
}

if (!Object.values) {
  Object.values = function (obj) {
    var values = [];

    for (var i in obj) {
      values.push(obj[i]);
    }
    return values;
  };
}

// toLocaleTimeString polyfill for IE 5
if (!Date.prototype.toLocaleTimeString) {
  Date.prototype.toLocaleTimeString = function() {
    var hours = this.getHours();
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();
    var meridian = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    return hours + ":" + minutes + ":" + seconds + " " + meridian;
  };
}

(function(){

//added in IE 5.5, not in 5.0, PF hand made by me, not copied
if (!Function.prototype.call) {
/* a PF I saw, used eval('string') to pass .arguments var arg, to make a
   one time use function, that is unlimited args for IE w/o .call()/apply()
   for perf/sanity, just hardwire to 3 args, the max used by all other PFs
   calling .call
*/
  Function.prototype.call = function (newThis, a1, a2, a3 /*, a4, a5, a6*/) {
    var ret;
    var fnName;
    if (typeof newThis === 'object') { //untested but prob correct
      fnName = 'j' + ((new Date().getTime()) + (jsonpi++));
      newThis[fnName] = this;
      ret = newThis[fnName](a1, a2, a3);
      delete newThis[fnName];
    } else {
      ret = this(a1, a2, a3);
    }
    return ret;
  };
}

//sometimes just polyfills above needed, fetch exists
if (!window.fetch) {
//alert(this); window obj TODO research if "window." can be removed and survive minify
//arg 3 and 4 are private to this PF and non-spec Fetch API, but needed
window.fetch = function (url, options, jsonp_url_path_postfix, want_not_json) {
  return {
    then: function (cb, addIMS /*arg 2 spec breaking, shud be reject cb*/) {
      /* don't use arguments.callee, b/c even tho Tinymta DOES NOT use "strict"
      it could one day, xhr on RSC cb has differnt this obj than here, so
      save func ref now*/
              var thisFunc = this.then;
              var g_jtcb; //json or text CB
              var content_fk_promise = { //can't lift obj higher b/c closure
                  then: function(local_jtcb) {
                    g_jtcb = local_jtcb;
                  }
              };
              var want_text; /*.text() called instead of .json(), non-JSON content*/
              var jsonpFnName;
              var x = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
              //many call sites, make this a func, with closure vars
              function call_f_then_cb(httpstatus, jsonpFlag) {
                /* don't leak, run first in case user CB throw exceptions
                 IE doesnt support/throws xcpt for delete op on window obj */
                jsonpFlag && (window[jsonpFnName] = 0);
                //note, the CB might never call json() method if
                //bad status, but we syncronously must give a chance for
                //fetch.then() cb to offer the json().then() cb for us to
                //capture syncronously NOW
                cb({
                  status: httpstatus,
                  json: function () {
                    return content_fk_promise;
                  },
                  text: function () {
                    want_text = 1;
                    return content_fk_promise;
                  }
                });
              }
              try {
                /*throw (0);*/
                /* on Fast refresh, on CORS enabled browsers, a traintime.lirr.org XHR req
                will happen over network, once browser sees no Access Control header
                it will "fail" the req to the page, then the page does the JSONP network
                request, stop this double request thing to save network traffic after CORS
                fails the 1st time, the server wont magically get the header one minute.
                Once CORS fails once, it will never succeed on that particular client, so
                never try a CORS request again.
                Browsers without CORS like Opera 10, fail the XHR req, instantly, client
                side, without network traffic.*/
                if (jsonp)
                  throw (0);
                /*open() can fire errors events or throw exceptions*/
                x.open('get', url, 1);
                /* use secret non-spec fetch arg 4, b/c for XHR this must be
                set before network I/O, not after IO fetch API style in a user CB*/
                if (!want_not_json) {
                  try {
                    x.responseType = 'json';
                  } catch (e) {
                    //old chromes throw "SYNTAX_ERR: DOM Exception 12" if no XHR JSON
                  }
                }
                /* handler assignment can't be factored to root or IE6 desktop and IE6 mobile
                wont drawn train times using "Fast" beyond the 1st/initial page load
                and only "Slow" works
                http://keelypavan.blogspot.com/2006/03/reusing-xmlhttprequest-object-in-ie.html*/
                x.onreadystatechange = function () {
                  if (x.readyState == 2) { //2 == headers status rcv
                    if(x.status /* not 0 */) {
                      /* IE 6 cache hit, no IP traffic happened, thats bad,
                      this detects it and resends it, on Chrome with CORS
                      XMLHttpRequest cannot load //mtasubwaytime.info/getTime/E/G14. Request header field If-Modified-Since is not allowed by Access-Control-Allow-Headers in preflight response.
                      so include IMS header ONLY if IE with cache bug by feature test and no CORS support

                      asking CORS chrome for the Date header causes "Refused to get unsafe header "Date"" and empty header value
                      which would trigger the IE 6 retry, but dont do the IE6 retry on chrome, so test first for CORS

                      originally instead of typeof, this was an "in" operator test
                      but changed to typeof because "in" was only added in IE 5.5
                      but is a syntax error in IE 5.0, a polyfill for property
                      check and in operator/hasOwnProperty for IE 4/5/Netscape 4
                      floating around online is typeof x.myPropName === 'undefined'
                       */
                      if(typeof(x.withCredentials) === 'boolean' || x.getResponseHeader("Date")) {
                        call_f_then_cb(x.status);
                      } else {
                        //retry the XHR with IE XHR cache buster option
                        thisFunc(cb, 1);
                      }
                    }
                  } else if (x.readyState == 4) {// 4 == full body, 3 is partial body
                    if( ! x.status /* == 0*/) {
                      //in reality, if CORS browser and 100% CORS 3pty API
                      //status 0 should be shown to user, to show no I/O
                      //available, and never fallback to JSONP
                      jsonp = 1;
                      //TLS 1.0 CORS Browsers WILL connect api.weather.com but
                      //get a no CORS headers "TLS version is too old" text resp
                      //so just always retry again as JSONP, can't separate
                      //CORS fail from timeout, note, no CORS browsers NEVER
                      //do cross-origin network IO, and instead throw very
                      //fast an exception, so no-CORS browsers are not caught
                      //here, this block should be modified/removed all other
                      //APIs like the MTA APIs, Safari 5.1.7 for Windows
                      //fires RSC 4, status 0, and skips firing RSC 3, so
                      //don't do fallback to JSONP in RSC 3, but in RSC 4
                      thisFunc(cb);
                    } else if (g_jtcb && x.status == 200) {
                        //unknown if XHR has JSON parse or not, we don't care
                        //.response is "newer" and native browser parsed
                        //by "responseType" if .RT implemented, otherwise fall back to
                        //most ancient, probably very old IE, ".responseText" from
                        //day 1 of XHR API
                        x = x.response || x.responseText;
                        //security irrel, native JSON faster than JS eval
                        //according to articles online, but just use eval for
                        //perf, we use JSONP/innerHTML, and loading a JSON parser
                        //polyfill is abs insane in this micro-HTML site
                        g_jtcb(want_text || typeof(x) === 'object' ? x : window.JSON ? JSON.parse(x) : eval('0,' + x));
                    }
/* assume unreachable b/c user's 200 check in f_then_cb
   but if needed in future deliver junk (empty string or null)
                    else if(g_jtcb) {
                      g_jtcb(x.responseText);
                    }
*/
                  } //end .RS == 4
                  //alert("currently the application is at" + x.readyState + ' ' + x.status);
                };//end onRSC func
                if (addIMS)
                  x.setRequestHeader("if-modified-since", new Date(0));
                //old Firefoxes send on XHR, new FF and new Chrome send by default
                //accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
                //MTA's Java EE server, if it sees "application/xml" it sends XML instead of JSON
                //older browsers send "*/*" for XHR, but always override this
                x.setRequestHeader("accept", "application/json");
                x.send();
                //code byte savings, reuse error var
              } catch (scriptElem) { /*no CORS (old Operas, IE6 either yes/no sec warn or just works)*/
                /* alert("XHR failed-will try JSONP:\n"+e); */
                /*  opera mobile 10.00, opera desktop 10.00 1750 need cache busting
                raw button (forced download) doesnt work in updating cache

                put script tag first, some browser preemptive start .src
                download before tree insert, on IE getTime() returns same time
                if called twice fast, add mixer number so CBs dont clash
                */
                jsonpFnName = 'j'+((new Date().getTime())+(jsonpi++));
                scriptElem = document.createElement("script");
                scriptElem.src =
/*STARTDELETE*/
                  '//tinymta.us.to' +
/*ENDDELETE*/
                  '/api/'+jsonp_url_path_postfix+'?callback='+jsonpFnName
//doesnt seem to be needed on old IEs
//                  +'&a='+((new Date().getTime())+0)
                  ;
                scriptElem.onerror = function (e) {
                  alert("JSONP network error")
                  scriptElem.parentElement.removeChild(scriptElem);
                  /* ,1 is window.jsonpCB anti-leak */
                  call_f_then_cb(/*http status*/ 0, 1);
                };
//IE 5.5 and 6.0 don't have document.head
                jsonp /*HEAD*/ = document.documentElement.firstChild;
                /*dont leak mem adding infinite JSONP script elements
                this also MAYBE cancels last in-progress, maybe timing out,
                JSONP fetch supposedly but testing shows, 2 "active" JSONP CBs
                in status.htm still run fine, after almost instant wiping of
                JSONP req script tag*/
                ;
                /* add JSONP runner to global scope*/
                window[jsonpFnName] = function (r) {
                  /* anti leak, IE 5 will never load the .js if
                  appendChild/removeChild is done syncronously,
                  Opera/Chrome/FF/Safari don't mind rapid sync
                  appendChild/removeChild, but IE cancels the load */
                  scriptElem.parentElement.removeChild(scriptElem);
                  /* ,1 is window.jsonpCB anti-leak */
                  call_f_then_cb(r.http_code, 1);
                  /* g_jtcb is not set/json() never called if != 200
                  dont mk console noise, NOTE non-spec fetch API
                  JSON inflated obj passed even with text() instead of string */
                  g_jtcb && g_jtcb(r.contents, 1 /*JSONP flag*/);
                };
                jsonp.appendChild(scriptElem);
                /*document.body.appendChild(scriptElem);/*crashes on IE6 if forced JSONP mode*/
              } //end catch blk
            } //end of fetch.then() method
    };
  };
}//end fetch pf

  var jsonp, //must be not global
  jsonpi = 0,
  ua_IeGTE55 = window.navigator.userAgent,
  uaIdx_styleShtArr = ua_IeGTE55.indexOf('MSIE '),
  is_ie = uaIdx_styleShtArr > 0;
  if (is_ie) {
    uaIdx_styleShtArr+=5; //skip ahead to ver num
    ua_IeGTE55 = ua_IeGTE55.slice(uaIdx_styleShtArr, ua_IeGTE55.indexOf(';',uaIdx_styleShtArr)).split('.');
    ua_IeGTE55 = (ua_IeGTE55[0] == 5 && ua_IeGTE55[1] >= 5) || ua_IeGTE55[0] > 5;
    if(!ua_IeGTE55) {
      uaIdx_styleShtArr = document.styleSheets;
      //insert CSS for IE 5.0 no inline-block fix using tables
      if (uaIdx_styleShtArr.length) {
        uaIdx_styleShtArr = uaIdx_styleShtArr[uaIdx_styleShtArr.length-1];
        //insertRule IE 9+, instead addRule for 5.0
        uaIdx_styleShtArr.addRule('table','display:inline');
      }
    }
  }
//run main body
//args (nosvg, polyfill_no_inline_block_el_container, polyfillCDF_or_false)
y(
/* SVG test for IE */
    is_ie
    && !( document.implementation
          && document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1')
        ) ? '.png' : 0,

    is_ie && !ua_IeGTE55 ? function (parentEl) {
        return parentEl.appendChild(document.createElement('table'))
        .appendChild(document.createElement('tbody'))
        .appendChild(document.createElement('tr'))
        .appendChild(document.createElement('td'));
    } : 0,
/*
IE 6.0 has doc.CDF, IE 5.5 missing doc.CDF func (undef)
but IE 5.0 has doc.CDF func, says "native" but that IE 5.0 doc.CDF func always
throws "Error: Not Implemented", prob b/c this site is NOT XHTML/XML compliant
also also in IE 5.5, writing to undefined document.createDocumentFragment is
fatal exceptions thrown, so for 5.0, use shim by ver num chk, for 5.5 test
member (maybe this also catchs ancient 1990s webkit???), 6.0 is fine, use
native CDF, seems MS implemented it broken, in 5.0, then tried to hide
the method, for feature probing reasons, but still keep it as a reserved word
in 5.5, so nobody can write polyfills, then MS fixed/turned it back on for
IE 6.0
*/
    document.createDocumentFragment && (!is_ie || ua_IeGTE55) ? 0 : function () {
/*IE 5.5 xfrag tag works, with appendChild, no prob, 5.0 throws
"Error: Unexpected call to method or property access" in appendChild to tag xfrag
switch to div, no render diff between docfrag and the div in doc tree*/
    return document.createElement('div');
    }
);
})();
