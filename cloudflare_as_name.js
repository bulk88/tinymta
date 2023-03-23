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
  return new Response("document.body.appendChild(document.createTextNode(" + JSON
    .stringify(str) + "))", {
      headers: {
        "content-type": "text/javascript",
        "cache-control":"no-cache, no-transform",
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


//text includes [] chars usually, if route blank, text is route
function mkSubFontTag(text, route) {
  var c =
/*STARTSUBCOLOR*/
{"1":"EE352E","2":"EE352E","3":"EE352E","4":"00933C","5":"00933C","5X":"00933C","6":"00933C","6X":"00A65C","7":"B933AD","7X":"B933AD","A":"2850AD","B":"FF6319","C":"2850AD","D":"FF6319","E":"2850AD","F":"FF6319","FX":"FF6319","G":"6CBE45","GS":"6D6E71","J":"996633","L":"A7A9AC","M":"FF6319","N":"FCCC0A","Q":"FCCC0A","R":"FCCC0A","W":"FCCC0A","Z":"996633"}
/*ENDSUBCOLOR*/
  [route||text];
  return c ?'<font color='+c+'>'+text+'</font>':text;
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
    ,pathname_callback = url.pathname;
    console.log(pathname_callback)
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
  var resp = pathname_callback.substr(5,3);
  resp = fetch((resp === 'su/' // 'li/' othr choice
    ? 'http://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:'
    : resp === 'alt' ?
    "http://collector-otp-prod.camsys-apps.com/realtime/gtfsrt/ALL/alerts?type=json&apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP"
    : "http://backend-unified.mylirr.org/arrivals/")
    //is "" for "alt"
    + pathname_callback.substring(8), {
    headers: { //LIRR server errors otherwise
      'accept-version': '3.0'
    }
  });
  //from express, but guarenteed JSONP no CORS
  pathname_callback = (url.searchParams.get('callback') || '_xcallback').replace(/[^\[\]\w$.]/g, '');
  pathname_callback = '/**/ typeof ' + pathname_callback + ' === \'function\' && ' + pathname_callback + '({http_code:';
  resp = await resp;
  var ct = resp.headers.get('content-type');
  pathname_callback += resp.status + ',content_type:\'' + ct + '\',contents:';
  resp = await resp.text();
  return new Response(pathname_callback + (ct.startsWith('application/json')
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
    var resp = fetch(url_headsign);
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
        for (i in o)
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

        for (i in o) {
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
              '-' + mkSubFontTag(trip.shortRouteName) +
              '-' + trip.tripHeadsign +
              //disable track numbers, nobody cares, this isn't Commuter rail
              //'-Tk' + (trip.track === void 0 ? '?' : ' ' + trip.track ) +
              (trip.track === void 0 ? '-Tk?' : '') +
              (!trip.realtime ? '-NRT-' : '-') +
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
    var resp = fetch(url_headsign, {
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
        + '-Tk' + (t.track || '?')
        + "-<font color=" + (
/*STARTRAILCOLOR*/
{"11":"60269E","12":"4D5357","BY":"00985F","CI":"4D5357","DN":"EE0034","FR":"6E3219","HA":"0039A6","HH":"006EC7","HM":"CE8E00","HU":"009B3A","LB":"FF6319","MK":"00B2A9","NC":"EE0034","NH":"EE0034","OB":"00AF3F","PJ":"006EC7","PW":"C60C30","RK":"A626AA","WB":"EE0034","WH":"00A1DE"}
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
  
else if (pathname_callback === "/routes.json") {
  var clientEtag = request.headers.get("if-none-match");

  event.respondWith(new Response(
      clientEtag === routesEtag ? '' : gRoutes, {
      status: clientEtag === routesEtag ? 304 : 200,
      headers: {
        'content-type': 'application/json',
        'etag': routesEtag,
        //don't double fetch with preload and fetch()
        'cache-control': 'max-age=10, stale-while-revalidate=86400',
        'access-control-allow-origin': '*',
      }
    }));
  event.waitUntil((async function (resolveCB) {
      var i = 0,
      ghkey,
      e, /* entry */
      etag,
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
inService (complicated if needed, hardwired-on in MTA UI in generating Routes DB, not a backend MTA JSON field, overridden by RT alert summary text to "No Scheduled Service" for belmont line, only bus & rail has it on MTA UI API, not sub, sub MTA UI already doesnt have the field, probably could be removed b/c alerts service delivers the flag (status "no scheduled") indirectly)
isExpressBus (remove it, unused in UI) DONE
routeId (needed for drawhtml)
route (neeeded for drawhtml but not all line types have it, investigate more)
id (neeeded for drawhtml maybe can be removed, investigate more)
shortName (needed for drawhtml maybe can be removed, investigate more)
longName (remove it, unused in UI, only used in building routes, maybe one day re-add it if bus routes UI needs full name) DONE
agencyName (remove it, unused in UI) DONE
paramId (remove it, unused in UI) DONE
sortOrder (remove for bus & rail, always 0, not used in UI, only used by subway) DONE
routeType (remove it, unused in UI, or replace mode (Bus/rail/sub) with integer routeType? routeType for bus separates local vs express vs subway shuttle, already missing for subway) DONE
regionalFareCardAccepted (remove it, unused in UI) DONE
agencyId (remove it, unused in UI) DONE
containsExpress (remove it, unused in UI) DONE
*/
        Object.values(resp).forEach(val => {
          for(var i = 0; i < val.length; i++) {
          delete val[i].isExpressBus;
          delete val[i].longName;
          delete val[i].agencyName;
          delete val[i].paramId;
          val[i].sortOrder == 0 && delete val[i].sortOrder;
          delete val[i].routeType;
          delete val[i].regionalFareCardAccepted;
          delete val[i].agencyId;
          delete val[i].containsExpress;
          }
        });
        resp = JSON.stringify(resp);
        //resp = resp.replace(/\[/, '[{"id":"TINYMTA:' + (new Date()).toString() + '","longName":"","mode":"BUS","color":"CAE4F1","agencyName":"","paramId":"AMK__42920","sortOrder":0,"routeType":3,"regionalFareCardAccepted":false},');
        etag = await crypto.subtle.digest('MD5', textEnc.encode(resp));
        //lock-hazard, update globals no promises
        etag = 'W/"' + btoa(String.fromCharCode.apply(null, new Uint8Array(etag))) + '"';
        if (routesEtag !== etag) {
          console.log('etag mismatch')
          try {
            ghkey = GHAPISECRET
          } catch (e) {
            if(!(ghkey = url.searchParams.get('key'))) {
              console.log("GHAPI key is invalid="+ghkey)
            }
            ghkey = 'Basic '+ghkey;
          }
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
  }}()));
      return null;
    }
  /* Workers Preview has undef cf obj and cf prop is tested R/O
  United Nations (AS676) is a very unique looking ISP */
  var cf = request?.cf || {
    asn: 676
  };
  var ip = request?.headers?.get('cf-connecting-ip') || '0.0.0.0';
  var etag = 'W/"'+ip+'.'+cf.asn+'"';
  if(request?.headers?.get('if-none-match') == etag){
    return new Response(null, {status: 304});
  }
  var asnqstr = "AS" + cf.asn;
  //todo check len for 255 overflow
  asnqstr = String.fromCharCode(asnqstr.length) + asnqstr +
    "\x03\x61\x73\x6e\x05\x63\x79\x6d\x72\x75\x03\x63\x6f\x6d\x00\x00\x10\x00\x01";
  /* Workers Preview bug doesn't allow IP addr hosts */
  var resp = fetch("https://" + (request?.cf ? "1.1.1.1" :
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

async function updateRoutes(event, resolveCB, url, clientEtag, failedCache) {

}

var mapper = {};

function buildSubwayRoute (data) {
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
        return typeof element === 'object' && element.name === baseName ? 1 : 0
      });
    }

    // check to see if a route was found...
    if (!route) {
      // if not, initialize one and add it to the routeDetails array
      var agency = subwayLine.id.split(":")[0];
      var id = subwayLine.id.split(":")[1];
      routeDetails.push({
        agency: agency,
        agencyId: agency,
        name: id,
        mode: 'SUBWAY',
        color: subwayLine.color,
        sortOrder: subwayLine.sortOrder,
        id: id
      });
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
  var mapRoutes = stopData
    .filter(function (busRoute) {return busRoute.mode === 'BUS'
      && !!~busRoute.id.indexOf('MTA')})
    .map(function (stop) {
      var agency = stop.agencyName === 'MTA New York City Transit' ? 'MTA NYCT' : 'MTABC';
      //var routeId = agency+"_"+stop.id.split(':')[1];

      return Object.assign({
        agency: agency,
        inService: true,
/* const BANNED_XBUS_ROUTE_TYPE = 702; */
        isExpressBus: (stop.routeType === 702),
        routeId: agency+"_"+stop.id.split(':')[1], /* routeId,*/
        route: stop.shortName
      }, stop)
    })
  return mapRoutes
}

function buildRailRoute (data_line) {
  var railLines = data_line
    .filter(function (railLine) {
      return railLine.mode === 'RAIL' /* mode.toUpperCase removed b88 */
        /*b88 dont ask why it works, but startsWith || startsWith
        be careful of LIBUS in refactoring in future*/
        && !(railLine.id.indexOf('LI') && railLine.id.indexOf('MNR'))
    })
    .concat(/* WEIRD_RAIL_LINES */
    [{
  id: "MNR:Wassaic",
  agency: "MNR",
  color: "0039A6",
  inService: true,
  mode: "RAIL",
  longName: "Wassaic",
  routeId: "MNR_Wassaic",
  routeType: 2
}]
    )
    .map(function (railLine) {
      var agency = !railLine.id.indexOf('LI') ? 'LI' : 'MNR';
      railLine.inService = true;
      railLine.agency = agency;
      railLine.agencyId = agency;
      railLine.route = railLine.longName;
      railLine.routeId = railLine.routeId ? railLine.routeId : railLine.id.replace(":", "_");
      railLine.mode = "RAIL";
      railLine.shortName = railLine.longName;
      return railLine;
    })

  // start by sorting all rail lines alphabetically
  .sort(function (line1, line2) {
    if (line1.longName < line2.longName) {  //sort string alphabetically
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
    if(data_line.id === 'MNR:3') {
      newHavenLineIndex = i
    }
// get the index of the 'Harlem' line
    if(data_line.id === 'MNR:2') {
      harlemLineIndex = i
    }
    if (/*NEW_HAVEN_BRANCHES.*//^(MNR:4|MNR:5|MNR:6)$/.test(data_line.id)) {
      newHavenBranches.push(data_line)
      railLines.splice(i, 1)
      i--
    }
  // remove all kubes from the railLines array that are contained within the HARLEM_BRANCHES constant (array)
    if (/*HARLEM_BRANCHES.*/~data_line.longName.indexOf('Wassaic')) {
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
  var routes = {
    busRoutes: buildBusRoute(response),
    railLines: buildRailRoute(response),
    subwayLines: buildSubwayRoute(response),
    //lastUpdated: new Date()
  };

  return routes;
}
/* dont touch so bot can find it, ; must be last char of file*/
let routesEtag='W/"iSe12WLtMworb6ZebxBQqg=="',gRoutes='{"busRoutes":[{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM1","route":"BxM1","id":"MTA:BXM1","shortName":"BxM1","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM2","route":"BxM2","id":"MTA:BXM2","shortName":"BxM2","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM3","route":"BxM3","id":"MTA:BXM3","shortName":"BxM3","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM4","route":"BxM4","id":"MTA:BXM4","shortName":"BxM4","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM6","route":"BxM6","id":"MTA:BXM6","shortName":"BxM6","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM7","route":"BxM7","id":"MTA:BXM7","shortName":"BxM7","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM8","route":"BxM8","id":"MTA:BXM8","shortName":"BxM8","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM9","route":"BxM9","id":"MTA:BXM9","shortName":"BxM9","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_L92","route":"L92","id":"MTA:L92","shortName":"L92","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM33C","route":"SIM33C","id":"MTA:SIM33C","shortName":"SIM33C","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_A-SS","route":"A","id":"MTASBWYSHTL:A-SS","shortName":"A","mode":"BUS"},{"agency":"MTABC","inService":true,"routeId":"MTABC_FS-SS","route":"FS","id":"MTASBWYSHTL:FS-SS","shortName":"FS","mode":"BUS"},{"agency":"MTABC","inService":true,"routeId":"MTABC_2-SS","route":"2","id":"MTASBWYSHTL:2-SS","shortName":"2","mode":"BUS"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM10","route":"BxM10","id":"MTA:BXM10","shortName":"BxM10","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM11","route":"BxM11","id":"MTA:BXM11","shortName":"BxM11","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BXM18","route":"BxM18","id":"MTA:BXM18","shortName":"BxM18","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX18A","route":"Bx18A","id":"MTA:BX18A","shortName":"Bx18A","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX18B","route":"Bx18B","id":"MTA:BX18B","shortName":"Bx18B","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B12","route":"B12","id":"MTA:B12","shortName":"B12","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B13","route":"B13","id":"MTA:B13","shortName":"B13","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B11","route":"B11","id":"MTA:B11","shortName":"B11","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B16","route":"B16","id":"MTA:B16","shortName":"B16","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B17","route":"B17","id":"MTA:B17","shortName":"B17","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B14","route":"B14","id":"MTA:B14","shortName":"B14","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B15","route":"B15","id":"MTA:B15","shortName":"B15","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B20","route":"B20","id":"MTA:B20","shortName":"B20","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M79+","route":"M79-SBS","id":"MTA:M79+","shortName":"M79-SBS","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B24","route":"B24","id":"MTA:B24","shortName":"B24","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B25","route":"B25","id":"MTA:B25","shortName":"B25","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B26","route":"B26","id":"MTA:B26","shortName":"B26","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S40","route":"S40","id":"MTA:S40","shortName":"S40","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S44","route":"S44","id":"MTA:S44","shortName":"S44","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S42","route":"S42","id":"MTA:S42","shortName":"S42","mode":"BUS","color":"00AEEF"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q06","route":"Q6","id":"MTA:Q06","shortName":"Q6","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S48","route":"S48","id":"MTA:S48","shortName":"S48","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q07","route":"Q7","id":"MTA:Q07","shortName":"Q7","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S46","route":"S46","id":"MTA:S46","shortName":"S46","mode":"BUS","color":"006CB7"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q08","route":"Q8","id":"MTA:Q08","shortName":"Q8","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q09","route":"Q9","id":"MTA:Q09","shortName":"Q9","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B31","route":"B31","id":"MTA:B31","shortName":"B31","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B35","route":"B35","id":"MTA:B35","shortName":"B35","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B32","route":"B32","id":"MTA:B32","shortName":"B32","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B38","route":"B38","id":"MTA:B38","shortName":"B38","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B39","route":"B39","id":"MTA:B39","shortName":"B39","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B36","route":"B36","id":"MTA:B36","shortName":"B36","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B37","route":"B37","id":"MTA:B37","shortName":"B37","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S51","route":"S51","id":"MTA:S51","shortName":"S51","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S52","route":"S52","id":"MTA:S52","shortName":"S52","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q10","route":"Q10","id":"MTA:Q10","shortName":"Q10","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q13","route":"Q13","id":"MTA:Q13","shortName":"Q13","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S55","route":"S55","id":"MTA:S55","shortName":"S55","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S56","route":"S56","id":"MTA:S56","shortName":"S56","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S53","route":"S53","id":"MTA:S53","shortName":"S53","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q11","route":"Q11","id":"MTA:Q11","shortName":"Q11","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q12","route":"Q12","id":"MTA:Q12","shortName":"Q12","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S54","route":"S54","id":"MTA:S54","shortName":"S54","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S59","route":"S59","id":"MTA:S59","shortName":"S59","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q17","route":"Q17","id":"MTA:Q17","shortName":"Q17","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q18","route":"Q18","id":"MTA:Q18","shortName":"Q18","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q15","route":"Q15","id":"MTA:Q15","shortName":"Q15","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S57","route":"S57","id":"MTA:S57","shortName":"S57","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q16","route":"Q16","id":"MTA:Q16","shortName":"Q16","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM8","route":"SIM8","id":"MTA:SIM8","shortName":"SIM8","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM9","route":"SIM9","id":"MTA:SIM9","shortName":"SIM9","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q19","route":"Q19","id":"MTA:Q19","shortName":"Q19","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B41","route":"B41","id":"MTA:B41","shortName":"B41","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B42","route":"B42","id":"MTA:B42","shortName":"B42","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B45","route":"B45","id":"MTA:B45","shortName":"B45","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM1","route":"SIM1","id":"MTA:SIM1","shortName":"SIM1","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B46","route":"B46","id":"MTA:B46","shortName":"B46","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM2","route":"SIM2","id":"MTA:SIM2","shortName":"SIM2","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B43","route":"B43","id":"MTA:B43","shortName":"B43","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B44","route":"B44","id":"MTA:B44","shortName":"B44","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM3","route":"SIM3","id":"MTA:SIM3","shortName":"SIM3","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B49","route":"B49","id":"MTA:B49","shortName":"B49","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM4","route":"SIM4","id":"MTA:SIM4","shortName":"SIM4","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM5","route":"SIM5","id":"MTA:SIM5","shortName":"SIM5","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B47","route":"B47","id":"MTA:B47","shortName":"B47","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM6","route":"SIM6","id":"MTA:SIM6","shortName":"SIM6","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM7","route":"SIM7","id":"MTA:SIM7","shortName":"SIM7","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B48","route":"B48","id":"MTA:B48","shortName":"B48","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX12+","route":"Bx12-SBS","id":"MTA:BX12+","shortName":"Bx12-SBS","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S62","route":"S62","id":"MTA:S62","shortName":"S62","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q21","route":"Q21","id":"MTA:Q21","shortName":"Q21","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S61","route":"S61","id":"MTA:S61","shortName":"S61","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S66","route":"S66","id":"MTA:S66","shortName":"S66","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q24","route":"Q24","id":"MTA:Q24","shortName":"Q24","mode":"BUS","color":"00AEEF"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q25","route":"Q25","id":"MTA:Q25","shortName":"Q25","mode":"BUS","color":"00AEEF"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q22","route":"Q22","id":"MTA:Q22","shortName":"Q22","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q23","route":"Q23","id":"MTA:Q23","shortName":"Q23","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q28","route":"Q28","id":"MTA:Q28","shortName":"Q28","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q29","route":"Q29","id":"MTA:Q29","shortName":"Q29","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q26","route":"Q26","id":"MTA:Q26","shortName":"Q26","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q27","route":"Q27","id":"MTA:Q27","shortName":"Q27","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B52","route":"B52","id":"MTA:B52","shortName":"B52","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B57","route":"B57","id":"MTA:B57","shortName":"B57","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B54","route":"B54","id":"MTA:B54","shortName":"B54","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q31","route":"Q31","id":"MTA:Q31","shortName":"Q31","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q32","route":"Q32","id":"MTA:Q32","shortName":"Q32","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M106","route":"M106","id":"MTA:M106","shortName":"M106","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S74","route":"S74","id":"MTA:S74","shortName":"S74","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q30","route":"Q30","id":"MTA:Q30","shortName":"Q30","mode":"BUS","color":"FAA61A"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q35","route":"Q35","id":"MTA:Q35","shortName":"Q35","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S78","route":"S78","id":"MTA:S78","shortName":"S78","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q36","route":"Q36","id":"MTA:Q36","shortName":"Q36","mode":"BUS","color":"FAA61A"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q33","route":"Q33","id":"MTA:Q33","shortName":"Q33","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S76","route":"S76","id":"MTA:S76","shortName":"S76","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q34","route":"Q34","id":"MTA:Q34","shortName":"Q34","mode":"BUS","color":"FAA61A"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q39","route":"Q39","id":"MTA:Q39","shortName":"Q39","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q37","route":"Q37","id":"MTA:Q37","shortName":"Q37","mode":"BUS","color":"00AEEF"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q38","route":"Q38","id":"MTA:Q38","shortName":"Q38","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B60","route":"B60","id":"MTA:B60","shortName":"B60","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B63","route":"B63","id":"MTA:B63","shortName":"B63","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B64","route":"B64","id":"MTA:B64","shortName":"B64","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B61","route":"B61","id":"MTA:B61","shortName":"B61","mode":"BUS","color":"6CBE45"},{"agency":"MTABC","inService":true,"routeId":"MTABC_B103","route":"B103","id":"MTA:B103","shortName":"B103","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B62","route":"B62","id":"MTA:B62","shortName":"B62","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B67","route":"B67","id":"MTA:B67","shortName":"B67","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B68","route":"B68","id":"MTA:B68","shortName":"B68","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_B100","route":"B100","id":"MTA:B100","shortName":"B100","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B65","route":"B65","id":"MTA:B65","shortName":"B65","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B69","route":"B69","id":"MTA:B69","shortName":"B69","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S81","route":"S81","id":"MTA:S81","shortName":"S81","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S84","route":"S84","id":"MTA:S84","shortName":"S84","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q42","route":"Q42","id":"MTA:Q42","shortName":"Q42","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q43","route":"Q43","id":"MTA:Q43","shortName":"Q43","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q40","route":"Q40","id":"MTA:Q40","shortName":"Q40","mode":"BUS","color":"6CBE45"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q41","route":"Q41","id":"MTA:Q41","shortName":"Q41","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q46","route":"Q46","id":"MTA:Q46","shortName":"Q46","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q47","route":"Q47","id":"MTA:Q47","shortName":"Q47","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S89","route":"S89","id":"MTA:S89","shortName":"S89","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S86","route":"S86","id":"MTA:S86","shortName":"S86","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q48","route":"Q48","id":"MTA:Q48","shortName":"Q48","mode":"BUS","color":"006CB7"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q49","route":"Q49","id":"MTA:Q49","shortName":"Q49","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M34+","route":"M34-SBS","id":"MTA:M34+","shortName":"M34-SBS","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B70","route":"B70","id":"MTA:B70","shortName":"B70","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B74","route":"B74","id":"MTA:B74","shortName":"B74","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M101","route":"M101","id":"MTA:M101","shortName":"M101","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M102","route":"M102","id":"MTA:M102","shortName":"M102","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M103","route":"M103","id":"MTA:M103","shortName":"M103","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M104","route":"M104","id":"MTA:M104","shortName":"M104","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q70+","route":"Q70-SBS","id":"MTA:Q70+","shortName":"Q70-SBS","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M100","route":"M100","id":"MTA:M100","shortName":"M100","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S91","route":"S91","id":"MTA:S91","shortName":"S91","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S92","route":"S92","id":"MTA:S92","shortName":"S92","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q50","route":"Q50","id":"MTA:Q50","shortName":"Q50","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S90","route":"S90","id":"MTA:S90","shortName":"S90","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q54","route":"Q54","id":"MTA:Q54","shortName":"Q54","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S96","route":"S96","id":"MTA:S96","shortName":"S96","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S93","route":"S93","id":"MTA:S93","shortName":"S93","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S94","route":"S94","id":"MTA:S94","shortName":"S94","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q58","route":"Q58","id":"MTA:Q58","shortName":"Q58","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q55","route":"Q55","id":"MTA:Q55","shortName":"Q55","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S98","route":"S98","id":"MTA:S98","shortName":"S98","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q56","route":"Q56","id":"MTA:Q56","shortName":"Q56","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q59","route":"Q59","id":"MTA:Q59","shortName":"Q59","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B82","route":"B82","id":"MTA:B82","shortName":"B82","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B83","route":"B83","id":"MTA:B83","shortName":"B83","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B84","route":"B84","id":"MTA:B84","shortName":"B84","mode":"BUS","color":"006CB7"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q60","route":"Q60","id":"MTA:Q60","shortName":"Q60","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q64","route":"Q64","id":"MTA:Q64","shortName":"Q64","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M116","route":"M116","id":"MTA:M116","shortName":"M116","mode":"BUS","color":"6CBE45"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q65","route":"Q65","id":"MTA:Q65","shortName":"Q65","mode":"BUS","color":"00AEEF"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q69","route":"Q69","id":"MTA:Q69","shortName":"Q69","mode":"BUS","color":"00AEEF"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q66","route":"Q66","id":"MTA:Q66","shortName":"Q66","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q67","route":"Q67","id":"MTA:Q67","shortName":"Q67","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M125","route":"M125","id":"MTA:M125","shortName":"M125","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q72","route":"Q72","id":"MTA:Q72","shortName":"Q72","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q76","route":"Q76","id":"MTA:Q76","shortName":"Q76","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q77","route":"Q77","id":"MTA:Q77","shortName":"Q77","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M15+","route":"M15-SBS","id":"MTA:M15+","shortName":"M15-SBS","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q83","route":"Q83","id":"MTA:Q83","shortName":"Q83","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q84","route":"Q84","id":"MTA:Q84","shortName":"Q84","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q85","route":"Q85","id":"MTA:Q85","shortName":"Q85","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_1-SS","route":"1","id":"MTASBWYSHTL:1-SS","shortName":"1","mode":"BUS"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q88","route":"Q88","id":"MTA:Q88","shortName":"Q88","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M10","route":"M10","id":"MTA:M10","shortName":"M10","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M11","route":"M11","id":"MTA:M11","shortName":"M11","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M12","route":"M12","id":"MTA:M12","shortName":"M12","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M15","route":"M15","id":"MTA:M15","shortName":"M15","mode":"BUS","color":"006CB7"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q53+","route":"Q53-SBS","id":"MTA:Q53+","shortName":"Q53-SBS","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M20","route":"M20","id":"MTA:M20","shortName":"M20","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M21","route":"M21","id":"MTA:M21","shortName":"M21","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M22","route":"M22","id":"MTA:M22","shortName":"M22","mode":"BUS","color":"00AEEF"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q52+","route":"Q52-SBS","id":"MTA:Q52+","shortName":"Q52-SBS","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M14D+","route":"M14D-SBS","id":"MTA:M14D+","shortName":"M14D-SBS","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M31","route":"M31","id":"MTA:M31","shortName":"M31","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M35","route":"M35","id":"MTA:M35","shortName":"M35","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M14A+","route":"M14A-SBS","id":"MTA:M14A+","shortName":"M14A-SBS","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M42","route":"M42","id":"MTA:M42","shortName":"M42","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M50","route":"M50","id":"MTA:M50","shortName":"M50","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M57","route":"M57","id":"MTA:M57","shortName":"M57","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M55","route":"M55","id":"MTA:M55","shortName":"M55","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M34A+","route":"M34A-SBS","id":"MTA:M34A+","shortName":"M34A-SBS","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M66","route":"M66","id":"MTA:M66","shortName":"M66","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M72","route":"M72","id":"MTA:M72","shortName":"M72","mode":"BUS","color":"6CBE45"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q110","route":"Q110","id":"MTA:Q110","shortName":"Q110","mode":"BUS","color":"006CB7"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q111","route":"Q111","id":"MTA:Q111","shortName":"Q111","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_N-SS","route":"N","id":"MTASBWYSHTL:N-SS","shortName":"N","mode":"BUS"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q114","route":"Q114","id":"MTA:Q114","shortName":"Q114","mode":"BUS","color":"FAA61A"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q112","route":"Q112","id":"MTA:Q112","shortName":"Q112","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q113","route":"Q113","id":"MTA:Q113","shortName":"Q113","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q100","route":"Q100","id":"MTA:Q100","shortName":"Q100","mode":"BUS","color":"FAA61A"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q103","route":"Q103","id":"MTA:Q103","shortName":"Q103","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q104","route":"Q104","id":"MTA:Q104","shortName":"Q104","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q101","route":"Q101","id":"MTA:Q101","shortName":"Q101","mode":"BUS","color":"6CBE45"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q102","route":"Q102","id":"MTA:Q102","shortName":"Q102","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M98","route":"M98","id":"MTA:M98","shortName":"M98","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M96","route":"M96","id":"MTA:M96","shortName":"M96","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B2","route":"B2","id":"MTA:B2","shortName":"B2","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B1","route":"B1","id":"MTA:B1","shortName":"B1","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B4","route":"B4","id":"MTA:B4","shortName":"B4","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B3","route":"B3","id":"MTA:B3","shortName":"B3","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_S79+","route":"S79-SBS","id":"MTA:S79+","shortName":"S79-SBS","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B6","route":"B6","id":"MTA:B6","shortName":"B6","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B8","route":"B8","id":"MTA:B8","shortName":"B8","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B7","route":"B7","id":"MTA:B7","shortName":"B7","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B9","route":"B9","id":"MTA:B9","shortName":"B9","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM15","route":"SIM15","id":"MTA:SIM15","shortName":"SIM15","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM10","route":"SIM10","id":"MTA:SIM10","shortName":"SIM10","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM11","route":"SIM11","id":"MTA:SIM11","shortName":"SIM11","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_X27","route":"X27","id":"MTA:X27","shortName":"X27","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_X28","route":"X28","id":"MTA:X28","shortName":"X28","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_X37","route":"X37","id":"MTA:X37","shortName":"X37","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_X38","route":"X38","id":"MTA:X38","shortName":"X38","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q15A","route":"Q15A","id":"MTA:Q15A","shortName":"Q15A","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX20","route":"Bx20","id":"MTA:BX20","shortName":"Bx20","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX21","route":"Bx21","id":"MTA:BX21","shortName":"Bx21","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX22","route":"Bx22","id":"MTA:BX22","shortName":"Bx22","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BX23","route":"Bx23","id":"MTA:BX23","shortName":"Bx23","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX24","route":"Bx24","id":"MTA:BX24","shortName":"Bx24","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX25","route":"Bx25","id":"MTA:BX25","shortName":"Bx25","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX26","route":"Bx26","id":"MTA:BX26","shortName":"Bx26","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX27","route":"Bx27","id":"MTA:BX27","shortName":"Bx27","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX28","route":"Bx28","id":"MTA:BX28","shortName":"Bx28","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX29","route":"Bx29","id":"MTA:BX29","shortName":"Bx29","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B82+","route":"B82-SBS","id":"MTA:B82+","shortName":"B82-SBS","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX10","route":"Bx10","id":"MTA:BX10","shortName":"Bx10","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX11","route":"Bx11","id":"MTA:BX11","shortName":"Bx11","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_X63","route":"X63","id":"MTA:X63","shortName":"X63","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX12","route":"Bx12","id":"MTA:BX12","shortName":"Bx12","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX13","route":"Bx13","id":"MTA:BX13","shortName":"Bx13","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_X64","route":"X64","id":"MTA:X64","shortName":"X64","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX15","route":"Bx15","id":"MTA:BX15","shortName":"Bx15","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX16","route":"Bx16","id":"MTA:BX16","shortName":"Bx16","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_X68","route":"X68","id":"MTA:X68","shortName":"X68","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX17","route":"Bx17","id":"MTA:BX17","shortName":"Bx17","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX19","route":"Bx19","id":"MTA:BX19","shortName":"Bx19","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX40","route":"Bx40","id":"MTA:BX40","shortName":"Bx40","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX41","route":"Bx41","id":"MTA:BX41","shortName":"Bx41","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX42","route":"Bx42","id":"MTA:BX42","shortName":"Bx42","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX46","route":"Bx46","id":"MTA:BX46","shortName":"Bx46","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM25","route":"QM25","id":"MTA:QM25","shortName":"QM25","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM24","route":"QM24","id":"MTA:QM24","shortName":"QM24","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM21","route":"QM21","id":"MTA:QM21","shortName":"QM21","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM20","route":"QM20","id":"MTA:QM20","shortName":"QM20","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX4A","route":"Bx4A","id":"MTA:BX4A","shortName":"Bx4A","mode":"BUS","color":"FAA61A"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BM2","route":"BM2","id":"MTA:BM2","shortName":"BM2","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BM3","route":"BM3","id":"MTA:BM3","shortName":"BM3","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BM1","route":"BM1","id":"MTA:BM1","shortName":"BM1","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BM4","route":"BM4","id":"MTA:BM4","shortName":"BM4","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_BM5","route":"BM5","id":"MTA:BM5","shortName":"BM5","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX30","route":"Bx30","id":"MTA:BX30","shortName":"Bx30","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX31","route":"Bx31","id":"MTA:BX31","shortName":"Bx31","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX32","route":"Bx32","id":"MTA:BX32","shortName":"Bx32","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX33","route":"Bx33","id":"MTA:BX33","shortName":"Bx33","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX34","route":"Bx34","id":"MTA:BX34","shortName":"Bx34","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX35","route":"Bx35","id":"MTA:BX35","shortName":"Bx35","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX36","route":"Bx36","id":"MTA:BX36","shortName":"Bx36","mode":"BUS","color":"B933AD"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM15","route":"QM15","id":"MTA:QM15","shortName":"QM15","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX38","route":"Bx38","id":"MTA:BX38","shortName":"Bx38","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX39","route":"Bx39","id":"MTA:BX39","shortName":"Bx39","mode":"BUS","color":"FAA61A"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM12","route":"QM12","id":"MTA:QM12","shortName":"QM12","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM11","route":"QM11","id":"MTA:QM11","shortName":"QM11","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM10","route":"QM10","id":"MTA:QM10","shortName":"QM10","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM18","route":"QM18","id":"MTA:QM18","shortName":"QM18","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM17","route":"QM17","id":"MTA:QM17","shortName":"QM17","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM16","route":"QM16","id":"MTA:QM16","shortName":"QM16","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M60+","route":"M60-SBS","id":"MTA:M60+","shortName":"M60-SBS","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX6+","route":"Bx6-SBS","id":"MTA:BX6+","shortName":"Bx6-SBS","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM40","route":"QM40","id":"MTA:QM40","shortName":"QM40","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM44","route":"QM44","id":"MTA:QM44","shortName":"QM44","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM42","route":"QM42","id":"MTA:QM42","shortName":"QM42","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_R-SS","route":"R","id":"MTASBWYSHTL:R-SS","shortName":"R","mode":"BUS"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M1","route":"M1","id":"MTA:M1","shortName":"M1","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM8X","route":"SIM8X","id":"MTA:SIM8X","shortName":"SIM8X","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M3","route":"M3","id":"MTA:M3","shortName":"M3","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M2","route":"M2","id":"MTA:M2","shortName":"M2","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M5","route":"M5","id":"MTA:M5","shortName":"M5","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M4","route":"M4","id":"MTA:M4","shortName":"M4","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M7","route":"M7","id":"MTA:M7","shortName":"M7","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M9","route":"M9","id":"MTA:M9","shortName":"M9","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M8","route":"M8","id":"MTA:M8","shortName":"M8","mode":"BUS","color":"00AEEF"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM3","route":"QM3","id":"MTA:QM3","shortName":"QM3","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM4","route":"QM4","id":"MTA:QM4","shortName":"QM4","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM1","route":"QM1","id":"MTA:QM1","shortName":"QM1","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM2","route":"QM2","id":"MTA:QM2","shortName":"QM2","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM7","route":"QM7","id":"MTA:QM7","shortName":"QM7","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM8","route":"QM8","id":"MTA:QM8","shortName":"QM8","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM36","route":"QM36","id":"MTA:QM36","shortName":"QM36","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM35","route":"QM35","id":"MTA:QM35","shortName":"QM35","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM5","route":"QM5","id":"MTA:QM5","shortName":"QM5","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M86+","route":"M86-SBS","id":"MTA:M86+","shortName":"M86-SBS","mode":"BUS","color":"FAA61A"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM6","route":"QM6","id":"MTA:QM6","shortName":"QM6","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM34","route":"QM34","id":"MTA:QM34","shortName":"QM34","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM32","route":"QM32","id":"MTA:QM32","shortName":"QM32","mode":"BUS","color":"00933C"},{"agency":"MTABC","inService":true,"routeId":"MTABC_QM31","route":"QM31","id":"MTA:QM31","shortName":"QM31","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM35","route":"SIM35","id":"MTA:SIM35","shortName":"SIM35","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM3C","route":"SIM3C","id":"MTA:SIM3C","shortName":"SIM3C","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM32","route":"SIM32","id":"MTA:SIM32","shortName":"SIM32","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM31","route":"SIM31","id":"MTA:SIM31","shortName":"SIM31","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM34","route":"SIM34","id":"MTA:SIM34","shortName":"SIM34","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM33","route":"SIM33","id":"MTA:SIM33","shortName":"SIM33","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM30","route":"SIM30","id":"MTA:SIM30","shortName":"SIM30","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM25","route":"SIM25","id":"MTA:SIM25","shortName":"SIM25","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM24","route":"SIM24","id":"MTA:SIM24","shortName":"SIM24","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM26","route":"SIM26","id":"MTA:SIM26","shortName":"SIM26","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM1C","route":"SIM1C","id":"MTA:SIM1C","shortName":"SIM1C","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM23","route":"SIM23","id":"MTA:SIM23","shortName":"SIM23","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM22","route":"SIM22","id":"MTA:SIM22","shortName":"SIM22","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM4X","route":"SIM4X","id":"MTA:SIM4X","shortName":"SIM4X","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q1","route":"Q1","id":"MTA:Q1","shortName":"Q1","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q3","route":"Q3","id":"MTA:Q3","shortName":"Q3","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q2","route":"Q2","id":"MTA:Q2","shortName":"Q2","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q5","route":"Q5","id":"MTA:Q5","shortName":"Q5","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q4","route":"Q4","id":"MTA:Q4","shortName":"Q4","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_SIM4C","route":"SIM4C","id":"MTA:SIM4C","shortName":"SIM4C","mode":"BUS","color":"00933C"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B44+","route":"B44-SBS","id":"MTA:B44+","shortName":"B44-SBS","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_B46+","route":"B46-SBS","id":"MTA:B46+","shortName":"B46-SBS","mode":"BUS","color":"6CBE45"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_M23+","route":"M23-SBS","id":"MTA:M23+","shortName":"M23-SBS","mode":"BUS","color":"B933AD"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX1","route":"Bx1","id":"MTA:BX1","shortName":"Bx1","mode":"BUS","color":"00AEEF"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX2","route":"Bx2","id":"MTA:BX2","shortName":"Bx2","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX5","route":"Bx5","id":"MTA:BX5","shortName":"Bx5","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX6","route":"Bx6","id":"MTA:BX6","shortName":"Bx6","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX3","route":"Bx3","id":"MTA:BX3","shortName":"Bx3","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX4","route":"Bx4","id":"MTA:BX4","shortName":"Bx4","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX9","route":"Bx9","id":"MTA:BX9","shortName":"Bx9","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX7","route":"Bx7","id":"MTA:BX7","shortName":"Bx7","mode":"BUS","color":"EE352E"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX8","route":"Bx8","id":"MTA:BX8","shortName":"Bx8","mode":"BUS","color":"FAA61A"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_BX41+","route":"Bx41-SBS","id":"MTA:BX41+","shortName":"Bx41-SBS","mode":"BUS","color":"EE352E"},{"agency":"MTABC","inService":true,"routeId":"MTABC_F-SS","route":"F","id":"MTASBWYSHTL:F-SS","shortName":"F","mode":"BUS"},{"agency":"MTABC","inService":true,"routeId":"MTABC_Q-SS","route":"Q","id":"MTASBWYSHTL:Q-SS","shortName":"Q","mode":"BUS"},{"agency":"MTABC","inService":true,"routeId":"MTABC_7-SS","route":"7","id":"MTASBWYSHTL:7-SS","shortName":"7","mode":"BUS"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q20B","route":"Q20B","id":"MTA:Q20B","shortName":"Q20B","mode":"BUS","color":"006CB7"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q20A","route":"Q20A","id":"MTA:Q20A","shortName":"Q20A","mode":"BUS","color":"006CB7"},{"agency":"MTABC","inService":true,"routeId":"MTABC_D-SS","route":"D","id":"MTASBWYSHTL:D-SS","shortName":"D","mode":"BUS"},{"agency":"MTA NYCT","inService":true,"routeId":"MTA NYCT_Q44+","route":"Q44-SBS","id":"MTA:Q44+","shortName":"Q44-SBS","mode":"BUS","color":"EE352E"}],"railLines":[{"id":"LI:1","mode":"RAIL","color":"00985F","inService":true,"agency":"LI","route":"Babylon Branch","routeId":"LI_1","shortName":"Babylon Branch"},{"id":"LI:12","mode":"RAIL","color":"4D5357","inService":true,"agency":"LI","route":"City Terminal Zone","routeId":"LI_12","shortName":"City Terminal Zone"},{"id":"LI:7","mode":"RAIL","color":"6E3219","inService":true,"agency":"LI","route":"Far Rockaway Branch","routeId":"LI_7","shortName":"Far Rockaway Branch"},{"id":"MNR:2","mode":"RAIL","color":"0039A6","inService":true,"agency":"MNR","route":"Harlem","routeId":"MNR_2","shortName":"Harlem"},{"id":"MNR:Wassaic","agency":"MNR","color":"0039A6","inService":true,"mode":"RAIL","routeId":"MNR_Wassaic","route":"Wassaic","shortName":"Wassaic"},{"id":"LI:2","mode":"RAIL","color":"CE8E00","inService":true,"agency":"LI","route":"Hempstead Branch","routeId":"LI_2","shortName":"Hempstead Branch"},{"id":"MNR:1","mode":"RAIL","color":"009B3A","inService":true,"agency":"MNR","route":"Hudson","routeId":"MNR_1","shortName":"Hudson"},{"id":"LI:6","mode":"RAIL","color":"FF6319","inService":true,"agency":"LI","route":"Long Beach Branch","routeId":"LI_6","shortName":"Long Beach Branch"},{"id":"LI:5","mode":"RAIL","color":"00B2A9","inService":true,"agency":"LI","route":"Montauk Branch","routeId":"LI_5","shortName":"Montauk Branch"},{"id":"MNR:3","mode":"RAIL","color":"EE0034","inService":true,"agency":"MNR","route":"New Haven","routeId":"MNR_3","shortName":"New Haven"},{"id":"MNR:5","mode":"RAIL","color":"EE0034","inService":true,"agency":"MNR","route":"Danbury","routeId":"MNR_5","shortName":"Danbury"},{"id":"MNR:4","mode":"RAIL","color":"EE0034","inService":true,"agency":"MNR","route":"New Canaan","routeId":"MNR_4","shortName":"New Canaan"},{"id":"MNR:6","mode":"RAIL","color":"EE0034","inService":true,"agency":"MNR","route":"Waterbury","routeId":"MNR_6","shortName":"Waterbury"},{"id":"LI:3","mode":"RAIL","color":"00AF3F","inService":true,"agency":"LI","route":"Oyster Bay Branch","routeId":"LI_3","shortName":"Oyster Bay Branch"},{"id":"MNR:50","mode":"RAIL","color":"94219A","inService":true,"agency":"MNR","route":"Pascack Valley","routeId":"MNR_50","shortName":"Pascack Valley"},{"id":"LI:10","mode":"RAIL","color":"006EC7","inService":true,"agency":"LI","route":"Port Jefferson Branch","routeId":"LI_10","shortName":"Port Jefferson Branch"},{"id":"MNR:51","mode":"RAIL","color":"FFD411","inService":true,"agency":"MNR","route":"Port Jervis","routeId":"MNR_51","shortName":"Port Jervis"},{"id":"LI:9","mode":"RAIL","color":"C60C30","inService":true,"agency":"LI","route":"Port Washington Branch","routeId":"LI_9","shortName":"Port Washington Branch"},{"id":"LI:4","mode":"RAIL","color":"A626AA","inService":true,"agency":"LI","route":"Ronkonkoma Branch","routeId":"LI_4","shortName":"Ronkonkoma Branch"},{"id":"LI:8","mode":"RAIL","color":"00A1DE","inService":true,"agency":"LI","route":"West Hempstead Branch","routeId":"LI_8","shortName":"West Hempstead Branch"}],"subwayLines":[{"agency":"MTASBWY","name":"1","mode":"SUBWAY","color":"EE352E","sortOrder":1,"id":"1"},{"agency":"MTASBWY","name":"3","mode":"SUBWAY","color":"EE352E","sortOrder":3,"id":"3"},{"agency":"MTASBWY","name":"2","mode":"SUBWAY","color":"EE352E","sortOrder":2,"id":"2"},{"agency":"MTASBWY","name":"5","mode":"SUBWAY","color":"00933C","sortOrder":5,"id":"5"},{"agency":"MTASBWY","name":"4","mode":"SUBWAY","color":"00933C","sortOrder":4,"id":"4"},{"agency":"MTASBWY","name":"7","mode":"SUBWAY","color":"B933AD","sortOrder":9,"id":"7"},{"agency":"MTASBWY","name":"6","mode":"SUBWAY","color":"00933C","sortOrder":7,"id":"6"},{"agency":"MTASBWY","name":"H","mode":"SUBWAY","sortOrder":28,"id":"H"},{"agency":"MTASBWY","name":"J","mode":"SUBWAY","color":"996633","sortOrder":19,"id":"J"},{"agency":"MTASBWY","name":"M","mode":"SUBWAY","color":"FF6319","sortOrder":17,"id":"M"},{"agency":"MTASBWY","name":"L","mode":"SUBWAY","color":"A7A9AC","sortOrder":21,"id":"L"},{"agency":"MTASBWY","name":"N","mode":"SUBWAY","color":"FCCC0A","sortOrder":22,"id":"N"},{"agency":"MTASBWY","name":"Q","mode":"SUBWAY","color":"FCCC0A","sortOrder":23,"id":"Q"},{"agency":"MTASBWY","name":"R","mode":"SUBWAY","color":"FCCC0A","sortOrder":24,"id":"R"},{"agency":"MTASBWY","name":"W","mode":"SUBWAY","color":"FCCC0A","sortOrder":25,"id":"W"},{"agency":"MTASBWY","name":"A","mode":"SUBWAY","color":"2850AD","sortOrder":11,"id":"A"},{"agency":"MTASBWY","name":"C","mode":"SUBWAY","color":"2850AD","sortOrder":12,"id":"C"},{"agency":"MTASBWY","name":"B","mode":"SUBWAY","color":"FF6319","sortOrder":14,"id":"B"},{"agency":"MTASBWY","name":"E","mode":"SUBWAY","color":"2850AD","sortOrder":13,"id":"E"},{"agency":"MTASBWY","name":"D","mode":"SUBWAY","color":"FF6319","sortOrder":15,"id":"D"},{"agency":"MTASBWY","name":"G","mode":"SUBWAY","color":"6CBE45","sortOrder":18,"id":"G"},{"agency":"MTASBWY","name":"F","mode":"SUBWAY","color":"FF6319","sortOrder":16,"id":"F"},{"agency":"MTASBWY","name":"Z","mode":"SUBWAY","color":"996633","sortOrder":20,"id":"Z"},{"agency":"MTASBWY","name":"FS","mode":"SUBWAY","sortOrder":26,"id":"FS"},{"agency":"MTASBWY","name":"GS","mode":"SUBWAY","color":"6D6E71","sortOrder":27,"id":"GS"},{"agency":"MTASBWY","name":"SI","mode":"SUBWAY","sortOrder":29,"id":"SI"}]}';