first: all

.PHONY: all

../docs/mn/stations.htm : stations.htm ../minify_config.json
	-mkdir "../docs/mn"
	copy /y stations.htm "$@"
	html-minifier -c ../minify_config.json -o "$@" "$@"

../docs/mn/stationsmob.htm : stationsmob.htm ../minify_config.json
	-mkdir "../docs/mn"
	copy /y stationsmob.htm "$@"
	html-minifier -c ../minify_config.json -o "$@" "$@"

stations.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 0

stationsmob.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 1

../docs/mn/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/mn"
	perl grmp.pl 0

../docs/mn/m/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/mn/m"
	perl grmp.pl 1

grmp.pl : ../minify_config.json

clean :
	del stationsmob.htm
	del stations.htm

routedatafinal.pl : gr2.pl routedata.pl stops.txt
	perl gr2.pl

routedata.pl : trips.txt stop_times.txt gr.pl
	perl gr.pl

all: ../docs/mn/stations.htm ../docs/mn/stationsmob.htm ../docs/mn/rt.htm
all: ../docs/mn/m/rt.htm

