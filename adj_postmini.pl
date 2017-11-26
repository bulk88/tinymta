use strict;
use File::Slurp;

my $file = read_file( $ARGV[0], { binmode => ':raw' } );
my $pos = index($file, 'mangleIndex={},mangleIndex.name="mangleIndex"');
die "no start tag" if $pos == -1;

my $endpos = index($file, ';', $pos);
die "no end tag" if $endpos == -1;
$endpos += 1; #mark ; for removal

my $mangleindexstr = substr($file,$pos,$endpos-$pos,'');
my %h = ($mangleindexstr =~ /,(\w+)\.name="(\w+)"/g);
foreach (keys %h) {
    $file =~ s/$h{$_}/$_/g
}

write_file($ARGV[0], {binmode => ':raw'}, $file);