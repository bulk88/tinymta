first: all

.PHONY: all clean

../docs/li/stations.htm : stations.htm ../minify_config.json
	-mkdir "../docs/li"
	copy /y stations.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/li/stationsnojs.htm : stationsnojs.htm ../minify_config.json
	-mkdir "../docs/li"
	copy /y stationsnojs.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

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

stop.htm : stations.js insertstalist.pl ../insertcolors.pl routesmodded.txt
	perl insertstalist.pl "$@"
	perl ../insertcolors.pl "$@" routesmodded.txt

stations.js stations.pl: mkstalist.pl
	perl mkstalist.pl

stop_.htm : stop.htm ../minify_config.json ../adj_stoppath.pl ../adj_postmini.pl
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/li/stop_.htm : stop_.htm
	-mkdir "../docs/li"
	copy /y stop_.htm "$@"

../docs/li/stop.htm : stop.htm ../minify_config.json ../adj_stoppath.pl ../adj_postmini.pl
	-mkdir "../docs/li"
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
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

package : ../docs/li/stations.htm ../docs/li/stop.htm ../docs/li/stop_.htm
	-mkdir "..\tinymta\li"
	copy /y ..\docs\li\stations.htm "..\tinymta\li"
	copy /y ..\docs\li\stop.htm "..\tinymta\li"
	copy /y ..\docs\li\stop_.htm "..\tinymta\li"

#routedatafinal.pl : ../gr2.pl routedata.pl stations.pl stops.txt
#	perl ../gr2.pl

routedata.pl : trips.txt stop_times.txt ../gr.pl
	perl ../gr.pl

stops.txt trips.txt stop_times.txt : gtfs.zip

gtfs.zip :
	perl ../getgtfs.pl

all: ../docs/li/stations.htm ../docs/li/stationsnojs.htm
all: ../docs/li/stop_.htm ../docs/li/stop.htm ../docs/li/rt.htm
all: ../docs/li/js/rt.htm

