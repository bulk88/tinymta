!function(){var o=navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);(70<(o=!!o&&parseInt(o[2],10))&&o<84||86<o)&&(onpageshow=function(o){o.persisted||(o=sessionStorage.getItem("1p"+location.pathname))&&(o=JSON.parse(o)).hasOwnProperty("scrollX")&&o.hasOwnProperty("scrollX")&&requestAnimationFrame(function(){scroll(o.scrollX,o.scrollY)})},onpagehide=function(o){o.persisted||sessionStorage.setItem("1p"+location.pathname,JSON.stringify({scrollY:scrollY,scrollX:scrollX}))})}();