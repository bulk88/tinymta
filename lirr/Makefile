.PHONY: all clean

../docs/li/stations.htm : stations.htm
    -mkdir "../docs/li"
    copy /y stations.htm "$@"

../docs/li/stationsnojs.htm : stationsnojs.htm
    -mkdir "../docs/li"
    copy /y stationsnojs.htm "$@"

stations.htm : gr3.pl routedatafinal.pl
    perl gr3.pl 1

stationsnojs.htm : gr3.pl routedatafinal.pl
    perl gr3.pl 0

../docs/li/rt.htm : grmp.pl routedatafinal.pl
    -mkdir "../docs/li"
    perl grmp.pl 0

../docs/li/m/rt.htm : grmp.pl routedatafinal.pl
    -mkdir "../docs/li/m"
    perl grmp.pl 1

stop.htm : stations.js insertstalist.pl
    perl insertstalist.pl

stations.js stations.pl: mkstalist.pl
    perl mkstalist.pl

stop_.htm : stop.htm
    copy /y stop.htm "$@"
    perl ../adj_stoppath.pl "$@"
    html-minifier --collapse-boolean-attributes --collapse-whitespace \
    --html5 --remove-attribute-quotes --remove-comments \
    --remove-empty-attributes --remove-optional-tags \
    --remove-redundant-attributes --remove-script-type-attributes \
    --remove-style-link-type-attributes --remove-tag-whitespace \
    --sort-attributes --sort-class-name --trim-custom-fragments \
    --use-short-doctype --minify-js -o "$@" "$@"

../docs/li/stop_.htm : stop_.htm
    copy /y stop_.htm "$@"

../docs/li/stop.htm : stop.htm
    copy /y stop.htm "$@"
    perl ../adj_stoppath.pl "$@"
    html-minifier --collapse-boolean-attributes --collapse-whitespace \
    --html5 --remove-attribute-quotes --remove-comments \
    --remove-empty-attributes --remove-optional-tags \
    --remove-redundant-attributes --remove-script-type-attributes \
    --remove-style-link-type-attributes --remove-tag-whitespace \
    --sort-attributes --sort-class-name --trim-custom-fragments \
    --use-short-doctype --minify-js -o "$@" "$@"

clean :
    del stations.pl
    del stations.js
    del routedatafinal.pl
    del routedata.pl
    del stationsnojs.htm
    del stations.htm
    del stop_.htm

routedatafinal.pl : gr2.pl routedata.pl stations.pl stops.txt
    perl gr2.pl

routedata.pl : trips.txt stop_times.txt
    perl gr.pl > routedata.pl

all: ../docs/li/stations.htm ../docs/li/stationsnojs.htm
all: ../docs/li/stop_.htm ../docs/li/stop.htm

