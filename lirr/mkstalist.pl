use strict;
use Cpanel::JSON::XS;
use HTTP::Tiny;
use File::Slurp;
use Data::Dumper;
use HTTP::Tiny;
$Data::Dumper::Varname = 'stations';
$Data::Dumper::Sortkeys = 1;
my $response;
my $result;
my %stajs; #ABBR to Full
my %stapl; #GTFS (0 and up numbers) to ABBR (3 letter code)

my $http = HTTP::Tiny->new(
    agent => 'Mozilla/5.0 (Windows NT 5.1; rv:41.0) Gecko/20100101 Firefox/41.0'
);
my $coder = Cpanel::JSON::XS->new->ascii->canonical(1);

$response = $http->get('https://traintime.lirr.org/api/StationsAll');
die "http req failed" if ! $response->{success};
$result = $coder->decode($response->{content});
my $stations = $result->{Stations};
foreach my $key (keys %$stations) {
    my $sta = $stations->{$key};
    $stajs{$sta->{ABBR}} = $sta->{NAME};
    $stapl{$key} = $sta->{ABBR};
}
write_file('stations.js', {binmode => ':raw'}, 'var s='.$coder->encode(\%stajs).';');
write_file('stations.pl', {binmode => ':raw'}, Dumper(\%stapl));
