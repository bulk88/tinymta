first: all

.PHONY: all clean

../docs/li/stations.htm : stations.htm ../minify_config.json
	-mkdir "../docs/li"
	copy /y stations.htm "$@"
	html-minifier -c ../minify_config.json -o "$@" "$@"

../docs/li/stationsnojs.htm : stationsnojs.htm ../minify_config.json
	-mkdir "../docs/li"
	copy /y stationsnojs.htm "$@"
	html-minifier -c ../minify_config.json -o "$@" "$@"

stations.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 1

stationsnojs.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 0

../docs/li/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/li"
	perl grmp.pl 0 0

../docs/li/js/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/li/js"
	perl grmp.pl 1 0

../docs/li/gwl/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/li/gwl"
	perl grmp.pl 1 1

stop.htm : stations.js insertstalist.pl
	perl insertstalist.pl "$@"

gstp.htm : stations.js insertstalist.pl
	perl insertstalist.pl "$@"

stations.js stations.pl: mkstalist.pl
	perl mkstalist.pl

stop_.htm : stop.htm ../minify_config.json ../adj_postmini.pl
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier -c ../minify_config.json -o "$@" "$@"
	perl ../adj_postmini.pl "$@"

../docs/li/stop_.htm : stop_.htm
	copy /y stop_.htm "$@"

../docs/li/stop.htm : stop.htm ../minify_config.json ../adj_postmini.pl
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier -c ../minify_config.json -o "$@" "$@"
	perl ../adj_postmini.pl "$@"

../docs/li/gstp.htm : gstp.htm ../minify_config.json ../adj_postmini.pl
	copy /y gstp.htm "$@"
	html-minifier -c ../minify_config.json -o "$@" "$@"
	perl ../adj_postmini.pl "$@"

grmp.pl : ../minify_config.json

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
all: ../docs/li/stop_.htm ../docs/li/stop.htm ../docs/li/rt.htm
all: ../docs/li/js/rt.htm ../docs/li/gwl/rt.htm ../docs/li/gstp.htm

