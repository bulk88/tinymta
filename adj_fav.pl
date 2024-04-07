#usage adj_fav.pl
#uses files draw_fav.min.js and fav.js
use strict;
use File::Slurp;
use Cpanel::JSON::XS;
use Encode qw(encode);
#use Devel::Peek;

my $encodelayers = ':utf8:raw';
sub utf16length {
  #my $l =  length(encode('UTF-16LE', $_[0], Encode::FB_CROAK))/2;
  my $l =  length($_[0]);
  #print "l utf8  is". $l."\n";
  #my $u16l =  length(encode('UTF-16LE', $_[0], Encode::FB_CROAK))/2;
  #print "l u16  is". $u16l."\n";
  return $l;
}

my $draw_prefix = '(function(c){var f=';
my $draw_postfix = ';this.fetch?f(c,f):(this.w=function(){f(c,f)})})(';
my $coder = Cpanel::JSON::XS->new->canonical(1)->allow_nonref(1);
my $file = read_file("fav.js", { binmode => $encodelayers } );
#Dump($file);
my $draw_fav = read_file("draw_fav.min.js", { binmode => $encodelayers } );
$draw_fav = $draw_prefix.substr($draw_fav,14,length($draw_fav)-15).$draw_postfix;
my $draw_fav_escaped = $coder->encode($draw_fav);

my $pos = index($file,"/*STARTINSERTDRAW*/\n",0);
die "bad starttag match" if $pos == -1;
$pos += length("/*STARTINSERTDRAW*/\n");
my $endpos = index($file,"\n/*ENDINSERTDRAW*/", $pos);
die "bad endtag match" if $endpos == -1;
substr($file,$pos, $endpos-$pos, $draw_fav_escaped);

$pos = index($file,"function DRAW_VER() { return ",0);
die "bad ver match" if $pos == -1;
$pos += length("function DRAW_VER() { return ");
my $endpos = index($file,";", $pos);
die "bad end ver match" if $endpos == -1;
my $ver = substr($file,$pos, $endpos-$pos)+1;
substr($file,$pos,$endpos-$pos,$ver);

$pos = index($file,"function DRAW_VER_STR() { return \"",0);
die "bad ver S match" if $pos == -1;
$pos += length("function DRAW_VER_STR() { return \"");
my $endpos = index($file,"\";", $pos);
die "bad end ver S match" if $endpos == -1;
substr($file,$pos,$endpos-$pos,$ver);

$pos = index($file,"function DRAW_VER_LEN() { return ",0);
die "bad VL match" if $pos == -1;
$pos += length("function DRAW_VER_LEN() { return ");
my $endpos = index($file,";", $pos);
die "bad end VL match" if $endpos == -1;
substr($file,$pos,$endpos-$pos,length $ver);

$pos = index($file,"function PREFIX_LEN() { return ",0);
die "bad PL match" if $pos == -1;
$pos += length("function PREFIX_LEN() { return ");
my $endpos = index($file,";", $pos);
die "bad end PL match" if $endpos == -1;
substr($file,$pos,$endpos-$pos,utf16length($draw_fav));

write_file("fav.js", {binmode => $encodelayers}, $file);
