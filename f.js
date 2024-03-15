function log() {
  var i = 0;
  try {
    console.log.apply(console, arguments);
  } catch (e) {
    try {
      opera.postError.apply(opera, arguments);
    } catch (e) {
      e = '';
      for(; i < arguments.length; i++)
        e+=arguments[i]+ " ";
    }
  }
}

//FF 3.0 has sessionStorage but no JSON
//rtrain/rstop touchstart/mousedown preloader
if (!window.JSON) {
//security irrel, native JSON faster than JS eval
//according to articles online, but just use eval for
//perf as a PF, we use JSONP/innerHTML, and loading a JSON parser
//polyfill is abs insane in this micro-HTML site
  window.JSON = {parse: function(str) { if(typeof str != 'string'){ throw 'bad type '+typeof str} return eval('0,' + str)}};
}
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
  Array.prototype.push = function() {
    for (var i = 0; i < arguments.length; i++) {
      this[this.length] = arguments[i];
    }
    return this.length;
  };
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



//added in IE 5.5, not in 5.0, PF hand made by me, not copied
(function () {
  var cbCache;
  if (!Function.prototype.apply) {
    /* a PF I saw, used eval('string') to pass .arguments var arg, to make a
    one time use function, that is unlimited args for IE w/o .call()/apply()
    for perf/sanity, just hardwire to 3 args, the max used by all other PFs
    calling .call
     */
    cbCache = [];
    Function.prototype.apply = function (obj, args) {
      var fn = this;
      var fnCb;
      var result;
      var cbBodyArr;
      var i;
      var args_length = args.length;
      var randomProp;
      /*
      if(typeof fn !== "function") {
      throw new Error('Invalid function provided for binding.');
      }
       */
      if (!(fnCb = cbCache[args_length])) {
        cbBodyArr = [];
        if (args_length) {
          for (i = 0; i < args_length; i++) {
            cbBodyArr[i] = "a[" + i + "]";
          }
        }
        fnCb = cbCache[args_length] = eval("(function(){return function(f,a){return f(" + cbBodyArr.join(",") + ")}})();");
      }
 //null is object in JS, but no props
      if (obj && typeof obj === 'object') {
        randomProp = "f" + Math.random();
        while (obj[randomProp] !== undefined) {
          randomProp = "f" + Math.random();
        }
        obj[randomProp] = fnCb;
        /* disabled, perf, wire bytes, not SPA
        try { //anti-leak
        */
        result = obj[randomProp](fn, args);
        /*
        } catch (e) {
          delete obj[randomProp];
          throw e;
        }
        */
        delete obj[randomProp];
      } else {
        result = fnCb(fn, args)
      }
      return result;
    };
  };
})();

/* IE 5.0 doesn't take a function as arg 2 to .replace(), 5.5 and up OKAY
from https://gist.github.com/mojavelinux/2cebc5fd0d2139715f7723f31ba5bfdd
but modded, IE 5.0 returns "function() {return blah}"
new browsers return "" aka false
IE 5.0 re.exec() is broken if //g flag, .lastIndex is not used for next call
https://groups.google.com/g/comp.lang.javascript/c/UeozctwVUM8/m/T5joOtccBwoJ
https://groups.google.com/g/microsoft.public.scripting.jscript/c/wd01ijxhKF4/m/MkXJ3QkAKzcJ
https://web.archive.org/web/20240304170652/https://www.cnblogs.com/encounter/archive/2006/03/20/2188706.html

and MS Jscript official doc for .exec()

Example
The following example illustrates the use of the exec method:

function RegExpTest(){
  var ver = Number(ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion())
  if (ver >= 5.5){                 //Test JScript version.
    var src = "The rain in Spain falls mainly in the plain.";
    var re = /\w+/g;               //Create regular expression pattern.
    var arr;
    while ((arr = re.exec(src)) != null)
       document.write(arr.index + "-" + arr.lastIndex + "\t" + arr);
  }
  else{
    alert("You need a newer version of JScript for this to work");
  }
}

so chop off the start of the string on each pass
*/

if (!!("a".replace(/a/,function(){return ""}))) {
  String.prototype.replace = (function (native_method) {
      return function (pattern, callback) {
          if (typeof callback !== 'function') {
              return native_method.call(this, pattern, callback);
          }
          var result = '',
          source = String(this),
          length = source.length,
          lastIndex = 0,
          index,
          match,
          ie50bugCutIndex = 0;
          while (
            //alert('cutidx'+source.slice(ie50bugCutIndex)),
            (match = pattern.exec(source.slice(ie50bugCutIndex)))) {
              index = match.index+ie50bugCutIndex;
              //alert('pat.lI '+pattern.lastIndex+' gre.lI '+RegExp.lastIndex+' m.il '+ match.lastIndex+' m.idx '+match.index);
              result += source.slice(lastIndex, index);
              lastIndex = index + match[0].length;
              match.push(index, source);
              result += callback.apply(null, match);
              if(pattern.lastIndex === void 0) {
                ie50bugCutIndex = lastIndex; //IE 5.0 path
              } else {
                pattern.lastIndex = lastIndex; //untested
              }
              //IE 5.0 doesn't have .global, 5.5 yes, assume /g always on 5.0
              if (typeof pattern.global === "boolean" && !pattern.global)
                break;
              if (lastIndex === index) {
                  if (lastIndex === length)
                    break;
                  if(pattern.lastIndex === void 0) {
                    ie50bugCutIndex = lastIndex;
                  } else {
                    pattern.lastIndex = lastIndex;
                  }
                  result += source.charAt(++lastIndex);
              }
          }
          if (lastIndex < length)
            result += source.slice(lastIndex, length);
          return result;
      }
  }(String.prototype.replace));
/* Test PF works, arg e is undef on native and PF
  if ("A[B][B]C".replace(/\[(\w+)\]/g,function(a,b,c,d,e) {
    alert('a '+a+' b '+b+' c '+c+' d '+d+' e '+e);
    return "[X]"}) != "A[X][X]C")
      alert("PF fail");
*/
}

if (!window.encodeURIComponent)
  (function () {

    var hexchars = "0123456789ABCDEF";

    function toHex(n) {
      return hexchars.charAt(n >> 4) + hexchars.charAt(n & 0xF);
    }

    var okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

    window.encodeURIComponent = function (s) {
      var enc = "";
      if (typeof s !== 'string') //catch undef
        s = String(s);
      for (var i = 0; i < s.length; i++) {
        if (okURIchars.indexOf(s.charAt(i)) == -1)
          enc += "%" + toHex(s.charCodeAt(i));
        else
          enc += s.charAt(i);
      }
      return enc;
    };
  })();

//sometimes just polyfills above needed, fetch exists
if (!window.fetch) {

var dhead = document.documentElement.firstChild;
//FF 3.0 no .children, FF 3.5 has .children and all IEs >=5 have it
if(!dhead.children)
  dhead.children = dhead.childNodes;

//IE < 9, .childNodes .children are identical
//our not-minified index.htm <head>, is full of comment nodes for IE < 9
//and comment and text nodes for FF 3.0, so clean the <head> tag, so
//index.htm can find .children[3].href (aka <LINK>) tag with positionally
//https://www.sitepoint.com/removing-useless-nodes-from-the-dom/
//https://quirksmode.org/dom/core/#t71 IE 5.5 has comments as type 1

//always skip node 0 aka TITLE, bc IE
if(dhead.children[1].nodeName.charCodeAt() < 65 /*A*/) {
  (function(){
    var e2;
    var el = dhead.firstChild; //TITLE
    while(el) {
      e2 = el.nextSibling;
      //IE 5.0 and 5.5 return type 1 for comments and ! as node name
      //IE 6.0 returns 8 and #comment as node name (W3C correct)
      //use !== 1 for perf as 1st check
      //but it will only be true on >= IE 6 and FF 3.0
      if(el.nodeType !== 1 ||
      el.nodeName.charCodeAt() < 65 /*65 is A, will catch ! and #*/
      ) {
        dhead.removeChild(el);
      }
      el = e2;
    }
  })();
}

if(dhead.children[3].nodeName.charCodeAt() < 65 /*A*/) {
  alert('c fail');
}

//alert(this); window obj TODO research if "window." can be removed and survive minify
//arg 3 is private to this PF and non-spec Fetch API, but needed b/c
//text() vs json() from caller, not known!!! until after status==200 delivered
//to caller, and its too late for legacy XHR and legacy JSONP, to set
//.resonseType or tell JSONP server to send a string not obj as .contents
window.fetch = function (url, options_headers, want_not_json) {
  options_headers && (options_headers = options_headers.headers);
  return {
    then: function (cb, addIMS /*arg 2 spec breaking, shud be reject cb*/) {
              var i_thisFunc;
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
                    if(want_not_json) {
                      throw "mismatch .json() vs .text() fetch hint";
                    }
                    return content_fk_promise;
                  },
                  text: function () {
                    if(!want_not_json) {
                      throw "mismatch .json() vs .text() fetch hint";
                    }
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
                        i_thisFunc(cb, 1);
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
                      i_thisFunc(cb);
                    } else if (g_jtcb && x.status == 200) {
                        //unknown if XHR has JSON parse or not, we don't care
                        //.response is "newer" and native browser parsed
                        //by "responseType" if .RT implemented, otherwise fall back to
                        //most ancient, probably very old IE, ".responseText" from
                        //day 1 of XHR API
                        x = x.response || x.responseText;
                        //note JSON.parse might be a eval() PF
                        g_jtcb(want_text || typeof(x) === 'object' ? x : JSON.parse(x));
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
                /*
                old Firefoxes send on XHR, new FF and new Chrome send by default
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,* /*;q=0.8"
                MTA's Java EE server, if it sees "application/xml" it sends XML instead of JSON
                older browsers send "* /*" for XHR, but always override this
                and don't remove b/c native fetch sends "* /*" while native XHR sends
                the long "application/xml" accept string
                */
                x.setRequestHeader("accept", "application/json");
                //add headers, LIRR specific
                if(options_headers) {
                  for(i_thisFunc in options_headers) {
                    x.setRequestHeader(i_thisFunc, options_headers[i_thisFunc]);
                  }
                }
      /* don't use arguments.callee, b/c even tho Tinymta DOES NOT use "strict"
      it could one day, xhr on RSC cb has differnt this obj than here, so
      save func ref now*/
                i_thisFunc = this.then;
      /* a retired (legacy comment) MTA server sends Set-Cookie: AWSALB=
      and Set-Cookie: AWSALBCORS= but also "Access-Control-Allow-Origin: *"
      and credentials doesn't allow wildcard, so never turn this on,
      just accept forever these cookies will come */
                //x.withCredentials = !0;
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
                if(options_headers) {
                  x = []; //JSON.stringify not avail old browsers
                  for(i_thisFunc in options_headers) {
                    x.push('"'+i_thisFunc+'":"'+options_headers[i_thisFunc]+'"');
                    x = '{'+x.join(',')+'}';
                  }
                } else {
                  x = 0;
                }
                scriptElem = document.createElement("script");
                //note this WILL NOT RUN FROM 127.0.0.1 or file://
                scriptElem.src =
/*STARTDELETE*/
                  '//tinymta.us.to' +
/*ENDDELETE*/
                  '/jsp?url='+encodeURIComponent(url)
                  +'&callback='+jsonpFnName
                  +(x ? '&headers='+encodeURIComponent(x) : '')
                  +(want_not_json ? '&type=text' : '')
//doesnt seem to be needed on old IEs
//                  +'&a='+((new Date().getTime())+0)
                  ;
                scriptElem.onerror = function (e) {
                  alert("JSONP network error "+(JSON && JSON.stringify ? JSON.stringify(e) :''));
                  //never use .parentElement, not old IE or old FF compat
                  scriptElem.parentNode.removeChild(scriptElem);
                  /* ,1 is window.jsonpCB anti-leak */
                  call_f_then_cb(/*http status*/ 0, 1);
                };
//IE 5.5 and 6.0 don't have document.head
                jsonp /*HEAD*/ = dhead;
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
                  scriptElem.parentNode.removeChild(scriptElem);
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


var nosvg =
/* SVG test for IE, and ancient FFs (FF 3.5 tested has no svg) */
  document.implementation
  && document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1')
  ? 0 : '.png';
var no_inline_block_container_fill =
    is_ie && !ua_IeGTE55 ? function (parentEl) {
        return parentEl.appendChild(document.createElement('table'))
        .appendChild(document.createElement('tbody'))
        .appendChild(document.createElement('tr'))
        .appendChild(document.createElement('td'));
    } : 0;
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
var no_CDF_fill =
    document.createDocumentFragment && (!is_ie || ua_IeGTE55) ? 0 : function () {
/*IE 5.5 xfrag tag works, with appendChild, no prob, 5.0 throws
"Error: Unexpected call to method or property access" in appendChild to tag xfrag
switch to div, no render diff between docfrag and the div in doc tree*/
    return document.createElement('div');
    };

var oldOnLoad;

//reinsert as.js if not-async compat browser didn't draw as.js already
//setTimeout() and setInterval() crash IE 5.0 in Win95, AEL DOMContentLoaded
//has limited support, in IE 5.0 window.onload sometimes chokes/nvr fires, b/c
//img I/O or JSONP I/O random freezing (spinning earth until refresh or navigate)
//onreadystatechange works in IE, not Opera, so just exec as.js again if it didnt
//paint by now, b/c empty DOM body tag, during first no-async run of as.js

function chk_as_js(fc,el) {
  el = location.pathname;
  //match "/" "/docs/" and "/index" "/index.htm" "/index.html" etc
  //"abc"[2] string as array, doesn't work IE 5.0, its undef, use .charAt()
  if(el.charAt(el.length-1) == '/' || ~el.indexOf('/index')) {
    el = document.body.lastChild;
    while (el = el.previousSibling) { //last el is NEVER it
      if(el.nodeName == "DIV"
        && (fc = el.firstChild)
        && fc.nodeType == 3 /*text node*/) {
          /*NBSP, maybe test for "Y" if unicode vs legacy 1 byte problems, index.htm use \xA0 1 byte on wire */
          if (fc.nodeValue.charCodeAt(/*0*/) == 160) {
            //head elem
            document.documentElement.firstChild.appendChild(document.createElement("script")).src = '/as.js';
          }
          /* break loop early, perf reasons, no more DIVs to visit */
          el = {};
      }//end, found AS name div, any condition
    }
  }
}

//run main body
//args (nosvg, polyfill_no_inline_block_el_container, polyfillCDF_or_false)
if(this.y) {
  chk_as_js();
  y(nosvg,no_inline_block_container_fill,no_CDF_fill);
  this.x && x();
} else {
  //FF 3.5 has sync/blocking appendChild(<SCRIPT>) as a bug, f.js executes on
  //ancient FF, BEFORE inline root index.htm <SCRIPT> executes
  //ancient SF/IE/Opera always execute appendChild(<SCRIPT>) after root .htm
  //inline script tags
  //probably this FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=543062
  //so try y() one more time if y() missing, dumb.js and/or 1p.js do load
  //f.js but legit never call y(), station selector .htm s dont have y()

  oldOnLoad = this.onload;
  this.onload = function(){
    chk_as_js();
    oldOnLoad && oldOnLoad();
    this.y && y(nosvg,no_inline_block_container_fill,no_CDF_fill);
    this.x && x();
  };
}
})();

/*
JSONP innerhtml on body element/appendchild script element to body IE6 crash
>   mshtml.dll!CTreePos::SourceIndex()  + 0x3
    mshtml.dll!CMarkup::InsertElementInternal()  + 0x37b
    mshtml.dll!CDoc::InsertElement()  + 0x98
    mshtml.dll!CDocument::get_implementation()  + 0x135
    mshtml.dll!CElement::insertBefore()  + 0xd0
    mshtml.dll!CElement::appendChild()  + 0x33
    mshtml.dll!Method_IDispatchpp_IDispatchp()  + 0x60
    mshtml.dll!CBase::ContextInvokeEx()  + 0x15b
    mshtml.dll!CElement::ContextInvokeEx()  + 0x49
    mshtml.dll!CElement::ContextThunk_InvokeEx()  + 0x43
    jscript.dll!IDispatchExInvokeEx2()  + 0x6f
    jscript.dll!IDispatchExInvokeEx()  + 0x3e
    jscript.dll!InvokeDispatchEx()  + 0x78
    jscript.dll!VAR::InvokeByName()  + 0x9f0
    jscript.dll!VAR::InvokeDispName()  + 0x40
    jscript.dll!VAR::InvokeByDispID()  + 0x54
    jscript.dll!CScriptRuntime::Run()  + 0x2db0
    jscript.dll!ScrFncObj::Call()  + 0x85
    jscript.dll!CSession::Execute()  + 0x9c
    jscript.dll!NameTbl::InvokeDef()  + 0x101
    jscript.dll!NameTbl::InvokeEx()  + 0xb6
    jscript.dll!IDispatchExInvokeEx2()  + 0x6f
    jscript.dll!IDispatchExInvokeEx()  + 0x3e
    jscript.dll!NameTbl::InvokeEx()  - 0x194a0
    mshtml.dll!CScriptCollection::InvokeEx()  + 0x8f
    mshtml.dll!CWindow::InvokeEx()  + 0x2c49e
    mshtml.dll!COmWindowProxy::InvokeEx()  + 0x3379c
    mshtml.dll!COmWindowProxy::subInvokeEx()  + 0x26
    jscript.dll!IDispatchExInvokeEx2()  + 0x6f
    jscript.dll!IDispatchExInvokeEx()  + 0x3e
    jscript.dll!InvokeDispatchEx()  + 0x78
    jscript.dll!VAR::InvokeByDispID()  - 0x3b65
    jscript.dll!CScriptRuntime::Run()  + 0x2db0
    jscript.dll!ScrFncObj::Call()  + 0x85
    jscript.dll!CSession::Execute()  + 0x9c
    jscript.dll!NameTbl::InvokeDef()  + 0x101
    jscript.dll!NameTbl::InvokeEx()  + 0xb6
    mshtml.dll!CBase::InvokeDispatchWithThis()  + 0xce
    mshtml.dll!CBase::InvokeEvent()  + 0x70e2d
    mshtml.dll!CBase::FireEvent()  + 0xc5
    mshtml.dll!CElement::BubbleEventHelper()  - 0x6ed
    mshtml.dll!CElement::FireEvent()  + 0x10168
    mshtml.dll!CElement::Fire_onclick()  + 0x1c
    mshtml.dll!CElement::DoClick()  + 0x67
    mshtml.dll!CInput::DoClick()  + 0x3a
    mshtml.dll!CDoc::PumpMessage()  + 0x279b9
    mshtml.dll!CDoc::OnMouseMessage()  + 0x1a7
    mshtml.dll!CDoc::OnWindowMessage()  + 0x5a60a
    mshtml.dll!CServer::WndProc()  + 0x76
    user32.dll!_InternalCallWinProc@20()  + 0x28
    user32.dll!_UserCallWinProcCheckWow@32()  + 0xb7
    user32.dll!_DispatchMessageWorker@8()  + 0xdc
    user32.dll!_DispatchMessageW@4()  + 0xf
    browseui.dll!TimedDispatchMessage()  + 0x33
    browseui.dll!BrowserThreadProc()  + 0x336
    browseui.dll!BrowserProtectedThreadProc()  + 0x50
    browseui.dll!_SHOpenFolderWindow@4()  + 0x22c
    shdocvw.dll!_IEWinMain@8()  + 0x133
    IEXPLORE.EXE!WinMainT()  + 0x2de
    IEXPLORE.EXE!__ModuleEntry@0()  + 0x99
    kernel32.dll!_BaseProcessStart@4()  + 0x23
*/
