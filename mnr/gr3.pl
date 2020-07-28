#generate routes, usage perl gr.pl > t.txt
use strict;
use Data::Dumper;
use Sort::Naturally;

#abbreviate boro links for 2-4 KB smaller html file
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

die "1st arg must be generate desktop MTA site stations or mobilized MTA site stations " if ! defined $ARGV[0];
my $mob = $ARGV[0];
our $VAR1;
do '.\routedatafinal.pl';
my @lineshtml;
my @linesboroughhtml;
my @linestopshtml;
my %rtdispname = getRouteDisplayNames('route_long_name');

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
foreach my $rtid (nsort keys %$VAR1) {
    my $route = $$VAR1{$rtid};
    my $routename = $rtdispname{$rtid};
    my (%boroughs, $line, $rtanchor);
    foreach my $stopidx (0..@$route-1) {
        my $stop = $$route[$stopidx];
        my $borough = $stop->{borough};
        push(@{$boroughs{$borough}}, {name => $stop->{name}, stop => $stop->{stop_id}});
    }
    $line = "$routename:";
    #easier finger tapping if 1 or 2 char routenames
    my $routenamepad = length $routename < 3 ? '&nbsp;' : '';
    if(keys %boroughs > 1) {
        $rtanchor = $rtid;
        push(@lineshtml, '<a href="#'.$rtid.'">'
                        .$routenamepad.$routename.$routenamepad.'</a>');
    } else {
        $rtanchor = '';#dont have unused anchors
        push(@lineshtml, '<a href="#'.$rtid.$borotbl{(keys %boroughs)[0]}.'">'
                        .$routenamepad.$routename.$routenamepad.'</a>');
    }
    foreach my $borough (sort keys %boroughs) {
        if(@{$boroughs{$borough}} > 1){
            $line .= " <a ".($rtanchor?'name="'.$rtanchor.'" ':'')."href=\"#".$rtid.$borotbl{$borough}.'">'.$borough.'</a>';
            push(@linestopshtml, "$routename: $borough <a name=\"".$rtid.$borotbl{$borough}."\" href=\"#\">Home</a>");
        } else { #if 1 station per boro, just jump straight to station, saves a tap, only L/Queens/Halsey has this property
            my $name = ${$boroughs{$borough}}[0]->{name};
            my $stopid = ${$boroughs{$borough}}[0]->{stop};#how to inject $rtanchor
            $line .= ' '.stopid_to_tag($name, $stopid, $borough, $rtanchor);
            push(@linestopshtml, "$routename: $borough <a href=\"#\">Home</a>");
        }
        $rtanchor = '';
        foreach my $stopidx (0..@{$boroughs{$borough}}-1) {
            my $name = ${$boroughs{$borough}}[$stopidx]->{name};
            my $stopid = ${$boroughs{$borough}}[$stopidx]->{stop};
            push(@linestopshtml, stopid_to_tag($name, $stopid, $name, ''));
        }
    }
    push(@linesboroughhtml,$line);
}

sub stopid_to_tag { #$html = stopid_to_tag($name, $stopid, $dispname, $anchorname, $accesskey)
    my ($name, $stopid, $dispname, $anchorname, $accesskey) = @_;
#name attr on input element is an anchor only on IE 6, not Openwave, Chrome, FF, or NN 3
#id works on IE 6, Openwave, Chrome, FF, but not NN 3 (oh well)
return ($mob?
'<form action="http://m.mta.info/mt/as0.mta.info/mnr/mstations/station_status_display.cfm" method="post">
<input value="'.$dispname.'" '.($anchorname?'id="'.$anchorname.'" ':'')
.($accesskey?'accesskey='.$accesskey.' ':'').'type="submit">
<input value="'.$stopid.','.$name.'" name="P_AVIS_ID" type="hidden">
</form>'
                                  :('<a '.($anchorname?'name="'.$anchorname.'" ':'')
                                         .($accesskey?'accesskey='.$accesskey.' ':'')
                .'href="http://as0.mta.info/mnr/mstations/station_status_display.cfm?P_AVIS_ID='
                 .$stopid.','.$name.'">'.$dispname.'</a>'));
}

print join(" \n", @lineshtml);
print "\n<br>\n".($mob?'<a href="stations.htm">MTA No Mobile</a>'."<br>\n<div>\n":'<a href="stationsmob.htm">MTA Mobile</a>'."<br>\n");
print join("<br>\n", @linesboroughhtml);
print $mob?"\n<br>\n</div>\n<br>\n":"\n<br><br>\n";
print join($mob?"\n":"<br>\n", @linestopshtml);
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
