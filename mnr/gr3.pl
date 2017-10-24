#generate routes, usage perl gr.pl > t.txt
use strict;
use Data::Dumper;

my %borotbl = ( 'Queens' => 'Q',
                'Manhattan' => 'M',
                'Bronx' => 'B',
                'Brooklyn' => 'K',
                   'Fairfield' => 'F',
                   'Middlesex' => 'S',
                   'Putnam'  => 'P',
                   'Westchester' => 'W',
                   'New Haven' => 'H',
                   'Dutchess' => 'D',
                   'Rockland' => 'R',
                   'New London' => 'L',
                   'Orange' => 'O',
            );
my @rtnum_to_rtname = ('empty', 'Hudson', 'Harlem', 'New Haven', 'New Canaan', 'Danbury', 'Waterbury');

die "1st arg must be generate desktop MTA site stations or mobilized MTA site stations " if ! defined $ARGV[0];
my $mob = $ARGV[0];
our $VAR1;
do 'routedatafinal.pl';
my @lineshtml;
my @linesboroughhtml;
my @linestopshtml;

open(HTMLFILE, ">", ($mob ? 'stationsmob.htm' : 'stations.htm'))
        || die "$0: can't open stations.htm for writing: $!";
select(HTMLFILE);
binmode(HTMLFILE);
print #mobileoptimized for IE Mobile 6 text wrapping/zoom behavior, otherwise route names dont wrap and scrolling required
#a tiny bit of CSS needed so the buttons dont waste vertical space with 16px margin
$mob ?
'<html><head><meta name="mobileoptimized" content="0"></head><body><style>form{margin-bottom:0px;margin-top:0px;}</style><a name="#">
':'<html><head><meta name="mobileoptimized" content="0"></head><body><a name="#">
';
foreach my $routename (sort keys %$VAR1) {
    my $route = $$VAR1{$routename};
    my $rtnum = $routename;
    $routename = $rtnum_to_rtname[$routename];
    my %boroughs;
    foreach my $stopidx (0..@$route-1) {
        my $stop = $$route[$stopidx];
        my $borough = $stop->{borough};
        push(@{$boroughs{$borough}}, {name => $stop->{name}, stop => $stop->{stop_id}});
    }
    if(keys %boroughs > 1) {
        push(@lineshtml, '<a href="#'.$rtnum.'">'.$routename.'</a>');
    } else {
        push(@lineshtml, '<a href="#'.$rtnum.$borotbl{(keys %boroughs)[0]}.'">&nbsp;'.$routename.'&nbsp;</a>');
    }
    my $line = "<a name=\"$rtnum\">$routename:";
    foreach my $borough (sort keys %boroughs) {
        $line .= ' <a href="#'.$rtnum.$borotbl{$borough}.'">'.$borough.'</a>';
        push(@linestopshtml, "$routename: $borough <a name=\"".$rtnum.$borotbl{$borough}."\" href=\"#\">Home</a>");
        foreach my $stopidx (0..@{$boroughs{$borough}}-1) {
            my $name = ${$boroughs{$borough}}[$stopidx]->{name};
            my $stopid = ${$boroughs{$borough}}[$stopidx]->{stop};
            push(@linestopshtml, ($mob?
'<form action="http://m.mta.info/mt/as0.mta.info/mnr/mstations/station_status_display.cfm" method="post">
<input value="'.$name.'" type="submit">
<input value="'.$stopid.','.$name.'" name="P_AVIS_ID" type="hidden">
</form>'
                                  :('<a href="http://as0.mta.info/mnr/mstations/station_status_display.cfm?P_AVIS_ID='
                 .$stopid.','.$name.'">'.$name.'</a>')));
        }
    }
    push(@linesboroughhtml,$line);
}
print join(" \n", @lineshtml);
print "\n<br>\n".($mob?'<a href="stations.htm">MTA No Mobile</a>':'<a href="stationsmob.htm">MTA Mobile</a>')."<br>\n";
print join("<br>\n", @linesboroughhtml);
print "\n<br><br>\n";
print join($mob?"\n":"<br>\n", @linestopshtml);
print "\n".'</body></html>';
$Data::Dumper::Sortkeys = 1;
