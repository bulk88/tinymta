#generate routes, usage perl gr.pl
use Text::CSV::Hashify;
use File::Slurp;
use Data::Dumper;
$Data::Dumper::Sortkeys = 1;

my $obj = Text::CSV::Hashify->new( {
    file        => 'trips.txt',
    format      => 'hoh',
    key         => "trip_id",
    quote_char          => '"',
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
} );

my $triproute= $obj->all;
undef($obj);
foreach(keys %{$triproute}) {
    $$triproute{$_} = $$triproute{$_}{route_id};
}

my $filename =  'stop_times.txt';

open my $IN, "<", $filename
    or die "Unable to open '$filename' for reading";
binmode($IN); #less overhead for getline()

my $csv = Text::CSV->new( {
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
    binary => 1,
    quote_char          => '"',
    } )
    or die "Cannot use CSV: ".Text::CSV->error_diag ();

my %col_idx; #const idx table for columns
{
    my $header_ref = $csv->getline($IN);
    #$csv->column_names(@{$header_ref});
    for(0..$#$header_ref) {
        $col_idx{$$header_ref[$_]} = $_
    }
}
my %trips; #embed integer constants in array looks
eval '
while (my $record = $csv->getline($IN)) {
    $trips{$record->['.$col_idx{trip_id}.']} [$record->['.$col_idx{stop_sequence}.']] = $record->['.$col_idx{stop_id}.'];
}
';
die $@ if $@;

my %routes;

foreach(sort keys %trips) { #decrease randomization in psuedo route line per run
    my $route = \$routes{$$triproute{$_}};
    unless($$route) {
        $$route = [{},[]];
    }
    $route = $$route;
    foreach(@{$trips{$_}}) {
        next unless $_; #remove stop_sequence holes
        if(! exists $route->[0]{$_}) {
            $route->[0]{$_} = undef; #seen stopid before on route
            push(@{$route->[1]}, $_); #stopid psuedo order
        }
    }
}
#eliminate stopid seen hash
foreach(keys %routes) {
    $routes{$_} = $routes{$_}[1];
}

$Data::Dumper::Varname = 'routes';
write_file( 'routedata.pl', {binmode => ':raw'}, Dumper(\%routes));
