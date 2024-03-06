"use strict";

let v8start;

let textEnc = new TextEncoder();
const faviconStr = new Int8Array([-119, 80, 78, 71, 13, 10, 26, 10,
    0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 70, 0, 0, 0, 76, 8, 6,
    0, 0, 0, -48, -75, -63, -30, 0, 0, 1, 104, 73, 68, 65, 84,
    120, 1, -19, -37, 65, 110, -124, 48, 12, -123, 97, 106, -27,
    72, 62, -109, 15, -27, 51, -7, 78, 109, 119, 44, 80, 71, 93,
    -64, 31, 61, -12, -98, -60, 122, -62, -121, -47, 56, 9, -7,
    -6, -2, -51, -31, 92, 18, 38, 48, -116, 97, 12, 99, 24, -61,
    24, -58, 48, -94, 89, 7, -99, -50, -29, -33, -87, -39, 6,
    115, -19, 124, 121, 12, 28, 10, -128, 1, 48, 120, -96, 19, -
    122, 7, -31, -127, 120, 24, 30, 4, 1, 10, 30, -123, 127,
    109, -7, -118, -31, 81, -80, -22, 9, 73, 20, 96, 76, 33, -
    119, 2, -116, 45, -8, 31, -42, -64, 9, 30, 69, 3, 39, 48,
    20, -79, -60, -21, 81, 58, -31, -65, 107, 53, -88, 26, -127,
    -50, 87, 0, 39, 30, 31, 72, -115, -41, 99, 62, 2, -119, 85,
    -40, 2, 49, -10, -93, 117, 94, 126, -113, -121, 17, -81, -
    80, -72, -15, 102, 88, -84, -102, -13, 2, 96, -34, -97, 78,
    -61, 104, 87, 76, -89, -48, 10, 30, -113, 115, 94, 68, -13,
    -40, -71, 9, -90, -26, -2, -101, -24, 68, 119, 9, -30, 112,
    -128, 21, -68, -102, -19, -13, 40, 87, -52, -11, -11, 50,
    12, 81, -115, 113, 56, 16, 76, 13, -14, 68, 121, 24, -3, -
    59, 38, 111, -72, 121, 18, -23, 87, 9, 94, 28, -29, 97, -12,
    -77, 4, 43, 2, -103, 59, -59, -93, 13, 86, -89, -20, 7, -
    113, 127, 84, -116, 59, -32, -27, -10, 95, 5, -90, 83, 127,
    39, 82, -79, 49, -28, 55, -11, 107, 94, -11, 109, -34, 18, -
    86, 4, -66, 98, -128, -101, -105, -101, 120, -122, 81, -18,
    -128, -87, 81, 68, 1, 96, 20, 113, 48, 24, 21, -100, 26, 26,
    70, 0, -89, -58, 103, 9, -98, 122, 88, -63, 15, -122, 65, 1,
    96, 4, 112, 106, 68, -114, -2, 117, -6, -124, -101, -49, 68,
    106, 124, 28, 4, -64, 0, 88, 62, 119, -19, 125, 37, -61, 24,
    -58, 48, -114, 97, 12, 99, 24, -61, -20, -122, 113, 126, 0,
    35, 123, -80, -59, 19, 19, 36, -10, 0, 0, 0, 0, 73, 69, 78,
    68, -82, 66, 96, -126
  ]);

/*html-minifier will remove spaces and extra "s, DONT change tags, this station list is injected*/
/*STARTINSERT*/
var s={"0AR":"Ardsley-on-Hudson","0BC":"Beacon","0BK":"Breakneck Ridge","0CS":"Cold Spring","0CT":"Cortlandt","0DF":"Dobbs Ferry","0DV":"Spuyten Duyvil","0GA":"Garrison","0GD":"Glenwood","0GY":"Greystone","0HB":"Highbridge-Employees","0HL":"Harlem-125 St","0HM":"Croton-Harmon","0HS":"Hastings-on-Hudson","0IV":"Irvington","0LU":"Ludlow","0MB":"Marble Hill","0MH":"Morris Heights","0MN":"Manitou","0NM":"New Hamburg","0NY":"Grand Central","0OS":"Ossining","0PE":"Peekskill","0PM":"Philipse Manor","0PO":"Poughkeepsie","0RV":"Riverdale","0SB":"Scarborough","0TT":"Tarrytown","0UH":"University Heights","0YK":"Yonkers","0YS":"Yankees-E 153 St","1AT":"Appalachian Trail","1BG":"Botanical Garden","1BH":"Bedford Hills","1BR":"Southeast","1BW":"Brewster","1BX":"Bronxville","1CF":"Croton Falls","1CQ":"Chappaqua","1CW":"Crestwood","1DO":"Dover Plains","1FO":"Fordham","1FW":"Fleetwood","1GO":"Goldens Bridge","1HA":"Hartsdale","1HN":"Hawthorne","1KA":"Katonah","1MK":"Mt Kisco","1ML":"Melrose","1MP":"Mt Pleasant","1MW":"Mt Vernon West","1NW":"North White Plains","1PA":"Patterson","1PV":"Pleasantville","1PW":"Pawling","1PY":"Purdy's","1SC":"Scarsdale","1TK":"Tuckahoe","1TM":"Tenmile River","1TR":"Tremont","1VA":"Valhalla","1WA":"Wassaic","1WF":"Wakefield","1WG":"Williams Bridge","1WI":"Harlem Valley-Wingdale","1WN":"Woodlawn","1WP":"White Plains","2BP":"Bridgeport","2CC":"Cos Cob","2DA":"Darien","2EN":"East Norwalk","2FF":"Fairfield","2FM":"Fairfield Metro","2GF":"Green's Farms","2GN":"Greenwich","2HS":"Harrison","2LA":"Larchmont","2MA":"Mamaroneck","2ME":"Mt Vernon East","2MI":"Milford","2NH":"New Haven","2NO":"Noroton Heights","2NR":"New Rochelle","2OG":"Old Greenwich","2PC":"Port Chester","2PH":"Pelham","2RO":"Rowayton","2RS":"Riverside","2RY":"Rye","2SM":"Stamford","2SN":"South Norwalk","2SP":"Southport","2SR":"Stratford","2SS":"New Haven-State St","2WH":"West Haven","2WP":"Westport","3GB":"Glenbrook","3NC":"New Canaan","3SD":"Springdale","3TH":"Talmadge Hill","4BE":"Bethel","4BV":"Branchville","4CA":"Cannondale","4DN":"Danbury","4M7":"Merritt 7","4RD":"Redding","4WI":"Wilton","5AN":"Ansonia","5BF":"Beacon Falls","5DB":"Derby-Shelton","5NG":"Naugatuck","5SY":"Seymour","5WB":"Waterbury","ABT":"Albertson","ADL":"Auburndale","AGT":"Amagansett","ATL":"Atlantic Terminal","AVL":"Amityville","BDY":"Broadway","BHN":"Bridgehampton","BK":"Stony Brook","BMR":"Bellmore","BOL":"Bolands-Employees","BPG":"Bethpage","BPT":"Bellport","BRS":"Bellerose","BRT":"Belmont Park","BSD":"Bayside","BSR":"Bay Shore","BTA":"Babylon","BWD":"Brentwood","BWN":"Baldwin","CAV":"Centre Av","CHT":"Cedarhurst","CI":"Central Islip","CLP":"Country Life Press","CPG":"Copiague","CPL":"Carle Place","CSH":"Cold Spring Harbor","DGL":"Douglaston","DPK":"Deer Park","EHN":"East Hampton","EMT":"Elmont-UBS Arena","ENY":"East New York","ERY":"East Rockaway","EWN":"East Williston","FHL":"Forest Hills","FLS":"Flushing Main Street","FMD":"Farmingdale","FPK":"Floral Park","FPT":"Freeport","FRY":"Far Rockaway","GBN":"Gibson","GCT":"Grand Central","GCV":"Glen Cove","GCY":"Garden City","GHD":"Glen Head","GNK":"Great Neck","GPT":"Greenport","GRV":"Great River","GST":"Glen Street","GVL":"Greenvale","GWN":"Greenlawn","HBY":"Hampton Bays","HEM":"Hempstead","HGN":"Hempstead Gardens","HIL":"Hillside-Employees","HOL":"Hollis","HPA":"Hunterspoint Av","HUN":"Huntington","HVL":"Hicksville","HWT":"Hewlett","IPK":"Island Park","ISP":"Islip","IWD":"Inwood","JAM":"Jamaica","KGN":"Kew Gardens","KPK":"Kings Park","LBH":"Long Beach","LCE":"Lawrence","LHT":"Lindenhurst","LIC":"Long Island City","LMR":"Locust Manor","LNK":"Little Neck","LTN":"Laurelton","LVL":"Locust Valley","LVW":"Lakeview","LYN":"Lynbrook","MAK":"Mattituck","MAV":"Merillon Av","MFD":"Medford","MHL":"Murray Hill","MHT":"Manhasset","MIN":"Mineola","MPK":"Massapequa Park","MQA":"Massapequa","MRK":"Merrick","MSY":"Mastic-Shirley","MTK":"Montauk","MVN":"Malverne","NAV":"Nostrand Av","NBD":"Nassau Blvd","NHP":"New Hyde Park","NPT":"Northport","NYK":"Penn Station","OBY":"Oyster Bay","ODE":"Oceanside","ODL":"Oakdale","PDM":"Plandome","PGE":"Patchogue","PJN":"Port Jefferson","PLN":"Pinelawn","PWS":"Port Washington","QVG":"Queens Village","RHD":"Riverhead","RON":"Ronkonkoma","ROS":"Rosedale","RSN":"Roslyn","RVC":"Rockville Centre","SAB":"St. Albans","SCF":"Sea Cliff","SFD":"Seaford","SHD":"Southold","SHN":"Southampton","SJM":"St. James","SMR":"Stewart Manor","SPK":"Speonk","SSM":"Mets-Willets Point","STN":"Smithtown","SVL":"Sayville","SYT":"Syosset","VSM":"Valley Stream","WBY":"Westbury","WDD":"Woodside","WGH":"Wantagh","WHD":"West Hempstead","WHN":"Westhampton","WMR":"Woodmere","WWD":"Westwood","WYD":"Wyandanch","YPK":"Yaphank","_GC":"Grand Central"};
/*ENDINSERT*/

/* ASN/ISP lookup cloudflare worker script */
function mkJSResp(str,etag) {
  // escape/prevent double quotes code injection
  // never optimize to .parentNode.innerText, not FF1-FF44 compat, all other yes
  return new Response('!function(e,i){if(e=document.body){for(e=e.lastChild;e=e.previousSibling;)if("DIV"==e.nodeName&&(i=e.firstChild)&&3==i.nodeType){e.replaceChild(document.createTextNode(' + JSON
  .stringify(str) + '),i);return}}}();', {
      headers: {
        "content-type": "text/javascript",
        "cache-control":"no-cache",
        ...etag
      }
    })
}

addEventListener('fetch', event => {
  if(!v8start) {v8start = Date.now()};
  console.log('v8start '+v8start);
try {
  event.respondWith(handleRequest(event.request, event).catch(e => console.log('c'+e)))
      }catch (e) {
        console.log(e+' '+e.stack+' '+e.columnNumber+e.fileName+e.lineNumber);
      //event.respondWith(new Response(e))
    }
})


//typ a .replace() CB, but manual call sometimes
function mkSubFontTag(unused, route) {
  var c =
/*STARTSUBCOLOR*/
{"4":"00933c","5":"00933c","5X":"00933c","6":"00933c","6X":"00a65c","A":"2850ad","C":"2850ad","E":"2850ad","G":"6cbe45","GS":"6d6e71","J":"996633","Z":"996633","L":"a7a9ac","7":"b933ad","7X":"b933ad","1":"ee352e","2":"ee352e","3":"ee352e","N":"fccc0a","Q":"fccc0a","R":"fccc0a","W":"fccc0a","B":"ff6319","D":"ff6319","F":"ff6319","FX":"ff6319","M":"ff6319"}
/*ENDSUBCOLOR*/
  [route];
  route = '['+route+']'
  return c ?'<font color='+c+'>'+route+'</font>':route;
}

/* from status.htm not rstop.htm, slighly bigger */
function noPTag(str) {
  if(typeof str == 'string') {
    //some notices include these at the end, after the global P tag we are trying to remove
    str = str.replace(/(<p style="min-height:10px"><\/p>|<p><\/p>)+$/g,'');
    if (str.indexOf('<p>') === 0 && str.indexOf('</p>', str.length - 4) !== -1) {
      return str.slice(3, -4);
    }
  }
  return str;
}

//t = "2021-05-11T18:58:08-04:00" getFormattedTime
/* unused since switch from abs time to Mins
function getFormattedTime(t) {
    var e = parseIsoDatetime(t),
        h = e.getHours(),
        m = e.getMinutes(),
        a = h > 12 ? h - 12 : h;
    return (0 === a ? "12" : a)+ ":"+(m < 10 ? "0" + m : m)+" "+(h > 11 ? "PM" : "AM");
}
*/

/* mislabeled now */
function parseIsoDatetime(dt,i) {
    dt = dt.split(/[: T-]/);
    for(i in dt)
        dt[i] = parseFloat(dt[i]);
    //return //modified by bulk88 to be mins away instead of parse
    return 'Min '+Math.floor(Math.abs((
        new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0)
        - (new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })))) / 1e3) / 60);
}

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request, event) {
  var url = new URL(request.url)
    ,pathname_callback = url.pathname
    ,resp;
  //console.log(pathname_callback);
  if (pathname_callback === '/favicon.ico') {
    return new Response(faviconStr, {
      headers: {
        "cache-control": "max-age=691200,no-transform",
        "content-type": "image/vnd.microsoft.icon",
        'x-v8st': v8start
      }
    });
  }
else if (pathname_callback.startsWith('/api/')) {
  var ct_pathnameroot = pathname_callback.substr(5,3);
  resp = fetch((ct_pathnameroot === 'su/' // 'li/' othr choice
    ? 'http://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:'
    : ct_pathnameroot === 'alt' ?
    "http://collector-otp-prod.camsys-apps.com/realtime/gtfsrt/ALL/alerts?type=json&apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP"
    : ct_pathnameroot === 'wea' ?
    "https://api.weather.com/v3/wx/forecast/hourly/1day?geocode=40.74,-73.91&format=json&units=e&language=en-US&apiKey=8de2d8b3a93542c9a2d8b3a935a2c909"
    //railroad occupany
    : ct_pathnameroot === 'rl/' ?
    "http://backend-unified.mylirr.org/locations/"
    //ra = railroad arrivals
    : "http://backend-unified.mylirr.org/arrivals/")
    + pathname_callback.substring(8)
    + (ct_pathnameroot === 'rl/' ? '?geometry=NONE' : ''), {
    headers: { //LIRR server errors otherwise
      'accept-version': '3.0'
    }
  });
  //from express, but guarenteed JSONP no CORS
  pathname_callback = (url.searchParams.get('callback') || '_xcallback').replace(/[^\[\]\w$.]/g, '');
  pathname_callback = '/**/ typeof ' + pathname_callback + ' === \'function\' && ' + pathname_callback + '({http_code:';
  resp = await resp;
  if (ct_pathnameroot === 'rts') {
    event.waitUntil((updateRoutes(event)));
  }
  ct_pathnameroot = resp.headers.get('content-type');
  pathname_callback += resp.status + ',content_type:\'' + ct_pathnameroot + '\',contents:';
  resp = await resp.text();
  return new Response(pathname_callback + (ct_pathnameroot.startsWith('application/json')
    //from express
    ?resp.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') :
    JSON.stringify(resp)) + '});', {
    headers: {
      'content-type': 'text/javascript',
      //no-store and IE 6, script file downloaded over the wire
      //but never executes
      'cache-control': 'no-cache',
      //from express
      "x-content-type-options": 'nosniff',
    }
  });
}
else if (pathname_callback.startsWith('/s/')) {
  pathname_callback = pathname_callback.substr(('/s/'.length), 3);
  if (/^\w+$/.test(pathname_callback)) {
    var url_headsign = "http://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:" + pathname_callback;
    resp = fetch(url_headsign);
    var h = '<meta content=0 name=mobileoptimized>[1][<a accesskey=1 href=' + pathname_callback + '>Refresh</a>] <a href=' + url_headsign + '>Raw</a><br>';
    var hotkeys = [2,3,4,5,6,7,8,9,0];
    resp = await resp;
    if (resp.status == 200) {
      resp = resp.json();
      var hotkey_timestamp = 0;
      resp = await resp;

      /*h=html*/
      var i, route, trip, alerts, o = {}, r = resp;
      if (r.length) {
        //initial array is for a geosearch with multiple stations, not exact sta
        r = r[0];
        alerts = r.alerts;
        //server returns sorted by route, we want sort by dir
        for (i in r.groups) {
          route = r.groups[i];
          /*h=headsign*/
          //less lines/better UI on phone
          url_headsign = route.headsign.replace('Downtown & Brooklyn', 'Downtown & Bklyn');
          for (i in route.times) {
            trip = route.times[i];
            trip.shortRouteName = route.route.shortName;
            trip.timestamp > hotkey_timestamp && (hotkey_timestamp = trip.timestamp);
            (o[url_headsign] = o[url_headsign] || []).push(trip);
          }
        }
        for (i in o) //object keys
          //alpha sort ISO 8601 timestamps
          o[i].sort(function(a, b) {
            return a.departureFmt < b.departureFmt ? -1 :
              a.departureFmt > b.departureFmt ? 1 :
              0;
          });
        /* departureFmt becomes UI time eventually
                return _.each(t.times, function(t) {
                  e.times.push({
                    stopId: t.stopId,
                    realtime: t.realtime,
                    status: t.realtimeState,
                    departure: t.departureFmt,
                    pattern: t.pattern ? t.pattern.id : null,
                    tripHeadsign: t.tripHeadsign ? t.tripHeadsign.toLowerCase() : "",
                    tripId: t.tripId,
                    serviceDay: t.serviceDay,
                    directionId: t.directionId
                  })
                }), e
        */
        h += new Date(hotkey_timestamp*1000).toLocaleTimeString('en-US', { timeZone: 'America/New_York' })
          + " via CFW<br>"
          + 'CurSta:' + r.stop.name + "<br>";

        for (i in o) { //object keys
          h += '<a accesskey='+(hotkey_timestamp=hotkeys.shift())+' name='+hotkey_timestamp+' href=#'+hotkey_timestamp+'>'+i+"</a><br>";
          //route is dir really
          route = o[i];
          for (i in route) {
            //if departureDelay > 0 
            //todo (49620-49080)/60 = 9 mins late
            //MN/LIR algo, NYCT reports also
            //realtimeDeparture: 49620
            //scheduledDeparture: 49080
            trip = route[i];
            h += parseIsoDatetime(trip.departureFmt) +
              '-' + mkSubFontTag(0,trip.shortRouteName) +
              '-' + trip.tripHeadsign +
              //disable track numbers, nobody cares, this isn't Commuter rail
              //'-Tk' + (trip.track === void 0 ? '?' : ' ' + trip.track ) +
              (trip.track === void 0 ? '-Tk?' : '') +
              (trip.realtime ? '-' : '-NRT-') +
              (function(rts) {
                switch (rts) {
                  case "SCHEDULED":
                    return "SCH";
                  case "UPDATED":
                    return "UPD";
                  case "CANCELED":
                    return "CNX";
                  case "ADDED":
                    return "ADD";
                  case "MODIFIED":
                    return "MOD";
                  default:
                    return "UNK";
                }
              })(trip.realtimeState)
              /* delay can be neg, chop off fractional,
              OTP overflow bug on "service day", scheduledDeparture is seconds
              since midnight of yesterday, realtimeDeparture is seconds since
              midnight of today, happens right after 1200AM */
              +
              ((trip = ((((trip = trip.departureDelay) < -43200 ?
                trip + 86400 : trip) / 60) | 0)) ? (trip > 0 ? '-L' : '-E') + Math.abs(trip) : '') + "<br>";
          }
        }
        h += '<br>Key: E2 (early 2 min) L3 (late 3 min)<br>NRT (not realtime)<br><br>';
        o = ''; // deferred UI alerts (ongoing (unsched) vs planned)
        //alerts array sometimes missing
        r = r.alerts || [];
        //time sort alerts in the array
        r.sort(function(a, b) {
          return a.effectiveStartDate < b.effectiveStartDate ? -1 :
            a.effectiveStartDate > b.effectiveStartDate ? 1 :
            0;
        });
        for (i=0; i < r.length && i < 10; i++) {
          trip = r[i];
          if (trip.alertType) { //skip elevators, elevators are missing alertType field
            hotkey_timestamp = hotkeys.shift();
            route = (hotkey_timestamp === void 0 ? trip.alertType : '<a accesskey='+hotkey_timestamp+' href=#'+hotkey_timestamp+' name='+hotkey_timestamp+'>'+trip.alertType+"</a>")+"<br>" + (trip.humanReadableActivePeriod || 'Ongoing') + "<br>" + trip.alertHeaderText.replace(/\[(\w+)\]/g, mkSubFontTag) + (trip.alertDescriptionText?"<br>"+trip.alertDescriptionText.replace(/\[(\w+)\]/g, mkSubFontTag):'') + "<br><br>";
            //delays dont have a time period, put them first in UI
            trip.humanReadableActivePeriod ? o += route : h += route;
          }
        }
        h += o;
      } else
        h = "station not found";

      return new Response(h, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-cache, no-store'
        }
      });
    } else {
      return resp
    }
  }}
else if (pathname_callback.startsWith('/li/s/')) {
  pathname_callback = pathname_callback.substr(('/li/s/'.length), 3);
  if (/^\w+$/.test(pathname_callback)) {
    var url_headsign = "http://backend-unified.mylirr.org/arrivals/" + pathname_callback;
    resp = fetch(url_headsign, {
      headers: {
        'accept-version' : '3.0'
      }
    });
    var h = '<meta content=0 name=mobileoptimized>[1][<a accesskey=1 href=' + pathname_callback + '>Refresh</a>] <a href=' + url_headsign + '>Raw</a><br>'
      + new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' })
      +" via CFW<br>"
      +'CurSta:' + s[pathname_callback] + "<br><a accesskey=2 name=2 href=#2>East</a><br>";
    var w = "<a accesskey=3 name=3 href=#3>West</a><br>"; /*w=west*/
    resp = await resp;
    if (resp.status == 200) {
      var r = await resp.json();
      var i, t, l; /*t=train, l=lineofhtml, h=html*/
      for (i = 0; i < r.arrivals.length; i++) {
        t = r.arrivals[i];
        //note to self, ceil is round up, |0 is round down
        //console.log('x'+Math.ceil((t.time - ((new Date().getTime()/1000))) / 60)+'   '+(((t.time - ((new Date().getTime()/1000))) / 60)|0));
        l = new Date((l = t.time) * 1000).toLocaleTimeString('en-US', { timeZone: 'America/New_York' }).replace(':00 ', ' ') +
          '-Min ' + Math.ceil((l - (new Date(new Date().toLocaleString()) / 1000)) / 60)
/*
        } else if (!_.isUndefined(train.status.otp)) {
            const otpMin = Math.trunc(train.status.otp / 60)
            const otpMinAbs = Math.abs(otpMin)
            otpStr = 'On time'
            if (otpMinAbs !== 0) {
                const otpClass = otpMin < 0 ? 'late' : 'early'
                const otpTerm = otpMinAbs === 1 ? 'minute' : 'minutes'
                otpStr = `${otpMinAbs} ${otpTerm} ${otpClass}`
            }
        }
*/
        + ((l=t.status.otp) && (l=(l/60)|0) ? (l > 0 ? '-E'+l : '-L'+-l):'')
        + '-Tk' + (t.track || '?')
        + "-<font color=" + (
/*STARTRAILCOLOR*/
{"HA":"0039a6","HH":"006ec7","PJ":"006ec7","BY":"00985f","HU":"009b3a","WH":"00a1de","OB":"00af3f","MK":"00b2a9","12":"4d5357","CI":"4d5357","11":"60269e","FR":"6e3219","RK":"a626aa","PW":"c60c30","HM":"ce8e00","DN":"ee0034","NC":"ee0034","NH":"ee0034","WB":"ee0034","LB":"ff6319"}
/*ENDRAILCOLOR*/
        )[t.branch] + ">" + s[(l=t.stops)[l.length - 1]]
        + "</font>"+(t.peak_code == 'O'?'':'-Pk')+"<br>"; //A or P are peak
        t.direction == 'E' ? h += l : w += l;
      }
    /* add west trains to mega html string and reuse west var */
    h += w;
    w = '<br>';
    for (i in r.banners) {
      i = r.banners[i];
      //always show banners, they aren't attached to all stations at once
      //l = Number(location.hash.slice(1,2));
      // if LIRR && is not numeric aka is LIRR sta code then draw, not in MTA UI code
      // IDK abbrevation for MNRR in API but other railroad && numeric will draw
      //if((i.railroad == 'LIRR') == (l !== +l)) {
        w += i.title+'<br>'+i.text+'<br><br>';
      //}
    }
    r = r.alerts;
    //time sort alerts in the array
    r.sort(function(a, b) {
        return a.start_time < b.start_time ? -1 :
            a.start_time > b.start_time ? 1 :
            0;
    });
    for (i in r) {
      i = r[i];
      w += i.status+'<br>'+noPTag(i.header)+'<br>'+(i.human_duration?i.human_duration+'<br>':'')+noPTag(i.text)+'<br><br>';
    }
    h += w;

      return new Response(h, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-cache, no-store'
        }
      });
    } else {
      return resp
    }
  }
}
else if (pathname_callback === "/routes.js") {
  var clientEtag = request.headers.get("if-none-match");

  event.respondWith(new Response(
      clientEtag === routesEtag ? '' : gRoutes, {
      status: clientEtag === routesEtag ? 304 : 200,
      headers: {
        'content-type': 'text/javascript',
        'etag': routesEtag,
        //don't double fetch with preload and fetch()
        'cache-control': 'max-age=10, stale-while-revalidate=86400',
        'access-control-allow-origin': '*',
      }
    }));
  event.waitUntil((updateRoutes(event)));
      return null;
    }
  /* Workers Preview has undef cf obj and cf prop is tested R/O
  United Nations (AS676) is a very unique looking ISP */
  var cf = request?.cf || {
    asn: 676
  };
  var ip = request?.headers?.get('cf-connecting-ip') || '0.0.0.0';
  var etag = 'W/"Z'+ip+'.'+cf.asn+'"';
  if(request?.headers?.get('if-none-match') == etag){
    return new Response(null, {status: 304});
  }
  var asnqstr = "AS" + cf.asn;
  //todo check len for 255 overflow
  asnqstr = String.fromCharCode(asnqstr.length) + asnqstr +
    "\x03\x61\x73\x6e\x05\x63\x79\x6d\x72\x75\x03\x63\x6f\x6d\x00\x00\x10\x00\x01";
  /* Workers Preview bug doesn't allow IP addr hosts */
  resp = fetch("https://" + (request?.cf ? "1.1.1.1" :
    "cloudflare-dns.com") + "/dns-query", {
    method: 'post',
    body: "\x00\x02\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00" + asnqstr,
    headers: {
      "content-type": 'application/dns-message'
    }
  });
  /* fit some CPU tast during I/O block */
  asnqstr = new TextEncoder().encode(asnqstr);
  /* Chop QTYPE 16b and QCLASS 16b off end, to set up for a
    future memcmp range leaving only QNAME (host name) as the field to match*/
  var endptr = asnqstr.byteLength - 4;
  resp = await resp;
  /* don't error check the 1.1.1.1 HTTP server, unimaginable it goes down */
  var bufmetaobj = await resp.arrayBuffer();
  var bufdv = new DataView(bufmetaobj);
  /*QR bit 0x8000, Recur desire 0x100
   (0x200 is truncate, error if on, check is free CPU wise),
   recur available 0x80, start at offset 2, skipping 16b ID */
  if ((bufdv.getUint16(2) & 0x8380) == 0x8180
    /* questions count and answer count */
    &&
    bufdv.getUint32(4) == 0x10001
    /* NS count and additional record count , 2 16b zeros*/
    &&
    bufdv.getUint32(8) == 0) {
    let i, equal_flag, i_ptr;
    /* https://code.woboq.org/userspace/glibc/resolv/res_send.c.html#266
    glibc res_nameinquery() checks the question section in the response
    against what it sent out on the wire to make sure its identical
    do that here through a memcmp()*/
    equal_flag = 1;
    for (i = 0; i < asnqstr.byteLength; i++) {
      if (asnqstr[i] !== bufdv.getUint8(i + 12)) {
        equal_flag = 0;
        break;
      }
    }
    if (equal_flag) {
      //pointer is on 1st byte after question section now
      i += 12;
      let ansdomainlabelptr;
      if ((bufdv.getUint8(i) & 0xC0) == 0xC0) {
        /* LABEL_POINTER aka Message compression */
        /* https://github.com/tjfontaine/native-dns-packet/blob/master/packet.js#L75 */
        ansdomainlabelptr = bufdv.getUint16(i) & ~0xC000;
        i_ptr = i + 2;
      } else {
        ansdomainlabelptr = i;
        i_ptr = i + endptr;
      }
      equal_flag = 1;
      for (i = 0; i < endptr; i++) {
        if (asnqstr[i] !== bufdv.getUint8(i + ansdomainlabelptr)) {
          equal_flag = 0;
          break;
        }
      }
      if (equal_flag) {
        /* 0x10 TXT record, 0x01 class internet */
        if (bufdv.getUint32(i_ptr) == 0x00100001) {
          /*skip 16b QTYPE, 16b QCLASS, and 32b TTL */
          i_ptr += 8;
          /* check 16b RDLENGTH  for sanity*/
          if (bufdv.getUint16(i_ptr) + (i_ptr += 2) == bufdv.byteLength) {
            /* check 8b <character-string> node for sanity*/
            if (bufdv.getUint8(i_ptr) + (i_ptr += 1) == bufdv.byteLength) {
              return mkJSResp("Your ISP: "+ip+" | AS"+new TextDecoder().decode(new Uint8Array(bufdv
                .buffer, i_ptr)),{etag: etag});
            }
          }
        }
      }
    }
  }
  return mkJSResp("ERROR: raw data: "+new TextDecoder().decode(new Uint8Array(bufmetaobj)),{});
}
/* throws in CF, prints JS in browser dev console */
//try{handleRequest().then(function(r){r.text().then(function(s){console.log(s)})})}
//catch(e){}

async function updateRoutes (event) {
      var i = 0,
      ghkey,
      e, /* entry */
      etag,
      resp,
      resp_min,
      new_resp_min,
      routes_escaped,
      new_resp
      resp = fetch('http://otp-mta-prod.camsys-apps.com/otp/routers/default/index/routes?apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE');
      resp = await resp;

      if (resp.status === 200) {
        resp = resp.json();
        resp = await resp;
        //MTA origin randomly includes these null fields, must be different
        //version load balancer serializers, normalize the data so etags
        //stay the same
        for (; i < resp.length; i++) {
          e = resp[i];
          if (e.longName === null) {
            delete e.longName;
          }
          if (e.shortName === null) {
            delete e.shortName;
          }
          if (e.color === null) {
            delete e.color;
          }
        }
        //resp.unshift({"id":"TINYMTA:" + (new Date()).toString()});
        resp = mapper.buildServiceRoutes(resp);
/*
drawhtml routes DB mandatory fields

agency (needed for drawhtml, unlikely it can be removed)
inService DONE (complicated if needed, hardwired-on in MTA UI in generating Routes DB, not a backend MTA JSON field, overridden by RT alert summary text to "No Scheduled Service" for belmont line, only bus & rail has it on MTA UI API, not sub, sub MTA UI already doesnt have the field, probably could be removed b/c alerts service delivers the flag (status "no scheduled") indirectly)
April 2023, Belmont Branch was removed as a route by MTA, probably after Elmont-UBS station opened
so no more permanent Mercury alert saying "No Scheduled Service" for belmont line, so just remove
.inService totally
isExpressBus (remove it, unused in UI) DONE
routeId (id is correct, unk purpose) DONE
route (same as id) DONE
id (neeeded for drawhtml maybe can be removed, investigate more) CANT REMOVE, its internal route ID for mercury/LMM alerts
shortName (removed, name and shortName identical) DONE
longName (remove it, unused in UI, only used in building routes, maybe one day re-add it if bus routes UI needs full name) DONE
agencyName (remove it, unused in UI) DONE
paramId (remove it, unused in UI) DONE
sortOrder (remove for bus & rail, always 0, not used in UI, only used by subway) DONE
routeType (remove it, unused in UI, or replace mode (Bus/rail/sub) with integer routeType? routeType for bus separates local vs express vs subway shuttle, already missing for subway) DONE
regionalFareCardAccepted (remove it, unused in UI) DONE
agencyId (remove it, unused in UI) DONE
containsExpress (remove it, unused in UI) DONE
agency (can't be removed b/c RAIL and BUS, don't bother adding/splitting it from ID at UI runtime)

-original 2270 bytes gz, all gz sizes
-Bx->BX, and display name dupe drop to 1662 bytes
-drop 5 slice subway to 3 slice (rmv ,s) drop to 1657 bytes
-non-false for rail+bus, agency 99, display names 43
-agency vs display name flip for bus and rail drop to 1652 bytes (rmv ,s)
-subway sort order before color, drop color if null, 1652->1646
-H, FS, SI are missing colors in MTA routes DB
-rmv subway colors from routes DB, b/c unused & need agency in same slot
-we inc our own color DB anyways in HTML 1646->1600
*/

        resp = JSON.stringify(resp);
        //make JS obj literal notation, not JSON to save bytes, must eval() on client
        resp = '!function(E){E=this.R,this.R='+resp.replace(/null/g, '')+',E&&E()}();';
        //resp = resp.replace(/\[/, '[{"id":"TINYMTA:' + (new Date()).toString() + '","longName":"","mode":"BUS","color":"CAE4F1","agencyName":"","paramId":"AMK__42920","sortOrder":0,"routeType":3,"regionalFareCardAccepted":false},');
        etag = await crypto.subtle.digest('MD5', textEnc.encode(resp));
        //lock-hazard, update globals no promises
        etag = 'W/"' + btoa(String.fromCharCode.apply(null, new Uint8Array(etag))) + '"';
        //console.log('at etag upd comp');
        if (routesEtag !== etag) {
          //console.log('etag mismatch');
          try {
            ghkey = GHAPISECRET
          } catch (e) {
            if(!(ghkey = url.searchParams.get('key'))) {
              console.log("GHAPI key is invalid="+ghkey)
            }
            ghkey = 'Basic '+ghkey;
          }
          //ghkey = '';
          //atomic hazard
          routesEtag = etag;
          gRoutes = resp;
          //patch ourself
          //TODO also patch .min
          resp = fetch("https://raw.githubusercontent.com/bulk88/tinymta/master/cloudflare_as_name.js", {cf: {cacheTtlByStatus: -1}});
          resp_min = fetch("https://raw.githubusercontent.com/bulk88/tinymta/master/cloudflare_as_name.min.js", {cf: {cacheTtlByStatus: -1}});
          resp = await resp;
          resp_min = await resp_min;
          console.log('got old gh script');
            if (resp.status == 200 && resp_min.status == 200) {
              resp = await resp.text();
              resp_min = await resp_min.text();
              //not injection safe, not binary or \n safe
              //https://github.com/terser/terser/blob/master/lib/output.js#L319
              //x27 == '
              routes_escaped = gRoutes.replace(/\x27/g, "\\'");
              //update to new RESP
              new_resp = resp.replace(/let (\w+)='[^']*',(\w+)='[^']*';$/, "let $1='"+etag+"',$2='"+routes_escaped+"';");
              if(new_resp == resp) {
                console.log('failed to patch full size cfw src');
              }
              //minify prefers double quotes, always reset to single to minimize chars
              new_resp_min = resp_min.replace(/let (\w+)=(?:'[^']*'|"[^"]*"),(\w+)=(?:'[^']*'|"[^"]*");$/, "let $1='"+etag+"',$2='"+routes_escaped+"';");
              if(new_resp_min == resp_min) {
                console.log('failed to patch mini cfw src');
              }
              //\x20 is space
              //resp = resp.replace(/let\x20routesEtag='[^']?'/, "let routes"+"Etag='"+etag+"'")
              //resp = resp.replace(/,gRoutes='[^']?';/, ",gRou"+"tes='"+resp+"';")

              /* git auth token extracted like this from windows box

              sh-4.4$  GIT_TRACE=1 GIT_TRACE_PACK_ACCESS=1 GIT_TRACE_PACKET=1 GIT_TRACE_PERFORMANCE=1 GIT_TRACE_SETUP=1 GIT_MERGE_VERBOSITY=1 GIT_CURL_VERBOSE=1 GIT_TRACE_SHALLOW=1 GCM_TRACE=1 GIT_TRACE_REDACT=0 git push

              code taken from
              https://github.com/renovatebot/renovate/blob/5f213255d088054500cdd980b62092f4d22f5f4c/lib/platform/github/storage.js

               */

              var get = {};

              async function got(url, options) {
                return ajaxRun("GET", url, options)
              }
              async function post(url, options) {
                return ajaxRun("POST", url, options)
              }
              async function patch(url, options) {
                return ajaxRun("PATCH", url, options)
              }
              async function ajaxRun(method, url, options) {
                var resp = await fetch('https://api.github.com/' + url, {
                  method: method,
                  headers: {
                    authorization: ghkey,
                    'user-agent': 'tinymta_cfw'
                  },
                  ...(options && {
                    body: JSON.stringify(options)
                  })
                });
                if(resp.status >= 300) {
                  console.log('failed status='+resp.status+' ct='+resp.headers.get('content-type')+' url='+url);
                  resp = await resp.text();
                  console.log(resp);
                  return resp;
                } else {
                  return await resp.json();
                }
              };

              var config = {
                repository: 'bulk88/tinymta',
              };

              let branchFiles = {};

              var global = {
                gitAuthor: {
                  name: "RoutesBot",
                  email: "bulk88@hotmail.com",
                }
              };

              //need time zone like moment.js does
              function toIsoString(date) {
                var tzo = -date.getTimezoneOffset(),
                dif = tzo >= 0 ? '+' : '-',
                pad = function (num) {
                  return (num < 10 ? '0' : '') + num;
                };

                return date.getFullYear() +
                '-' + pad(date.getMonth() + 1) +
                '-' + pad(date.getDate()) +
                'T' + pad(date.getHours()) +
                ':' + pad(date.getMinutes()) +
                ':' + pad(date.getSeconds()) +
                dif + pad(Math.floor(Math.abs(tzo) / 60)) +
                ':' + pad(Math.abs(tzo) % 60);
              }

              // Create a commit and return commit SHA
              async function createCommit(parent, tree, message) {
                /* unused
                const {
                gitPrivateKey
                } = config;
                 */
                /* const now = moment(); */
                let author;
                if (global.gitAuthor) {
                  author = {
                    name: global.gitAuthor.name,
                    email: global.gitAuthor.email,
                    date: toIsoString(new Date()) /* now.format() */,
                  };
                }
                const body = {
                  message,
                  parents: [parent],
                  tree,
                };
                if (author) {
                  body.author = author;
                  /* unused
                  if (gitPrivateKey) {
                  const privKeyObj = openpgp.key.readArmored(gitPrivateKey).keys[0];
                  const commit = `tree ${tree}\nparent ${parent}\nauthor ${
                  author.name
                  } <${author.email}> ${now.format('X ZZ')}\ncommitter ${
                  author.name
                  } <${author.email}> ${now.format('X ZZ')}\n\n${message}`;
                  const {
                  signature
                  } = await openpgp.sign({
                  data: openpgp.util.str2Uint8Array(commit),
                  privateKeys: privKeyObj,
                  detached: true,
                  armor: true,
                  });
                  body.signature = signature;
                  }
                   */
                }
                return (await post(`repos/${config.repository}/git/commits`, body))
                .sha;
              }

              // Internal: Updates an existing branch to new commit sha
              async function updateBranch(branchName, commit) {
                const options = {
                  sha: commit,
                  force: true,
                };
                try {
                  await patch(
`repos/${config.repository}/git/refs/heads/${branchName}`,
                    options);
                } catch (err) {
                  if (err.statusCode === 422) {
                    console.log(err + ' Branch no longer exists - exiting');
                    throw new Error('repository-changed');
                  }
                  throw err;
                }
              }
              // Low-level commit operations

              // Return the commit SHA for a branch
              async function getBranchCommit(branchName) {
                try {
                  const res = await got(
`repos/${config.repository}/git/refs/heads/${branchName}`);
                  return res.object.sha;
                } catch (err) {
                  if (err.statusCode === 404) {
                    throw new Error('repository-changed');
                  }
                  if (err.statusCode === 409) {
                    throw new Error('empty');
                  }
                  throw err;
                }
              }
              // Return the tree SHA for a commit
              async function getCommitTree(commit) {
                return (await got(`repos/${config.repository}/git/commits/${commit}`))
                .tree.sha;
              }
              async function createBlob(fileContents) {
                const options = {
                  encoding: 'base64',
                  content: btoa(fileContents)
                };
                return (await post(`repos/${config.repository}/git/blobs`, options))
                .sha;
              }

              // Create a tree and return SHA
              async function createTree(baseTree, files) {
                const body = {
                  base_tree: baseTree,
                  tree: [],
                };
                files.forEach(file => {
                  body.tree.push({
                    path: file.name,
                    mode: '100644',
                    type: 'blob',
                    sha: file.blob,
                  });
                });
                return (await post(`repos/${config.repository}/git/trees`, body))
                .sha;
              }
              // Add a new commit, create branch if not existing
              async function commitFilesToBranch(
                branchName,
                files,
                message,
                parentBranch = config.baseBranch) {
                try {
                  delete branchFiles[branchName];
                  const fileBlobs = [];
                  // Create blobs
                  for (const file of files) {
                    const blob = createBlob(file.contents);
                    fileBlobs.push({
                      name: file.name,
                      blob,
                    });
                  }
                  const parentCommit = await getBranchCommit(parentBranch);
                  const parentTree = await getCommitTree(parentCommit);
                  // Create tree
                  for (var i = 0; i < fileBlobs.length; i++) {
                    fileBlobs[i].blob = await fileBlobs[i].blob;
                  }
                  const tree = await createTree(parentTree, fileBlobs);
                  const commit = await createCommit(parentCommit, tree, message);
                  /*
                  const isBranchExisting = await branchExists(branchName);
                  if (isBranchExisting) { */
                  await updateBranch(branchName, commit);
                  return 'updated';
                  /*
                  }
                  await createBranch(branchName, commit);
                  if (branchList) {
                  branchList.push(branchName);
                  }
                  return 'created';
                   */
                } catch (err) {
                  if (err.statusCode === 404) {
                    throw new Error('repository-changed');
                  }
                  throw err;
                }
              }
              console.log('will push commit');

              event.waitUntil(commitFilesToBranch("master", [{
                    name: "cloudflare_as_name.js",
                    contents: new_resp
                  },{
                    name: "cloudflare_as_name.min.js",
                    contents: new_resp_min
                  }
                ], "Routes Upd " + new Date().toLocaleString("en-US", {
                  timeZone: "America/New_York"
                }), "master"));
            }
        }
        return true;
  }}

var mapper = {};

function buildSubwayRoute (data) {
  function AGENCY_MTASBWY() {return 0};
  function ROUTE_ID() {return 0};
  function ROUTE_SUB_SORTORDER() {return 1};
  var routeDetails = [];
  var i = 0, subwayLine, route, name;

  for(; i < data.length; i++) {
  subwayLine = data[i];
  /*b88 pass array only once */
  if(subwayLine.mode === 'SUBWAY'
      && !subwayLine.id.indexOf('MTA')) {
    route = false;
    name = subwayLine.shortName;

    //b88 turn into a temp hash instead of find(), performance
    // check to see if a previous, associated, non-express line is found given the current express line
    if (name.substr(name.length - 1, name.length) === 'X') {
      // if so, set the route given the previously set non-express route
      var baseName = name.substr(0, name.indexOf('X'));
      route = routeDetails.find(function (element) {
        return typeof element === 'object' && element[ROUTE_ID()] == baseName;
      });
    }

    // check to see if a route was found...
    if (!route) {
      // if not, initialize one and add it to the routeDetails array
      name = subwayLine.id.split(":").pop();
      //save JSON encoding, remove double quotes if possible on integers
      if (name == ""+(+name)) {
        name = +name;
      }
   //stats for non-false fields
   //{agency: 110, id: 394, name: 394, color: 380, sortOrder: 26}
   //June 2023, reduced to route_id and sortOrder only, agency implied slot 3
      routeDetails.push(
      //route =
        [
          /*id ROUTE_ID() */ name,
          /*sortOrder ROUTE_SUB_SORTORDER() */ subwayLine.sortOrder
          /*agency AGENCY_MTASBWY() */
          /*color subwayLine.color unused in UI*/
        ]
      //route
      );
    } else {
      //b88 note containsExpress is unused in this app
      // otherwise, first set the containsExpress variable / flag
      //route.containsExpress = true;
    }
  }
  }

  return routeDetails;
}

function buildBusRoute (stopData) {
//NYCT has more routes
function AGENCY_MTABC() {return 1};
function AGENCY_MTA_NYCT() {return 0};
function AGENCIES_MAP_BUS() {return ['MTA NYCT', 'MTABC']};
function ROUTE_ID() {return 0};
function ROUTE_COLOR() {return 1};
function ROUTE_AGENCY() {return 2};
function ROUTE_NAME() {return 3};

  var mapRoutes = stopData
    .filter(function (busRoute) {return busRoute.mode === 'BUS'
      && !!~busRoute.id.indexOf('MTA')
      //remove subway shuttle buses
      //their alerts show up under actual mode subway/original rail routes
      //this causes less route updates on weekends, in any case, Bustime app
      //and MTA CS public side use made up Q**/B** to refer to shuttle buses
      //on BT, not 7/J/A routes, yes GTFS paper doesn't agree with BT app on
      //route names and schedules of shuttle buses
      && busRoute.agencyName != 'MTA NYCT - Subway'})
    .map(function (stop) {
      //warning, subway shuttles have "id":"MTASBWYSHTL:7-SS" and "agencyName":"MTA NYCT - Subway" in raw route DB
      //in raw routes DB, reg buses all have "MTA:" id prefix regardless agency
      //"informed_entity": [{"agency_id": "MTA NYCT","route_id": "M79+"
      //now important question, what is agency_id of an alert-ed shuttle bus?
      //raw routes DB uses long agency names, alerts DB uses short
      //stats for non-false fields
      //{agency: 110, id: 394, name: 394, color: 380, sortOrder: 26}
      var route = [
        /*id*/   stop.id.split(':').pop(),
        /* subway shuttles have no color, but also Jun 2023
           we exclude subway shuttles b/c they arent used,
           leave code just incase*/
        /*color*/ stop.color || null,
      ];
      /* AGENCY_MTA_NYCT() is 0, save array slot */
      if(stop.agencyName !== 'MTA New York City Transit') {
        route[ROUTE_AGENCY()] = AGENCY_MTABC();
      }
      /* almost all bus display names are same as route ID, save space */
      if(route[ROUTE_ID()] != stop.shortName && !route[ROUTE_ID()].startsWith("BX")) {
        route[ROUTE_NAME()] = stop.shortName;
      }
      return route;
    })
  mapRoutes.sort(function (line1, line2) {
    if (line1[ROUTE_NAME()] < line2[ROUTE_NAME()]) { //sort string alphabetically
      return -1;
    } else /*if (line1.route > line2.route)*/ {
      return 1;
    }
  }).forEach(function(route) {
/* subway shuttles are integers sometimes, save JSON bytes*/
    var name = route[ROUTE_NAME()];
    var nameInt = +name;
    if(name == ""+nameInt) {
      route[ROUTE_NAME()] = nameInt;
    }
  });
  return mapRoutes;
}

function buildRailRoute (data_line) {
  //LIRR has more routes
  function AGENCY_MNR() {return 1};
  /* function AGENCY_LI() {return 0}; */
  function ROUTE_ID() {return 0};
  function ROUTE_AGENCY() {return 2};
  function ROUTE_NAME() {return 3};
  var railLines = data_line
    .filter(function (railLine) {
      return railLine.mode === 'RAIL' /* mode.toUpperCase removed b88 */
      /*b88 dont ask why it works, but startsWith || startsWith
      be careful of LIBUS in refactoring in future*/
       && !(railLine.id.indexOf('LI') && railLine.id.indexOf('MNR'))
    })

    .map(function (railLine) {
      //stats for non-false fields
      //{agency: 110, id: 394, name: 394, color: 380, sortOrder: 26}
      var route = railLine.id.split(":").pop();
      //save JSON encoding, remove double quotes if possible on integers
      //all but wassaic are ints, but leave provision for alpha route ids vs blindly int-ing
      route == ""+(+route) && (route = +route);
      route = [
        /* id */
        route,
        /*color*/
        railLine.color,
        /* LI is more frequent, and == 0, null is rmv later*/
        /*agency*/
        !~railLine.id.indexOf('LI') ? AGENCY_MNR() : null,
        /*name*/
        railLine.longName
      ];
      return route;
    });
  railLines.push(/* WEIRD_RAIL_LINES */
    [
      /*id*/
      "Wassaic",
      /*color*/
      "0039A6",
      /*agency*/
      AGENCY_MNR(),
      /*name*/
      "Wassaic"
    ]);

  // start by sorting all rail lines alphabetically
  railLines.sort(function (line1, line2) {
    if (line1[ROUTE_NAME()] < line2[ROUTE_NAME()]) {  //sort string alphabetically
      return -1;
    } else /*if (line1.route > line2.route)*/ {
      return 1;
    }
  });

  // remove all kubes from the railLines array that are contained within the NEW_HAVEN_BRANCHES constant (array)
  var newHavenBranches = []
  var newHavenLineIndex
  var harlemBranches = []
  var harlemLineIndex

  for (var i = 0; i < railLines.length; i++) {
    data_line = railLines[i];
// get the index of the 'New Haven' line
    if(data_line[ROUTE_AGENCY()] /* ==  AGENCY_MNR()*/
      && data_line[ROUTE_ID()] == 3) {
      newHavenLineIndex = i
    }
// get the index of the 'Harlem' line
    if(data_line[ROUTE_AGENCY()] /* ==  AGENCY_MNR()*/
      && data_line[ROUTE_ID()] == 2) {
      harlemLineIndex = i
    }
    if (/*NEW_HAVEN_BRANCHES.*/
      data_line[ROUTE_AGENCY()] /* ==  AGENCY_MNR()*/
      /* test MNR:4 to MNR:6 lines */
      && data_line[ROUTE_ID()] >= 4
      && data_line[ROUTE_ID()] <= 6) {
      newHavenBranches.push(data_line)
      railLines.splice(i, 1)
      i--
    }
  // remove all kubes from the railLines array that are contained within the HARLEM_BRANCHES constant (array)
    if (/*HARLEM_BRANCHES.*/~data_line[ROUTE_NAME()].indexOf('Wassaic')) {
      harlemBranches.push(data_line)
      railLines.splice(i, 1)
      i--
    }
  }

  // place the (sorted) newHavenBranches into the railLines array directly AFTER the newHavenLineIndex and return
  railLines = railLines.slice(0, newHavenLineIndex + 1).concat(newHavenBranches).concat(railLines.slice(newHavenLineIndex + 1));
  return railLines.slice(0, harlemLineIndex + 1).concat(harlemBranches).concat(railLines.slice(harlemLineIndex + 1));
}

mapper.buildServiceRoutes = function (response) {
  //constants are in status.htm
  // fetch('https://tinymta.us.to/routes.json').then(r => {r.json().then(
   // r => {var s = {}; r.forEach(a => {a.forEach(
   // e=>{Object.keys(e).forEach(
   // k => {typeof s[k] === 'undefined' && (s[k] = 0); if(e[k]) {s[k]++} })})});
   // console.log(s)})})
   //stats for non-false fields
   //{agency: 110, id: 394, name: 394, color: 380, sortOrder: 26}
  return [
    buildBusRoute(response),
    buildRailRoute(response),
    buildSubwayRoute(response)
  ];
}
/* dont touch so bot can find it, ; must be last char of file*/
let routesEtag='W/"MsaKGfn0PJ56KSW6dzMtqQ=="',gRoutes='!function(E){E=this.R,this.R=[[["BXM1","00933C",1],["BXM2","00933C",1],["BXM3","00933C",1],["BXM4","00933C",1],["BXM6","00933C",1],["BXM7","00933C",1],["BXM8","00933C",1],["BXM9","00933C",1],["L92","EE352E"],["SIM33C","00933C"],["J90","EE352E"],["BXM10","00933C",1],["BXM11","00933C",1],["BXM18","00933C",1],["BX18A","6CBE45"],["BX18B","6CBE45"],["B12","6CBE45"],["B13","FAA61A"],["B11","006CB7"],["B16","FAA61A"],["B17","B933AD"],["B14","00AEEF"],["B15","B933AD"],["B20","6CBE45"],["M79+","EE352E",,"M79-SBS"],["B24","FAA61A"],["B25","6CBE45"],["B26","006CB7"],["S40","B933AD"],["S44","FAA61A"],["S42","00AEEF"],["M14D+","6CBE45",,"M14D-SBS"],["Q06","B933AD",1,"Q6"],["S48","EE352E"],["Q07","6CBE45",1,"Q7"],["S46","006CB7"],["Q08","B933AD",1,"Q8"],["Q09","B933AD",1,"Q9"],["B31","FAA61A"],["B35","EE352E"],["B32","006CB7"],["B38","00AEEF"],["B39","00AEEF"],["B36","FAA61A"],["B37","B933AD"],["S51","006CB7"],["S52","B933AD"],["Q10","FAA61A",1],["Q13","EE352E"],["S55","FAA61A"],["S56","6CBE45"],["S53","EE352E"],["Q11","6CBE45",1],["Q12","EE352E"],["S54","FAA61A"],["S59","EE352E"],["Q17","EE352E"],["Q18","00AEEF",1],["Q15","FAA61A"],["S57","6CBE45"],["Q16","EE352E"],["SIM8","00933C"],["SIM9","00933C"],["Q19","00AEEF",1],["B41","006CB7"],["B42","006CB7"],["B45","EE352E"],["SIM1","00933C"],["B46","6CBE45"],["SIM2","00933C"],["B43","EE352E"],["B44","B933AD"],["SIM3","00933C"],["B49","EE352E"],["SIM4","00933C"],["SIM5","00933C"],["B47","FAA61A"],["SIM6","00933C"],["SIM7","00933C"],["B48","6CBE45"],["BX12+","006CB7"],["S62","B933AD"],["Q21","006CB7",1],["S61","EE352E"],["S66","6CBE45"],["Q24","00AEEF"],["Q25","00AEEF",1],["Q22","EE352E",1],["Q23","FAA61A",1],["Q28","EE352E"],["Q29","00AEEF",1],["Q26","6CBE45"],["Q27","EE352E"],["B52","EE352E"],["B57","EE352E"],["B54","6CBE45"],["Q31","FAA61A"],["Q32","00AEEF"],["M106","6CBE45"],["S74","EE352E"],["Q30","FAA61A"],["Q35","006CB7",1],["S78","FAA61A"],["Q36","FAA61A"],["Q33","EE352E",1],["S76","B933AD"],["Q34","FAA61A",1],["Q39","B933AD",1],["Q37","00AEEF",1],["Q38","EE352E",1],["B60","B933AD"],["B63","006CB7"],["B64","6CBE45"],["B61","6CBE45"],["B103","FAA61A",1],["B62","00AEEF"],["B67","EE352E"],["B68","EE352E"],["B100","B933AD",1],["B65","00AEEF"],["B69","006CB7"],["S81","006CB7"],["S84","EE352E"],["Q42","00AEEF"],["Q43","EE352E"],["Q40","6CBE45",1],["Q41","B933AD",1],["Q46","EE352E"],["Q47","6CBE45",1],["S89","EE352E"],["S86","B933AD"],["Q48","006CB7"],["Q49","006CB7",1],["M34+","006CB7",,"M34-SBS"],["B70","B933AD"],["B74","EE352E"],["M101","FAA61A"],["M102","FAA61A"],["M103","B933AD"],["M104","B933AD"],["Q70+","EE352E",1,"Q70-SBS"],["M100","00AEEF"],["S91","EE352E"],["S92","B933AD"],["Q50","FAA61A",1],["S90","B933AD"],["Q54","B933AD"],["S96","006CB7"],["S93","EE352E"],["S94","FAA61A"],["Q58","6CBE45"],["Q55","EE352E"],["S98","EE352E"],["Q56","B933AD"],["Q59","FAA61A"],["B82","6CBE45"],["B83","EE352E"],["B84","006CB7"],["Q60","EE352E",1],["Q64","EE352E",1],["M116","6CBE45"],["Q65","00AEEF",1],["Q69","00AEEF",1],["Q66","EE352E",1],["Q67","FAA61A",1],["M125","B933AD"],["Q72","B933AD",1],["Q76","6CBE45"],["Q77","FAA61A"],["M15+","006CB7",,"M15-SBS"],["Q83","6CBE45"],["Q84","B933AD"],["Q85","EE352E"],["Q88","FAA61A"],["Q90","00933C"],["Q93","6CBE45"],["M10","006CB7"],["Q94","6CBE45"],["Q92","00933C"],["Q95","6CBE45"],["M11","FAA61A"],["M12","006CB7"],["M15","006CB7"],["Q53+","FAA61A",1,"Q53-SBS"],["M20","EE352E"],["M21","FAA61A"],["M22","00AEEF"],["Q52+","FAA61A",1,"Q52-SBS"],["M31","B933AD"],["M35","FAA61A"],["M14A+","6CBE45",,"M14A-SBS"],["M42","EE352E"],["M50","6CBE45"],["M57","00AEEF"],["M55","6CBE45"],["M34A+","006CB7",,"M34A-SBS"],["M66","FAA61A"],["M72","6CBE45"],["Q110","006CB7",1],["Q111","EE352E",1],["Q114","FAA61A",1],["Q112","EE352E",1],["Q113","EE352E",1],["Q100","FAA61A",1],["Q107",],["Q108",],["Q103","EE352E",1],["Q104","B933AD",1],["Q101","6CBE45",1],["Q102","006CB7",1],["M98","EE352E"],["M96","6CBE45"],["B2","006CB7"],["B1","00AEEF"],["B4","6CBE45"],["B3","EE352E"],["S79+","006CB7",,"S79-SBS"],["B6","EE352E"],["B8","FAA61A"],["B7","EE352E"],["B9","EE352E"],["SIM15","00933C"],["SIM10","00933C"],["SIM11","00933C"],["X27","00933C"],["X28","00933C"],["X37","00933C"],["X38","00933C"],["Q15A","FAA61A"],["BX20","00AEEF"],["BX21","6CBE45"],["BX22","EE352E"],["BX23","B933AD",1],["BX24","6CBE45"],["BX25","FAA61A"],["BX26","FAA61A"],["BX27","00AEEF"],["BX28","00AEEF"],["BX29","00AEEF"],["B82+","6CBE45",,"B82-SBS"],["BX10","006CB7"],["BX11","FAA61A"],["X63","00933C"],["BX12","006CB7"],["BX13","006CB7"],["X64","00933C"],["BX15","FAA61A"],["BX16","00AEEF"],["X68","00933C"],["BX17","006CB7"],["BX19","B933AD"],["BX40","006CB7"],["BX41","EE352E"],["BX42","EE352E"],["BX46","EE352E"],["QM25","00933C",1],["QM24","00933C",1],["QM21","00933C",1],["QM20","00933C",1],["BX4A","FAA61A"],["BM2","00933C",1],["BM3","00933C",1],["BM1","00933C",1],["BM4","00933C",1],["BM5","00933C",1],["BX30","EE352E"],["BX31","EE352E"],["BX32","6CBE45"],["BX33","6CBE45"],["BX34","B933AD"],["BX35","00AEEF"],["BX36","B933AD"],["QM15","00933C",1],["BX38","FAA61A"],["BX39","FAA61A"],["QM12","00933C",1],["QM11","00933C",1],["QM10","00933C",1],["QM18","00933C",1],["QM17","00933C",1],["QM16","00933C",1],["M60+","EE352E",,"M60-SBS"],["BX6+","EE352E"],["QM40","00933C",1],["QM44","00933C",1],["QM42","00933C",1],["M1","EE352E"],["SIM8X","00933C"],["M3","B933AD"],["M2","B933AD"],["M5","EE352E"],["M4","00AEEF"],["M7","00AEEF"],["M9","B933AD"],["M8","00AEEF"],["QM3","00933C",1],["QM4","00933C",1],["QM1","00933C",1],["QM2","00933C",1],["QM7","00933C",1],["QM8","00933C",1],["QM36","00933C",1],["QM35","00933C",1],["QM5","00933C",1],["M86+","FAA61A",,"M86-SBS"],["QM6","00933C",1],["QM34","00933C",1],["QM32","00933C",1],["QM31","00933C",1],["SIM35","00933C"],["SIM3C","00933C"],["SIM32","00933C"],["SIM31","00933C"],["SIM34","00933C"],["SIM33","00933C"],["SIM30","00933C"],["SIM25","00933C"],["SIM24","00933C"],["SIM26","00933C"],["SIM1C","00933C"],["SIM23","00933C"],["SIM22","00933C"],["SIM4X","00933C"],["Q1","FAA61A"],["Q3","00AEEF"],["Q2","6CBE45"],["Q5","EE352E"],["Q4","EE352E"],["SIM4C","00933C"],["B44+","B933AD",,"B44-SBS"],["B46+","6CBE45",,"B46-SBS"],["M23+","B933AD",,"M23-SBS"],["BX1","00AEEF"],["BX2","FAA61A"],["BX5","EE352E"],["BX6","EE352E"],["BX3","EE352E"],["BX4","FAA61A"],["BX9","FAA61A"],["BX7","EE352E"],["BX8","FAA61A"],["BX41+","EE352E"],["Q20B","006CB7"],["Q20A","006CB7"],["Q44+","EE352E",,"Q44-SBS"]],[[1,"00985F",,"Babylon Branch"],[12,"4D5357",,"City Terminal Zone"],[7,"6E3219",,"Far Rockaway Branch"],[2,"0039A6",1,"Harlem"],["Wassaic","0039A6",1,"Wassaic"],[2,"CE8E00",,"Hempstead Branch"],[1,"009B3A",1,"Hudson"],[6,"FF6319",,"Long Beach Branch"],[5,"00B2A9",,"Montauk Branch"],[3,"EE0034",1,"New Haven"],[5,"EE0034",1,"Danbury"],[4,"EE0034",1,"New Canaan"],[6,"EE0034",1,"Waterbury"],[3,"00AF3F",,"Oyster Bay Branch"],[50,"94219A",1,"Pascack Valley"],[10,"006EC7",,"Port Jefferson Branch"],[51,"FFD411",1,"Port Jervis"],[9,"C60C30",,"Port Washington Branch"],[4,"A626AA",,"Ronkonkoma Branch"],[8,"00A1DE",,"West Hempstead Branch"]],[[1,1],[3,3],[2,2],[5,5],[4,4],[7,9],[6,7],["H",28],["J",19],["M",17],["L",21],["N",22],["Q",23],["R",24],["W",25],["A",11],["C",12],["B",14],["E",13],["D",15],["G",18],["F",16],["Z",20],["FS",26],["GS",27],["SI",29]]],E&&E()}();';