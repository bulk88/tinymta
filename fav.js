var R;//maybe as.js CB
var L;//async race CB fav.js vs inline wea script

(function(){
//don't touch next 4 lines, they are matched by adj_fav.pl
function DRAW_VER() { return 124; };
function DRAW_VER_STR() { return "124"; };
function DRAW_VER_LEN() { return 3; };
function PREFIX_LEN() { return 3655; };
//returns array [createdNewFavsBool,favsConfig]
function read_fav(finish) {
  try {
    var c = localStorage.getItem("fav");
    if (1) {
      //+1 is [
      if (!c || c.substr(PREFIX_LEN() + 1, DRAW_VER_LEN()) !== DRAW_VER_STR()) {
        //initial default/first ever!!! (cookie/LS clear) favs obj on particular user
        //global config array is, version int, keep hist bool, realtime bool, has emoji bool, sta#1, sta#2
        this.F = function (_prefix, config) {
          prefix = _prefix;
          finish(config);
          this.F = 0;
        };
        document.documentElement.firstChild.appendChild(document.createElement("script")).src = '/ifav.js';
      } else {
        prefix = c.slice(0, PREFIX_LEN() + 0);
        finish([0, JSON.parse(c.slice(PREFIX_LEN() + 0, c.length - 1))]);
      }
    } else {
      //debugging only branch
      prefix = '(function(c){var f=function(e,t){return window.draw_fav_ld(e,t)};f(c)})(';
      if (!c || c.indexOf(prefix) != 0) {
        var dont_have_clr_emoji;
        var ctx = document.createElement("canvas");
        try {
          ctx = ctx.getContext("2d");
          ctx.canvas.width = ctx.canvas.height = 1;
          ctx.fillText("\ud83d\udca7", -4, 4);
          dont_have_clr_emoji = ctx.getImageData(0, 0, 1, 1).data[2]; //RGBA, [2] is blue
        } catch (e) {}
        dont_have_clr_emoji = +!dont_have_clr_emoji;
        localStorage.setItem("fav", prefix + '[' + '99999999' + ',1,0,' + dont_have_clr_emoji + '])');
        finish([1, [99999999, 1, 0, dont_have_clr_emoji]]);
      } else {
        finish([0, JSON.parse(c.slice(prefix.length, c.length - 1))]);
      }
    }
  } catch (e) {
    //favs not supported on browser
    finish(/*0*/);
  }
}

function store_fav(config) {
  localStorage.setItem("fav", prefix+JSON.stringify(config)+')');
  return config;
}

//add event handers to checkmarks, so less draw code in LS
function extend_fav(divEl,left) {
  divEl = divEl.firstChild;
  left = divEl.nextSibling.firstChild;
  divEl = divEl.firstChild;
  //IE 8 fix
  left.onclick = divEl.onclick = function() {
    this.blur();
  };
  //first checkmark (left), then right
  left.onchange = divEl.onchange = function (evt_div) {
    evt_div = this;
    read_fav(function(c) {
    c = c[1];
    //IE 8 has arg undef, all other UAs have event obj
    var chked = evt_div.checked;
    evt_div = evt_div.parentNode;
    if(evt_div === evt_div.parentNode.firstChild) {
      //1st checkmark
      if (chked) {
        c[1] = 1;
      } else {
        c[1] = 0;
        //wipe history
        c.length = 4;
        //fav cached height
        localStorage.removeItem('fh');
      }
    } else {
      //2nd checkmark
      if (chked) {
        //turn on both checkmarks, implied save history if want RT
        c[2] = c[1] = 1;
      } else {
        c[2] = 0;
      }
    }
    //closure free design, get input from from misc globals
    evt_div = evt_div.parentNode;
    evt_div.draw_fav(
      store_fav(c),
      function(newFDiv) {
        evt_div.parentNode.replaceChild(newFDiv, evt_div);
      }
    );
  }); //read_fav CB
  };//onchange CB for checkboxes
}

function _recordFavStopHit(sta_name, fav_url) {
  read_fav(function (c) {
  var found;
  var minus_1_sta;
  var c_len;
  var n = 4;
  if (c) { // if UA supports favs/LS
    if ((c=c[1])[1]) {//if fav enabled
      for (c_len = c.length; n < c_len; n++) {
        i = c[n];
        if (i[1] == fav_url) {
          i[2]++; //boost view count
          //resort stations
          if(n > 4) { //if cur sta not first sta
          //if hit count of cur sta higher than next higher sta in list
            if(i[2] > (minus_1_sta = c[n-1])[2]) {
              //swap stations, pushing cur up, and -1 down
              c[n-1] = i;
              c[n] = minus_1_sta;
            }
          }
          found = 1;
          break;
        }
      }//end sta search loop
      if (!found) {
        //add to end, unless full, if full wipe last sta
        c[c_len == 10 ? 9 : c_len] = [sta_name, fav_url, 1];
      }
      store_fav(c);
    } //fav enabled
  } //fav UA supported
  });//read_fav CB
}

  var prefix,
  delayedStaHits_head,
  newEl_i;



//"abc"[2] string as array, doesn't work IE 5.0, its undef, use .charAt()
if (location.pathname == '/') {
  //not index.htm render critical files
  delayedStaHits_head = document.documentElement.firstChild;
/*
routes.js takes a while to generate b/c its a CFW, so start it early
it doesn't cause congestion on the wire b/c CFW latency, its also small
vs MTA alerts file, which is gz LARGER than this entire web site!!! gz-ed
*/
  newEl_i = document.createElement('link');
  newEl_i.rel = 'preload';
  newEl_i.as = 'script';
  newEl_i.href = 'routes.js';
  delayedStaHits_head.appendChild(newEl_i);
  newEl_i = document.createElement('link');
  newEl_i.rel = 'prefetch';
  newEl_i.href = 'stop.htm';
  newEl_i = delayedStaHits_head.appendChild(newEl_i).cloneNode(0);
  newEl_i.href = 'rstop.htm';
  delayedStaHits_head.appendChild(newEl_i);

  window.onpageshow = function (event_div){
    if (event_div.persisted && location.pathname == "/") {
      event_div = this.favDiv;
      if(event_div) {
        read_fav(function(c){
          event_div.draw_fav(
            c[1],
            function(newFDiv) {
              event_div.parentNode.replaceChild(newFDiv, event_div);
              //RT Time refresh, no need to add evt handlers
            },
            2 //opt code, delay fetch with setTimeout, modern chrome bug
          );
        });
      }
    }
  };
  var checkDOMFn = function (fn) {
    //call as.js DOM load CB if needed, typ for no fav support UA
    R=R&&R();
    read_fav(function(config) {
      var favDiv;
      if(config) { //false is too old/no LS browser
        if (favDiv = config[0]) {//[0] is result flag from read_fav, it made/wiped the config
        //LS global created new, defaults loaded in read_fav();
          extend_fav(favDiv);
        } else {
          //remove fav div test eventually, this can only hit if syntax error in LS JS code
          if(!(favDiv = this.favDiv)) {
            alert('no div but saw fav draw code');
          }
          else
            extend_fav(favDiv); //add checkmark event handlers, 99% time this branch
        }
      }
    });//read_fav cb
    return;
  };//dom loaded CB
  if(
    //document.body && is redundant, Safari 5.1.7 has FULL <BODY> dom tree built
    //but DIDNT run inline script tags yet, just test for wea draw y() func instead
    this.y
  ) { //async script tags supported/have DOM
    checkDOMFn();
  } else {//defer the run
    L = checkDOMFn;
  }

}// if index.htm

//always add recordFav global, b/c SPA
if(delayedStaHits_head = this.rF) {
  for(newEl_i=0;newEl_i<delayedStaHits_head.length;newEl_i+=2) {
    _recordFavStopHit(delayedStaHits_head[newEl_i], delayedStaHits_head[newEl_i+1]);
  }
}
//fake the Array API so delayed and direct callers r simpler
this.rF = {push:_recordFavStopHit};

})();




