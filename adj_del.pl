#usage adj_del.pl foo.htm
use strict;
use File::Slurp;

my $file = read_file( $ARGV[0], { binmode => ':raw' } );
$file =~ s/\Q\/*STARTDELETE*\/\E.*?\Q\/*ENDDELETE*\/\E//gs;
write_file($ARGV[0], {binmode => ':raw'}, $file);
