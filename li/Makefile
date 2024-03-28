first: all

.PHONY: all clean gz

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

../rtrain.htm : stations.js insertstalist.pl ../insertcolors.pl routesmoddednodups.txt
	perl insertstalist.pl "$@"
	perl ../insertcolors.pl RAIL "$@" routesmoddednodups.txt 1

#stations.js: mkstalist.pl
#	perl mkstalist.pl

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

../docs/rstopie50.htm : ../docs/rstop.htm
	perl -e"use File::Slurp; \
	my $$f = read_file('$<', { binmode => ':raw' }); \
	$$f =~  s/([,{])(\d+):/$$1\"$$2\":/gs; \
	my $$bn = '$(<F)'; \
	if($$bn =~ /_\.htm$$/) { \
	  $$bn = substr($$bn,0,-5); \
	  $$f =~  s/$${bn}\.htm/$${bn}ie50\.htm/gs; \
	} else { \
	  $$bn = substr($$bn,0,-4); \
	  $$f =~  s/$${bn}_\.htm/$${bn}ie50_\.htm/gs; \
	} write_file('$@', {binmode => ':raw'}, $$f);"

../docs/rstopie50_.htm : ../docs/rstop_.htm
	perl -e"use File::Slurp; \
	my $$f = read_file('$<', { binmode => ':raw' }); \
	$$f =~  s/([,{])(\d+):/$$1\"$$2\":/gs; \
	my $$bn = '$(<F)'; \
	if($$bn =~ /_\.htm$$/) { \
	  $$bn = substr($$bn,0,-5); \
	  $$f =~  s/$${bn}\.htm/$${bn}ie50\.htm/gs; \
	} else { \
	  $$bn = substr($$bn,0,-4); \
	  $$f =~  s/$${bn}_\.htm/$${bn}ie50_\.htm/gs; \
	} write_file('$@', {binmode => ':raw'}, $$f);"

../rtrain_.htm : ../rtrain.htm ../minify_config.json ../adj_stoppath.pl ../adj_postmini.pl
	copy /y "..\rtrain.htm" "$@"
	perl ../adj_stoppath.pl "$@" 2
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/rtrain_.htm : ../rtrain_.htm
	-mkdir "../docs"
	copy /y "..\rtrain_.htm" "$@"

../docs/rtrain.htm : ../rtrain.htm ../minify_config.json ../adj_stoppath.pl ../adj_postmini.pl
	-mkdir "../docs"
	copy /y "..\rtrain.htm" "$@"
	perl ../adj_stoppath.pl "$@" 2
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"
  



grmp.pl : ../minify_config.json

%.gz: %
	del "$(subst /,\,$@)" & "C:\Program Files\7-Zip\7z" a -tgzip $@ $<

%.gz.png: %.gz
	gzthermal $< && move /y gzthermal-result.png $@

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

#routedatafinal.pl : ../gr2.pl routedata.pl stops.txt
#	perl ../gr2.pl

routedata.pl : trips.txt stop_times.txt ../gr.pl
	perl ../gr.pl

stops.txt trips.txt stop_times.txt : gtfs.zip

gtfs.zip :
	perl ../getgtfs.pl

all: ../docs/li/stations.htm ../docs/li/stationsnojs.htm
all: ../docs/rstop_.htm ../docs/rstop.htm ../docs/li/rt.htm
all: ../docs/li/js/rt.htm ../docs/rtrain_.htm ../docs/rtrain.htm
all: ../docs/rstopie50_.htm ../docs/rstopie50.htm

gz: ../docs/li/stations.htm.gz.png ../docs/li/stations.htm.gz
gz: ../docs/rstop.htm.gz ../docs/rtrain.htm.gz
gz: ../docs/rstop.htm.gz.png ../docs/rtrain.htm.gz.png
