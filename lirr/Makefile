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

../rstop.htm : stations.js insertstalist.pl ../insertcolors.pl routesmodded.txt
	perl insertstalist.pl "$@"
	perl ../insertcolors.pl RAIL "$@" routesmodded.txt

stations.js: mkstalist.pl
	perl mkstalist.pl

../rstop_.htm : ../rstop.htm ../minify_config.json ../adj_stoppath.pl ../adj_postmini.pl
	copy /y "..\rstop.htm" "$@"
	perl ../adj_stoppath.pl "$@" 2
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/rstop_.htm : ../rstop_.htm
	-mkdir "../docs"
	copy /y "..\rstop_.htm" "$@"

../docs/rstop.htm : ../rstop.htm ../minify_config.json ../adj_stoppath.pl ../adj_postmini.pl
	-mkdir "../docs"
	copy /y "..\rstop.htm" "$@"
	perl ../adj_stoppath.pl "$@" 2
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"
  
grmp.pl : ../minify_config.json

clean :
	del stations.js
	del routedatafinal.pl
	del routedata.pl
	del stationsnojs.htm
	del stations.htm
	del ..\rstop_.htm

package : ../docs/li/stations.htm ../docs/rstop.htm ../docs/rstop_.htm
	-mkdir "..\tinymta\li"
	copy /y ..\docs\li\stations.htm "..\tinymta\li"
	copy /y ..\docs\rstop.htm "..\tinymta\"
	copy /y ..\docs\rstop_.htm "..\tinymta\"

routedatafinal.pl : ../gr2.pl routedata.pl stops.txt
	perl ../gr2.pl

routedata.pl : trips.txt stop_times.txt ../gr.pl
	perl ../gr.pl

stops.txt trips.txt stop_times.txt : gtfs.zip

gtfs.zip :
	perl ../getgtfs.pl

all: ../docs/li/stations.htm ../docs/li/stationsnojs.htm
all: ../docs/rstop_.htm ../docs/rstop.htm ../docs/li/rt.htm
all: ../docs/li/js/rt.htm

