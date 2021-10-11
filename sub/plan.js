var originStation;
onhashchange =
// browser cache friendly hash argument
function (evt) {
//alert("fired ohc");
  var stationHash = window.location.hash.substring(1);
  //not a "category" click but a final location click
  console.log("saw "+stationHash);
  if(stationHash.indexOf('$') != -1) {
  debugger;
	if(!originStation) {
		originStation = stationHash;
	} else {
		//cant use / bc / is used in station route section of loc record
		//if(stationHash.indexOf('|') != -1) {
		//var ODArr = stationHash.split('|');
		//originStation = ODArr[0];
		//stationHash = ODArr[1];
		var originArr = originStation.split('$');
		var destArr = stationHash.split('$');
		var date = new Date();
		var newUrl = 'http://tripplanner.mta.info/MyTrip/handler/CustomPlannerHandler.ashx?jsonpacket={"RequestDevicename":"IPHONEAPP","OriginInput":"'+escape(originArr[2])+'","DestinationInput":"'+escape(destArr[2])+'","Arrdep":"D","InputTime":"'+("0" + date.getHours()).slice(-2)+':'+("0" + date.getMinutes()).slice(-2)+'","InputDate":"'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'","Minimize":"T","Walkdist":"0.50","Mode":"F12RBC","LineStart":"","LineEnd":"","Accessible":"N","OriginCoordinates":"'+escape(originStation)+'","DestinationCoordinates":"'+escape(stationHash)+'","LocationType":"","StartServiceType":"train","StartTrainType":"subway","StartBorough":"MN","EndServiceType":"train","EndTrainType":"subway","EndBorough":"MN","Walkincrease":"","Maxinitialwait":"","Maxtriptime":"","Maxtransfers":""}';
		location.replace(newUrl);
		//if same this is a back naviagte
		//} else if(originStation != stationHash){
		//location.replace("#"+originStation+"|"+stationHash)
		//}
	}
  }
};
//onload event/back navigate
(function () {
//debugger;
  var stationHash = window.location.hash.substring(1);
  //if back from MTA domain, return to 1st station mode
  if(stationHash.indexOf('$') != -1) {
		originStation = stationHash;
  }
  //alert("fired ol");
//  <!-- if(stationHash.indexOf('|') != -1) { -->
//		<!-- var ODArr = stationHash.split('|'); -->
//		<!-- originStation = ODArr[0]; -->
//		<!-- location.replace("#"+originStation) -->
//  <!-- } -->
//this is a .js file in a head element, rest of doc not parsed yet
  window.onload = function() {
    if( window.navigator.userAgent.indexOf('MSIE ') > 0,1) {
	var isDest2 = document.location.pathname.indexOf('plan2.htm') >= 0;
	var i =0;
	var arr = document.getElementsByTagName('a');
	for(i=0; i< arr.length;i++) {
		var e = arr[i];
		//longer than "#SIS" "#FSK" must be a station loc
		if(e.hash.length > 4) {
			if(isDest2) {
				//http://tripplanner.mta.info/MyTrip/js/landmarks.js ::: is field separator
				e.pathname = e.pathname.replace('/plan.htm', '/planIE.htm');
				e.hash = document.location.hash.substring(1)+":::"+e.hash.substring(1);
			} else {
				e.pathname = e.pathname.replace('/plan.htm', '/plan2.htm');
			}
		}
		//debugger;
	}
    }
  }
  })();
