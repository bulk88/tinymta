first: all

.PHONY: all package

stop_.htm : stop.htm ../minify_config.json ../adj_postmini.pl
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier.cmd -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/stop_.htm : stop_.htm
	copy /y stop_.htm "$@"

../docs/stop.htm : stop.htm ../minify_config.json ../adj_postmini.pl
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier.cmd -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/gstp.htm : gstp.htm ../minify_config.json ../adj_postmini.pl
	copy /y gstp.htm "$@"
	html-minifier.cmd -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/stations.htm : stations.htm ../minify_config.json
	copy /y stations.htm "$@"
	html-minifier.cmd -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/stationsnojs.htm : stationsnojs.htm ../minify_config.json
	copy /y stationsnojs.htm "$@"
	html-minifier.cmd -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

stations.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 1

stationsnojs.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 0

../docs/rt.htm : grmp.pl routedatafinal.pl
	perl grmp.pl 0 0

../docs/js/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/js"
	perl grmp.pl 1 0

../docs/gwl/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/gwl"
	perl grmp.pl 1 1

../docs/raw/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/raw"
	perl grmp.pl 0 1

grmp.pl : ../minify_config.json

#make a standalone tinymta for copying to memcard in a smartphone for local running
package: ..\docs\stations.htm ..\docs\stop.htm ..\docs\stop_.htm
	-mkdir "..\tinymta"
	copy /y ..\docs\stations.htm "..\tinymta"
	copy /y ..\docs\stop.htm "..\tinymta"
	copy /y ..\docs\stop_.htm "..\tinymta"

clean :
	del stop_.htm
	del stations.htm
	del stationsnojs.htm

routedatafinal.pl : ../gr2.pl routedata.pl stops.txt
	perl ../gr2.pl

routedata.pl : trips.txt stop_times.txt ../gr.pl
	perl ../gr.pl

#dev tool target, set F= on cmd line
mini:
	html-minifier.cmd -c minify_config.json -o "$(F)" "$(F)"

all: ../docs/stationsnojs.htm ../docs/stations.htm
all: ../docs/stop_.htm ../docs/stop.htm ../docs/gstp.htm
all: ../docs/rt.htm ../docs/js/rt.htm ../docs/raw/rt.htm ../docs/gwl/rt.htm
