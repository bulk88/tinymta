var o;!function(){var e=location.hash.slice(1);-1!=e.indexOf("$")&&(o=e),onload=function(){if("onhashchange"in window&&(void 0===document.documentMode||7<document.documentMode))onhashchange=function(e){var a,n=location.hash.slice(1);-1!=n.indexOf("$")&&(o?(a=new Date,location.replace('http://tripplanner.mta.info/MyTrip/handler/CustomPlannerHandler.ashx?jsonpacket={"RequestDevicename":"IPHONEAPP","OriginInput":"'+o.split("$")[2]+'","DestinationInput":"'+n.split("$")[2]+'","Arrdep":"D","InputTime":"'+("0"+a.getHours()).slice(-2)+":"+("0"+a.getMinutes()).slice(-2)+'","InputDate":"'+a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()+'","Minimize":"T","Walkdist":"0.50","Mode":"F12RBC","LineStart":"","LineEnd":"","Accessible":"N","OriginCoordinates":"'+escape(o)+'","DestinationCoordinates":"'+escape(n)+'","LocationType":"","StartServiceType":"train","StartTrainType":"subway","StartBorough":"MN","EndServiceType":"train","EndTrainType":"subway","EndBorough":"MN","Walkincrease":"","Maxinitialwait":"","Maxtriptime":"","Maxtransfers":""}')):o=n)};else for(var e=0<=(t=document.location).pathname.indexOf("plan2.htm"),a=t.hash.slice(1),n=document.getElementsByTagName("a"),t=0;t<n.length;t++){var i=n[t];4<i.hash.length&&(e?(i.pathname=i.pathname.replace("plan.htm","planIE.htm"),i.hash=a+":::"+i.hash.slice(1)):i.pathname=i.pathname.replace("plan.htm","plan2.htm"))}}}();