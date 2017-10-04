.PHONY: all

docs/stop_.htm docs/stop.htm stop_.htm : stop.htm
    copy /y stop.htm "$@"
    html-minifier --collapse-boolean-attributes --collapse-whitespace \
    --html5 --remove-attribute-quotes --remove-comments \
    --remove-empty-attributes --remove-optional-tags \
    --remove-redundant-attributes --remove-script-type-attributes \
    --remove-style-link-type-attributes --remove-tag-whitespace \
    --sort-attributes --sort-class-name --trim-custom-fragments \
    --use-short-doctype --minify-js -o "$@" "$@"

docs/stations.htm : stations.htm
    copy /y stations.htm "$@"

docs/index.htm : index.htm
    copy /y index.htm "$@"

docs/404.html : 404.html
    copy /y 404.html "$@"

docs/favicon.ico : favicon.ico
    copy /y favicon.ico "$@"

docs/CNAME : CNAME
    copy /y CNAME "$@"

docs/README.md : README.md
    copy /y README.md "$@"

docs/stationsnojs.htm : stationsnojs.htm
    copy /y stationsnojs.htm "$@"

stations.htm : gr3.pl routedatafinal.pl
    perl gr3.pl 1

stationsnojs.htm : gr3.pl routedatafinal.pl
    perl gr3.pl 0

docs/rt.htm : grmp.pl routedatafinal.pl
    perl grmp.pl 0 0

docs/js/rt.htm : grmp.pl routedatafinal.pl
    perl grmp.pl 1 0

docs/raw/rt.htm : grmp.pl routedatafinal.pl
    perl grmp.pl 0 1

all: docs/rt.htm docs/stationsnojs.htm docs/index.htm docs/stations.htm
all: docs/stop_.htm docs/stop.htm stop_.htm docs/404.html docs/favicon.ico
all: docs/CNAME docs/js/rt.htm docs/raw/rt.htm docs/README.md

