first: all

.PHONY: all MNRR LIRRMKF SUBMKF package

docs/index.htm : index.htm minify_config.json
	copy /y index.htm "$@"
	html-minifier.cmd -c minify_config.json --minify-js -o "$@" "$@"

docs/index.html : docs/index.htm
	copy /y "docs\index.htm" "$@"
	html-minifier.cmd -c minify_config.json --minify-js -o "$@" "$@"

docs/more.htm : more.htm minify_config.json
	copy /y more.htm "$@"
	html-minifier.cmd -c minify_config.json --minify-js -o "$@" "$@"


docs/jsrdt.htm : jsrdt.htm minify_config.json
	copy /y jsrdt.htm "$@"

docs/li/jsrdt.htm : docs/jsrdt.htm
	copy /y "docs\jsrdt.htm" "$@"

docs/dumb.js : dumb.js
	copy /y dumb.js "$@"
	uglifyjs -c -m toplevel -m eval "$@" -o "$@"

docs/1p.js : 1p.js
	copy /y 1p.js "$@"
	uglifyjs -c -m toplevel -m eval "$@" -o "$@"

docs/404.html : 404.html
	copy /y 404.html "$@"

docs/favicon.ico : favicon.ico
	copy /y favicon.ico "$@"

docs/CNAME : CNAME
	copy /y CNAME "$@"

docs/_config.yml : _config.yml
	copy /y _config.yml "$@"

docs/README.md : README.md
	copy /y README.md "$@"

docs/google71e8cfa7440e51ce.html : google71e8cfa7440e51ce.html
	copy /y google71e8cfa7440e51ce.html "$@"

MNRR :
	cd mnr && $(MAKE) all

LIRRMKF:
	cd lirr && $(MAKE) all

SUBMKF:
	cd sub && $(MAKE) all

#make a standalone tinymta for copying to memcard in a smartphone for local running
package: docs\index.htm
	-mkdir "tinymta"
	copy /y docs\index.htm "tinymta"
	cd mnr && $(MAKE) package
	cd lirr && $(MAKE) package
	cd sub && $(MAKE) package

clean :
	cd mnr && $(MAKE) clean
	cd lirr && $(MAKE) clean
	cd sub && $(MAKE) clean

#dev tool target, set F= on cmd line
mini:
	html-minifier.cmd -c minify_config.json -o "$(F)" "$(F)"

docs/ac.appcache : docs/index.htm docs/more.htm docs/404.html docs/favicon.ico
docs/ac.appcache : docs/CNAME docs/README.md docs/_config.yml docs/index.html
docs/ac.appcache : docs/google71e8cfa7440e51ce.html docs/dumb.js docs/jsrdt.htm
docs/ac.appcache : docs/li/jsrdt.htm docs/1p.js
docs/ac.appcache : MNRR LIRRMKF SUBMKF
	perl -e"use File::Slurp; \
	my $$f = read_file('ac.appcache', { binmode => ':raw' }); \
	$$f =~  s/# v .+/\"# v \".localtime()/e;\
	write_file('ac.appcache', {binmode => ':raw'}, $$f);\
	write_file('docs/ac.appcache', {binmode => ':raw'}, $$f);"
	git add docs/ac.appcache
	git add ac.appcache

all: docs/ac.appcache
