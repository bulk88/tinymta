#generate routes, usage perl gr.pl > t.txt
use strict;
use Data::Dumper;

#abbreviate boro links for 2-4 KB smaller html file
my %borotbl = ( 'Queens' => 'Q',
                'Manhattan' => 'M',
                'Bronx' => 'B',
                'Brooklyn' => 'K',
                'Staten Island' => 'S',
            );
die "1st arg must be generate JS stations or no-JS" if ! defined $ARGV[0];
my $js = $ARGV[0];
our $VAR1;
do 'routedatafinal.pl';
my @lineshtml;
my @linesboroughhtml;
my @linestopshtml;

open(HTMLFILE, ">", ($js ? 'stations.htm' : 'stationsnojs.htm'))
        || die "$0: can't open stations.htm for writing: $!";
select(HTMLFILE);
binmode(HTMLFILE);
print #mobileoptimized for IE Mobile 6 text wrapping/zoom behavior, otherwise route names dont wrap and scrolling required
'<html><head><meta name="mobileoptimized" content="0"></head><body><a name="#">
';
foreach my $routename (sort keys %$VAR1) {
    my $route = $$VAR1{$routename};
    my (%boroughs, $line);
    foreach my $stopidx (0..@$route-1) {
        my $stop = $$route[$stopidx];
        my $borough = $stop->{borough};
        push(@{$boroughs{$borough}}, {name => $stop->{name}, stop => $stop->{stop_id}});
    }
    if(keys %boroughs > 1) {
        $line = "<a name=\"$routename\">$routename:";
        push(@lineshtml, '<a href="#'.$routename.'">&nbsp;'.$routename.'&nbsp;</a>');
    } else {
        $line = "$routename:"; #dont have unused anchors
        push(@lineshtml, '<a href="#'.$routename.$borotbl{(keys %boroughs)[0]}.'">&nbsp;'.$routename.'&nbsp;</a>');
    }
    foreach my $borough (sort keys %boroughs) {
        if(@{$boroughs{$borough}} > 1){
            $line .= ' <a href="#'.$routename.$borotbl{$borough}.'">'.$borough.'</a>';
            push(@linestopshtml, "$routename: $borough <a name=\"".$routename.$borotbl{$borough}."\" href=\"#\">Home</a>");
        } else { #if 1 station per boro, just jump straight to station, saves a tap, only L/Queens/Halsey has this property
            $line .= ' <a '.stopid_to_href($routename,${$boroughs{$borough}}[0]->{stop}).'>'.$borough.'</a>';
            push(@linestopshtml, "$routename: $borough <a href=\"#\">Home</a>");
        }
        foreach my $stopidx (0..@{$boroughs{$borough}}-1) {
            my $name = ${$boroughs{$borough}}[$stopidx]->{name};
            my $stopid = ${$boroughs{$borough}}[$stopidx]->{stop};
            push(@linestopshtml, '<a '.stopid_to_href($routename,$stopid).'>'.$name.'</a>');
        }
    }
    push(@linesboroughhtml,$line);
}
sub stopid_to_href { #$href_attr = stopid_to_href($routename, $stopid)
    return ($js?'href="stop.htm#':'href="http://54.90.113.57/getTime/').
    #substr will merge stop IDs #1/128 #2/128 #3/128 #5/128 into #1/128
    #to make more compressible (common) text in single page format, they are
    #all the same station IRT "34 St - Penn Station"
                 ($_[0] eq 'SI' ? 'SIR' : substr($_[1],0,1)).'/'.$_[1].'"';
}

print join(" \n", @lineshtml);
print "\n<br>\n".($js?'<a href="stationsnojs.htm">No JS</a>':'<a href="stations.htm">Use JS</a>')."<br>\n";
print join("<br>\n", @linesboroughhtml);
print "\n<br><br>\n";
print join("<br>\n", @linestopshtml);
print "\n".'</body></html>';
$Data::Dumper::Sortkeys = 1;
