#generate routes, usage perl gr.pl > t.txt
use strict;
use Data::Dumper;

#abbreviate boro links for 2-4 KB smaller html file
my %borotbl = ( 'Queens' => 'Q',
                'Manhattan' => 'M',
                'Bronx' => 'X',
                'Brooklyn' => 'B',
                'Staten Island' => 'S',
            );
our $VAR1;
do 'routedatafinal.pl';
my @lineshtml;
my @linesboroughhtml;
my @linestopshtml;

open(HTMLFILE, ">", 'stations.htm')
        || die "$0: can't open stations.htm for reading: $!";
select(HTMLFILE);
binmode(HTMLFILE);
print #mobileoptimized for IE Mobile 6 text wrapping/zoom behavior, otherwise route names dont wrap and scrolling required
'<html><head><meta name="mobileoptimized" content="0"/></head><body><a name="hm"/>
';
foreach my $routename (sort keys %$VAR1) {
    my $route = $$VAR1{$routename};
    my %boroughs;
    foreach my $stopidx (0..@$route-1) {
        my $stop = $$route[$stopidx];
        my $borough = $stop->{borough};
        push(@{$boroughs{$borough}}, {name => $stop->{name}, stop => $stop->{stop_id}});
    }
    if(keys %boroughs > 1) {
        push(@lineshtml, '<a href="#'.$routename.'">&nbsp;'.$routename.'&nbsp;</a>');
    } else {
        push(@lineshtml, '<a href="#'.$routename.$borotbl{(keys %boroughs)[0]}.'">&nbsp;'.$routename.'&nbsp;</a>');
    }
    my $line = "<a name=\"$routename\"/>$routename:";
    foreach my $borough (sort keys %boroughs) {
        $line .= ' <a href="#'.$routename.$borotbl{$borough}.'">'.$borough.'</a>';
        push(@linestopshtml, "<a name=\"".$routename.$borotbl{$borough}."\"/>$routename: $borough <a href=\"#hm\">Home</a>");
        foreach my $stopidx (0..@{$boroughs{$borough}}-1) {
            my $name = ${$boroughs{$borough}}[$stopidx]->{name};
            my $stopid = ${$boroughs{$borough}}[$stopidx]->{stop};
            push(@linestopshtml, '<a href="http://54.90.113.57/getTime/'.
                 ($routename eq 'SI' ? 'SIR' : $routename).'/'.$stopid.'">'.$name.'</a>');
        }
    }
    push(@linesboroughhtml,$line);
}
print join(" \n", @lineshtml);
print "\n<br>\n";
print join("<br>\n", @linesboroughhtml);
print "\n<br><br>\n";
print join("<br>\n", @linestopshtml);
print "\n".'</body></html>';
$Data::Dumper::Sortkeys = 1;
