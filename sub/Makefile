  first: all

.PHONY: all package gz

stop.htm : routes.txt ../insertcolors.pl
	perl ../insertcolors.pl "SUB" "$@"

stop_.htm : stop.htm ../minify_config.json ../adj_stoppath.pl ../adj_postmini.pl
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/stop_.htm : stop_.htm
	copy /y stop_.htm "$@"

../docs/stop.htm : stop.htm ../minify_config.json ../adj_stoppath.pl ../adj_postmini.pl
	copy /y stop.htm "$@"
	perl ../adj_stoppath.pl "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl ../adj_postmini.pl "$@"

../docs/stopie50.htm : ../docs/stop.htm
	perl -e"use File::Slurp; \
	my $$f=read_file('$<',{binmode=>':raw'});$$f=~s/([,{])(\d+):/$$1\"$$2\":/gs;my $$bn='$(<F)';if($$bn=~/_\.htm$$/){$$bn=substr($$bn,0,-5);$$f=~s/$${bn}\.htm/$${bn}ie50\.htm/gs;}else{$$bn=substr($$bn,0,-4);$$f=~s/$${bn}_\.htm/$${bn}ie50_\.htm/gs;}write_file('$@',{binmode=>':raw'},$$f);"

../docs/stopie50_.htm : ../docs/stop_.htm
	perl -e"use File::Slurp; \
	my $$f=read_file('$<',{binmode=>':raw'});$$f=~s/([,{])(\d+):/$$1\"$$2\":/gs;my $$bn='$(<F)';if($$bn=~/_\.htm$$/){$$bn=substr($$bn,0,-5);$$f=~s/$${bn}\.htm/$${bn}ie50\.htm/gs;}else{$$bn=substr($$bn,0,-4);$$f=~s/$${bn}_\.htm/$${bn}ie50_\.htm/gs;}write_file('$@',{binmode=>':raw'},$$f);"

../docs/stations.htm : stations.htm ../minify_config.json
	copy /y stations.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/stationsnojs.htm : stationsnojs.htm ../minify_config.json
	copy /y stationsnojs.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/plan.htm : plan.htm ../minify_config.json
	copy /y plan.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/plan2.htm : ../docs/plan.htm
	copy /y "..\docs\plan.htm" "$@"

plan2.htm : plan.htm
	copy /y plan.htm "$@"

../docs/planIE.htm : planIE.htm ../minify_config.json
	copy /y planIE.htm "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c ../minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/plan.js : plan.js
	copy /y plan.js "$@"
	uglifyjs -c -m toplevel -m eval --keep-fnames --ie "$@" -o "$@"

../docs/tileMap.htm : tileMap.htm tileMap_minify_config.json adj_tilepath.pl
	copy /y tileMap.htm "$@"
	perl adj_tilepath.pl "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c tileMap_minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)

../docs/bk.png : $(@F)
	copy /y $(@F) "$@"

../docs/ts.gif : $(@F)
	copy /y $(@F) "$@"

../docs/zi.png : $(@F)
	copy /y $(@F) "$@"

../docs/zio.png : $(@F)
	copy /y $(@F) "$@"

../docs/zo.png : $(@F)
	copy /y $(@F) "$@"

../docs/zoo.png : $(@F)
	copy /y $(@F) "$@"

stations.htm : gr3.pl routedatafinal.pl nmapnidsdata.pl
	perl gr3.pl 1 0

stationsnojs.htm : gr3.pl routedatafinal.pl
	perl gr3.pl 0 0

plan.htm :  gr3.pl routedatafinal.pl tripsdb.pl
	perl gr3.pl 0 1

../docs/rt.htm : grmp.pl routedatafinal.pl
	perl grmp.pl 0

../docs/js/rt.htm : grmp.pl routedatafinal.pl
	-mkdir "../docs/js"
	perl grmp.pl 1

nmap_stations.json: nmap_gen1.js
	node nmap_gen1.js

#this is hand edited now
#nmapnidsdata.pl: nmap_gen2.pl nmap_stations.json
#	perl nmap_gen2.pl

grmp.pl : ../minify_config.json

tileMap_minify_config.json: ../minify_config.json tM_mk_minify_cfg.pl
	perl tM_mk_minify_cfg.pl ../minify_config.json tileMap_minify_config.json

#make a standalone tinymta for copying to memcard in a smartphone for local running
package: ..\docs\stations.htm ..\docs\stop.htm ..\docs\stop_.htm
	-mkdir "..\tinymta"
	copy /y ..\docs\stations.htm "..\tinymta"
	copy /y ..\docs\stop.htm "..\tinymta"
	copy /y ..\docs\stop_.htm "..\tinymta"

%.gz: %
	del "$(subst /,\,$@)" & "C:\Program Files\7-Zip\7z" a -tgzip $@ $<

%.gz.png: %.gz
	gzthermal $< && move /y gzthermal-result.png $@

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

../docs/stop.appcache: ../docs/tileMap.htm ../docs/bk.png
../docs/stop.appcache: ../docs/ts.gif ../docs/zi.png
../docs/stop.appcache: ../docs/zio.png ../docs/zo.png
../docs/stop.appcache: ../docs/zoo.png
	perl -e"use File::Slurp; \
	my $$f = read_file('stop.appcache', { binmode => ':raw' }); \
	$$f =~  s/# v .+/\"# v \".localtime()/e;\
	write_file('stop.appcache', {binmode => ':raw'}, $$f);\
	write_file('../docs/stop.appcache', {binmode => ':raw'}, $$f);"
	git add ../docs/stop.appcache
	git add stop.appcache


all: ../docs/stationsnojs.htm ../docs/stations.htm
all: ../docs/stop_.htm ../docs/stop.htm
all: ../docs/stopie50.htm ../docs/stopie50_.htm
all: ../docs/rt.htm ../docs/js/rt.htm ../docs/stop.appcache
#all: ../docs/plan.htm ../docs/plan2.htm ../docs/planIE.htm ../docs/plan.js
#all: plan2.htm

gz: ../docs/stop.htm.gz.png ../docs/stations.htm.gz.png ../docs/tileMap.htm.gz.png
gz: ../docs/stop.htm.gz ../docs/stations.htm.gz ../docs/tileMap.htm.gz
