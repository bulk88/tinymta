"use strict";
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
const s={"":"Meadowlands","ABT":"Albertson","ADL":"Auburndale","AGT":"Amagansett","ATL":"Atlantic Terminal","AVL":"Amityville","BDY":"Broadway","BHN":"Bridgehampton","BK":"Stony Brook","BMR":"Bellmore","BOL":"Bolands-Employees","BPG":"Bethpage","BPT":"Bellport","BRS":"Bellerose","BRT":"Belmont Park","BSD":"Bayside","BSR":"Bay Shore","BTA":"Babylon","BWD":"Brentwood","BWN":"Baldwin","CAV":"Centre Av","CHT":"Cedarhurst","CI":"Central Islip","CLP":"Country Life Press","CPG":"Copiague","CPL":"Carle Place","CSH":"Cold Spring Harbor","DGL":"Douglaston","DPK":"Deer Park","EHN":"East Hampton","ENY":"East New York","ERY":"East Rockaway","EWN":"East Williston","FHL":"Forest Hills","FLS":"Flushing Main Street","FMD":"Farmingdale","FPK":"Floral Park","FPT":"Freeport","FRY":"Far Rockaway","GBN":"Gibson","GCV":"Glen Cove","GCY":"Garden City","GHD":"Glen Head","GNK":"Great Neck","GPT":"Greenport","GRV":"Great River","GST":"Glen Street","GVL":"Greenvale","GWN":"Greenlawn","HBY":"Hampton Bays","HEM":"Hempstead","HGN":"Hempstead Gardens","HIL":"Hillside-Employees","HOL":"Hollis","HPA":"Hunterspoint Av","HUN":"Huntington","HVL":"Hicksville","HWT":"Hewlett","IPK":"Island Park","ISP":"Islip","IWD":"Inwood","JAM":"Jamaica","KGN":"Kew Gardens","KPK":"Kings Park","LBH":"Long Beach","LCE":"Lawrence","LHT":"Lindenhurst","LIC":"Long Island City","LMR":"Locust Manor","LNK":"Little Neck","LTN":"Laurelton","LVL":"Locust Valley","LVW":"Lakeview","LYN":"Lynbrook","MAK":"Mattituck","MAV":"Merillon Av","MAV":"Merillon Avenue","MFD":"Medford","MHL":"Murray Hill","MHT":"Manhasset","MIN":"Mineola","MPK":"Massapequa Park","MQA":"Massapequa","MRK":"Merrick","MSY":"Mastic Shirley","MSY":"Mastic-Shirley","MTK":"Montauk","MVN":"Malverne","NAV":"Nostrand Av","NBD":"Nassau Blvd","NHP":"New Hyde Park","NPT":"Northport","NYK":"Penn Station","OBY":"Oyster Bay","ODE":"Oceanside","ODL":"Oakdale","PDM":"Plandome","PGE":"Patchogue","PJN":"Port Jefferson","PLN":"Pinelawn","PWS":"Port Washington","QVG":"Queens Village","RHD":"Riverhead","RON":"Ronkonkoma","ROS":"Rosedale","RSN":"Roslyn","RVC":"Rockville Centre","SAB":"St. Albans","SCF":"Sea Cliff","SFD":"Seaford","SHD":"Southold","SHN":"Southampton","SJM":"St. James","SMR":"Stewart Manor","SPK":"Speonk","SSM":"Mets-Willets Point","STN":"Smithtown","SVL":"Sayville","SYT":"Syosset","VSM":"Valley Stream","WBY":"Westbury","WDD":"Woodside","WGH":"Wantagh","WHD":"West Hempstead","WHN":"Westhampton","WMR":"Woodmere","WWD":"Westwood","WYD":"Wyandanch","YPK":"Yaphank"};
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
  event.respondWith(handleRequest(event.request))
})


//text includes [] chars usually, if route blank, text is route
function mkSubFontTag(text, route) {
  var c =
/*STARTCOLOR*/
{"1":"EE352E","2":"EE352E","3":"EE352E","4":"00933C","5":"00933C","5X":"00933C","6":"00933C","6X":"00A65C","7":"B933AD","7X":"B933AD","A":"2850AD","B":"FF6319","C":"2850AD","D":"FF6319","E":"2850AD","F":"FF6319","FX":"FF6319","G":"6CBE45","GS":"6D6E71","J":"996633","L":"A7A9AC","M":"FF6319","N":"FCCC0A","Q":"FCCC0A","R":"FCCC0A","W":"FCCC0A","Z":"996633"}
/*ENDCOLOR*/
  [route||text];
  return c ?'<font color='+c+'>'+text+'</font>':text;
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
async function handleRequest(request) {
  var url = new URL(request.url)
    ,pathname_callback = url.pathname;
  if (pathname_callback === '/favicon.ico') {
    return new Response(faviconStr, {
      headers: {
        "cache-control": "max-age=691200,no-transform",
        "content-type": "image/vnd.microsoft.icon"
      }
    });
  }
else if (pathname_callback.startsWith('/li/api/')) {
  var resp = fetch("http://backend.mylirr.org/arrivals/" + pathname_callback.substring(8), {
    headers: { //LIRR server errors otherwise
      'accept-version': '1.5'
    }
  });
  //from express, but guarenteed JSONP no CORS
  pathname_callback = (url.searchParams.get('callback') || '_xcallback').replace(/[^\[\]\w$.]/g, '');
  pathname_callback = '/**/ typeof ' + pathname_callback + ' === \'function\' && ' + pathname_callback + '({http_code:';
  resp = await resp;
  var ct = resp.headers.get('content-type');
  pathname_callback += resp.status + ',content_type:\'' + ct + '\',contents:';
  resp = await resp.text();
  return new Response(pathname_callback + (ct === 'application/json'
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
      var hotkey;
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
        h += new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' })
          + " via CFW<br>"
          + 'CurSta:' + r.stop.name + "<br>";

        for (i in o) {
          h += '<a accesskey='+(hotkey=hotkeys.shift())+' name='+hotkey+' href=#'+hotkey+'>'+i+"</a><br>";
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
              //'-Tk' + (trip.track === undefined ? '?' : ' ' + trip.track ) +
              (trip.track === undefined ? '-Tk?' : '') +
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
        r = r.alerts;
        //time sort alerts in the array
        r.sort(function(a, b) {
          return a.effectiveStartDate < b.effectiveStartDate ? -1 :
            a.effectiveStartDate > b.effectiveStartDate ? 1 :
            0;
        });
        for (i in r) {
          trip = r[i];
          if (trip.alertType) { //skip elevators, elevators are missing alertType field
            hotkey = hotkeys.shift();
            route = (hotkey === undefined ? trip.alertType : '<a accesskey='+hotkey+' href=#'+hotkey+' name='+hotkey+'>'+trip.alertType+"</a>")+"<br>" + (trip.humanReadableActivePeriod || 'Ongoing') + "<br>" + trip.alertHeaderText.replace(/\[(\w+)\]/g, mkSubFontTag) + (trip.alertDescriptionText?"<br>"+trip.alertDescriptionText.replace(/\[(\w+)\]/g, mkSubFontTag):'') + "<br><br>";
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
    var url_headsign = "http://backend.mylirr.org/arrivals/" + pathname_callback;
    var resp = fetch(url_headsign, {
      headers: {
        'accept-version' : '1.5'
      }
    });
    var h = '<meta content=0 name=mobileoptimized>[1][<a accesskey=1 href=' + pathname_callback + '>Refresh</a>] <a href=' + url_headsign + '>Raw</a><br>'
      + new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' })
      +" via CFW<br>"
      +'CurSta:' + s[pathname_callback] + "<br><a accesskey=2 name=2 href=#2>East</a><br>";
    var w = "<a accesskey=3 name=3 href=#3>West</a><br>"; /*w=west*/
    resp = await resp;
    if (resp.status == 200) {
      var r = resp.json();
      r = await r;
      var i, t, l; /*t=train, l=lineofhtml, h=html*/
      for (i = 0; i < r.length; i++) {
        t = r[i];
        //note to self, ceil is round up, |0 is round down
        //console.log('x'+Math.ceil((t.time - ((new Date().getTime()/1000))) / 60)+'   '+(((t.time - ((new Date().getTime()/1000))) / 60)|0));
        l = new Date((l = t.time) * 1000).toLocaleTimeString('en-US', { timeZone: 'America/New_York' }).replace(':00 ', ' ') +
          '-Min ' + Math.ceil((l - (new Date(new Date().toLocaleString()) / 1000)) / 60) +
          '-Tk' + (t.track || '?')
        + "-<font color=" + (
/*STARTCOLOR*/
{"11":"60269E","12":"4D5357","BY":"00985F","FR":"6E3219","HM":"CE8E00","LB":"FF6319","MK":"00B2A9","OB":"00AF3F","PJ":"006EC7","PW":"C60C30","RK":"A626AA","WH":"00A1DE"}
/*ENDCOLOR*/
        )[t.branch] + ">" + s[(l=t.stops)[l.length - 1]]
        + "</font><br>";
        t.direction == 'E' ? h += l : w += l;
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
  /* Workers Preview has undef cf obj and cf prop is tested R/O
  United Nations (AS676) is a very unique looking ISP */
  var cf = request?.cf || {
    asn: 676
  };
  var etag = 'W/"'+cf.asn+'"';
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
              return mkJSResp("Your ISP: AS"+new TextDecoder().decode(new Uint8Array(bufdv
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
