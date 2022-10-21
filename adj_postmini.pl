use strict;
use File::Slurp;
use List::Util qw(min);

my $file = read_file( $ARGV[0], { binmode => ':raw' } );
my $pos = index($file, 'mangleIndex={name:"mangleIndex"}');
die "no start tag" if $pos == -1;

#status.htm has "," pattern
my $endpos = min(index($file, ';', $pos),index($file, '","', $pos));
die "no end tag" if $endpos == -1;
$endpos += 1; #mark ; for removal

my $mangleindexstr = substr($file,$pos,$endpos-$pos,'');
my %h = ($mangleindexstr =~ /,(\w+)\.name="(\w+)"/g);
foreach (keys %h) {
    $file =~ s/$h{$_}/$_/g
}

#status.htm fix
$file =~ s/\(,("[^"]+")\)/\1/;
$file =~ s/lodash\.js>/lodash.min.js>/;
write_file($ARGV[0], {binmode => ':raw'}, $file);