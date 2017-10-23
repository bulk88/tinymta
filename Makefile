.PHONY: all MNRR LIRRMKF

stop_.htm : stop.htm minify_config.json
    copy /y stop.htm "$@"
    perl adj_stoppath.pl "$@"
    html-minifier -c minify_config.json -o "$@" "$@"

docs/stop_.htm : stop_.htm
    copy /y stop_.htm "$@"

docs/stop.htm : stop.htm minify_config.json
    copy /y stop.htm "$@"
    perl adj_stoppath.pl "$@"
    html-minifier -c minify_config.json -o "$@" "$@"

docs/gstp.htm : gstp.htm minify_config.json
    copy /y gstp.htm "$@"
    html-minifier -c minify_config.json -o "$@" "$@"

docs/stations.htm : stations.htm
    copy /y stations.htm "$@"

docs/index.htm : index.htm minify_config.json
    copy /y index.htm "$@"
    html-minifier -c minify_config.json --minify-js -o "$@" "$@"

docs/404.html : 404.html
    copy /y 404.html "$@"

docs/favicon.ico : favicon.ico
    copy /y favicon.ico "$@"

docs/CNAME : CNAME
    copy /y CNAME "$@"

docs/_config.yml : _config.yml
    copy /y _config.yml "$@"

docs/README.md : README.md
    copy /y README.md "$@"

docs/stationsnojs.htm : stationsnojs.htm
    copy /y stationsnojs.htm "$@"

stations.htm : gr3.pl routedatafinal.pl
    perl gr3.pl 1

stationsnojs.htm : gr3.pl routedatafinal.pl
    perl gr3.pl 0

docs/rt.htm : grmp.pl routedatafinal.pl
    perl grmp.pl 0 0

docs/js/rt.htm : grmp.pl routedatafinal.pl
    -mkdir "docs/js"
    perl grmp.pl 1 0

docs/gwl/rt.htm : grmp.pl routedatafinal.pl
    -mkdir "docs/gwl"
    perl grmp.pl 1 1

docs/raw/rt.htm : grmp.pl routedatafinal.pl
    -mkdir "docs/raw"
    perl grmp.pl 0 1

grmp.pl : minify_config.json

MNRR :
    cd mnr && $(MAKE) all

LIRRMKF:
    cd lirr && $(MAKE) all

clean :
    del stop_.htm
    del stations.htm
    del stationsnojs.htm

#routedatafinal.pl : gr2.pl routedata.pl stops.txt
#    perl gr2.pl
#
#routedata.pl : trips.txt stop_times.txt
#    perl gr.pl > routedata.pl

#dev tool target, set F= on cmd line
mini:
    html-minifier -c minify_config.json -o "$(F)" "$(F)"

all: docs/stationsnojs.htm docs/index.htm docs/stations.htm
all: docs/stop_.htm docs/stop.htm docs/404.html docs/favicon.ico
all: docs/CNAME docs/README.md docs/_config.yml
all: MNRR LIRRMKF docs/gstp.htm
all: docs/rt.htm docs/js/rt.htm docs/raw/rt.htm docs/gwl/rt.htm

