!function(){if(this.addEventListener&&document.querySelector){var e,t,c=document.documentElement.firstChild;function s(e){var t,s,a,n="touchstart"===e.type;"A"!==(e=e.target).nodeName||!n&&e.tmts||(s=e.hash,"/rstop.htm"===(a=e.pathname)&&window.sessionStorage?(s=s.slice(1),fetch("//backend-unified.mylirr.org/arrivals/"+s,{headers:{"accept-version":"3.0"}},1).then(function(e){200==e.status&&e.text().then(function(e){sessionStorage.setItem("r",'{"t":'+Date.now()+',"s":"'+s+'","c":'+e+"}")})}),e.tmts=n):(a="/status.htm"===a?"//collector-otp-prod.camsys-apps.com/realtime/gtfsrt/ALL/alerts?type=json&apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP":"/stop.htm"===a?"//otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?timerange=1800&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE&stops=MTASBWY:"+s.slice(1,4):0)&&((t=document.createElement("link")).rel="prefetch",t.href=a,t.crossOrigin="anonymous",c.appendChild(t),e.tmts=n))}function a(e){switch(e.keyCode){case 49:e=1;break;case 50:case 65:case 97:e=2;break;case 51:case 68:case 100:e=3;break;case 52:case 71:case 103:e=4;break;case 53:case 74:case 106:e=5;break;case 54:case 77:case 109:e=6;break;case 55:case 80:case 112:e=7;break;case 56:case 84:case 116:e=8;break;case 57:case 87:case 119:e=9;break;case 48:case 32:e=0;break;default:e=null}+e===e&&(e=document.querySelector('[accesskey="'+e+'"]'))&&e.click()}for(this.fetch||this.f||(f=1,c.appendChild(document.createElement("script")).src="/f.js"),addEventListener("touchstart",s,{passive:!0}),addEventListener("mousedown",s,{passive:!0}),addEventListener("keyup",a,0),addEventListener("keypress",a,0),e=c.firstChild;e;)"preconnect"===e.rel&&((t=document.createElement("link")).rel="dns-prefetch",t.href=e.href,c.appendChild(t)),e=e.nextElementSibling}this.ScriptEngineMajorVersion&&(ScriptEngineMajorVersion()<5||5===ScriptEngineMajorVersion()&&ScriptEngineMinorVersion()<5)&&(onload=function(){for(var e,t,s,a,n=document.links,c=n.length,r=0;r<c;r++)e=(t=n[r]).pathname,s?s===e&&(t.pathname=a):(t=e.length-8,"s"!==(a=e.charAt(t))&&"a"!==a||!~e.indexOf("s"===a?"stop":"atus",t)||(a=(s=e).slice(0,-4)+"ie50.htm",r--));onload=null})}();