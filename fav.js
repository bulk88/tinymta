(function(){
//returns array [createdNewFavsBool,favsConfig]
function read_fav() {
  //bump if incompat fav obj in Tinymta new release
  function DRAW_VER() { return 0; };
  try {
    var c = localStorage.getItem("fav");
    if (!c || c.indexOf(prefix + '[' + DRAW_VER() + ',') != 0) {
      //initial default/first ever!!! (cookie/LS clear) favs obj on particular user
      //version, keep hist, realtime (unimplemented), sta#1, sta#2
      localStorage.setItem("fav", prefix + '[' + DRAW_VER() + ',1,0])');
      return [1,[DRAW_VER(), 1, 0]];
    } else {
      c = c.slice(prefix.length, c.length - 1);
      return [0,JSON.parse(c)];
    }
  } catch (e) {
    //favs not supported on browser
    return null;
  }
}

function store_fav(config) {
/*
  var oC = localStorage.getItem("fav");
  oC = oC.slice(0, oC.lastIndexOf('([')+1);
  localStorage.setItem("fav", oC+JSON.stringify(config)+')');
*/
  localStorage.setItem("fav", prefix+JSON.stringify(config)+')');
  return config;
}

//add event handers to checkmarks, so less draw code in LS
function extend_fav(divEl) {
  var fc;
  //first checkmark (left)
  (fc = divEl.firstChild).firstChild.onchange = function (evt) {
    var c = read_fav()[1],
      e = evt.target,
      //closure free design, get input from from misc globals
      divEl = e.parentNode.parentNode,
      f = e.checked;
    c[1] = f ? 1 : 0;
    if (!f) {
      c.length = 3;
    }
    divEl.draw_fav(store_fav(c), divEl.draw_fav, divEl, extend_fav);
  };
  //second checkmark (right)
  fc.nextSibling.firstChild.onchange = function (evt) {
    var c = read_fav()[1],
      e = evt.target,
      //closure free design, get input from from misc globals
      divEl = e.parentNode.parentNode;
    if (e.checked) {
      //turn on both checkmarks, implied save history if want RT
      c[1] = c[2] = 1;
    } else {
      c[2] = 0;
    }
    divEl.draw_fav(store_fav(c), divEl.draw_fav, divEl, extend_fav);
  };
}
function _recordFavStopHit(sta_name, fav_url) {
  function validate_fav_order(c,i) {
    var tempEL;
    if(i > 3) {
      if(c[i][2] > c[i-1][2]) {
        tempEl = c[i-1];
        c[i-1] = c[i];
        c[i] = tempEl;
      }
    }
  }
  var c = read_fav();
  if (c) {
    var found;
    if ((c=c[1])[1]) {
      for (n = 3; n < c.length; n++) {
        i = c[n];
        if (i[1] == fav_url) {
          i[2]++; //boost view count
          validate_fav_order(c, n);
          found = 1;
          break;
        }
      }
      if (!found) {
        //add to end, unless full, if full wipe last sta
        c[c.length == 9 ? 8 : c.length] = [sta_name, fav_url, 1];
      }
      store_fav(c);
    } //fav enabled
  } //fav UA supported
}

  var prefixFnStr =
/*STARTINSERTDRAW*/
"function(e,t,d,n){var c,a=document.createElement(\"div\"),o=a.appendChild(document.createElement(\"label\"));if((c=o.appendChild(document.createElement(\"input\"))).type=\"checkbox\",c.checked=e[1],(v=o.appendChild(document.createElement(\"font\"))).color=\"red\",v.appendChild(document.createTextNode(\"❤\")),(c=(o=a.appendChild(document.createElement(\"label\"))).appendChild(document.createElement(\"input\"))).type=\"checkbox\",c.checked=e[1]&&e[2],o.appendChild(document.createTextNode(\"⌛ \")),o=e[1]?3==e.length?\"No history yet\":0:\"History off\")a.appendChild(document.createTextNode(o));else for(i=3;i<9&&(o=e[i]);i++)(c=a.appendChild(document.createElement(\"a\"))).href=(\"r\"==o[1].charAt()?\"/rstop.htm#\":\"/stop.htm#\")+o[1].slice(1),c.appendChild(document.createTextNode(o[0])),a.appendChild(document.createTextNode(\" \"));(window.favDiv=a).draw_fav=t,d?(d.parentNode.replaceChild(a,d),n(a)):document.body.appendChild(a)}"
/*ENDINSERTDRAW*/
  ,
  prefix = '(function(c){var f='+prefixFnStr+';f(c,f)})(',
  delayedStaHits,
  i;

  if(delayedStaHits = this.recordFavStopHit) {
    for(i=0;i<delayedStaHits.length;i+=2) {
      _recordFavStopHit(delayedStaHits[i], delayedStaHits[i+1]);
    }
  }
  //fake Array API so delayed and direct callers r simpler
  this.recordFavStopHit = {push:_recordFavStopHit};

var pathname = location.pathname;
//match "/" "/docs/" and "/index" "/index.htm" "/index.html" etc
//"abc"[2] string as array, doesn't work IE 5.0, its undef, use .charAt()
if (pathname.charAt(pathname.length - 1) == '/' || !pathname.indexOf('/index')) {
  window.onpageshow = function (event_div){
    if (event_div.persisted) {
      event_div = this.favDiv;
      if(event_div) {
        event_div.draw_fav(read_fav()[1],event_div.draw_fav, event_div, extend_fav);
      }
    }
  };
  var checkDOMFn = function () {
    var config = read_fav();
    var prefixFn;
    var styleEl;
    var el;
    //LS global created new, defaults loaded in read_fav();
    if(config) { //false is too old/no LS browser
      if (config[0]) {
        //change to Function() for perf, low priority
        prefixFn = eval('('+prefixFnStr+')');
        //fav obj ver upgrade happpened
        if (this.favDiv) {
          prefixFn(config[1], prefixFn, this.favDiv, extend_fav);
        }
        //virgin user/browser, draw favs very late first time ever
        else {
          el = document.body.lastChild;
          while (el) { //last el is NEVER it
            //alert(el.innerHTML);
            if (el.nodeName == "STYLE") {
              styleEl = el;
              break;
            }
            //anti-run away, maybe remove
            else if (el.nodeName == "A") {
              break;
            el = el.previousElementSibling;
            }
          }
          if (styleEl) {
            prefixFn(config[1], prefixFn, styleEl.parentNode.insertBefore(document.createElement('div'), styleEl));
          }
        }
      } else {
        //remove fav div test eventually, this can only hit if syntax error in LS JS code
        if(!this.favDiv) {
          alert('no div but saw fav draw code');
        }
        else extend_fav(this.favDiv);
      }
    }
  };
  if(document.body) //async script tags supported
    checkDOMFn();
  else //defer the run
    this.x = checkDOMFn;
}
  
})();




