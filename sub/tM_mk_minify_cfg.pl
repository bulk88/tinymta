use strict;
use File::Slurp;

my $file = read_file( $ARGV[0], { binmode => ':raw' } );
my $needle =
'
    "mangle": {
'
;

my $rpl =
'
    "mangle": {
      "properties": {"reserved": ["T","GC"]},
'
;

#CSS mini not needed in any other .htm (no CSS or too small and hand mini-ed)
#so keep CSS mini off for all other HTMs for build perf reasons
my $pos = index($file, $needle);
die "bad mini cfg JSON match" if $pos == -1;
substr($file, $pos, length $needle, $rpl);

$needle =
'
    "nameCache": {}
  },
';
$rpl =
'
    "nameCache": {}
  },
  "minifyCSS": true,
';
$pos = index($file, $needle);
die "bad mini cfg JSON match" if $pos == -1;
substr($file, $pos, length $needle, $rpl);

write_file($ARGV[1], {binmode => ':raw'}, $file);
