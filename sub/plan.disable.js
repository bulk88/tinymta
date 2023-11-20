var originStation;
//onload event/back navigate
(function() {
  //debugger;
  var stationHash = location.hash.slice(1);
  //if back from MTA domain, return to 1st station mode
  if (stationHash.indexOf('$') != -1) {
    originStation = stationHash;
  }

  //this is a .js file in a head element, rest of doc not parsed yet
  onload = function() {
    if (!('onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7 ))) {
      var i = document.location;
      var isDest2 = i.pathname.indexOf('plan2.htm') >= 0;
      var originSta = i.hash.slice(1);
      var arr = document.getElementsByTagName('a');
      for (i = 0; i < arr.length; i++) {
        var e = arr[i];
        //longer than "#SIS" "#FSK" must be a station loc
        if (e.hash.length > 4) {
          if (isDest2) {
            //http://tripplanner.mta.info/MyTrip/js/landmarks.js ::: is field separator
            e.pathname = e.pathname.replace('plan.htm', 'planIE.htm');
            e.hash = originSta + ":::" + e.hash.slice(1);
          } else {
            e.pathname = e.pathname.replace('plan.htm', 'plan2.htm');
          }
        }
      }
    } else {
      onhashchange =
        // browser cache friendly hash argument
        function(evt) {
          var destStation = location.hash.slice(1);
          //not a "category" click but a final location click
          if (destStation.indexOf('$') != -1) {
            if (!originStation) {
              originStation = destStation;
            } else {
              var date = new Date();
              location.replace('http://tripplanner.mta.info/MyTrip/handler/CustomPlannerHandler.ashx?jsonpacket={"RequestDevicename":"IPHONEAPP","OriginInput":"' + originStation.split('$')[2] + '","DestinationInput":"' + destStation.split('$')[2] + '","Arrdep":"D","InputTime":"' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2) + '","InputDate":"' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '","Minimize":"T","Walkdist":"0.50","Mode":"F12RBC","LineStart":"","LineEnd":"","Accessible":"N","OriginCoordinates":"' + escape(originStation) + '","DestinationCoordinates":"' + escape(destStation) + '","LocationType":"","StartServiceType":"train","StartTrainType":"subway","StartBorough":"MN","EndServiceType":"train","EndTrainType":"subway","EndBorough":"MN","Walkincrease":"","Maxinitialwait":"","Maxtriptime":"","Maxtransfers":""}');
            }
          }
        };
    }
  }
})();