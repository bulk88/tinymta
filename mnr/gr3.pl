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
'<html><head><meta name="mobileoptimized" content="0"></head><body><style>form{margin-bottom:0px;margin-top:0px}input{padding-top:0px;padding-bottom:0px}div form{display:inline}</style><a name="#">
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
        if(@{$boroughs{$borough}} > 1){
            $line .= ' <a href="#'.$rtnum.$borotbl{$borough}.'">'.$borough.'</a>';
            push(@linestopshtml, "$routename: $borough <a name=\"".$rtnum.$borotbl{$borough}."\" href=\"#\">Home</a>");
        } else { #if 1 station per boro, just jump straight to station, saves a tap
            my $name = ${$boroughs{$borough}}[0]->{name};
            my $stopid = ${$boroughs{$borough}}[0]->{stop};
            $line .= ' '.stopid_to_tag($name, $stopid, $borough);
            push(@linestopshtml, "$routename: $borough <a href=\"#\">Home</a>");
        }
        foreach my $stopidx (0..@{$boroughs{$borough}}-1) {
            my $name = ${$boroughs{$borough}}[$stopidx]->{name};
            my $stopid = ${$boroughs{$borough}}[$stopidx]->{stop};
            push(@linestopshtml, stopid_to_tag($name, $stopid, $name));
        }
    }
    push(@linesboroughhtml,$line);
}

sub stopid_to_tag { #$href_attr = stopid_to_tag($name, $stopid, $dispname)
my ($name, $stopid, $dispname) = @_;
return ($mob?
'<form action="http://m.mta.info/mt/as0.mta.info/mnr/mstations/station_status_display.cfm" method="post">
<input value="'.$dispname.'" type="submit">
<input value="'.$stopid.','.$name.'" name="P_AVIS_ID" type="hidden">
</form>'
                                  :('<a href="http://as0.mta.info/mnr/mstations/station_status_display.cfm?P_AVIS_ID='
                 .$stopid.','.$name.'">'.$dispname.'</a>'));
}

print join(" \n", @lineshtml);
print "\n<br>\n".($mob?'<a href="stations.htm">MTA No Mobile</a>'."<br>\n<div>\n":'<a href="stationsmob.htm">MTA Mobile</a>'."<br>\n");
print join("<br>\n", @linesboroughhtml);
print $mob?"\n<br>\n</div>\n<br>\n":"\n<br><br>\n";
print join($mob?"\n":"<br>\n", @linestopshtml);
print "\n".'</body></html>';
$Data::Dumper::Sortkeys = 1;
