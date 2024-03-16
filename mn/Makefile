first: all

.PHONY: all gz

../docs/mn/stations.htm : stations.htm ../minify_config.json
	-mkdir "../docs/mn"
	copy /y stations.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/mn/stationsnojs.htm : stationsnojs.htm ../minify_config.json
	-mkdir "../docs/mn"
	copy /y stationsnojs.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

stations.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 1

stationsnojs.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 0

../docs/mn/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/mn"
	perl grmp.pl 0

../docs/mn/js/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/mn/js"
	perl grmp.pl 1

grmp.pl : ../minify_config.json

%.gz: %
	del "$(subst /,\,$@)" & "C:\Program Files\7-Zip\7z" a -tgzip $@ $<

%.gz.png: %.gz
	gzthermal $< && move /y gzthermal-result.png $@

clean :
	del stationsnojs.htm
	del stations.htm

package : ../docs/mn/stations.htm ../docs/mn/stationsnojs.htm
	-mkdir "..\tinymta\mn"
	copy /y ..\docs\mn\stations.htm "..\tinymta\mn"
	copy /y ..\docs\mn\stationsnojs.htm "..\tinymta\mn"

#routedatafinal.pl : ../gr2.pl routedata.pl stops.txt
#	perl ../gr2.pl

routedata.pl : trips.txt stop_times.txt ../gr.pl
	perl ../gr.pl

stops.txt trips.txt stop_times.txt : gtfs.zip

gtfs.zip :
	perl ../getgtfs.pl

all: ../docs/mn/stations.htm ../docs/mn/stationsnojs.htm ../docs/mn/rt.htm
all: ../docs/mn/js/rt.htm

gz: ../docs/mn/stations.htm.gz.png ../docs/mn/stations.htm.gz
