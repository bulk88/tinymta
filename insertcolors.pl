# usage: mand-TAG mand-foo.htm optional-routes.txt
use strict;
use File::Slurp;
use Text::CSV::Hashify;
use Cpanel::JSON::XS;
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
my $coder = Cpanel::JSON::XS->new->ascii->canonical(1);
foreach(keys %$routes) {
    my $color = $routes->{$_}{route_color};
    if(length $color){ 
        $colors{$_} = $color;
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

