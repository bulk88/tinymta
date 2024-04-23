system('gmake gz');
my @a = qw(
  ./docs/index.htm
  ./docs/status.htm
  ./docs/rstop.htm
  ./docs/rtrain.htm
  ./docs/stop.htm
  ./docs/stations.htm
  ./docs/li/stations.htm
  ./docs/mn/stations.htm
  ./docs/tileMap.htm
  routes.js
  ./docs/f.js
  ./docs/fav.js
  ./docs/ifav.js
  ./docs/1p.js
  ./docs/dumb.js
  ./docs/as.js
);

foreach(@a) {
  printf "%-22s uc %5s gz %4s\n", $_, -s $_, -s $_.".gz";
}

