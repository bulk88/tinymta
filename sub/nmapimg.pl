
@maps = qw (
Manhattan
);

foreach my $map (@maps) {
  foreach my $zoom (qw(16)) {
    foreach my $x (0..200) {
    foreach my $y (0..200) {
    my $filename = '/neighborhoodMaps/'.$map.'/'.$zoom . "_" . $x . "_" . $y . ".png";
    my $cmd = 'curl "http://web.mta.info'.$filename.'"   -H "Referer: http://web.mta.info/weekender/tileMap.html?staID=10123"     --compressed --insecure --create-dirs --output ..'.$filename;
    #print $cmd."\n";
    #system('pause');
    system($cmd);
    }
    }
  }
}
  