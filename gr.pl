#generate routes, usage perl gr.pl > t.txt
use Text::CSV::Hashify;
use File::Slurp;
use Cpanel::JSON::XS;
use Data::Dumper;
$Data::Dumper::Sortkeys = 1;

my $obj = Text::CSV::Hashify->new( {
    file        => 'trips.txt',
    format      => 'hoh',
    key         => "trip_id",
    quote_char          => "'",
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
} );

my $triproute= $obj->all;
undef($obj);
foreach(keys %{$triproute}) {
    $$triproute{$_} = $$triproute{$_}{route_id};
}
#print Dumper($triproute);
#exit;

my $filename =  'stop_times.txt';

$obj = Text::CSV::Hashify->new( {
    file        => $filename,
    format      => 'aoh',
    key         => "trip_id",
    quote_char          => "'",
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
} );

$raw = $obj->all;
undef($obj);
my %trips;
my %routes;
foreach(@{$raw}) {
    $trips{$_->{trip_id}}[$_->{stop_sequence}-1] = $_->{stop_id};
}
undef($raw);

foreach(sort keys %trips) {
    #my $route = substr($_,20,3); #wrong this isnt the rider facing letter, Ws are Ns internally for example
    #$route =~ s/\.//g;
    my $route = $$triproute{$_};
    foreach(@{$trips{$_}}) {
        #no N/S postfix
        my $lastletter = substr($_,-1,1);
        if($lastletter eq 'N' || $lastletter eq 'S'){
            substr($_,-1,1, '');
        }
        if(! exists $routes{$route}[0]{$_}) {
            $routes{$route}[0]{$_} = undef;
            push(@{$routes{$route}[1]}, $_);
        }
    }
}
foreach(keys %routes) {
    $routes{$_} = $routes{$_}[1];
}

$Data::Dumper::Varname = 'routes';
write_file( 'routedata.pl', {binmode => ':raw'}, Dumper(\%routes));
