first: all

.PHONY: all

../docs/mn/stations.htm : stations.htm ../minify_config.json
	-mkdir "../docs/mn"
	copy /y stations.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/mn/stationsjs.htm : stationsjs.htm ../minify_config.json
	-mkdir "../docs/mn"
	copy /y stationsjs.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

stations.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 0

stationsjs.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 1

../docs/mn/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/mn"
	perl grmp.pl 0

../docs/mn/js/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/mn/js"
	perl grmp.pl 1

grmp.pl : ../minify_config.json

clean :
	del stationsjs.htm
	del stations.htm

package : ../docs/mn/stations.htm ../docs/mn/stationsjs.htm
	-mkdir "..\tinymta\mn"
	copy /y ..\docs\mn\stations.htm "..\tinymta\mn"
	copy /y ..\docs\mn\stationsjs.htm "..\tinymta\mn"

#routedatafinal.pl : ../gr2.pl routedata.pl stops.txt
#	perl ../gr2.pl

routedata.pl : trips.txt stop_times.txt ../gr.pl
	perl ../gr.pl

stops.txt trips.txt stop_times.txt : gtfs.zip

gtfs.zip :
	perl ../getgtfs.pl

all: ../docs/mn/stations.htm ../docs/mn/stationsjs.htm ../docs/mn/rt.htm
all: ../docs/mn/js/rt.htm
