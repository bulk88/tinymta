#downloads/checks for update the gtfs file in CWD
#mtimes on .txt files will only change if mtime in HTTP header from server changed
use strict;
use Cpanel::JSON::XS;
use HTTP::Tiny;
use File::Slurp;

my $http = HTTP::Tiny->new(
    agent => 'Mozilla/5.0 (Windows NT 5.1; rv:41.0) Gecko/20100101 Firefox/41.0'
);
my $coder = Cpanel::JSON::XS->new->ascii->canonical(1);
my $cfg = $coder->decode(scalar(read_file( 'cfg.json', { binmode => ':raw' } )));
die "feed_url not set" unless $cfg->{feed_url};
my $response = $http->mirror($cfg->{feed_url}, 'gtfs.zip');
die "couldn't fetch GTFS url \"".$cfg->{feed_url}."\" code: ".$response->{status}
    unless $response->{success};
if($response->{status} != 304) { #not modified
    require Archive::Extract; #dont bother loading
    my $ae = Archive::Extract->new( archive => 'gtfs.zip' );
    unless($ae->extract){
        unlink $_ foreach qw (
gtfs.zip
agency.txt
stops.txt
routes.txt
trips.txt
stop_times.txt
calendar.txt
calendar_dates.txt
fare_attributes.txt
fare_rules.txt
shapes.txt
frequencies.txt
transfers.txt
feed_info.txt
);
        die $ae->error;
    }
}
