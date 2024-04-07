#usage adj_fav.pl [filename.js]
#uses files draw_fav.min.js and fav.js
use strict;
use File::Slurp;
use Cpanel::JSON::XS;
use Encode qw(encode);
use Devel::Peek;

my $encodelayers = ':unix:encoding(UTF-8)';
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
my $file = read_file($ARGV[0], { binmode => $encodelayers } );
my $draw_fav = read_file("draw_fav.min.js", { binmode => $encodelayers } );
#Dump($draw_fav);
$draw_fav = $draw_prefix.substr($draw_fav,14,length($draw_fav)-15).$draw_postfix;
my $draw_fav_escaped = $coder->encode($draw_fav);

my $ver;
my $endpos;
my $pos = index($file,"/*STARTINSERTDRAW*/\n",0);
if($pos != -1) {
  print $pos;
  $pos += length("/*STARTINSERTDRAW*/\n");
  $endpos = index($file,"\n/*ENDINSERTDRAW*/", $pos);
  die "bad endtag match" if $endpos == -1;
  substr($file,$pos, $endpos-$pos, $draw_fav_escaped);
}

$pos = index($file,"function DRAW_VER() { return ",0);
if($pos != -1) {
  $pos += length("function DRAW_VER() { return ");
  $endpos = index($file,";", $pos);
  die "bad end ver match" if $endpos == -1;
  $ver = substr($file,$pos, $endpos-$pos)+1;
  substr($file,$pos,$endpos-$pos,$ver);
}

$pos = index($file,"function DRAW_VER_STR() { return \"",0);
if($pos != -1) {
  $pos += length("function DRAW_VER_STR() { return \"");
  $endpos = index($file,"\";", $pos);
  die "bad end ver S match" if $endpos == -1;
  substr($file,$pos,$endpos-$pos,$ver);
}

$pos = index($file,"function DRAW_VER_LEN() { return ",0);
if($pos != -1) {
  $pos += length("function DRAW_VER_LEN() { return ");
  $endpos = index($file,";", $pos);
  die "bad end VL match" if $endpos == -1;
  substr($file,$pos,$endpos-$pos,length $ver);
}

$pos = index($file,"function PREFIX_LEN() { return ",0);
if($pos != -1) {
  $pos += length("function PREFIX_LEN() { return ");
  $endpos = index($file,";", $pos);
  die "bad end PL match" if $endpos == -1;
  substr($file,$pos,$endpos-$pos,utf16length($draw_fav));
}

write_file($ARGV[0], {binmode => $encodelayers}, $file);
