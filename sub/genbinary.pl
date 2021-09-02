#!/usr/bin/perl -w
use File::Slurp 'write_file';
use POSIX 'ceil';
use strict;
my $b34='';
my $b32='';
my $dnum=0;
my %dirtoindex;
my  @jsdirs;
my ($maxx, $maxy)=(0,0);
my ($minx, $miny)=(2**32,2**32);
my ($shiftx, $shifty, $scaledir, $scalex, $scaley);
my $dec32;
#3675 highest X, 16960 highesy y
#min x is 69
#min y 19
my @d = ("B1,1057,867","B1,1288,1019","B1,1300,820","B1,1373,840","B1,274,650","B1,350,474","B1,421,805","B1,450,365","B1,529,827","B1,669,801","B1,693,1177","B1,805,849","B1,862,952","B1,955,785","B10,609,3444","B10,665,732","B10,711,1065","B10,744,1273","B10,751,19","B11,1142,90","B11,1167,368","B11,1187,632","B11,1216,981","B11,560,372","B11,586,572","B11,622,100","B11,628,877","B11,675,1179","B11,709,1400","B12,547,230","B12,639,478","B12,764,817","B12,859,1079","B14,1015,1040","B14,1070,420","B14,1335,680","B14,256,240","B14,315,265","B14,390,510","B14,505,775","B14,590,285","B14,625,985","B14,825,1030","B14,825,290","B15,115,345","B15,150,595","B15,195,925","B15,215,1185","B15,695,485","B15,760,920","B16,1030,1250","B16,1085,1080","B16,1100,650","B16,1125,380","B16,1318,1235","B16,665,290","B16,780,690","B16,870,1190","B16,935,310","B16,960,505","B17,1135,390","B17,1360,820","B17,445,780","B17,500,205","B17,685,890","B17,785,490","B17,815,555","B17,845,925","B17,860,425","B17,985,1090","B18,365,545","B18,510,935","B19,445,1285","B19,655,205","B19,685,390","B19,725,820","B2,1039,629","B2,1085,1000","B13,100,910","B13,1305,1415","B13,1315,155","B13,140,1210","B13,415,855","B13,595,1335","B13,735,810","B13,870,1385","B13,880,160","B13,930,500","B3,102,1228","B3,115,966","B3,136,509","B3,334,212","B3,475,302","B3,488,962","B3,601,380","B3,681,1215","B3,884,398","B4,1324,656","B4,136,1018","B4,1375,120","B4,162,1369","B4,246,599","B4,304,566","B4,309,373","B4,582,960","B4,590,698","B4,596,608","B4,606,1261","B4,920,629","B5,326,742","B5,454,240","B5,597,948","B5,656,696","B5,771,794","B5,802,203","B5,865,1145","B5,982,347","B5,988,652","B6,1019,982","B6,1059,1169","B6,1211,1085","B6,1303,1205","B6,314,989","B6,511,598","B6,734,1017","B6,961,782","B6,994,485","B7,1076,385","B7,1100,88","B7,1105,1255","B7,1153,361","B7,1198,1050","B7,1203,611","B7,1386,326","B7,295,326","B7,541,491","B7,837,432","B8,1076,452","B8,1146,887","B8,307,746","B8,405,1028","B8,411,1441","B8,596,641","B8,632,1400","B8,768,962","B8,813,551","B9,1053,1400","B9,1076,838","B9,1192,1008","B9,1307,1196","B9,444,1095","B9,446,1305","B9,451,914","B9,455,532","B9,459,240","B9,775,1402","B9,919,653","BX1,1020,425","BX1,1070,130","BX1,970,1340","BX1,980,1070","BX1,995,755","BX10,225,770","BX10,275,1220","BX10,375,560","BX10,505,390","BX10,515,875","BX10,655,540","BX10,735,150","BX2,780,1275","BX2,825,790","BX2,870,300","BX3,705,1250","BX3,835,965","BX3,895,375","BX3,895,635","BX4,375,1400","BX4,420,1155","BX4,500,1430","BX4,540,1150","BX4,550,870","BX4,645,530","BX4,650,840","BX4,735,210","BX4,895,680","BX5,1005,1155","BX5,1095,840","BX5,263,73","BX5,364,410","BX5,485,710","BX5,665,1135","BX6,1010,75","BX6,465,1400","BX6,590,1205","BX6,680,975","BX6,860,655","BX6,945,450","BX7,465,1325","BX7,495,1065","BX7,505,850","BX7,520,610","BX7,555,325","BX7,580,50","BX7,605,1360","BX7,630,695","BX7,655,1030","BX7,700,415","BX7,730,105","BX8,1075,910","BX8,1300,705","BX8,180,1370","BX8,180,965","BX8,410,675","BX8,625,490","BX8,655,50","BX8,706,1250","BX8,865,1125","BX9,1150,1275","BX9,1215,570","BX9,1360,995","BX9,255,200","BX9,350,1045","BX9,365,730","BX9,550,1160","BX9,790,735","BX9,900,1225","Manhattan,1165,12425","Manhattan,1170,7465","Manhattan,1175,7118","Manhattan,1180,5755","Manhattan,1180,6355","Manhattan,1185,5235","Manhattan,1190,4500","Manhattan,1200,2925","Manhattan,1205,1090","Manhattan,1210,2325","Manhattan,1215,1830","Manhattan,1215,3800","Manhattan,1270,7855","Manhattan,1270,8465","Manhattan,1270,8995","Manhattan,1270,9460","Manhattan,1380,4175","Manhattan,1380,9955","Manhattan,1425,1305","Manhattan,1430,795","Manhattan,1535,4685","Manhattan,1575,10345","Manhattan,1613,5185","Manhattan,1705,5845","Manhattan,1710,6495","Manhattan,1730,4595","Manhattan,1820,10730","Manhattan,1820,11300","Manhattan,1820,11850","Manhattan,1820,12370","Manhattan,1820,12995","Manhattan,1820,13575","Manhattan,1825,7045","Manhattan,1825,7910","Manhattan,1825,8355","Manhattan,1825,8980","Manhattan,1825,9395","Manhattan,1825,9970","Manhattan,1830,7485","Manhattan,1975,11315","Manhattan,2040,10970","Manhattan,2040,11465","Manhattan,2040,12415","Manhattan,2040,12775","Manhattan,2040,13055","Manhattan,2040,13365","Manhattan,2040,13670","Manhattan,2060,11160","Manhattan,2070,11920","Manhattan,2070,14120","Manhattan,2140,14595","Manhattan,2170,5010","Manhattan,2255,10935","Manhattan,2255,11430","Manhattan,2255,13065","Manhattan,2255,13615","Manhattan,2255,14145","Manhattan,2260,11910","Manhattan,2260,12395","Manhattan,2265,5270","Manhattan,2265,5905","Manhattan,2265,6530","Manhattan,2265,7070","Manhattan,2265,7375","Manhattan,2325,14680","Manhattan,2325,15060","Manhattan,2395,12730","Manhattan,2405,11890","Manhattan,2435,15320","Manhattan,2460,15725","Manhattan,2465,15170","Manhattan,2465,16175","Manhattan,2470,10735","Manhattan,2530,13080","Manhattan,2535,16555","Manhattan,2555,11165","Manhattan,2560,15815","Manhattan,2560,16195","Manhattan,2575,16520","Manhattan,2585,15905","Manhattan,2640,16780","Manhattan,2645,16455","Manhattan,2685,15815","Manhattan,2725,15165","Manhattan,2740,13585","Manhattan,2740,16540","Manhattan,2750,12460","Manhattan,2750,12765","Manhattan,2750,13055","Manhattan,2755,16960","Manhattan,2765,14650","Manhattan,2765,16850","Manhattan,2775,16100","Manhattan,2805,14030","Manhattan,2810,11865","Manhattan,2815,14540","Manhattan,2845,15210","Manhattan,2845,16425","Manhattan,2860,15745","Manhattan,2880,11290","Manhattan,2880,14440","Manhattan,2880,14790","Manhattan,2890,10745","Manhattan,2890,15685","Manhattan,2890,6545","Manhattan,2890,7090","Manhattan,2890,7445","Manhattan,2890,7880","Manhattan,2890,8395","Manhattan,2890,9020","Manhattan,2890,9580","Manhattan,2895,10160","Manhattan,2895,13980","Manhattan,2940,10510","Manhattan,3100,13620","Manhattan,3165,14850","Manhattan,3250,14485","Manhattan,3255,14990","Manhattan,3450,13620","Manhattan,3575,14800","Manhattan,3675,15245","Manhattan,765,2255","Manhattan,850,2875","Manhattan,920,1485","Manhattan,945,3300","Q1,400,860","Q1,515,700","Q1,530,1070","Q1,640,555","Q1,735,1130","Q1,845,365","Q10,1185,460","Q10,278,778","Q10,368,1000","Q10,523,685","Q10,601,921","Q10,850,557","Q11,1000,893","Q11,1081,1171","Q11,1090,345","Q11,1245,306","Q11,232,533","Q11,385,470","Q11,571,467","Q11,931,429","Q11,965,763","Q12,1116,375","Q12,1128,1206","Q12,1278,1178","Q12,1280,353","Q12,281,497","Q12,393,1070","Q12,557,1121","Q12,775,1225","Q12,806,375","Q12,950,1246","Q12,956,375","Q2,1070,1050","Q2,1310,970","Q2,350,1150","Q2,570,1120","Q2,830,1085","Q3,1082,913","Q3,110,683","Q3,1325,823","Q3,455,1365","Q3,512,726","Q3,532,1240","Q3,570,1030","Q3,591,1310","Q3,625,1060","Q3,670,822","Q3,800,837","Q3,850,611","Q3,860,390","Q3,990,575","Q4,391,958","Q4,938,727","Q5,1110,512","Q5,1145,514","Q5,1410,715","Q5,304,613","Q5,495,578","Q5,708,242","Q5,788,540","Q5,929,388","Q5,971,527","Q6,1006,475","Q6,1125,746","Q6,428,38","Q6,466,964","Q6,636,223","Q6,725,833","Q7,1083,525","Q7,410,994","Q7,525,872","Q7,639,1155","Q7,670,794","Q7,885,731","Q8,1007,725","Q8,1234,688","Q8,375,834","Q8,530,795","Q8,750,765","Q9,1171,877","Q9,1440,1090","Q9,318,424","Q9,570,567","Q9,827,711","S1,1010,738","S1,1066,684","S1,1111,642","S1,1159,596","S1,1215,534","S1,1243,461","S1,1302,242","S1,1306,165","S1,1325,95","S1,1330,305","S1,143,1254","S1,226,1232","S1,311,1206","S1,422,1182","S1,480,1110","S1,587,1041","S1,672,1008","S1,69,1290","S1,775,940","S1,865,900","S1,940,821");
my $html1 = '<title>The Weekender</title><script>var o,n,B,l,p,e,i,Q,r,h,M=["';
my $html2 = '"],s=!1,f=[1,2],X=[],c=[],u=1,d=[],v=[],m=[0,0],y=[0,0];function a(a){var t;(a=M[a])&&(a=a.split(","),e=a[0],(t=parseInt(a[1])*f[u])<315&&(t=315),(a=parseInt(a[2])*f[u])<315&&(a=315),0==u&&("Manhattan"!=e?(1185<t&&(t=1185),1185<a&&(a=1185)):(4685<t&&(t=4685),17093<a&&(a=17093))),1==u&&("Manhattan"!=e?(2685<t&&(t=2685),2685<a&&(a=2685)):(9685<t&&(t=9685),34501<a&&(a=34501))),l="Manhattan"==e?5e3:1500,p="Manhattan"==e?17408:1500,o="neighborhoodMaps/"+e+"/",n=t,B=a,S())}function S(){g(),i=n,Q=B,_()}function t(){var a,t,n,B,e=I(),h=0;for(s=!1,i=e[0],Q=e[1];h<d.length;h++)n=d[h],a=+(e=(B=v[h]).className.split("_"))[0],t=+e[1],630<parseInt(n.left)?(B.className=(a-=5)+"_"+t,n.left=parseInt(n.left)-1280+"px",n.visibility="hidden"):256<-1*parseInt(n.left)&&(B.className=(a+=5)+"_"+t,n.left=parseInt(n.left)+1280+"px",n.visibility="hidden"),630<parseInt(n.top)?(B.className=a+"_"+(t-=5),n.top=parseInt(n.top)-1280+"px",n.visibility="hidden"):256<-1*parseInt(n.top)&&(B.className=a+"_"+(t+=5),n.top=parseInt(n.top)+1280+"px",n.visibility="hidden"),"hidden"==n.visibility&&(B.src=o+(u+15)+"_"+a+"_"+t+".png")}function g(){for(var a=0;a<25;a++)d[a].visibility="hidden"}function I(){var a=v[12].className.split("_"),t=d[12];return[256*a[0]+(315-parseInt(t.left)),256*a[1]+(315-parseInt(t.top))]}function x(a){z();var t,n,B=I(),e=B[0],B=B[1];if(-1==a){if(!(0<u))return E("This is the lowest zoom level");g(),n=parseInt(B/2),y[(u-=1)+1]=(t=parseInt(e/2))-e/2,m[u+1]=n-B/2}if(1==a){if(!(u<1))return E("This is the highest zoom level");g(),t=2*(e-y[u+=1]),n=2*(B-m[u])}i=t,Q=n,_()}function b(a){return a%256}function T(a){return(a-a%256)/256}function _(){g();for(var a,t,n=T(i),B=T(Q),e=128-b(Q),h=128-b(i),n=[n-2,n-1,n,n+1,n+2],B=[B-2,B-1,B,B+1,B+2],M=0;M<25;M++)v[M].className=n[M%5]+"_"+B[M/5|0];for(a=v[12].src,M=0;M<25;M++)v[M].src=o+(u+15)+"_"+v[M].className+".png";for(d[0].left=d[5].left=d[10].left=d[15].left=d[20].left=d[0].top=d[1].top=d[2].top=d[3].top=d[4].top="-325px",d[1].left=d[6].left=d[11].left=d[16].left=d[21].left=d[5].top=d[6].top=d[7].top=d[8].top=d[9].top="-69px",d[2].left=d[7].left=d[12].left=d[17].left=d[22].left=d[10].top=d[11].top=d[12].top=d[13].top=d[14].top="187px",d[3].left=d[8].left=d[13].left=d[18].left=d[23].left=d[15].top=d[16].top=d[17].top=d[18].top=d[19].top="443px",d[4].left=d[9].left=d[14].left=d[19].left=d[24].left=d[20].top=d[21].top=d[22].top=d[23].top=d[24].top="699px",M=0;M<25;M++)(t=d[M]).top=parseInt(t.top)+e+"px",t.left=parseInt(t.left)+h+"px";if(a.toLowerCase()==v[12].src.toLowerCase())for(M=0;M<25;M++)d[M].visibility="visible"}function N(a){a.style.visibility="visible"}function L(a){var t,n,B={};return(a=a||window.event).targetTouches?(B.x=Math.round(a.targetTouches[0].pageX),B.y=Math.round(a.targetTouches[0].pageY),a.preventDefault()):a.pageX||a.pageY?(B.x=a.pageX,B.y=a.pageY):(t=document.documentElement,n=document.body,B.x=a.clientX+(t.scrollLeft||n.scrollLeft)-(t.clientLeft||0),B.y=a.clientY+(t.scrollTop||n.scrollTop)-(t.clientTop||0)),B}function w(a){for(z(),s=!0,r=L(a),a=0;a<25;a++)X[a]=parseInt(d[a].left);for(a=0;a<25;a++)c[a]=parseInt(d[a].top)}function Y(a){if(s){var t=(a=L(a)).x-r.x,n=a.y-r.y,B=i-t,e=Q-n,h=l*f[u]-315,M=p*f[u]-315;if(315<B&&B<h||i<315&&t<0||h<i&&0<t)for(a=0;a<25;a++)d[a].left=X[a]+t+"px";if(315<e&&e<M||Q<315&&n<0||M<Q&&0<n)for(a=0;a<25;a++)d[a].top=c[a]+n+"px"}}function E(a){var t=document.getElementById("customAlert");t.innerHTML=a,t.style.display="inline",clearTimeout(h),h=setTimeout(z,3e3)}function z(){clearTimeout(h),document.getElementById("customAlert").style.display="none"}function A(a){a.src=a.src.replace(".png","_over.png")}function C(a){a.src=a.src.replace("_over.png",".png")}</script><body onmousedown=z() style="width:630px; height:630px; margin:0px; padding:0px; overflow:hidden;"><div style="display:inline; position:absolute; top:0px; left:0px; width:630px; height:630px; -moz-user-select: none; -webkit-user-select: none;"unselectable=on><div style="position:absolute; top:0px; left:0px; width:630px; height:630px; overflow:hidden; cursor:move; background-image:url(mapTileBackground.png); -moz-user-select: none; -webkit-user-select: none;"unselectable=on><img style="z-index:0; position:absolute; top:-325px; left:-325px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:-325px; left:-69px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:-325px; left:187px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:-325px; left:443px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:-325px; left:699px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:-69px; left:-325px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:-69px; left:-69px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:-69px; left:187px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:-69px; left:443px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:-69px; left:699px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:187px; left:-325px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:187px; left:-69px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:187px; left:187px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:187px; left:443px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:187px; left:699px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:443px; left:-325px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:443px; left:-69px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:443px; left:187px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:443px; left:443px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:443px; left:699px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:699px; left:-325px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:699px; left:-69px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:699px; left:187px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:699px; left:443px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on> <img style="z-index:0; position:absolute; top:699px; left:699px; width:256px; height:256px; -moz-user-select: none; -webkit-user-select: none;"onload=N(this) unselectable=on><div style="display:inline; position:absolute; top:0px; left:0px; width:630px; height:630px; background-image:url(transparentTile.gif); -moz-user-select: none; -webkit-user-select: none;"onmousedown=w(event) onmousemove=Y(event) onmouseout=t() onmouseup=t() ontouchcancel=t() ontouchend=t() ontouchmove=Y(event) ontouchstart=w(event)></div><img style="display:inline;cursor:pointer; position:relative; top:2%; left:2%; height:30px; width:26px;"border=0 onclick=x(-1) onmouseout=C(event.target||event.srcElement) onmouseover=A(event.target||event.srcElement) src=zoom_out.png> <img style="display:inline;cursor:pointer; position:relative; top:2%; left:4%; height:30px; width:26px;"border=0 onclick=x(1) onmouseout=C(event.target||event.srcElement) onmouseover=A(event.target||event.srcElement) src=zoom_in.png><div style="display:none; position:absolute; top:240px; left:165px; width:300px; background-color:black; color:white; font-family:arial; font-family:arial; font-weight:bold; font-size:18px; border:solid silver 3px; text-align:center; padding-top:50px; padding-bottom:50px;"id=customAlert></div></div><script>!function(){for(var t,n=document.getElementsByTagName("img"),e=0;e<25;e++)d[e]=(v[e]=n[e]).style;if(!(n=window.location.hash.substring(1))&&(t=window.location.search))for(t=t.substring(1).split("&"),e=0;e<t.length;e++)if(ft=t[e].split("="),"staID"==ft[0]){n=ft[1];break}""!=n&&null!=n&&a(n),parent.neighborhoodMapLoaded=!0}()</script>';

foreach(@d) {
    my ($dir, $x, $y) = split(',', $_);
    $maxx = $x if $x > $maxx;
    $maxy = $y if $y > $maxy;
    $minx = $x if $x < $minx;
    $miny = $y if $y < $miny;
    if(! defined $dirtoindex{$dir}) {
        push @jsdirs, $dir;
        $dirtoindex{$dir} = $dnum;
        $dnum++;
    }
}
$shiftx = $minx;
$shifty = $miny;
$scaledir = scalar(keys %dirtoindex);
$scalex = $maxx-$minx;
$scaley = $maxy-$miny;
my ($log2dir, $log2x, $log2y) = (ceil(log($scaledir)/log(2)), ceil(log($scalex)/log(2)), ceil(log($scaley)/log(2)));

foreach(@d) {
    my ($bdir, $bx, $by);
    my ($dir, $x, $y) = split(',', $_);
    #pp=post processed, drop lower bounds into a constant
    my $ppx = $x- $shiftx;
    my $ppy = $y- $shifty;
    $bdir = sprintf ("%0".$log2dir."b", $dirtoindex{$dir});
    $bx = sprintf ("%0".$log2x."b", $ppx);
    $by = sprintf ("%0".$log2y."b", $ppy);
    #6+12+15=33 this encoding abandoned
    my $numdir = $dirtoindex{$dir};
#highest byte is VERY low typically by freq, causing alot of \r \n which needs more "\" in stream
#to make it a safe JS lit string, turn these low bytes into printable ascii
#update XOR mask disabled because Z85 is not binary
#\4 0x04 41
#\a 0x07 39
#\3 0x03 38
#\A 0x06 36
#\b 0x08 36
#\5 0x05 34
#\n 0x0a 34
#\t 0x09 32
#\v 0x0b 27
#\2 0x02 21
#\1 0x01 20
#\f 0x0c 19
#\0 0x00 16
#P 0x50  15
#; 0x3b  12
#Q 0x51  12
#g 0x67  12
#o 0x6f  12
#u 0x75  11
#z 0x7a  11

    $dec32 = ($numdir + ($ppx*$scaledir) +($ppy*$scaledir*$scalex)); #^ 0x60000000;
    #test code, reverse the combination
    my $ndec32 = $dec32; # ^ 0x60000000;
    my ($ndir, $nx, $ny)= (
        $ndec32 % $scaledir,
        ($ndec32/$scaledir % $scalex) + $shiftx,
        ($ndec32/($scaledir*$scalex) % $scaley) + $shifty);
    print "just div ".$ndec32/($scaledir*$scalex)."\n";
    print "with mod ".($ndec32/($scaledir*$scalex) % $scaley)."\n";
    #31.1 to 31.4 "bits" log(maxed out dir+x+y)/log(2)
    if( $dec32 >((2**32)-1)) {
        die "32 bit, not power of 2, encoding, is over 32 bits"
    }
    $b34 .= $bdir.$bx.$by;
    $b32 .= pack('N',$dec32);
}
sub e {
    $_ = $_[0];
    $_ =~ s/\x5C/\\\\/g;
    $_ =~ s/\x0A/\\n/g;
    $_ =~ s/\x0D/\\r/g;
    $_ =~ s/\x22/\\"/g;
    #IE drops these
    $_ =~ s/\x00/\\0/g;
    return $_;
}
use Convert::Z85;
use Text::Ngrams;
my $ng3 = Text::Ngrams->new(windowsize => 1,type => 'byte' );
#$ng3->process_text('aaabbca');
$ng3->process_text($b32);
print $ng3->to_string(orderby=>'frequency', onlyfirst=>30);
 
write_file('b32.htm', {binmode => ':raw'},$html1.e($b32).$html2);
system('gzip -k -f b32.htm');
sub utf {
    my $i = $_[0];
    my $o ='';
    my @o = unpack '(a7)*', $i;
    my @o2 = map{
        unpack('B56',$_);
        } @o;
    foreach(@o2) {
        my @bits = unpack '(a7)*', $_;
        foreach(@bits) {
            my $byte =pack('B*', '0'.$_);
            $o .= $byte;
        }
    }
    return $o;
}
write_file('b32low7utf.htm', {binmode => ':raw'},$html1.e(utf($b32)).$html2);
system('gzip -k -f b32low7utf.htm');
write_file('b32notjs.htm', {binmode => ':raw'},$html1.$b32.$html2);
system('gzip -k -f b32notjs.htm');
write_file('b32z85.htm', {binmode => ':raw'},$html1.encode_z85($b32).$html2);
system('gzip -k -f b32z85.htm');
write_file('b32utf8.htm', {binmode => ':utf8'},$html1.e($b32).$html2);
system('gzip -k -f b32utf8.htm');
$b34 = pack('b*', $b34);
print "array len ".@d."\n";
print "b32 raw len ".length($b32)."\n";
print "b32 js len ".length(e($b32))."\n";
print "b34 raw len ".length($b34)."\n";
write_file('b34.bin', {binmode => ':raw'},e($b34));

foreach( qw(
b32.htm.gz
b32low7utf.htm.gz
b32notjs.htm.gz
b32utf8.htm.gz
b32z85.htm.gz
)) {
    my $c = "cmd /c gzthermal $_ & del $_.png & rename gzthermal-result.png $_.png";
    print "$c\n";
    system($c);
}
my $dirjsarray ='['.join(',',map({'"'.$_.'"'} @jsdirs)).']';
write_file('tiledirs.js', {binmode => ':raw'},$dirjsarray );
 
print "scaledir $scaledir scalex $scalex scaley $scaley shiftx $shiftx shifty $shifty\n";