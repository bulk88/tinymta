(function(){
//alert(this); window obj TODO research if "window." can be removed and survive minify
var jsonp; //must be not global
window.fetch = function (url) {
  return {
    then: function (cb) {
      cb({
        json: function () {
          return {
            then: function (cb, addIMS /*spec breaking, shud be reject cb*/) {
              var this_func = this.then; /*xhr cb has differnt this obj than here*/
              var x = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
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
                try {
                  x.responseType = 'json';
                } catch (e) {
                  //old chromes throw "SYNTAX_ERR: DOM Exception 12" if no XHR JSON
                }
                /* handler assignment can't be factored to root or IE6 desktop and IE6 mobile
                wont drawn train times using "Fast" beyond the 1st/initial page load
                and only "Slow" works
                http://keelypavan.blogspot.com/2006/03/reusing-xmlhttprequest-object-in-ie.html*/
                x.onreadystatechange = function () {
                  if (x.readyState == 4) {
                    if (x.status == 200) {
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
                        //unknown if XHR has JSON parse or not, we don't care
                        x = x.response || x.responseText;
                        //security irrel, native JSON faster than JS eval
                        //according to articles online, but just use eval for
                        //perf, we use JSONP/innerHTML, and loading a JSON parser
                        //polyfill abs insane in this micro-HTML site
                        cb(typeof(x) === 'object' ? x : window.JSON ? JSON.parse(x) : eval('0,' + x));
                      } else {
                        //retry the XHR with IE XHR cache buster option
                        this_func(cb, 1);
                      }
                  } else {
                      //in reality, if CORS browser and 100% CORS 3pty API
                      //status 0 should be shown to user, to show no I/O
                      //available, and never fallback to JSONP
                      x.status && alert("error HTTP status " + x.status);
                      jsonp = 1;
                      //TLS 1.0 CORS Browsers WILL connect api.weather.com but
                      //get a no CORS headers "TLS version is too old" text resp
                      //so just always retry again as JSONP, can't separate
                      //CORS fail from timeout, note, no CORS browsers NEVER
                      //do cross-origin network IO, and instead throw very
                      //fast an excception, so no-CORS browsers are not caught
                      //here, this block should be modified/removed all other
                      //APIs like the MTA APIs
                      this_func(cb);
                  }
                  /*else
                  alert("currently the application is at" + invocation.readyState); */
                  }
                };
                if (addIMS)
                  x.setRequestHeader("if-modified-since", new Date(0));
                //old Firefoxes send on XHR, new FF and new Chrome send */*
                //Java EE server, if it sees "application/xml" it sends XML instead of JSON
                //"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
                x.setRequestHeader("accept", "application/json");
                x.send();
                //code byte savings, reuse error var
              } catch (scriptElem) { /*no CORS (old Operas, IE6 either yes/no sec warn or just works)*/
                /* alert("XHR failed-will try JSONP:\n"+e); */
                /*  opera mobile 10.00, opera desktop 10.00 1750 need cache busting
                raw button (forced download) doesnt work in updating cache */
                window.j = function (r) {
                  cb(r.contents)
                };
                scriptElem = document.createElement("script");
                scriptElem.src =
/*STARTDELETE*/
                  '//tinymta.us.to' +
/*ENDDELETE*/
                  '/api/wea?callback=j';
//IE 5.5 and 6.0 don't have document.head
                jsonp = document.getElementsByTagName('head')[0];
                /*dont leak mem adding infinite JSONP script elements
                this also cancels last in-progress, maybe timing out, JSONP fetch supposedly */
                //TODO, fix for LAST TAG SCRIPT in head, then rmv/add
                //DONT touch title tag for example, this is sloppy
                if (jsonp.childNodes.length > 1)
                  jsonp.removeChild(jsonp.childNodes[1]);
                jsonp.appendChild(scriptElem);
                /*document.body.appendChild(scriptElem);/*crashes on IE6 if forced JSONP mode*/
              }
            }
          };
        }
      });
    }
  }
};
//run main body
//args (nosvg, polyCDF)
y(
  window.navigator.userAgent.indexOf('MSIE ') > 0
    && !( document.implementation
          && document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1')
        ),
  //fake doc frag for IE 5.5 with custom tag, IE 6 has working doc.CDF
  //note in IE 5.5 writing to document.createDocumentFragment is fatal
  //exceptions thrown, but doc.CDF read is undefined, but writing to
  //document.createDocumentFragmeNNNt is fine for IE 5.5, prop CDF some kind of
  //undocumented (or no docs exist on Google anymore) reserved keyword in the
  //IE 5.5 DOM IDL

  document.createDocumentFragment ? 0 : function () {return document.createElement('xfrag');}
);
})();
