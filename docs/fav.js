!function(){function r(){try{var e=localStorage.getItem("fav");return e&&0==e.indexOf(t+"[0,")?[0,JSON.parse(e.slice(t.length,e.length-1))]:(localStorage.setItem("fav",t+"[0,1,0])"),[1,[0,1,0]])}catch(e){return 0}}function i(e){return localStorage.setItem("fav",t+JSON.stringify(e)+")"),e}function o(e){(e=e.firstChild).firstChild.onchange=function(e){var t=r()[1];(e=e.target).checked?t[1]=1:(t[1]=0,t.length=3),(e=e.parentNode.parentNode).draw_fav(i(t),e.draw_fav,e,o)},e.nextSibling.firstChild.onchange=function(e){var t=r()[1];(e=e.target).checked?t[1]=t[2]=1:t[2]=0,(e=e.parentNode.parentNode).draw_fav(i(t),e.draw_fav,e,o)}}function e(e,t){var a,n,o,d=r(),c=3;if(d&&(d=d[1])[1]){for(o=d.length;c<o;c++)if((l=d[c])[1]==t){l[2]++,3<c&&l[2]>(n=d[c-1])[2]&&(d[c-1]=l,d[c]=n),a=1;break}a||(d[9==o?8:o]=[e,t,1]),i(d)}}var d='function(e,t,d,n){var c,a=document.createElement("div"),o=a.appendChild(document.createElement("label"));if((c=o.appendChild(document.createElement("input"))).type="checkbox",c.checked=e[1],(v=o.appendChild(document.createElement("font"))).color="red",v.appendChild(document.createTextNode("❤")),(c=(o=a.appendChild(document.createElement("label"))).appendChild(document.createElement("input"))).type="checkbox",c.checked=e[1]&&e[2],o.appendChild(document.createTextNode("⌛ ")),o=e[1]?3==e.length?"No history yet":0:"History off")a.appendChild(document.createTextNode(o));else for(i=3;i<9&&(o=e[i]);i++)(c=a.appendChild(document.createElement("a"))).href=("r"==o[1].charAt()?"/rstop.htm#":"/stop.htm#")+o[1].slice(1),c.appendChild(document.createTextNode(o[0])),a.appendChild(document.createTextNode(" "));(window.favDiv=a).draw_fav=t,d?(d.parentNode.replaceChild(a,d),n(a)):document.body.appendChild(a)}',t="(function(c){var f="+d+";f(c,f)})(",a,l;if(a=this.recordFavStopHit)for(l=0;l<a.length;l+=2)e(a[l],a[l+1]);this.recordFavStopHit={push:e};var n=location.pathname,c;"/"!=n.charAt(n.length-1)&&n.indexOf("/index")||(window.onpageshow=function(e){e.persisted&&(e=this.favDiv)&&e.draw_fav(r()[1],e.draw_fav,e,o)},c=function(){var e=r(),t=this.favDiv,a,n;if(e)if(e[0])if(a=eval("("+d+")"),t)a(e[1],a,t,o);else{for(n=document.body.lastChild;n&&"STYLE"!=n.nodeName;)n=n.previousElementSibling;n&&a(e[1],a,n.parentNode.insertBefore(document.createElement("div"),n),o)}else t?o(t):alert("no div but saw fav draw code")},document.body?c():this.x=c)}();