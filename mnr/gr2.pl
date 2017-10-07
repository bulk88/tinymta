#generate routes, usage perl gr.pl > t.txt
use strict;
use Text::CSV::Hashify;
use File::Slurp;
use Cpanel::JSON::XS;
use Data::Dumper;
use HTTP::Tiny;
use Time::HiRes 'sleep';

our $routes1;
do 'routedata.pl';
$Data::Dumper::Sortkeys = 1;
my $obj = Text::CSV::Hashify->new( {
    file        => 'stops.txt',
    format      => 'hoh',
    key         => "stop_id",
    quote_char          => "'",
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
} );

my $stops= $obj->all;
undef($obj);
my $http = HTTP::Tiny->new(
    agent => 'Mozilla/5.0 (Windows NT 5.1; rv:41.0) Gecko/20100101 Firefox/41.0'
);
my $coder = Cpanel::JSON::XS->new->ascii->canonical(1);

my %countytable = ('Queens County' => 'Queens',
                   'New York County' => 'Manhattan',
                   'Bronx County' => 'Bronx',
                   'Kings County' => 'Brooklyn',
                   'Richmond County' => 'Staten Island',
                   'Fairfield County' => 'Fairfield',
                   'Middlesex County' => 'Middlesex',
                   'Putnam County'  => 'Putnam',
                   'Westchester County' => 'Westchester',
                   'New Haven County' => 'New Haven',
                   'Dutchess County' => 'Dutchess',
                   'Rockland County' => 'Rockland',
                   'New London County' => 'New London',
                   'Orange County' => 'Orange',
                   
                   );
my $reqattempt_cnt = 0;
my $req_cnt = 0;
my $stop_cnt = keys %{$stops};
foreach(keys %{$stops}) {
    next if exists $$stops{$_}{borough};
    my $url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='.
        $$stops{$_}{stop_lat} .','. $$stops{$_}{stop_lon} .'&sensor=false';
    my $response;
    my $geocode_result;
    my $one_stopid_retries = 0;
    do {
        $reqattempt_cnt++;
        $one_stopid_retries++;
        sleep .2;
        $response = $http->get($url);
        die "google geocode failed" if ! $response->{success};
        $geocode_result = $coder->decode($response->{content});
    } while ($one_stopid_retries < 20
            && ($geocode_result->{status} eq 'OVER_QUERY_LIMIT' || $geocode_result->{status} eq 'ZERO_RESULTS')
    );
    $req_cnt++;

    my $county_count = 0;
    my $county;
    foreach(@{$geocode_result->{results}}) {
        my $geotype = $_->{types}[0];
        if($geotype eq 'administrative_area_level_2'){ #a county in USA according to google
            $county_count++;
            $county = $_->{address_components}->[0]{long_name};
        }
    }
    if($county_count == 0){ #no root county place name, try to find county fragment in a more exact street addr
        foreach(@{$geocode_result->{results}[0]{address_components}}) {
            my $geotype = $_->{types}[0];
            if($geotype eq 'administrative_area_level_2'){ #a county in USA according to google
                $county_count++;
                $county = $_->{long_name};
            }
        }
    }

    if($county_count != 1){
        $DB::single = 1;
        print Dumper($_, $geocode_result);
        die "more than 1 county or no county";    
    }
    
    die "unknown county |$county|" if ! exists $countytable{$county};
    my $borough = $countytable{$county};

    #avoid 2 geocodes per station, do root, N and S stop_ids at same time
    if(substr($_,-1,1) eq 'S' || substr($_,-1,1) eq 'N'){
        substr($_,-1,1,'');
    }
    $$stops{$_}{borough} = $borough;
    if(exists $$stops{$_.'N'} && ! exists $$stops{$_.'N'}{borough}) {
       $$stops{$_.'N'}{borough} = $borough;
    }
    if(exists $$stops{$_.'S'} && ! exists $$stops{$_.'S'}{borough}) {
       $$stops{$_.'S'}{borough} = $borough;
    }

    0;
}

foreach(keys %{$routes1}) {
    0;
    my $route = ${$routes1}{$_};
    foreach(0..(scalar(@{$route})-1)) {
        my $stop_id = $$route[$_];
        $$route[$_] = {'stop_id' => $stop_id, 'name' => $$stops{$stop_id}{stop_name},
                       'lat' => $$stops{$stop_id}{stop_lat},
                       'lon' => $$stops{$stop_id}{stop_lon},
                       'borough' => $$stops{$stop_id}{borough}};
    }
}

open(RDF, ">", 'routedatafinal.pl')
        || die "$0: can't open routedatafinal.pl for writing: $!";
select(RDF);
binmode(RDF);
print Dumper($routes1);
