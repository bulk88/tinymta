use strict;
use File::Slurp;
use Data::Dumper;
use Text::CSV::Hashify;
$Data::Dumper::Varname = 'stations';
$Data::Dumper::Sortkeys = 1;

my $obj = Text::CSV::Hashify->new( {
    file        => 'stops.txt',
    format      => 'hoh',
    key         => "stop_id",
    quote_char          => '"',
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
} );
my $stops= $obj->all;
undef($obj);
foreach(keys %$stops) {
    #no N/S postfix
    my $lastletter = substr($_,-1,1);
    if($lastletter eq 'N' || $lastletter eq 'S'){
        $stops->{$_} = substr($_,0,-1);
    } else {
        delete $stops->{$_};#less mem, gr2.pl falls back if no override
    }
}

write_file('stations.pl', {binmode => ':raw'}, Dumper($stops));
