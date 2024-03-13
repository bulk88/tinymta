#usage adj_fav.pl
#uses files draw_fav.min.js and fav.js
use strict;
use File::Slurp;
use Cpanel::JSON::XS;

my $coder = Cpanel::JSON::XS->new->canonical(1)->allow_nonref(1);
my $file = read_file("fav.js", { binmode => ':utf8 :raw' } );
my $draw_fav = read_file("draw_fav.min.js", { binmode => ':utf8 :raw' } );
$draw_fav = $coder->encode($draw_fav);
my $pos = index($file,"/*STARTINSERTDRAW*/\n",0);
die "bad starttag match" if $pos == -1;
$pos += length("/*STARTINSERTDRAW*/\n");
my $endpos = index($file,"\n/*ENDINSERTDRAW*/", $pos);
die "bad endtag match" if $endpos == -1;
substr($file,$pos, $endpos-$pos, $draw_fav);
write_file("fav.js", {binmode => ':utf8 :raw'}, $file);
