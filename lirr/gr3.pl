#generate routes, usage perl gr.pl > t.txt
use strict;
use Data::Dumper;

my %borotbl = ( 'Queens' => 'Q',
                'Manhattan' => 'M',
                'Bronx' => 'B',
                'Brooklyn' => 'K',
                'Suffolk' => 'S',
                'Nassau' => 'N',
            );

die "1st arg must be generate JS stations or no-JS" if ! defined $ARGV[0];
my $js = $ARGV[0];
our $VAR1;
do 'routedatafinal.pl';
my @lineshtml;
my @linesboroughhtml;
my @linestopshtml;
my %rtdispname = getRouteDisplayNames('route_long_name');

open(HTMLFILE, ">", ($js ? 'stations.htm' : 'stationsnojs.htm'))
        || die "$0: can't open stations.htm for writing: $!";
select(HTMLFILE);
binmode(HTMLFILE);
print #mobileoptimized for IE Mobile 6 text wrapping/zoom behavior, otherwise route names dont wrap and scrolling required
'<html><head><meta name="mobileoptimized" content="0"></head><body><a name="#">
';
foreach my $routename (sort keys %$VAR1) {
    my $route = $$VAR1{$routename};
    my $rtnum = $routename;
    $routename = $rtdispname{$routename};
    my (%boroughs, $line, $rtanchor);
    foreach my $stopidx (0..@$route-1) {
        my $stop = $$route[$stopidx];
        my $borough = $stop->{borough};
        push(@{$boroughs{$borough}}, {name => $stop->{name}, stop => $stop->{stop_id}});
    }
    $line = "$routename:";
    if(keys %boroughs > 1) {
        $rtanchor = "name=\"$rtnum\" ";
        push(@lineshtml, '<a href="#'.$rtnum.'">'.$routename.'</a>');
    } else {
        $rtanchor = '';#dont have unused anchors
        push(@lineshtml, '<a href="#'.$rtnum.$borotbl{(keys %boroughs)[0]}.'">&nbsp;'.$routename.'&nbsp;</a>');
    }
    foreach my $borough (sort keys %boroughs) {
        if(@{$boroughs{$borough}} > 1){
            $line .= " <a ".$rtanchor."href=\"#".$rtnum.$borotbl{$borough}.'">'.$borough.'</a>';
            push(@linestopshtml, "$routename: $borough <a name=\"".$rtnum.$borotbl{$borough}."\" href=\"#\">Home</a>");
        } else { #if 1 station per boro, just jump straight to station, saves a tap
            $line .= " <a $rtanchor".stopid_to_href(${$boroughs{$borough}}[0]->{stop}).'>'.$borough.'</a>';
            push(@linestopshtml, "$routename: $borough <a href=\"#\">Home</a>");
        }
        $rtanchor = '';
        foreach my $stopidx (0..@{$boroughs{$borough}}-1) {
            my $name = ${$boroughs{$borough}}[$stopidx]->{name};
            my $stopid = ${$boroughs{$borough}}[$stopidx]->{stop}; #TODO HTTPS for LIRR.ORG
            push(@linestopshtml, '<a '.stopid_to_href($stopid).'>'.$name.'</a>');
        }
    }

    push(@linesboroughhtml,$line);
}
sub stopid_to_href { #$href_attr = stopid_to_href($stopid)
    return ($js?'href="stop.htm#':'href="http://www.loband.org/loband/filter/com/anyorigin/%20/go/?url=https%3A//traintime.lirr.org/api/Departure%3Floc%3D')
            .$_[0]
            .($js?'"':'&callback=X&_ab_type=JavaScript"');
}

print join(" \n", @lineshtml);
print "\n<br>\n".($js?'<a href="stationsnojs.htm">No JS</a>':'<a href="stations.htm">Use JS</a>')."<br>\n";
print join("<br>\n", @linesboroughhtml);
print "\n<br><br>\n";
print join("<br>\n", @linestopshtml);
print "\n".'</body></html>';
$Data::Dumper::Sortkeys = 1;

#return a hash that translates route_id to a friendly display name
#different on different systems if route_ids are more compact but still
#understandable to public, or must translate to a friendly name but use route_id
#for short filenames/small HTML
sub getRouteDisplayNames {
    if($_[0] eq 'route_id'){
        return map {$_ => $_} keys %$VAR1;
    } elsif($_[0] eq 'route_short_name' || $_[0] eq 'route_long_name') {
        require Text::CSV::Hashify;
        my $obj = Text::CSV::Hashify->new( {
            file        => 'routes.txt',
            format      => 'hoh',
            key         => "route_id",
            quote_char          => '"',
            escape_char          => undef,
            allow_loose_quotes=>1,
            auto_diag => 1,
        } );
        my $routes= $obj->all;
        while (my ($key,$value) = each %$routes) {
            $$routes{$key} = $value->{$_[0]};
        }
        return %$routes;
    } else {
        die "unknown route display name type"
    }
}
