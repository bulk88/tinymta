use strict;
use File::Slurp;

my $file = read_file( 'stop.htm', { binmode => ':raw' } );
my $jsfile = read_file( 'stations.js', { binmode => ':raw' } );
my $pos = index($file,'/*STARTINSERT*/
',0);
die "bad starttag match" if $pos == -1;
$pos += length('/*STARTINSERT*/
');
my $endpos = index($file,'
/*ENDINSERT*/', $pos);
die "bad endtag match" if $endpos == -1;
substr($file,$pos, $endpos-$pos, $jsfile);
write_file('stop.htm', {binmode => ':raw'}, $file);
