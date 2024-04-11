first: all

.PHONY: all MNRR LIRRMKF SUBMKF MNRRgz LIRRMKFgz SUBMKFgz WEATHERICONS package gz

docs/index.htm : index.htm minify_config.json sub/adj_tilepath.pl adj_emoji.pl
	copy /y index.htm "$@"
	perl sub/adj_tilepath.pl "$@"
	html-minifier.cmd --no-include-auto-generated-tags -c minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl adj_emoji.pl "$@"

docs/index.html : docs/index.htm
	copy /y "docs\index.htm" "$@"

WEATHERICONS: docs/0.svg docs/1.svg docs/2.svg docs/3.svg docs/4.svg docs/5.svg docs/6.svg docs/7.svg docs/8.svg docs/9.svg docs/10.svg docs/11.svg docs/12.svg docs/13.svg docs/14.svg docs/15.svg docs/16.svg docs/17.svg docs/18.svg docs/19.svg docs/20.svg docs/21.svg docs/22.svg docs/23.svg docs/24.svg docs/25.svg docs/26.svg docs/27.svg docs/28.svg docs/29.svg docs/30.svg docs/31.svg docs/32.svg docs/33.svg docs/34.svg docs/35.svg docs/36.svg docs/37.svg docs/38.svg docs/39.svg docs/40.svg docs/41.svg docs/42.svg docs/43.svg docs/44.svg docs/45.svg docs/46.svg docs/47.svg docs/0.png docs/1.png docs/2.png docs/3.png docs/4.png docs/5.png docs/6.png docs/7.png docs/8.png docs/9.png docs/10.png docs/11.png docs/12.png docs/13.png docs/14.png docs/15.png docs/16.png docs/17.png docs/18.png docs/19.png docs/20.png docs/21.png docs/22.png docs/23.png docs/24.png docs/25.png docs/26.png docs/27.png docs/28.png docs/29.png docs/30.png docs/31.png docs/32.png docs/33.png docs/34.png docs/35.png docs/36.png docs/37.png docs/38.png docs/39.png docs/40.png docs/41.png docs/42.png docs/43.png docs/44.png docs/45.png docs/46.png docs/47.png

docs/%.svg: w/%.svg svgo.config.js
	svgo "$<" -o "$@"

docs/%.png: w/%.png
	copy /y "$(subst /,\,$<)" "$(subst /,\,$@)"

w/%.png: w/%.svg
	magick convert -debug All "$<" -resize 32x32 "$@"

#docs/more.htm : more.htm minify_config.json
#	copy /y more.htm "$@"
#	html-minifier.cmd -c minify_config.json -o "$@" "$@"

status.htm : sub/routes.txt insertcolors.pl
	perl insertcolors.pl "SUB" "$@" sub/routes.txt

docs/status.htm : status.htm minify_config.json adj_stoppath.pl adj_postmini.pl
	copy /y status.htm "$@"
	perl adj_stoppath.pl "$@" 1
	html-minifier.cmd --no-include-auto-generated-tags -c minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl adj_postmini.pl "$@"

status_.htm : status.htm minify_config.json adj_stoppath.pl adj_postmini.pl
	copy /y status.htm "$@"
	perl adj_stoppath.pl "$@" 1
	html-minifier.cmd --no-include-auto-generated-tags -c minify_config.json -o "$@" "$@" || (del "$@" & cmd /c exit 1)
	perl adj_postmini.pl "$@"

docs/status_.htm : status_.htm
	copy /y status_.htm "$@"

docs/statusie50.htm : docs/status.htm
	perl -e"use File::Slurp; \
	my $$f=read_file('$<',{binmode=>':raw'});$$f=~s/([,{])(\d+):/$$1\"$$2\":/gs;my $$bn='$(<F)';if($$bn=~/_\.htm$$/){$$bn=substr($$bn,0,-5);$$f=~s/$${bn}\.htm/$${bn}ie50\.htm/gs;}else{$$bn=substr($$bn,0,-4);$$f=~s/$${bn}_\.htm/$${bn}ie50_\.htm/gs;}write_file('$@',{binmode=>':raw'},$$f);"

docs/statusie50_.htm : docs/status_.htm
	perl -e"use File::Slurp; \
	my $$f=read_file('$<',{binmode=>':raw'});$$f=~s/([,{])(\d+):/$$1\"$$2\":/gs;my $$bn='$(<F)';if($$bn=~/_\.htm$$/){$$bn=substr($$bn,0,-5);$$f=~s/$${bn}\.htm/$${bn}ie50\.htm/gs;}else{$$bn=substr($$bn,0,-4);$$f=~s/$${bn}_\.htm/$${bn}ie50_\.htm/gs;}write_file('$@',{binmode=>':raw'},$$f);"

docs/jsrdt.htm : jsrdt.htm
	copy /y jsrdt.htm "$@"

docs/li/jsrdt.htm : docs/jsrdt.htm
	copy /y "docs\jsrdt.htm" "$@"

docs/mn/jsrdt.htm : docs/jsrdt.htm
	copy /y "docs\jsrdt.htm" "$@"

docs/dumb.js : dumb.js
	copy /y dumb.js "$@"
	uglifyjs -c -m toplevel -m eval "$@" -o "$@"

docs/1p.js : 1p.js
	copy /y 1p.js "$@"
	uglifyjs -c -m toplevel -m eval "$@" -o "$@"

docs/f.js : f.js adj_del.pl
	copy /y f.js "$@"
	perl adj_del.pl "$@"
	uglifyjs -c -m toplevel -m eval "$@" -o "$@"

draw_fav.js: insertcolors.pl li/routesmodded.txt sub/routes.txt
	perl insertcolors.pl RAIL "$@" li/routesmodded.txt
	perl insertcolors.pl SUB "$@" sub/routes.txt

draw_fav.min.js: draw_fav.js
	uglifyjs -c -m toplevel -m eval "draw_fav.js" -o "draw_fav.min.js"

docs/draw_fav.js: draw_fav.min.js
	copy /y draw_fav.min.js "$@"

docs/as.js: as.js
	copy /y as.js "$@"
	uglifyjs -c -m toplevel -m eval -m reserved=['L'] "$@" -o "$@"

fav.js: draw_fav.min.js adj_fav.pl
	perl adj_fav.pl "$@"

ifav.js: draw_fav.min.js adj_fav.pl
	perl adj_fav.pl "$@"

docs/fav.js : fav.js
	copy /y fav.js "$@"
	uglifyjs -c -m toplevel -m eval -m reserved=['L'] "$@" -o "$@"

docs/ifav.js : ifav.js
	copy /y ifav.js "$@"
	uglifyjs -c -m toplevel -m eval "$@" -o "$@"

docs/404.html : 404.html
	copy /y 404.html "$@"

docs/favicon.ico : favicon.ico
	copy /y favicon.ico "$@"

docs/ht.png : ht.png
	copy /y ht.png "$@"

#hand minified, don't let make tool touch it
#docs/hg.svg : hg.svg
#	copy /y hg.svg "$@"

docs/hg.png : hg.png
	copy /y hg.png "$@"

docs/dp.png : dp.png
	copy /y dp.png "$@"

docs/CNAME : CNAME
	copy /y CNAME "$@"

docs/_config.yml : _config.yml
	copy /y _config.yml "$@"

docs/abt.md : README.md
	copy /y README.md "$@"

docs/google71e8cfa7440e51ce.html : google71e8cfa7440e51ce.html
	copy /y google71e8cfa7440e51ce.html "$@"

cloudflare_as_name.js:  li/stations.js li/insertstalist.pl insertcolors.pl li/routesmodded.txt sub/routes.txt
	cd li & perl insertstalist.pl "..\cloudflare_as_name.js"
	perl insertcolors.pl RAIL "$@" li/routesmodded.txt
	perl insertcolors.pl SUB "$@" sub/routes.txt

cloudflare_as_name.min.js : cloudflare_as_name.js
	copy /y cloudflare_as_name.js "$@"
#a regex on minifed code can be created
#	terser -c -m toplevel -m "reserved=['routesEtag','gRoutes']" -m eval "$@" -o "$@"
	terser -c -m toplevel -m eval "$@" -o "$@"

routes.js :
	perl -e"use File::Slurp;my $$file=read_file(\
	'cloudflare_as_name.min.js',{binmode=>':raw'});\
	$$file=~/='(var R;[^']+)'/;write_file('routes.js',{binmod =>':raw'},$$1)";


MNRR :
	cd mn && $(MAKE) all

LIRRMKF:
	cd li && $(MAKE) all

SUBMKF:
	cd sub && $(MAKE) all

MNRRgz :
	cd mn && $(MAKE) gz

LIRRMKFgz:
	cd li && $(MAKE) gz

SUBMKFgz:
	cd sub && $(MAKE) gz

#make a standalone tinymta for copying to memcard in a smartphone for local running
package: docs\index.htm
	-mkdir "tinymta"
	copy /y docs\index.htm "tinymta"
	cd mn && $(MAKE) package
	cd li && $(MAKE) package
	cd sub && $(MAKE) package

#Github Pages/Fastly's wire gz format can't be reproduced length for
#length/byte count, CF's gz byte count is identical to the non-standard GHP
#byte count, per CF spec, its no recompression, anyways 7z -mx=3 is larger
#than GHP  1071 vs 1069, mx=5 is smaller 1062 vs 1069, just leave 7z at default
#local wire bytes "probably" help remote wire bytes, but no way to locally
#reproduced GHP's gz algo
%.gz: %
	del "$(subst /,\,$@)" & "C:\Program Files\7-Zip\7z" a -tgzip $@ $<

%.gz.png: %.gz
	gzthermal $< && move /y gzthermal-result.png $@

clean :
	cd mn && $(MAKE) clean
	cd li && $(MAKE) clean
	cd sub && $(MAKE) clean

#dev tool target, set F= on cmd line
mini:
	html-minifier.cmd -c minify_config.json -o "$(F)" "$(F)"

docs/ac.appcache : docs/index.htm docs/404.html docs/favicon.ico
docs/ac.appcache : docs/CNAME docs/abt.md docs/_config.yml docs/index.html
docs/ac.appcache : docs/google71e8cfa7440e51ce.html docs/dumb.js docs/jsrdt.htm
docs/ac.appcache : docs/li/jsrdt.htm docs/1p.js docs/status.htm docs/status_.htm
docs/ac.appcache : docs/statusie50.htm docs/statusie50_.htm
docs/ac.appcache : docs/f.js docs/mn/jsrdt.htm docs/fav.js docs/ifav.js
docs/ac.appcache : docs/ht.png docs/hg.svg docs/dp.png
docs/ac.appcache : docs/hg.png docs/draw_fav.js docs/as.js
docs/ac.appcache : MNRR LIRRMKF SUBMKF WEATHERICONS
	perl -e"use File::Slurp; \
	my $$f = read_file('ac.appcache', { binmode => ':raw' }); \
	$$f =~  s/# v .+/\"# v \".localtime()/e;\
	write_file('ac.appcache', {binmode => ':raw'}, $$f);\
	write_file('docs/ac.appcache', {binmode => ':raw'}, $$f);"
	git add docs/ac.appcache
	git add ac.appcache

all: docs/ac.appcache cloudflare_as_name.min.js

gz: docs/index.htm.gz.png docs/status.htm.gz.png
gz: docs/index.htm.gz docs/status.htm.gz
gz: routes.js.gz routes.js.gz.png docs/f.js.gz docs/1p.js.gz
gz: docs/dumb.js.gz docs/f.js.gz.png docs/1p.js.gz.png docs/dumb.js.gz.png
gz: docs/fav.js.gz docs/fav.js.gz.png docs/ifav.js.gz docs/ifav.js.gz.png
gz: docs/as.js.gz docs/as.js.gz.png
gz: MNRRgz LIRRMKFgz SUBMKFgz

