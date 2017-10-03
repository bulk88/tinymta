docs/stop_.htm docs/stop.htm stop_.htm : stop.htm
    copy /y stop.htm "$@"

docs/stations.htm : stations.htm
    copy /y stations.htm "$@"

docs/index.htm : index.htm
    copy /y index.htm "$@"

docs/404.html : 404.html
    copy /y 404.html "$@"

docs/favicon.ico : favicon.ico
    copy /y favicon.ico "$@"

docs/CNAME : CNAME
    copy /y CNAME "$@"

docs/stationsnojs.htm : stationsnojs.htm
    copy /y stationsnojs.htm "$@"

stations.htm : gr3.pl routedatafinal.pl
    perl gr3.pl 1

stationsnojs.htm : gr3.pl routedatafinal.pl
    perl gr3.pl 0

docs/rt.htm : grmp.pl routedatafinal.pl
    perl grmp.pl 0

docs/js/rt.htm : grmp.pl routedatafinal.pl
    perl grmp.pl 1

all: docs/rt.htm docs/stationsnojs.htm docs/index.htm docs/stations.htm
all: docs/stop_.htm docs/stop.htm stop_.htm docs/404.html docs/favicon.ico
all: docs/CNAME docs/js/rt.htm

