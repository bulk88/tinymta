var jsonp;
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
                       */
                      if ('withCredentials' in x || x.getResponseHeader("Date")) {
                        x = x.response || x.responseText;
                        cb(typeof(x) === 'object' ? x : window.JSON ? JSON.parse(x) : eval('0,' + x));
                      } else {
                        this_func(cb, 1);
                      }
                  } else {
                      x.status && alert("error HTTP status " + x.status);
                      jsonp = 1;
                      //TLS 1.0 Browsers WILL connect api.weather.com but get
                      //a no CORS headers "TLS version is too old" text resp
                      //so just always retry again as JSONP, can't separate
                      //CORS fail from timeout
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
y();