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
#var r = await fetch("https://backend-unified.mylirr.org/infrastructure", {headers: {'accept-version':'1.5'}});r=await r.json(); var s={}; r.stations.forEach(function(sta) {s[sta.code]=sta.name}); s;

my $http = HTTP::Tiny->new(
    agent => 'Mozilla/5.0 (Windows NT 5.1; rv:41.0) Gecko/20100101 Firefox/41.0'
);
my $coder = Cpanel::JSON::XS->new->ascii->canonical(1);

$response = $http->get('https://backend-unified.mylirr.org/infrastructure' ,{headers => {"accept-version" => '1.5'}});
die "http req failed" if ! $response->{success};
$result = $coder->decode($response->{content});


my $stations = $result->{stations};
foreach my $sta (@$stations) {
    $stajs{$sta->{code}} = $sta->{name};
}
write_file('stations.js', {binmode => ':raw'}, 'var s='.$coder->encode(\%stajs).';');
