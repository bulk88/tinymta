#generate routes, usage perl gr.pl > t.txt
use strict;
use Text::CSV::Hashify;
use File::Slurp;
use Data::Dumper;

our $routes1;
do '.\routedata.pl';

$Data::Dumper::Sortkeys = 1;
#use a 17 February 2019 or newer stops.txt, thats the day new stop_ids came out
my $obj = Text::CSV::Hashify->new( {
    file        => 'stops.txt',
    format      => 'hoh',
    key         => "stop_id",
    quote_char          => '"',
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
} );
0;
my $stops= $obj->all;
my %cvttab;

foreach(keys %{$stops}) {
    my $stop = $stops->{$_};
    my @res = $stop->{stop_url} =~ /(\d+)$/;
    #349 GCT has no legacy station ID
    if (@res) {
        if (! defined $1 || ! defined $_ || ! length $_ || ! length $1) {
            $DB::single = 1;
            warn "found invalid newID $_ for oldID $1";
        }
        $cvttab{$1} = $_;
    } else {
        warn "newID $_ has no legacy oldID"
    }
}

foreach(keys %{$routes1}) {
    my $routename = $_;
    my $routearr = $routes1->{$routename};
    for(my $i =0; $i < @{$routearr}; $i++) {
        my $oldId = $routearr->[$i];
        my $newId = $cvttab{$oldId};
        if (! defined $newId || $newId eq '349') {
            $DB::single = 1;
            warn "found bad newID $newId for oldId $oldId";
        }
        $routearr->[$i] = $newId;
    }
}

open(RDF, ">", 'routedata.pl')
        || die "$0: can't open routedata.pl for writing: $!";
select(RDF);
binmode(RDF);
$Data::Dumper::Varname = 'routes';
print Dumper($routes1);
