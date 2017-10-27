first: all

.PHONY: all MNRR LIRRMKF package

stop_.htm : stop.htm minify_config.json adj_postmini.pl
    copy /y stop.htm "$@"
    perl adj_stoppath.pl "$@"
    html-minifier -c minify_config.json -o "$@" "$@"
    perl adj_postmini.pl "$@"

docs/stop_.htm : stop_.htm
    copy /y stop_.htm "$@"

docs/stop.htm : stop.htm minify_config.json adj_postmini.pl
    copy /y stop.htm "$@"
    perl adj_stoppath.pl "$@"
    html-minifier -c minify_config.json -o "$@" "$@"
    perl adj_postmini.pl "$@"

docs/gstp.htm : gstp.htm minify_config.json adj_postmini.pl
    copy /y gstp.htm "$@"
    html-minifier -c minify_config.json -o "$@" "$@"
    perl adj_postmini.pl "$@"

docs/stations.htm : stations.htm minify_config.json
    copy /y stations.htm "$@"
    html-minifier -c minify_config.json -o "$@" "$@"

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

docs/stationsnojs.htm : stationsnojs.htm minify_config.json
    copy /y stationsnojs.htm "$@"
    html-minifier -c minify_config.json -o "$@" "$@"

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

#make a standalone tinymta for copying to memcard in a smartphone for local running
package: docs\index.htm docs\stations.htm docs\stop.htm docs\stop_.htm \
docs\mn\stations.htm docs\mn\stationsmob.htm docs\li\stations.htm \
docs\li\stop.htm docs\li\stop_.htm
    -mkdir "tinymta"
    copy /y docs\index.htm "tinymta"
    copy /y docs\stations.htm "tinymta"
    copy /y docs\stop.htm "tinymta"
    copy /y docs\stop_.htm "tinymta"
    -mkdir "tinymta\mn"
    copy /y docs\mn\stations.htm "tinymta\mn"
    copy /y docs\mn\stationsmob.htm "tinymta\mn"
    -mkdir "tinymta\li"
    copy /y docs\li\stations.htm "tinymta\li"
    copy /y docs\li\stop.htm "tinymta\li"
    copy /y docs\li\stop_.htm "tinymta\li"

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

