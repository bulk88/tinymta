#generate routes, usage perl grmp.pl grmp generate routes multi page
use strict;
use File::Slurp;
use POSIX qw/ceil/;
use Data::Dumper;
use Sort::Naturally;

#abbreviate boro links for 2-4 KB smaller html file
my %borotbl = ( 'Queens' => 'Q',
                'Manhattan' => 'M',
                'Bronx' => 'B',
                'Brooklyn' => 'K',
                'Staten Island' => 'S',
            );

die "usage: grmp.pl JS
JS=1 stop.htm/JS/CORS/JSONP
JS=0 WAP/CFW
" if ! defined $ARGV[0];

my $js = $ARGV[0];
#VERY VERY VERY slow, set to 0 during development, TODO research having 1
#nodejs processes instead of a million system() calls
my $minifyhtml = !$ENV{DISABLEMINI};
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
my @lineshtml;
my %rtdispname = getRouteDisplayNames('route_id');

{
my @routes = nsort keys %$VAR1;
#Move 7 train down to put right after 6 train, move 6X train above 7 train
#this is so access keys for dumb phones, for the IRT lines, match keypad
my $swap = $routes[6];
die "swap route target 6X not found, revise code" if $swap ne '6X';
$routes[6] = $routes[7];
$routes[7] = $swap;

foreach my $routename (@routes) {
    my $route = $$VAR1{$routename};
    my $rtnum = $routename;
    $routename = $rtdispname{$routename};
    my (%boroughs, @boroughs);
    foreach my $stopidx (0..@$route-1) {
        my $stop = $$route[$stopidx];
        my $borough = $stop->{borough};
        push(@{$boroughs{$borough}}, {name => $stop->{name}, stop => $stop->{stop_id}});
    }
    @boroughs = sort keys %boroughs;
    my $rtfile = "$routename:";
    my $rtfileheader = '';
    my $accesskeyidx = 1; #only 5 boroughs so no overflow check
    foreach my $borough (@boroughs) {
        if(@{$boroughs{$borough}} > 1 ) {
            $rtfile .= ' <a accesskey='.$accesskeyidx++.' href="'.$rtnum.$borotbl{$borough}.'.htm">'.$borough.'</a>';
            my $boropages = ceil(scalar(@{$boroughs{$borough}}) / 9);
            my $pageidx;
            while (my @stopschunk = splice @{$boroughs{$borough}}, 0, 9) { #break down stop list into chunks of 9
                my $borofile = "$routename: $borough".($boropages > 1 ? ' '.($pageidx+1).' of '.$boropages:'')."<br>\n";
                my $accesskeyidx = 1;
                foreach my $stop (@stopschunk) {
                    $borofile .= stopid_to_tag($stop->{name},
                        $stop->{stop},
                        $stop->{name},
                        '', #no anchor
                        $accesskeyidx++);
                }
                if(@{$boroughs{$borough}}) {
                    $borofile .= '<a accesskey=0 href='.$rtnum.$borotbl{$borough}.($pageidx+1).'.htm>More</a>'."\n";
                }
                write_html('../docs/'.($js?'js/':'').$rtnum.$borotbl{$borough}.$pageidx.'.htm', $borofile);
                $pageidx++;
            }
        } else {    #if 1 station per boro, just jump straight to station
                    #saves a tap, only L/Queens/Halsey has this property
            $rtfile .= ' '.stopid_to_tag(${$boroughs{$borough}}[0]->{name},
                          ${$boroughs{$borough}}[0]->{stop},
                          $borough,
                          '', #no anchor
                          $accesskeyidx++);
        }

    }
    #easier finger tapping if 1 or 2 char routenames
    my $routenamepad = length $routename < 3 ? '&nbsp;' : '';
    if(@boroughs > 1) { #partial 'a' tag HTML line, prefix added in later pass
        push(@lineshtml, 'href="'.$rtnum.'.htm">'
                        .$routenamepad.$routename.$routenamepad.'</a>');
        write_html('../docs/'.($js?'js/':'')."$rtnum.htm", $rtfile."\n");
    } else { #jump directly to per-boro station page, suppress boro selection file
        push(@lineshtml, 'href="'.$rtnum.$borotbl{$boroughs[0]}.'.htm">'
                        .$routenamepad.$routename.$routenamepad.'</a>');
    }
}
}

sub stopid_to_tag { #$html = stopid_to_tag($name, $stopid, $dispname, $anchorname, $accesskey)
    my ($name, $stopid, $dispname, $anchorname, $accesskey) = @_;
    return '<a '.($anchorname?'name="'.$anchorname.'" ':'')
                .($accesskey?'accesskey='.$accesskey.' ':'')
                .($js?'href="../stop.htm#':'href="s/')
                .$stopid
                .($js?$phase4nids->[$phase3nids->[$phase2nids->[$nmapIDs->{$stopid}]]]:'')
    #Must having closing </a> to make no underline whitespace between links
                .'">'.$dispname."</a>\n";
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
        if($routes eq '1') {$routes = '123'}
        #2 @ columbus circle
        if($routes eq '1/A/B/C/D') {$routes = '1/2/A/B/C/D'}
        if($routes eq '5') {$routes = '25'}
        if($routes eq '2') {$routes = '25'}
        if($routes eq '3/4') {$routes = '2345'}
        if($routes eq '2/3') {$routes = '2345'}
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
        if($routes eq 'N') {$routes = 'QNW'}
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
    return $tripLoc;
}

my $accesskeyidx = 1;
my $pageidx;
my $file;

sub altRtViewHTML {
    my $html;
    my $pageidx = $_[0];
    if($js) {
      $html .= ' <a href="../rt'.$pageidx.'.htm">No JS</a>';
    } else {
      $html .= ' <a href="js/rt'.$pageidx.'.htm">Use JS</a>';
    }
    return $html;
}

my $linespages = ceil(scalar(@lineshtml) / 9);
foreach my $line (@lineshtml) {
    $file .= '<a accesskey='.$accesskeyidx.' '.$line." \n";
    $accesskeyidx++;
    if($accesskeyidx == 10 && @lineshtml){
        $accesskeyidx = 1;
        $file .= '<a accesskey=0 href=rt'.($pageidx+1).'.htm>More</a>'."\n";
        write_html('../docs/'.($js?'js/':'')."rt$pageidx.htm", "Routes:".($linespages > 1 ? ' '.($pageidx+1)." of ".$linespages:'')
            .altRtViewHTML($pageidx)."<br>\n".$file);
        $file = '';
        $pageidx++;
    }
}
if($file){
    write_html('../docs/'.($js?'js/':'')."rt$pageidx.htm", "Routes:".($linespages > 1 ? ' '.($pageidx+1)." of ".$linespages:'')
        .altRtViewHTML($pageidx)."<br>\n".$file);
}
sub write_html { #$filename, $string
    write_file($_[0], {binmode => ':raw'}, '<html><head><meta name=mobileoptimized content=0>'
    .($js?'<link href="//otp-mta-prod.camsys-apps.com" rel="preconnect" crossorigin><link href="//otp-mta-prod.camsys-apps.com" rel="dns-prefetch">':'')
    .'</head><body>'.$_[1].($js?'<script src=../dumb.js></script>':'').'</body></html>');
    system('html-minifier -c "../minify_config.json" -o "'.$_[0].'" "'.$_[0].'"') if $minifyhtml;
}

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
