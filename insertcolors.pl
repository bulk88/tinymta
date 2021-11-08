# usage: mand-foo.htm optional-routes.txt
use strict;
use File::Slurp;
use Text::CSV::Hashify;
use Cpanel::JSON::XS;
my $obj = Text::CSV::Hashify->new( {
    file        => $ARGV[1] ? $ARGV[1] : 'routes.txt',
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

my $file = read_file( $ARGV[0], { binmode => ':raw' } );
my $pos = index($file,'/*STARTCOLOR*/
',0);
die "bad starttag match" if $pos == -1;
$pos += length('/*STARTCOLOR*/
');
my $endpos = index($file,'
/*ENDCOLOR*/', $pos);
die "bad endtag match" if $endpos == -1;
substr($file,$pos, $endpos-$pos, $coder->encode(\%colors));
write_file($ARGV[0], {binmode => ':raw'}, $file);

