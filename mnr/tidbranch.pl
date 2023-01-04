#generate branches from train numbers, from trips.txt, usage perl tidbranch.pl
use strict;
use Text::CSV;
use File::Slurp;
use Data::Dumper;

$Data::Dumper::Sortkeys = 1;

my $csv = Text::CSV->new( {
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
    binary => 1,
    quote_char          => '"',
    } )
    or die "Cannot use CSV: ".Text::CSV->error_diag ();

open my $IN, "<", 'trips.txt'
    or die "Unable to open 'trips.txt' for reading";
binmode($IN); #less overhead for getline()

my %col_idx; #const idx table for columns
{
    my $header_ref = $csv->getline($IN);
    #$csv->column_names(@{$header_ref});
    for(0..$#$header_ref) {
        $col_idx{$$header_ref[$_]} = $_;
    }
}
my $triproute = {};


while (my $record = $csv->getline($IN)) {
    my $train_num = $record->[$col_idx{trip_short_name}];
    #remove shuttle buses, they mirror real train numbers
    $train_num =~ s/B//g;
    $train_num = substr(sprintf('%04s',$train_num),0, -2);
    if(!$triproute->{$record->[$col_idx{route_id}]}) {
        $triproute->{$record->[$col_idx{route_id}]} = {};
    }
    $triproute->{$record->[$col_idx{route_id}]}->{$train_num} = 1;
}

%{$triproute->{3}} = (%{$triproute->{3}}, %{$triproute->{4}}, %{$triproute->{5}}, %{$triproute->{6}});
delete $triproute->{4};
delete $triproute->{5};
delete $triproute->{6};
0;
print Dumper($triproute);
#$DB::single = 1;


