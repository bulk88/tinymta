# usage: mand-TAG mand-foo.htm optional-routes.txt
use strict;
use File::Slurp;
use Text::CSV::Hashify;
use JSON::PP;
my $tag = $ARGV[0];
my $obj = Text::CSV::Hashify->new( {
    file        => $ARGV[2] ? $ARGV[2] : 'routes.txt',
    format      => 'hoh',
    key         => "route_id",
    quote_char          => '"',
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
} );
my %colors;
my $routes = $obj->all;
my $coder = JSON::PP->new->ascii->sort_by(sub {
  my $a = $JSON::PP::a;
  my $b = $JSON::PP::b;
  #sort by value first, if value same,then key (route) name
  return $_[0]->{$a} eq $_[0]->{$b} ? $a cmp $b : $_[0]->{$a} cmp $_[0]->{$b};
  });
foreach(keys %$routes) {
    my $color = $routes->{$_}{route_color};
    if(length $color){
        #optimize to 3 digit hex color, only J/Z pass right now
        #decided to not "round" the colors of the other routes
        #REMOVED OPTIMIZATION <font color=E67> invalid for font tag
        #but valid for <span style=color:, egh, dont want to upgrade whole
        #code base and since J/Z only lines, with this optimizatoin, longer tag
        #template in JS wont win vs jus 2 lines of wire bytes of color IMO
        #if (substr($color,0,1) eq substr($color,1,1)
        #    && substr($color,2,1) eq substr($color,3,1)
        #    && substr($color,4,1) eq substr($color,5,1)) {
        #    $color = substr($color,1,1).substr($color,3,1).substr($color,5,1);
        #}

        $colors{$_} = lc($color);
    } else {
        #JS code knows a hole means skip font tag
        #$colors{$_} = '000000';
    }
}

my $file = read_file( $ARGV[1], { binmode => ':raw' } );
my $pos = index($file,"/*START".$tag."COLOR*/
",0);
die "bad starttag match" if $pos == -1;
$pos += length("/*START".$tag."COLOR*/
");
my $endpos = index($file,"
/*END".$tag."COLOR*/", $pos);
die "bad endtag match" if $endpos == -1;
substr($file,$pos, $endpos-$pos, $coder->encode(\%colors));
write_file($ARGV[1], {binmode => ':raw'}, $file);

