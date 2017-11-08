#generate routes, usage perl grmp.pl grmp generate routes multi page
use strict;
use File::Slurp;
use POSIX qw/ceil/;
use Data::Dumper;

#abbreviate boro links for 2-4 KB smaller html file
my %borotbl = ( 'Queens' => 'Q',
                'Manhattan' => 'M',
                'Bronx' => 'B',
                'Brooklyn' => 'K',
                'Staten Island' => 'S',
            );
die "usage: grmp.pl JS RAW
JS=1 RAW=0 stop.htm/JS/CORS/JSONP
JS=1 RAW=1 GWL proxy
JS=0 RAW=0 loband/mlvb.net proxy
JS=0 RAW=1 RAW urls" if ! defined $ARGV[0] || ! defined $ARGV[1];

my $js = $ARGV[0];
my $raw = $ARGV[1];
#VERY VERY VERY slow, set to 0 during development, TODO research having 1
#nodejs processes instead of a million system() calls
my $minifyhtml = !$ENV{DISABLEMINI};
our $VAR1;
do 'routedatafinal.pl';
my @lineshtml;

{
my @routes = sort keys %$VAR1;
#Move 7 train down to put right after 6 train, move 6X train above 7 train
#this is so access keys for dumb phones, for the IRT lines, match keypad
my $swap = $routes[6];
die "swap route target 6X not found, revise code" if $swap ne '6X';
$routes[6] = $routes[7];
$routes[7] = $swap;

foreach my $routename (@routes) {
    my $route = $$VAR1{$routename};
    my (%boroughs, @boroughs);
    foreach my $stopidx (0..@$route-1) {
        my $stop = $$route[$stopidx];
        my $borough = $stop->{borough};
        push(@{$boroughs{$borough}}, {name => $stop->{name}, stop => $stop->{stop_id}});
    }
    @boroughs = sort keys %boroughs;
    my $rtfile = "$routename:";
    my $accesskeyidx = 1; #only 5 boroughs so no overflow check
    foreach my $borough (@boroughs) {
        if(@{$boroughs{$borough}} > 1 ) {
            $rtfile .= ' <a accesskey='.$accesskeyidx++.' href="'.$routename.$borotbl{$borough}.'.htm">'.$borough.'</a>';
            my @borohtml;
            foreach my $stopidx (0..@{$boroughs{$borough}}-1) {
                my $name = ${$boroughs{$borough}}[$stopidx]->{name};
                my $stopid = ${$boroughs{$borough}}[$stopidx]->{stop};
                push(@borohtml, stopid_to_href($routename,$stopid).'>'.$name."</a>\n");
            }
            my $boropages = ceil(scalar(@borohtml) / 9);
            my $pageidx;
            while (my @dumbborohtml = splice @borohtml, 0, 9) { #break down stop list into chunks of 9
                my $borofile = "$routename: $borough".($boropages > 1 ? ' '.($pageidx+1).' of '.$boropages:'')."<br>\n";
                my $accesskeyidx = 1;
                foreach my $stopline (@dumbborohtml) {
                    $borofile .= '<a accesskey='.$accesskeyidx++.' '.$stopline;
                }
                if(@borohtml) {
                    $borofile .= '<a accesskey=0 href='.$routename.$borotbl{$borough}.($pageidx+1).'.htm>More</a>'."\n";
                }
                write_html('docs/'.($js?($raw?'gwl/':'js/'):($raw?'raw/':'')).$routename.$borotbl{$borough}.$pageidx.'.htm', $borofile);
                $pageidx++;
            }
        } else {    #if 1 station per boro, just jump straight to station
                    #saves a tap, only L/Queens/Halsey has this property
            $rtfile .= ' <a accesskey='.$accesskeyidx++.' '.stopid_to_href($routename,${$boroughs{$borough}}[0]->{stop}).'>'.$borough.'</a>';
        }

    }
    if(@boroughs > 1) { #partial 'a' tag HTML line, prefix added in later pass
        push(@lineshtml, 'href="'.$routename.'.htm">&nbsp;'.$routename.'&nbsp;</a>');
        write_html('docs/'.($js?($raw?'gwl/':'js/'):($raw?'raw/':''))."$routename.htm", $rtfile."\n");
    } else { #jump directly to per-boro station page, suppress boro selection file
        push(@lineshtml, 'href="'.$routename.$borotbl{$boroughs[0]}.'.htm">&nbsp;'.$routename.'&nbsp;</a>');
    }
}
}

sub stopid_to_href { #$href_attr = stopid_to_href($routename, $stopid)
#MTA server returns MIME types application/json (no "callback=") or text/javascript (with "callback=")
#openwave dumbphone browser doesn't take either MIME, gives unsupported content warning
#Googleweblight gives "Transcoding test failed: Content-Type of this page is not text/html."
#Mobileleap in Openwave errors out since Openwave doesn't seem to accept the "Set-Cookie" header from
#mobileleap, it does from other sites, probably because of expiration or domain properties in the header
#but mobileleap has neither and openwave ignores the header, so mobileleap errors out
#so use mobileleap to convert MIME to something normal, then loband.org to fix cookie issue
#anyone got a better transcoder/proxy sandwich?
    return ($js?($raw?'href="http://googleweblight.com/?lite_url=http://tinymta.us.to/gstp.htm%23':'href="../stop.htm#')
                        : ($raw?'href="http://54.90.113.57/getTime/':
                                    'href="http://www.loband.org/loband/filter/net/mlvb/%20/54.90.113.57/getTime/')).
                     ($_[0] eq 'SI' ? 'SIR' : $_[0]).'/'.$_[1].($js?($raw?'&f=1&lite_refresh=1':''):'?callback=X').'"';
}

my $accesskeyidx = 1;
my $pageidx;
my $file;

sub altRtViewHTML {
    my $html;
    my $pageidx = $_[0];
    if($js) {
        if($raw) {
            $html .= ' <a href="../rt'.$pageidx.'.htm">No JS</a>';
            $html .= ' <a href="../js/rt'.$pageidx.'.htm">Use JS</a>';
            $html .= ' <a href="../raw/rt'.$pageidx.'.htm">Use Raw</a>';
        } else {
            $html .= ' <a href="../rt'.$pageidx.'.htm">No JS</a>';
            $html .= ' <a href="../raw/rt'.$pageidx.'.htm">Use Raw</a>';
            $html .= ' <a href="../gwl/rt'.$pageidx.'.htm">Use GWL</a>';
        }
    } else {
        if($raw) {
            $html .= ' <a href="../rt'.$pageidx.'.htm">No JS</a>';
            $html .= ' <a href="../js/rt'.$pageidx.'.htm">Use JS</a>';
            $html .= ' <a href="../gwl/rt'.$pageidx.'.htm">Use GWL</a>';
        } else {
            $html .= ' <a href="raw/rt'.$pageidx.'.htm">Use Raw</a>';
            $html .= ' <a href="js/rt'.$pageidx.'.htm">Use JS</a>';
            $html .= ' <a href="gwl/rt'.$pageidx.'.htm">Use GWL</a>';
        }
    }
    return $html;
}

foreach my $line (@lineshtml) {
    $file .= '<a accesskey='.$accesskeyidx.' '.$line." \n";
    $accesskeyidx++;
    if($accesskeyidx == 10 && @lineshtml){
        $accesskeyidx = 1;
        $file .= '<a accesskey=0 href=rt'.($pageidx+1).'.htm>More</a>'."\n";
        write_html('docs/'.($js?($raw?'gwl/':'js/'):($raw?'raw/':''))."rt$pageidx.htm", "Routes: ".($pageidx+1)." of ".ceil(scalar(@lineshtml) / 9)
            .altRtViewHTML($pageidx)."<br>\n".$file);
        $file = '';
        $pageidx++;
    }
}
if($file){
    write_html('docs/'.($js?($raw?'gwl/':'js/'):($raw?'raw/':''))."rt$pageidx.htm", "Routes: ".($pageidx+1)." of ".ceil(scalar(@lineshtml) / 9)
        .altRtViewHTML($pageidx)."<br>\n".$file);
}
sub write_html { #$filename, $string
    write_file($_[0], {binmode => ':raw'}, '<html><head><meta name=mobileoptimized content=0></head><body>'.$_[1].'</body></html>');
    system('html-minifier -c "minify_config.json" -o "'.$_[0].'" "'.$_[0].'"') if $minifyhtml;
}
