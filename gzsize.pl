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
);

foreach(@a) {
  printf "%-22s uc %5s gz %4s\n", $_, -s $_, -s $_.".gz";
}

