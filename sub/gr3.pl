#generate routes, usage perl gr.pl > t.txt
use strict;
use Data::Dumper;
use Sort::Naturally;

#abbreviate boro links for 2-4 KB smaller html file
my %borotbl = ( 'Queens' => 'Q',
                'Manhattan' => 'M',
                'Bronx' => 'B',
                'Brooklyn' => 'K',
                'Staten Island' => 'S',
            );

die "1st arg must be generate JS stations or no-JS" if ! defined $ARGV[0];
my $js = $ARGV[0];
die "1st arg must be generate trip planner stations or unused" if ! defined $ARGV[1];
my $planner = $ARGV[1];
our $VAR1;
our $phase2nids;
our $phase3nids;
our $phase4nids;
our $nmapIDs;
our $staDB;
do '.\routedatafinal.pl';
{
    local $VAR1;
    do '.\nmapnidsdata.pl';
    $nmapIDs = $VAR1;
}
do '.\tripsdb.pl';


my @lineshtml;
my @linesboroughhtml;
my @linestopshtml;
my %rtdispname = getRouteDisplayNames('route_id');
my @chkarr;

open(HTMLFILE, ">", ($planner ? 'plan.htm' : $js ? 'stations.htm' : 'stationsnojs.htm'))
        || die "$0: can't open stations.htm for writing: $!";
select(HTMLFILE);
binmode(HTMLFILE);
print #mobileoptimized for IE Mobile 6 text wrapping/zoom behavior, otherwise route names dont wrap and scrolling required
'<html><head><meta name="mobileoptimized" content="0"><meta name="referrer" content="no-referrer">'
.($js?'<link href="//otp-mta-prod.camsys-apps.com" rel="preconnect" crossorigin><link href="//otp-mta-prod.camsys-apps.com" rel="dns-prefetch"><link rel=prefetch href=stop.htm>':$planner?'<link href="http://tripplanner.mta.info" rel="preconnect"><link href="http://tripplanner.mta.info" rel="dns-prefetch"><script async src=plan.js></script>':'')
.'<script async src=1p.js></script></head><body><a name="#">
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
            #omit </a> because next line is an anchor
            push(@linestopshtml, "$routename: $borough <a name=\"".$rtid.$borotbl{$borough}."\" href=\"#\">Home");
        } else { #if 1 station per boro, just jump straight to station, saves a tap, only L/Queens/Halsey has this property
            my $name = ${$boroughs{$borough}}[0]->{name};
            my $stopid = ${$boroughs{$borough}}[0]->{stop};#how to inject $rtanchor
            $line .= ' '.stopid_to_tag($name, $stopid, $borough, $rtanchor, undef, $routename).'</a>';
            push(@linestopshtml, "$routename: $borough <a href=\"#\">Home</a>");
        }
        $rtanchor = '';
        foreach my $stopidx (0..@{$boroughs{$borough}}-1) {
            my $name = ${$boroughs{$borough}}[$stopidx]->{name};
            my $stopid = ${$boroughs{$borough}}[$stopidx]->{stop};
            push(@linestopshtml, stopid_to_tag($name, $stopid, $name, '', undef, $routename));
        }
#add closing tag only after a list of station names to not have boro/route header be
#part of a link
        $linestopshtml[@linestopshtml - 1] = $linestopshtml[@linestopshtml - 1].'</a>';
    }
    push(@linesboroughhtml,$line);
}
#remove last </a> on entire file
$linestopshtml[@linestopshtml - 1] = substr($linestopshtml[@linestopshtml - 1],0,length($linestopshtml[@linestopshtml - 1])-4);

#psping and apache bench shows no time difference between TrainTimeLB-367443097.us-east-1.elb.amazonaws.com
#and mtasubwaytime.info domains but they are different IPs
sub stopid_to_tag { #$html = stopid_to_tag($name, $stopid, $dispname, $anchorname, $accesskey, $routename)
    my ($name, $stopid, $dispname, $anchorname, $accesskey, $routename) = @_;
    $chkarr[$phase4nids->[$phase3nids->[$phase2nids->[$nmapIDs->{$stopid}]]]] = 1;
    return '<a '.($anchorname?'name="'.$anchorname.'" ':'')
                .($accesskey?'accesskey='.$accesskey.' ':'')
                .($planner ? 'href="plan.htm#'.getPlanStr($routename, $name, $stopid) :
                (($js?'href="stop.htm#':'href="s/')
                .$stopid
                .($js?$phase4nids->[$phase3nids->[$phase2nids->[$nmapIDs->{$stopid}]]]:'')))
    #dont include closing </a> or bytes saving when 2 sibling anchor elements
                .'">'.$dispname;
}

sub getPlanStr {
    #warn Dumper($staDB);
    #exit;
    my $tripLoc;
    my ($routename, $dispname, $stopid) = @_;
    $routename = 7 if $routename eq '7X';
    $routename = 6 if $routename eq '6X';
    if($dispname =~ /ern p/) {
      0;
    }
    my $debugsta = 'myrtlez';
    foreach(@$staDB) {
        my ($name, $routes) = split(/STATION/i, $_->[1][2]);
        if($name =~ /\Q$debugsta\E/i && $dispname =~ /\Q$debugsta\E/i) {
            $DB::single=1;1;
        }
        if ($_->[1][2] =~ /myr/i) {
            0;
        }
        if($_->[1][2] =~ /MYRTLE AV/i && $routes eq ' L') {
            #dont confuse with JMZ sta
            $_->[1][2] =~ s/MYRTLE AV/Myrtle - Wyckoff Avs/i;    
        }
        if($_->[1][2] =~ /WYCKOFF AV/i && $routes eq ' M') {
            #dont confuse with JMZ sta
            $_->[1][2] =~ s/WYCKOFF AV/Myrtle - Wyckoff Avs/i;    
        }
        $_->[1][2] =~ s|CENTRAL PARK NORTH - 110TH ST STA 2/3|Central Park North (110 St) STATION 2/3|;
        $_->[1][2] =~ s/STA /STATION /;
        $_->[1][2] =~ s|42ND ST-GRAND CENTRAL 4/5/6/7/S/METRO-N|42ND ST - GRAND CENTRAL STATION 4/5/6/7/S|;
        $_->[1][2] =~ s|COLUMBUS CIR STATION|COLUMBUS CIRCLE STATION|;
        $_->[1][2] =~ s|116TH ST - COLUMBIA UNIV STATION 1|116TH ST - COLUMBIA UNIVERSITY STATION 1|;
        $_->[1][2] =~ s|DYRE AV - EASTCHESTER STATION 5|Eastchester - Dyre Av STATION 5|;
        $_->[1][2] =~ s|E 143RD ST - SAINT MARYS ST|E 143 St - St Mary's St|;
       $_->[1][2]  =~ s|MORRISON AV \x{2013} SOUNDVIEW STATION 6|Morrison Av- Sound View STATION 6|;
       $_->[1][2]  =~ s|WESTCHESTER SQ - EAST TREMONT AV|Westchester Sq - E Tremont Av|;
       $_->[1][2]  =~ s|34th St \x{2013} Hudson Yards|34 St - 11 Av|;
       $_->[1][2]  =~ s|BROADWAY JUNCTION|Broadway Jct|;
       $_->[1][2]  =~ s|HOYT - SCHERMERHORN|Hoyt - Schermerhorn Sts|;
       $_->[1][2]  =~ s|WEST 4TH ST|W 4 St|;
       $_->[1][2]  =~ s|42ND ST - PORT AUTHORITY|42 St - Port Authority Bus Terminal|;
       $_->[1][2]  =~ s|81ST ST - MUSEUM OF NATURAL HIST|81 St - Museum of Natural History|;
       $_->[1][2]  =~ s|CATHEDRAL PKWY - 110TH ST|Cathedral Pkwy (110 St)|;
       $_->[1][2]  =~ s|AQUEDUCT - NORTH CONDUIT AV|Aqueduct - N Conduit Av|;
       $_->[1][2]  =~ s|174TH - 175TH ST|174-175 Sts|;
       $_->[1][2]  =~ s|182ND - 183RD STS|182-183 Sts|;
       $_->[1][2]  =~ s|42ND ST - BRYANT PARK|42 St - Bryant Pk|;
       $_->[1][2]  =~ s|47-50TH ST - ROCKEFELLER CTR|47-50 Sts - Rockefeller Ctr|i;
       $_->[1][2]  =~ s|LEXINGTON AV - 53RD ST|Lexington Av/53 St|;
       $_->[1][2]  =~ s|5TH AV - 53RD ST|5 Av/53 St|;
       $_->[1][2]  =~ s|UNION TNPK - KEW GARDENS|Kew Gardens - Union Tpke|;
       $_->[1][2]  =~ s|BRIARWOOD|Briarwood - Van Wyck Blvd|;
       $_->[1][2]  =~ s|SUTPHIN BLVD - ARCHER AV|Sutphin Blvd - Archer Av - JFK Airport|;
       $_->[1][2]  =~ s|JAMAICA CTR - PARSONS/ARCHER|Jamaica Center - Parsons/Archer|;
       $_->[1][2]  =~ s|WEST 8TH ST - NY AQUARIUM|W 8 St - NY Aquarium|;
       $_->[1][2]  =~ s|63RD ST \x{2013} LEXINGTON AV|Lexington Av/63 St|;
      $_->[1][2]  =~ s|5TH AV - 59TH ST|5 Av/59 St|;
      $_->[1][2]  =~ s|59TH ST - LEXINGTON AVE|Lexington Av/59 St|;
      # $_->[1][2]  =~ s|||;
      # $_->[1][2]  =~ s|||;
      # $_->[1][2]  =~ s|||;
      # $_->[1][2]  =~ s|||;
      # $_->[1][2]  =~ s|||;
      # $_->[1][2]  =~ s|||;
      # $_->[1][2]  =~ s|||;
        ($name, $routes) = split(/STATION/i, $_->[1][2]);
        die "while processing station $dispname, no routes extracted from planner DB station $name" if ! $routes;

        $name = 'Van Cortlandt Park - 242 St' if $name =~ /242ND ST - VAN CORTLANDT PK/;
        $name = '34 St - Penn Station' if $name =~ /34TH ST - PENN/;
        $name = 'Times Sq - 42 St' if $name =~ /42ND ST - TIMES SQ/;
        #warn " "+!!($name =~ /\Q$dispname\E/i)." ".!!($routes =~ /\Q$routename\E/i);
        if( ($name =~ /\Q$dispname\E/i) && ($routes =~ /\Q$routename\E/i)) {
            #warn "inside assign";
            $tripLoc = $_->[0];
            last;
        }
    }
    if(!$tripLoc) {

    foreach(@$staDB) {
        my ($name, $routes) = split(/STATION/i, $_->[1][2]);
        if($name =~ /\Q$debugsta\E/i && $dispname =~ /\Q$debugsta\E/i) {
            $DB::single=1;1;
        }
        $name =~ s/(?<=\d)ST//g;
        $name =~ s/(?<=\d)ND//g;
        $name =~ s/(?<=\d)RD//g;
        $name =~ s/(?<=\d)TH//g;
        $routes =~ s/^\s+|\s+$//g;
        if($routes eq '6') {$routes = '456'}
        #116 and 125 street lenox vs broadway separate
        if($routes eq '1' && $stopid ne '225' && $stopid ne '226') {
            $routes = '123'
        }
        #2 @ columbus circle
        if($routes eq '1/A/B/C/D') {$routes = '1/2/A/B/C/D'}
        #125/lex 456 not 125/lenox 2/3
        if($routes eq '5' && $stopid ne '621') {$routes = '25'}
        if($routes eq '2') {$routes = '25'}
        if($routes eq '3/4') {$routes = '2345'}
        if($routes eq '2/3'
           #exclude lenox ave line from lexington ave name conflict
           && $stopid ne '621'
           && $stopid ne '622'
           && $stopid ne '623') {$routes = '2345'}
        if($routes eq '3') {$routes = '2345'}
        if($routes eq 'C') {$routes = 'AC'}
        if($routes eq 'C') {$routes = 'AC'}
        #franklin
        if($routes eq 'C/S') {$routes = 'ACS'}
        if($routename eq 'FS') {$routename = 'S'}
        if($routename eq 'GS') {$routename = 'S'}
        if($routename eq 'H') {$routename = 'S'}
        if($routes eq 'B/C') {$routes = 'BCA'}
        if($routes eq 'C/E') {$routes = 'CEA'}
        if($routes eq 'R') {$routes = 'DRWN'}
        if($routes eq 'B/Q/R') {$routes = 'BQRDNW'}
        if($routes eq 'M/R') {$routes = 'EMR'}
        if($routes eq 'F') {$routes = 'EFM'}
        if($routes eq 'J/Z') {$routes = 'JZM'}
        if($routes eq 'J/M') {$routes = 'JZM'}
        if($routes eq 'J') {$routes = 'JZ'}
        if($routes eq 'R/W') {$routes = 'NRWQ'}
        #86 st brooklyn on R (R44) vs 86 st manhat 2nd ave limited run R
        if($routes eq 'Q'&& $stopid ne 'R44') {$routes = 'NQR'}
        #63 lex
        if($routes eq 'F/Q') {$routes = 'FQNR'}
        #86 st brooklyn on R (R44) vs 86 st manhat 2nd ave
        if($routes eq 'N' && $stopid ne 'Q04') {$routes = 'QNW'}
        if($routes eq 'N/R') {$routes = 'NRQ'}
        if($routes eq 'D/N/R') {$routes = 'DNRQW'}
        if($routes eq 'D/N/R/LIRR') {$routes = 'DNRQW'}
        if($routes eq 'N/R/W') {$routes = 'NRWQ'}
        #if($routes eq '') {$routes = ''}

        $routes =~ s/METRO-NORTH//i;
        #241 wakefield / from removed metro north
        if($routes eq '2/') {$routes = '25'}
        my $altstaname = join(' - ',reverse(split(/ - /, $dispname)));
        my $alt2staname = $name;
        $alt2staname =~ s/ - /-/;
        if( ($name =~ /\Q$dispname\E/i
             || $name =~ /\Q$altstaname\E/i
             || $alt2staname =~ /\Q$dispname\E/i
             ) && $routes =~ /\Q$routename\E/i) {
            $tripLoc = $_->[0];
            last;
        }
    }
    }
    if(!$tripLoc) {
      $DB::single=1;1;
    }
    $tripLoc =~ s/\$SUBSTA$//;
    return $tripLoc;
}
print join(" \n", @lineshtml);
print "\n<br>\n".($planner?'':$js?'<a href="stationsnojs.htm">No JS</a>':'<a href="stations.htm">Use JS</a>')."<br>\n";
print join("<br>\n", @linesboroughhtml);
print "\n<br><br>\n";
print join("<br>\n", @linestopshtml);
print "\n</body></html>";
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

for(my $i=0; $i< $#chkarr; $i++){
  if($chkarr[$i] != 1) {
    warn "unused nmap coord $i\n";
  }
}
#warn Dumper(\@chkarr);
