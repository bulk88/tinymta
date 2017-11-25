#generate routes, usage perl gr.pl
use strict;
use Text::CSV;
use File::Slurp;
use Data::Dumper;
#if REALFREQ true don't group >70th percetile (fudging) and dump to disk
#frequency counts
use constant ('REALFREQ' => !!$ENV{REALFREQ});
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

eval '
while (my $record = $csv->getline($IN)) {
    $$triproute{$record->['.$col_idx{trip_id}.']} = [$record->['.$col_idx{route_id}.']
        , $record->['.$col_idx{direction_id}.']];
}
';

$csv = Text::CSV->new( {
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
    binary => 1,
    quote_char          => '"',
    } )
    or die "Cannot use CSV: ".Text::CSV->error_diag ();

open $IN, "<", 'stops.txt'
    or die "Unable to open 'stops.txt' for reading";
binmode($IN); #less overhead for getline()

my %stop_id_translate;

{
    my $header_ref = $csv->getline($IN);
    #$csv->column_names(@{$header_ref});
    my $parent_station_pos;
    my $stop_id_pos;
    for(0..$#$header_ref) {
        if($$header_ref[$_] eq 'parent_station') {
            $parent_station_pos = $_;
        }
        if($$header_ref[$_] eq 'stop_id') {
            $stop_id_pos = $_;
        }
    }
    constant->import('PARENT_STATION' => $parent_station_pos);
    if(defined $parent_station_pos){ #dont iterate if no col
        while (my $record = $csv->getline($IN)) {
            if($record->[$parent_station_pos]) { #no translate if empty string
                $stop_id_translate{$record->[$stop_id_pos]} = $record->[$parent_station_pos];
            }
        }
    }
}


my $filename =  'stop_times.txt';

open $IN, "<", $filename
    or die "Unable to open '$filename' for reading";
binmode($IN); #less overhead for getline()

$csv = Text::CSV->new( {
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
#sub import_stop_times {
    while (my $record = $csv->getline($IN)) {
        $trips{$record->['.$col_idx{trip_id}.']} [$record->['.$col_idx{stop_sequence}.']] =
            '.((defined PARENT_STATION())+0).' && exists $stop_id_translate{$record->['.$col_idx{stop_id}.']}
                ? $stop_id_translate{$record->['.$col_idx{stop_id}.']}
                : $record->['.$col_idx{stop_id}.'];
    }
#}
';
die $@ if $@;
#import_stop_times();
#use B::Concise;
#my $walker = B::Concise::compile('-exec,-src','import_stop_times', \&import_stop_times); # 1
#$walker->();
#exit;
my (%routes, %freqroutes);

foreach(sort keys %trips) { #decrease randomization in psuedo route line per run
    my $tripinfo = $$triproute{$_};
    my $route = \$routes{$tripinfo->[0]}[$tripinfo->[1]]; #0=route_id, 1=direction_id
    unless($$route) {
        $$route = [{},[]];
    }
    $route = $$route;
    foreach(@{$trips{$_}}) {
        next unless $_; #remove stop_sequence holes
        if(! exists $route->[0]{$_}) {
            #split by direction_id (0 and 1)
            #for subway 0 is south to north, 1 is north to south
            push(@{$route->[1]}, $_); #stopid psuedo order
        }
        $route->[0]{$_}++;
    }
}

#de-dup dir_id 0 and dir_id 1
foreach(keys %routes) {
    my(@route, %seen, %freqroute, $maxfreq);
    #loop over array 0 or 1 dir_id
    #by picking 0 first, stations are listed south to north typically
    foreach(@{$routes{$_}}){
        my $s = $_;
        #per stop_id
        foreach(@{$s->[1]}) {
            if(! exists $seen{$_}) {
                push @route, $_;
            }
            my $freq = $seen{$_} += $s->[0]{$_}; #add per dir stop freq count to any dir count
            $maxfreq = $freq if $freq > $maxfreq;
        }
    }
    die "route $_\'s max freq is 0 stops" if $maxfreq == 0;
    #sort by each hash slice key is frequency count, val is stop id array
    #if a station is more stopped at more than 70% of the time
    #just put in max freq routing, 70% was choosen as 71% is E train stopping at
    #Briarwoord/75 Av
    foreach(@route){
        my $freq = $seen{$_};
        push @{$freqroute{REALFREQ ? $freq
                          : $freq/$maxfreq > .7 ? $maxfreq : $freq}}, $_;
    }
    #highest frequency stations first
    @route=();
    foreach( sort {$b <=> $a} keys %freqroute) {
        push @route, @{$freqroute{$_}};
    }
    $routes{$_} = \@route;
    $freqroutes{$_} = \%freqroute if REALFREQ;
}

$Data::Dumper::Varname = 'routes';
write_file( 'routedata.pl', {binmode => ':raw'}, Dumper(\%routes));

if(REALFREQ) {
    $Data::Dumper::Varname = 'freqroutes';
    write_file( 'froutedata.pl', {binmode => ':raw'}, Dumper(\%freqroutes));
}
