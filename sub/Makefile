first: all

.PHONY: all package

stop_.htm : stop.htm ../minify_config.json ../adj_postmini.pl
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/stop_.htm : stop_.htm
	copy /y stop_.htm "$@"

../docs/stop.htm : stop.htm ../minify_config.json ../adj_postmini.pl
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/gstp.htm : gstp.htm ../minify_config.json ../adj_postmini.pl
	copy /y gstp.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/stations.htm : stations.htm ../minify_config.json
	copy /y stations.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/stationsnojs.htm : stationsnojs.htm ../minify_config.json
	copy /y stationsnojs.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/tileMap.htm : tileMap.htm ../minify_config.json
	copy /y tileMap.htm "$@"
	perl adj_tilepath.pl "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/mapTileBackground.gif : $(@F)
	copy /y $(@F) "$@"

../docs/transparentTile.gif : $(@F)
	copy /y $(@F) "$@"

../docs/zoom_in.png : $(@F)
	copy /y $(@F) "$@"

../docs/zoom_in_over.png : $(@F)
	copy /y $(@F) "$@"

../docs/zoom_out.png : $(@F)
	copy /y $(@F) "$@"

../docs/zoom_out_over.png : $(@F)
	copy /y $(@F) "$@"

stations.htm : gr3.pl routedatafinal.pl nmapnidsdata.pl
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


nmap_stations.json: nmap_gen1.js
	node nmap_gen1.js

nmapnidsdata.pl: nmap_gen2.pl nmap_stations.json
	perl nmap_gen2.pl

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

#routedatafinal.pl : ../gr2.pl routedata.pl stops.txt
#	perl ../gr2.pl

routedata.pl : trips.txt stop_times.txt ../gr.pl
	perl ../gr.pl

stops.txt trips.txt stop_times.txt : gtfs.zip

gtfs.zip :
	perl ../getgtfs.pl

#dev tool target, set F= on cmd line
mini:
	html-minifier.cmd -c minify_config.json -o "$(F)" "$(F)"

all: ../docs/stationsnojs.htm ../docs/stations.htm
all: ../docs/stop_.htm ../docs/stop.htm ../docs/gstp.htm
all: ../docs/rt.htm ../docs/js/rt.htm ../docs/raw/rt.htm ../docs/gwl/rt.htm
all: ../docs/tileMap.htm ../docs/mapTileBackground.gif
all: ../docs/transparentTile.gif ../docs/zoom_in.png ../docs/zoom_in_over.png
all: ../docs/zoom_out.png ../docs/zoom_out_over.png
