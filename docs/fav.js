var L;!function(){function r(n){try{var e=localStorage.getItem("fav");e&&"110"===e.substr(3611,3)?(o=e.slice(0,3610),n([0,JSON.parse(e.slice(3610,e.length-1))])):(this.F=function(e,t){o=e,n(t),this.F=0},document.documentElement.firstChild.appendChild(document.createElement("script")).src="/ifav.js")}catch(e){n()}}function f(e){return localStorage.setItem("fav",o+JSON.stringify(e)+")"),e}function t(e,t){t=(e=e.firstChild).nextSibling.firstChild,e=e.firstChild,t.onclick=e.onclick=function(){this.blur()},t.onchange=e.onchange=function(n){n=this,r(function(e){e=e[1];var t=n.checked;(n=n.parentNode)===n.parentNode.firstChild?t?e[1]=1:(e[1]=0,e.length=4,localStorage.removeItem("fh")):e[2]=t?e[1]=1:0,(n=n.parentNode).draw_fav(f(e),function(e){n.parentNode.replaceChild(e,n)})})}}function e(a,c){r(function(e){var t,n,r,o=4;if(e&&(e=e[1])[1]){for(r=e.length;o<r;o++)if((i=e[o])[1]==c){i[2]++,4<o&&i[2]>(n=e[o-1])[2]&&(e[o-1]=i,e[o]=n),t=1;break}t||(e[10==r?9:r]=[a,c,1]),f(e)}})}var o,n,a;if("/"==location.pathname){n=document.documentElement.firstChild,(a=document.createElement("link")).rel="preload",a.as="script",a.href="routes.js",n.appendChild(a),(a=document.createElement("link")).rel="prefetch",a.href="stop.htm",(a=n.appendChild(a).cloneNode(0)).href="rstop.htm",n.appendChild(a),window.onpageshow=function(t){t.persisted&&(t=this.favDiv)&&r(function(e){t.draw_fav(e[1],function(e){t.parentNode.replaceChild(e,t)},2)})};var c=function(e){return r(function(e){e&&((e=(e=e[0])||this.favDiv)?t(e):alert("no div but saw fav draw code"))}),c.f=c.f&&c.f()};this.y?c():(c.f=L,L=c)}else{if(n=this.rF)for(a=0;a<n.length;a+=2)e(n[a],n[a+1]);this.rF={push:e}}}();