#generate routes, usage perl grmp.pl grmp generate routes multi page
use strict;
use File::Slurp;
use POSIX qw/ceil/;
use Data::Dumper;

#BUGGGG 6X.htm is broken

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
my @rtnum_to_rtname = ('empty', 'Hudson', 'Harlem', 'New Haven', 'New Canaan', 'Danbury', 'Waterbury');
die "1st arg must be generate desktop MTA site stations or mobilized MTA site stations " if ! defined $ARGV[0];
my $mob = $ARGV[0];
#VERY VERY VERY slow, set to 0 during development, TODO research having 1
#nodejs processes instead of a million system() calls
my $minifyhtml = !$ENV{DISABLEMINI};
our $VAR1;
do 'routedatafinal.pl';
my @lineshtml;

{
my @routes = sort keys %$VAR1;
foreach my $routename (@routes) {
    my $route = $$VAR1{$routename};
    my $rtnum = $routename;
    $routename = $rtnum_to_rtname[$routename];
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
                write_html('../docs/mn/'.($mob?'m/':'').$rtnum.$borotbl{$borough}.$pageidx.'.htm', '<style>form{margin-bottom:0px;margin-top:0px;}</style>'.$borofile);
                $pageidx++;
            }
        } else {    #if 1 station per boro, just jump straight to station
                    #saves a tap, only L/Queens/Halsey has this property
            $rtfile .= ' '.stopid_to_tag(${$boroughs{$borough}}[0]->{name},
                          ${$boroughs{$borough}}[0]->{stop},
                          $borough,
                          '', #no anchor
                          $accesskeyidx++);
            if($mob && !$rtfileheader) { #otherwise button bad formatting
                $rtfileheader = '<style>form{margin-bottom:0px;margin-top:0px;}</style>';
            }
        }

    }
    if(@boroughs > 1) { #partial 'a' tag HTML line, prefix added in later pass
        push(@lineshtml, 'href="'.$rtnum.'.htm">'.$routename.'</a>');
        write_html('../docs/mn/'.($mob?'m/':'')."$rtnum.htm", $rtfileheader.$rtfile."\n");
    } else { #jump directly to per-boro station page, suppress boro selection file
        push(@lineshtml, 'href="'.$rtnum.$borotbl{$boroughs[0]}.'.htm">'.$routename.'</a>');
    }
}
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

my $accesskeyidx = 1;
my $pageidx;
my $file;

sub altRtViewHTML {
    my $html;
    my $pageidx = $_[0];
    if($mob) {
        $html .= ' <a href="../rt'.$pageidx.'.htm">MTA No Mobile</a>';
    } else {
        $html .= ' <a href="m/rt'.$pageidx.'.htm">MTA Mobile</a>';
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
        write_html('../docs/mn/'.($mob?'m/':'')."rt$pageidx.htm", "Routes:".($linespages > 1 ? ' '.($pageidx+1)." of ".$linespages:'')
            .altRtViewHTML($pageidx)."<br>\n".$file);
        $file = '';
        $pageidx++;
    }
}
if($file){
    write_html('../docs/mn/'.($mob?'m/':'')."rt$pageidx.htm", "Routes:".($linespages > 1 ? ' '.($pageidx+1)." of ".$linespages:'')
        .altRtViewHTML($pageidx)."<br>\n".$file);
}
sub write_html { #$filename, $string
    write_file($_[0], {binmode => ':raw'}, '<html><head><meta name=mobileoptimized content=0></head><body>'.$_[1].'</body></html>');
    system('html-minifier -c "../minify_config.json" -o "'.$_[0].'" "'.$_[0].'"') if $minifyhtml;
}
