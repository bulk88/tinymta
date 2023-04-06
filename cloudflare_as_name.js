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
*/
        Object.values(resp).forEach(val => {
//LIRR has more routes
function AGENCY_MNR() {return 1}
function AGENCY_LI() {return 0}
function AGENCIES_MAP_RAIL() {return ['LI', 'MNR']}
//NYCT has more routes
function AGENCY_MTABC() {return 1};
function AGENCY_MTA_NYCT() {return 0};
function AGENCIES_MAP_BUS() {return ['MTA NYCT', 'MTABC']}
//
function AGENCY_MTASBWY() {return 0};
function AGENCIES_MAP_SUBWAY() {return ['MTASBWY']}
          for(var i = 0; i < val.length; i++) {
          e = val[i];
          delete e.isExpressBus;
          delete e.longName;
          delete e.agencyName;
          delete e.paramId;
          e.sortOrder == 0 && delete e.sortOrder;
          delete e.routeType;
          delete e.regionalFareCardAccepted;
          delete e.agencyId;
          delete e.containsExpress;
          delete e.inService;
          delete e.mode;
          delete e.routeId;
          e.shortName && (e.route = e.shortName);
          delete e.shortName;
          e.route && (e.name = e.route);
          delete e.route;
          e.agency = {LI: AGENCY_LI(), MNR: AGENCY_MNR(), 'MTA NYCT':AGENCY_MTA_NYCT(), MTABC: AGENCY_MTABC(), MTASBWY:AGENCY_MTASBWY()}[e.agency];
          //RAIL needs stripping
          e.id = e.id.split(':').pop()
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
      //warning, subway shuttles have "id":"MTASBWYSHTL:7-SS" and "agencyName":"MTA NYCT - Subway" in raw route DB
      //in raw routes DB, reg buses all have "MTA:" id prefix regardless agency
      //"informed_entity": [{"agency_id": "MTA NYCT","route_id": "M79+"
      //now important question, what is agency_id of an alert-ed shuttle bus?
      //raw routes DB uses long agency names, alerts DB uses short
      return {
        id: stop.id.split(':')[1],
        color: stop.color,
        name: stop.shortName,
        agency: stop.agencyName === 'MTA New York City Transit' ? 'MTA NYCT' : 'MTABC'
      };
    })
  return mapRoutes.sort(function (line1, line2) {
    if (line1.name < line2.name) { //sort string alphabetically
      return -1;
    } else /*if (line1.route > line2.route)*/ {
      return 1;
    }
  })
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
let routesEtag='W/"k4zRZ6qR9bavdvUASOME0g=="',gRoutes='{"busRoutes":[{"id":"1-SS","name":"1","agency":1},{"id":"2-SS","name":"2","agency":1},{"id":"3-SS","name":"3","agency":1},{"id":"7-SS","name":"7","agency":1},{"id":"A-SS","name":"A","agency":1},{"id":"B1","color":"00AEEF","name":"B1","agency":0},{"id":"B100","color":"B933AD","name":"B100","agency":1},{"id":"B103","color":"FAA61A","name":"B103","agency":1},{"id":"B11","color":"006CB7","name":"B11","agency":0},{"id":"B12","color":"6CBE45","name":"B12","agency":0},{"id":"B13","color":"FAA61A","name":"B13","agency":0},{"id":"B14","color":"00AEEF","name":"B14","agency":0},{"id":"B15","color":"B933AD","name":"B15","agency":0},{"id":"B16","color":"FAA61A","name":"B16","agency":0},{"id":"B17","color":"B933AD","name":"B17","agency":0},{"id":"B2","color":"006CB7","name":"B2","agency":0},{"id":"B20","color":"6CBE45","name":"B20","agency":0},{"id":"B24","color":"FAA61A","name":"B24","agency":0},{"id":"B25","color":"6CBE45","name":"B25","agency":0},{"id":"B26","color":"006CB7","name":"B26","agency":0},{"id":"B3","color":"EE352E","name":"B3","agency":0},{"id":"B31","color":"FAA61A","name":"B31","agency":0},{"id":"B32","color":"006CB7","name":"B32","agency":0},{"id":"B35","color":"EE352E","name":"B35","agency":0},{"id":"B36","color":"FAA61A","name":"B36","agency":0},{"id":"B37","color":"B933AD","name":"B37","agency":0},{"id":"B38","color":"00AEEF","name":"B38","agency":0},{"id":"B39","color":"00AEEF","name":"B39","agency":0},{"id":"B4","color":"6CBE45","name":"B4","agency":0},{"id":"B41","color":"006CB7","name":"B41","agency":0},{"id":"B42","color":"006CB7","name":"B42","agency":0},{"id":"B43","color":"EE352E","name":"B43","agency":0},{"id":"B44","color":"B933AD","name":"B44","agency":0},{"id":"B44+","color":"B933AD","name":"B44-SBS","agency":0},{"id":"B45","color":"EE352E","name":"B45","agency":0},{"id":"B46","color":"6CBE45","name":"B46","agency":0},{"id":"B46+","color":"6CBE45","name":"B46-SBS","agency":0},{"id":"B47","color":"FAA61A","name":"B47","agency":0},{"id":"B48","color":"6CBE45","name":"B48","agency":0},{"id":"B49","color":"EE352E","name":"B49","agency":0},{"id":"B52","color":"EE352E","name":"B52","agency":0},{"id":"B54","color":"6CBE45","name":"B54","agency":0},{"id":"B57","color":"EE352E","name":"B57","agency":0},{"id":"B6","color":"EE352E","name":"B6","agency":0},{"id":"B60","color":"B933AD","name":"B60","agency":0},{"id":"B61","color":"6CBE45","name":"B61","agency":0},{"id":"B62","color":"00AEEF","name":"B62","agency":0},{"id":"B63","color":"006CB7","name":"B63","agency":0},{"id":"B64","color":"6CBE45","name":"B64","agency":0},{"id":"B65","color":"00AEEF","name":"B65","agency":0},{"id":"B67","color":"EE352E","name":"B67","agency":0},{"id":"B68","color":"EE352E","name":"B68","agency":0},{"id":"B69","color":"006CB7","name":"B69","agency":0},{"id":"B7","color":"EE352E","name":"B7","agency":0},{"id":"B70","color":"B933AD","name":"B70","agency":0},{"id":"B74","color":"EE352E","name":"B74","agency":0},{"id":"B8","color":"FAA61A","name":"B8","agency":0},{"id":"B82","color":"6CBE45","name":"B82","agency":0},{"id":"B82+","color":"6CBE45","name":"B82-SBS","agency":0},{"id":"B83","color":"EE352E","name":"B83","agency":0},{"id":"B84","color":"006CB7","name":"B84","agency":0},{"id":"B9","color":"EE352E","name":"B9","agency":0},{"id":"BM1","color":"00933C","name":"BM1","agency":1},{"id":"BM2","color":"00933C","name":"BM2","agency":1},{"id":"BM3","color":"00933C","name":"BM3","agency":1},{"id":"BM4","color":"00933C","name":"BM4","agency":1},{"id":"BM5","color":"00933C","name":"BM5","agency":1},{"id":"BX1","color":"00AEEF","name":"Bx1","agency":0},{"id":"BX10","color":"006CB7","name":"Bx10","agency":0},{"id":"BX11","color":"FAA61A","name":"Bx11","agency":0},{"id":"BX12","color":"006CB7","name":"Bx12","agency":0},{"id":"BX12+","color":"006CB7","name":"Bx12-SBS","agency":0},{"id":"BX13","color":"006CB7","name":"Bx13","agency":0},{"id":"BX15","color":"FAA61A","name":"Bx15","agency":0},{"id":"BX16","color":"00AEEF","name":"Bx16","agency":0},{"id":"BX17","color":"006CB7","name":"Bx17","agency":0},{"id":"BX18A","color":"6CBE45","name":"Bx18A","agency":0},{"id":"BX18B","color":"6CBE45","name":"Bx18B","agency":0},{"id":"BX19","color":"B933AD","name":"Bx19","agency":0},{"id":"BX2","color":"FAA61A","name":"Bx2","agency":0},{"id":"BX20","color":"00AEEF","name":"Bx20","agency":0},{"id":"BX21","color":"6CBE45","name":"Bx21","agency":0},{"id":"BX22","color":"EE352E","name":"Bx22","agency":0},{"id":"BX23","color":"B933AD","name":"Bx23","agency":1},{"id":"BX24","color":"6CBE45","name":"Bx24","agency":0},{"id":"BX25","color":"FAA61A","name":"Bx25","agency":0},{"id":"BX26","color":"FAA61A","name":"Bx26","agency":0},{"id":"BX27","color":"00AEEF","name":"Bx27","agency":0},{"id":"BX28","color":"00AEEF","name":"Bx28","agency":0},{"id":"BX29","color":"00AEEF","name":"Bx29","agency":0},{"id":"BX3","color":"EE352E","name":"Bx3","agency":0},{"id":"BX30","color":"EE352E","name":"Bx30","agency":0},{"id":"BX31","color":"EE352E","name":"Bx31","agency":0},{"id":"BX32","color":"6CBE45","name":"Bx32","agency":0},{"id":"BX33","color":"6CBE45","name":"Bx33","agency":0},{"id":"BX34","color":"B933AD","name":"Bx34","agency":0},{"id":"BX35","color":"00AEEF","name":"Bx35","agency":0},{"id":"BX36","color":"B933AD","name":"Bx36","agency":0},{"id":"BX38","color":"FAA61A","name":"Bx38","agency":0},{"id":"BX39","color":"FAA61A","name":"Bx39","agency":0},{"id":"BX4","color":"FAA61A","name":"Bx4","agency":0},{"id":"BX40","color":"006CB7","name":"Bx40","agency":0},{"id":"BX41","color":"EE352E","name":"Bx41","agency":0},{"id":"BX41+","color":"EE352E","name":"Bx41-SBS","agency":0},{"id":"BX42","color":"EE352E","name":"Bx42","agency":0},{"id":"BX46","color":"EE352E","name":"Bx46","agency":0},{"id":"BX4A","color":"FAA61A","name":"Bx4A","agency":0},{"id":"BX5","color":"EE352E","name":"Bx5","agency":0},{"id":"BX6","color":"EE352E","name":"Bx6","agency":0},{"id":"BX6+","color":"EE352E","name":"Bx6-SBS","agency":0},{"id":"BX7","color":"EE352E","name":"Bx7","agency":0},{"id":"BX8","color":"FAA61A","name":"Bx8","agency":0},{"id":"BX9","color":"FAA61A","name":"Bx9","agency":0},{"id":"BXM1","color":"00933C","name":"BxM1","agency":1},{"id":"BXM10","color":"00933C","name":"BxM10","agency":1},{"id":"BXM11","color":"00933C","name":"BxM11","agency":1},{"id":"BXM18","color":"00933C","name":"BxM18","agency":1},{"id":"BXM2","color":"00933C","name":"BxM2","agency":1},{"id":"BXM3","color":"00933C","name":"BxM3","agency":1},{"id":"BXM4","color":"00933C","name":"BxM4","agency":1},{"id":"BXM6","color":"00933C","name":"BxM6","agency":1},{"id":"BXM7","color":"00933C","name":"BxM7","agency":1},{"id":"BXM8","color":"00933C","name":"BxM8","agency":1},{"id":"BXM9","color":"00933C","name":"BxM9","agency":1},{"id":"D-SS","name":"D","agency":1},{"id":"G-SS","name":"G","agency":1},{"id":"H-SS","name":"H","agency":1},{"id":"L-SS","name":"L","agency":1},{"id":"L92","color":"EE352E","name":"L92","agency":0},{"id":"M1","color":"EE352E","name":"M1","agency":0},{"id":"M10","color":"006CB7","name":"M10","agency":0},{"id":"M100","color":"00AEEF","name":"M100","agency":0},{"id":"M101","color":"FAA61A","name":"M101","agency":0},{"id":"M102","color":"FAA61A","name":"M102","agency":0},{"id":"M103","color":"B933AD","name":"M103","agency":0},{"id":"M104","color":"B933AD","name":"M104","agency":0},{"id":"M106","color":"6CBE45","name":"M106","agency":0},{"id":"M11","color":"FAA61A","name":"M11","agency":0},{"id":"M116","color":"6CBE45","name":"M116","agency":0},{"id":"M12","color":"006CB7","name":"M12","agency":0},{"id":"M125","color":"B933AD","name":"M125","agency":0},{"id":"M14A+","color":"6CBE45","name":"M14A-SBS","agency":0},{"id":"M14D+","color":"6CBE45","name":"M14D-SBS","agency":0},{"id":"M15","color":"006CB7","name":"M15","agency":0},{"id":"M15+","color":"006CB7","name":"M15-SBS","agency":0},{"id":"M2","color":"B933AD","name":"M2","agency":0},{"id":"M20","color":"EE352E","name":"M20","agency":0},{"id":"M21","color":"FAA61A","name":"M21","agency":0},{"id":"M22","color":"00AEEF","name":"M22","agency":0},{"id":"M23+","color":"B933AD","name":"M23-SBS","agency":0},{"id":"M3","color":"B933AD","name":"M3","agency":0},{"id":"M31","color":"B933AD","name":"M31","agency":0},{"id":"M34+","color":"006CB7","name":"M34-SBS","agency":0},{"id":"M34A+","color":"006CB7","name":"M34A-SBS","agency":0},{"id":"M35","color":"FAA61A","name":"M35","agency":0},{"id":"M4","color":"00AEEF","name":"M4","agency":0},{"id":"M42","color":"EE352E","name":"M42","agency":0},{"id":"M5","color":"EE352E","name":"M5","agency":0},{"id":"M50","color":"6CBE45","name":"M50","agency":0},{"id":"M55","color":"6CBE45","name":"M55","agency":0},{"id":"M57","color":"00AEEF","name":"M57","agency":0},{"id":"M60+","color":"EE352E","name":"M60-SBS","agency":0},{"id":"M66","color":"FAA61A","name":"M66","agency":0},{"id":"M7","color":"00AEEF","name":"M7","agency":0},{"id":"M72","color":"6CBE45","name":"M72","agency":0},{"id":"M79+","color":"EE352E","name":"M79-SBS","agency":0},{"id":"M8","color":"00AEEF","name":"M8","agency":0},{"id":"M86+","color":"FAA61A","name":"M86-SBS","agency":0},{"id":"M9","color":"B933AD","name":"M9","agency":0},{"id":"M96","color":"6CBE45","name":"M96","agency":0},{"id":"M98","color":"EE352E","name":"M98","agency":0},{"id":"N-SS","name":"N","agency":1},{"id":"Q-SS","name":"Q","agency":1},{"id":"Q1","color":"FAA61A","name":"Q1","agency":0},{"id":"Q10","color":"FAA61A","name":"Q10","agency":1},{"id":"Q100","color":"FAA61A","name":"Q100","agency":1},{"id":"Q101","color":"6CBE45","name":"Q101","agency":1},{"id":"Q102","color":"006CB7","name":"Q102","agency":1},{"id":"Q103","color":"EE352E","name":"Q103","agency":1},{"id":"Q104","color":"B933AD","name":"Q104","agency":1},{"id":"Q11","color":"6CBE45","name":"Q11","agency":1},{"id":"Q110","color":"006CB7","name":"Q110","agency":1},{"id":"Q111","color":"EE352E","name":"Q111","agency":1},{"id":"Q112","color":"EE352E","name":"Q112","agency":1},{"id":"Q113","color":"EE352E","name":"Q113","agency":1},{"id":"Q114","color":"FAA61A","name":"Q114","agency":1},{"id":"Q12","color":"EE352E","name":"Q12","agency":0},{"id":"Q13","color":"EE352E","name":"Q13","agency":0},{"id":"Q15","color":"FAA61A","name":"Q15","agency":0},{"id":"Q15A","color":"FAA61A","name":"Q15A","agency":0},{"id":"Q16","color":"EE352E","name":"Q16","agency":0},{"id":"Q17","color":"EE352E","name":"Q17","agency":0},{"id":"Q18","color":"00AEEF","name":"Q18","agency":1},{"id":"Q19","color":"00AEEF","name":"Q19","agency":1},{"id":"Q2","color":"6CBE45","name":"Q2","agency":0},{"id":"Q20A","color":"006CB7","name":"Q20A","agency":0},{"id":"Q20B","color":"006CB7","name":"Q20B","agency":0},{"id":"Q21","color":"006CB7","name":"Q21","agency":1},{"id":"Q22","color":"EE352E","name":"Q22","agency":1},{"id":"Q23","color":"FAA61A","name":"Q23","agency":1},{"id":"Q24","color":"00AEEF","name":"Q24","agency":0},{"id":"Q25","color":"00AEEF","name":"Q25","agency":1},{"id":"Q26","color":"6CBE45","name":"Q26","agency":0},{"id":"Q27","color":"EE352E","name":"Q27","agency":0},{"id":"Q28","color":"EE352E","name":"Q28","agency":0},{"id":"Q29","color":"00AEEF","name":"Q29","agency":1},{"id":"Q3","color":"00AEEF","name":"Q3","agency":0},{"id":"Q30","color":"FAA61A","name":"Q30","agency":0},{"id":"Q31","color":"FAA61A","name":"Q31","agency":0},{"id":"Q32","color":"00AEEF","name":"Q32","agency":0},{"id":"Q33","color":"EE352E","name":"Q33","agency":1},{"id":"Q34","color":"FAA61A","name":"Q34","agency":1},{"id":"Q35","color":"006CB7","name":"Q35","agency":1},{"id":"Q36","color":"FAA61A","name":"Q36","agency":0},{"id":"Q37","color":"00AEEF","name":"Q37","agency":1},{"id":"Q38","color":"EE352E","name":"Q38","agency":1},{"id":"Q39","color":"B933AD","name":"Q39","agency":1},{"id":"Q4","color":"EE352E","name":"Q4","agency":0},{"id":"Q40","color":"6CBE45","name":"Q40","agency":1},{"id":"Q41","color":"B933AD","name":"Q41","agency":1},{"id":"Q42","color":"00AEEF","name":"Q42","agency":0},{"id":"Q43","color":"EE352E","name":"Q43","agency":0},{"id":"Q44+","color":"EE352E","name":"Q44-SBS","agency":0},{"id":"Q46","color":"EE352E","name":"Q46","agency":0},{"id":"Q47","color":"6CBE45","name":"Q47","agency":1},{"id":"Q48","color":"006CB7","name":"Q48","agency":0},{"id":"Q49","color":"006CB7","name":"Q49","agency":1},{"id":"Q5","color":"EE352E","name":"Q5","agency":0},{"id":"Q50","color":"FAA61A","name":"Q50","agency":1},{"id":"Q52+","color":"FAA61A","name":"Q52-SBS","agency":1},{"id":"Q53+","color":"FAA61A","name":"Q53-SBS","agency":1},{"id":"Q54","color":"B933AD","name":"Q54","agency":0},{"id":"Q55","color":"EE352E","name":"Q55","agency":0},{"id":"Q56","color":"B933AD","name":"Q56","agency":0},{"id":"Q58","color":"6CBE45","name":"Q58","agency":0},{"id":"Q59","color":"FAA61A","name":"Q59","agency":0},{"id":"Q06","color":"B933AD","name":"Q6","agency":1},{"id":"Q60","color":"EE352E","name":"Q60","agency":1},{"id":"Q64","color":"EE352E","name":"Q64","agency":1},{"id":"Q65","color":"00AEEF","name":"Q65","agency":1},{"id":"Q66","color":"EE352E","name":"Q66","agency":1},{"id":"Q67","color":"FAA61A","name":"Q67","agency":1},{"id":"Q69","color":"00AEEF","name":"Q69","agency":1},{"id":"Q07","color":"6CBE45","name":"Q7","agency":1},{"id":"Q70+","color":"EE352E","name":"Q70-SBS","agency":1},{"id":"Q72","color":"B933AD","name":"Q72","agency":1},{"id":"Q76","color":"6CBE45","name":"Q76","agency":0},{"id":"Q77","color":"FAA61A","name":"Q77","agency":0},{"id":"Q08","color":"B933AD","name":"Q8","agency":1},{"id":"Q83","color":"6CBE45","name":"Q83","agency":0},{"id":"Q84","color":"B933AD","name":"Q84","agency":0},{"id":"Q85","color":"EE352E","name":"Q85","agency":0},{"id":"Q88","color":"FAA61A","name":"Q88","agency":0},{"id":"Q09","color":"B933AD","name":"Q9","agency":1},{"id":"QM1","color":"00933C","name":"QM1","agency":1},{"id":"QM10","color":"00933C","name":"QM10","agency":1},{"id":"QM11","color":"00933C","name":"QM11","agency":1},{"id":"QM12","color":"00933C","name":"QM12","agency":1},{"id":"QM15","color":"00933C","name":"QM15","agency":1},{"id":"QM16","color":"00933C","name":"QM16","agency":1},{"id":"QM17","color":"00933C","name":"QM17","agency":1},{"id":"QM18","color":"00933C","name":"QM18","agency":1},{"id":"QM2","color":"00933C","name":"QM2","agency":1},{"id":"QM20","color":"00933C","name":"QM20","agency":1},{"id":"QM21","color":"00933C","name":"QM21","agency":1},{"id":"QM24","color":"00933C","name":"QM24","agency":1},{"id":"QM25","color":"00933C","name":"QM25","agency":1},{"id":"QM3","color":"00933C","name":"QM3","agency":1},{"id":"QM31","color":"00933C","name":"QM31","agency":1},{"id":"QM32","color":"00933C","name":"QM32","agency":1},{"id":"QM34","color":"00933C","name":"QM34","agency":1},{"id":"QM35","color":"00933C","name":"QM35","agency":1},{"id":"QM36","color":"00933C","name":"QM36","agency":1},{"id":"QM4","color":"00933C","name":"QM4","agency":1},{"id":"QM40","color":"00933C","name":"QM40","agency":1},{"id":"QM42","color":"00933C","name":"QM42","agency":1},{"id":"QM44","color":"00933C","name":"QM44","agency":1},{"id":"QM5","color":"00933C","name":"QM5","agency":1},{"id":"QM6","color":"00933C","name":"QM6","agency":1},{"id":"QM7","color":"00933C","name":"QM7","agency":1},{"id":"QM8","color":"00933C","name":"QM8","agency":1},{"id":"R-SS","name":"R","agency":1},{"id":"S40","color":"B933AD","name":"S40","agency":0},{"id":"S42","color":"00AEEF","name":"S42","agency":0},{"id":"S44","color":"FAA61A","name":"S44","agency":0},{"id":"S46","color":"006CB7","name":"S46","agency":0},{"id":"S48","color":"EE352E","name":"S48","agency":0},{"id":"S51","color":"006CB7","name":"S51","agency":0},{"id":"S52","color":"B933AD","name":"S52","agency":0},{"id":"S53","color":"EE352E","name":"S53","agency":0},{"id":"S54","color":"FAA61A","name":"S54","agency":0},{"id":"S55","color":"FAA61A","name":"S55","agency":0},{"id":"S56","color":"6CBE45","name":"S56","agency":0},{"id":"S57","color":"6CBE45","name":"S57","agency":0},{"id":"S59","color":"EE352E","name":"S59","agency":0},{"id":"S61","color":"EE352E","name":"S61","agency":0},{"id":"S62","color":"B933AD","name":"S62","agency":0},{"id":"S66","color":"6CBE45","name":"S66","agency":0},{"id":"S74","color":"EE352E","name":"S74","agency":0},{"id":"S76","color":"B933AD","name":"S76","agency":0},{"id":"S78","color":"FAA61A","name":"S78","agency":0},{"id":"S79+","color":"006CB7","name":"S79-SBS","agency":0},{"id":"S81","color":"006CB7","name":"S81","agency":0},{"id":"S84","color":"EE352E","name":"S84","agency":0},{"id":"S86","color":"B933AD","name":"S86","agency":0},{"id":"S89","color":"EE352E","name":"S89","agency":0},{"id":"S90","color":"B933AD","name":"S90","agency":0},{"id":"S91","color":"EE352E","name":"S91","agency":0},{"id":"S92","color":"B933AD","name":"S92","agency":0},{"id":"S93","color":"EE352E","name":"S93","agency":0},{"id":"S94","color":"FAA61A","name":"S94","agency":0},{"id":"S96","color":"006CB7","name":"S96","agency":0},{"id":"S98","color":"EE352E","name":"S98","agency":0},{"id":"SIM1","color":"00933C","name":"SIM1","agency":0},{"id":"SIM10","color":"00933C","name":"SIM10","agency":0},{"id":"SIM11","color":"00933C","name":"SIM11","agency":0},{"id":"SIM15","color":"00933C","name":"SIM15","agency":0},{"id":"SIM1C","color":"00933C","name":"SIM1C","agency":0},{"id":"SIM2","color":"00933C","name":"SIM2","agency":0},{"id":"SIM22","color":"00933C","name":"SIM22","agency":0},{"id":"SIM23","color":"00933C","name":"SIM23","agency":0},{"id":"SIM24","color":"00933C","name":"SIM24","agency":0},{"id":"SIM25","color":"00933C","name":"SIM25","agency":0},{"id":"SIM26","color":"00933C","name":"SIM26","agency":0},{"id":"SIM3","color":"00933C","name":"SIM3","agency":0},{"id":"SIM30","color":"00933C","name":"SIM30","agency":0},{"id":"SIM31","color":"00933C","name":"SIM31","agency":0},{"id":"SIM32","color":"00933C","name":"SIM32","agency":0},{"id":"SIM33","color":"00933C","name":"SIM33","agency":0},{"id":"SIM33C","color":"00933C","name":"SIM33C","agency":0},{"id":"SIM34","color":"00933C","name":"SIM34","agency":0},{"id":"SIM35","color":"00933C","name":"SIM35","agency":0},{"id":"SIM3C","color":"00933C","name":"SIM3C","agency":0},{"id":"SIM4","color":"00933C","name":"SIM4","agency":0},{"id":"SIM4C","color":"00933C","name":"SIM4C","agency":0},{"id":"SIM4X","color":"00933C","name":"SIM4X","agency":0},{"id":"SIM5","color":"00933C","name":"SIM5","agency":0},{"id":"SIM6","color":"00933C","name":"SIM6","agency":0},{"id":"SIM7","color":"00933C","name":"SIM7","agency":0},{"id":"SIM8","color":"00933C","name":"SIM8","agency":0},{"id":"SIM8X","color":"00933C","name":"SIM8X","agency":0},{"id":"SIM9","color":"00933C","name":"SIM9","agency":0},{"id":"X27","color":"00933C","name":"X27","agency":0},{"id":"X28","color":"00933C","name":"X28","agency":0},{"id":"X37","color":"00933C","name":"X37","agency":0},{"id":"X38","color":"00933C","name":"X38","agency":0},{"id":"X63","color":"00933C","name":"X63","agency":0},{"id":"X64","color":"00933C","name":"X64","agency":0},{"id":"X68","color":"00933C","name":"X68","agency":0}],"railLines":[{"id":"1","color":"00985F","agency":0,"name":"Babylon Branch"},{"id":"12","color":"4D5357","agency":0,"name":"City Terminal Zone"},{"id":"7","color":"6E3219","agency":0,"name":"Far Rockaway Branch"},{"id":"2","color":"0039A6","agency":1,"name":"Harlem"},{"id":"Wassaic","agency":1,"color":"0039A6","name":"Wassaic"},{"id":"2","color":"CE8E00","agency":0,"name":"Hempstead Branch"},{"id":"1","color":"009B3A","agency":1,"name":"Hudson"},{"id":"6","color":"FF6319","agency":0,"name":"Long Beach Branch"},{"id":"5","color":"00B2A9","agency":0,"name":"Montauk Branch"},{"id":"3","color":"EE0034","agency":1,"name":"New Haven"},{"id":"5","color":"EE0034","agency":1,"name":"Danbury"},{"id":"4","color":"EE0034","agency":1,"name":"New Canaan"},{"id":"6","color":"EE0034","agency":1,"name":"Waterbury"},{"id":"3","color":"00AF3F","agency":0,"name":"Oyster Bay Branch"},{"id":"50","color":"94219A","agency":1,"name":"Pascack Valley"},{"id":"10","color":"006EC7","agency":0,"name":"Port Jefferson Branch"},{"id":"51","color":"FFD411","agency":1,"name":"Port Jervis"},{"id":"9","color":"C60C30","agency":0,"name":"Port Washington Branch"},{"id":"4","color":"A626AA","agency":0,"name":"Ronkonkoma Branch"},{"id":"8","color":"00A1DE","agency":0,"name":"West Hempstead Branch"}],"subwayLines":[{"agency":0,"name":"1","color":"EE352E","sortOrder":1,"id":"1"},{"agency":0,"name":"3","color":"EE352E","sortOrder":3,"id":"3"},{"agency":0,"name":"2","color":"EE352E","sortOrder":2,"id":"2"},{"agency":0,"name":"5","color":"00933C","sortOrder":5,"id":"5"},{"agency":0,"name":"4","color":"00933C","sortOrder":4,"id":"4"},{"agency":0,"name":"7","color":"B933AD","sortOrder":9,"id":"7"},{"agency":0,"name":"6","color":"00933C","sortOrder":7,"id":"6"},{"agency":0,"name":"H","sortOrder":28,"id":"H"},{"agency":0,"name":"J","color":"996633","sortOrder":19,"id":"J"},{"agency":0,"name":"M","color":"FF6319","sortOrder":17,"id":"M"},{"agency":0,"name":"L","color":"A7A9AC","sortOrder":21,"id":"L"},{"agency":0,"name":"N","color":"FCCC0A","sortOrder":22,"id":"N"},{"agency":0,"name":"Q","color":"FCCC0A","sortOrder":23,"id":"Q"},{"agency":0,"name":"R","color":"FCCC0A","sortOrder":24,"id":"R"},{"agency":0,"name":"W","color":"FCCC0A","sortOrder":25,"id":"W"},{"agency":0,"name":"A","color":"2850AD","sortOrder":11,"id":"A"},{"agency":0,"name":"C","color":"2850AD","sortOrder":12,"id":"C"},{"agency":0,"name":"B","color":"FF6319","sortOrder":14,"id":"B"},{"agency":0,"name":"E","color":"2850AD","sortOrder":13,"id":"E"},{"agency":0,"name":"D","color":"FF6319","sortOrder":15,"id":"D"},{"agency":0,"name":"G","color":"6CBE45","sortOrder":18,"id":"G"},{"agency":0,"name":"F","color":"FF6319","sortOrder":16,"id":"F"},{"agency":0,"name":"Z","color":"996633","sortOrder":20,"id":"Z"},{"agency":0,"name":"FS","sortOrder":26,"id":"FS"},{"agency":0,"name":"GS","color":"6D6E71","sortOrder":27,"id":"GS"},{"agency":0,"name":"SI","sortOrder":29,"id":"SI"}]}';