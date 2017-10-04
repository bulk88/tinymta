#generate routes, usage perl grmp.pl grmp generate routes multi page
use strict;
use File::Slurp;
use POSIX qw/ceil/;
use Data::Dumper;

#BUGGGG 6X.htm is broken

#abbreviate boro links for 2-4 KB smaller html file
my %borotbl = ( 'Queens' => 'Q',
                'Manhattan' => 'M',
                'Bronx' => 'X',
                'Brooklyn' => 'B',
                'Staten Island' => 'S',
            );
die "1st arg must be generate JS stations or no-JS" if ! defined $ARGV[0];
die "2nd arg must be generate proxy URLs or raw" if ! defined $ARGV[1];
my $js = $ARGV[0];
my $raw = $ARGV[1];
#VERY VERY VERY slow, set to 0 during development, TODO research having 1
#nodejs processes instead of a million system() calls
my $minifyhtml = 1;
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
        $rtfile .= ' <a accesskey='.$accesskeyidx++.' href="'.$routename.$borotbl{$borough}.'.htm">'.$borough.'</a>';
        my @borohtml;
        foreach my $stopidx (0..@{$boroughs{$borough}}-1) {
            my $name = ${$boroughs{$borough}}[$stopidx]->{name};
            my $stopid = ${$boroughs{$borough}}[$stopidx]->{stop};
            #MTA server returns MIME types application/json (no "callback=") or text/javascript (with "callback=")
            #openwave dumbphone browser doesn't take either MIME, gives unsupported content warning
            #Googleweblight gives "Transcoding test failed: Content-Type of this page is not text/html."
            #Mobileleap in Openwave errors out since Openwave doesn't seem to accept the "Set-Cookie" header from
            #mobileleap, it does from other sites, probably because of expiration or domain properties in the header
            #but mobileleap has neither and openwave ignores the header, so mobileleap errors out
            #so use mobileleap to convert MIME to something normal, then loband.org to fix cookie issue
            #anyone got a better transcoder/proxy sandwich?
            push @borohtml,
                (($js?'href="../stop.htm#'
                    : ($raw?'href="http://54.90.113.57/getTime/':
                                'href="http://www.loband.org/loband/filter/net/mlvb/%20/54.90.113.57/getTime/')).
                 ($routename eq 'SI' ? 'SIR' : $routename).'/'.$stopid.($js?'':'?callback=X').'">'.$name.'</a>'."\n");
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
            write_html('docs/'.($js?'js/':($raw?'raw/':'')).$routename.$borotbl{$borough}.$pageidx.'.htm', $borofile);
            $pageidx++;
        }

    }
    if(@boroughs > 1) { #partial 'a' tag HTML line, prefix added in later pass
        push(@lineshtml, 'href="'.$routename.'.htm">&nbsp;'.$routename.'&nbsp;</a>');
        write_html('docs/'.($js?'js/':($raw?'raw/':''))."$routename.htm", $rtfile."\n");
    } else { #jump directly to per-boro station page, suppress boro selection file
        push(@lineshtml, 'href="'.$routename.$borotbl{$boroughs[0]}.'.htm">&nbsp;'.$routename.'&nbsp;</a>');
    }
}
}

my $accesskeyidx = 1;
my $pageidx;
my $file;

sub altRtViewHTML {
    my $html;
    my $pageidx = $_[0];
    if($js) {
        $html .= ' <a href="../rt'.$pageidx.'.htm">No JS</a>';
        $html .= ' <a href="../raw/rt'.$pageidx.'.htm">Use Raw</a>';
    } else {
        if($raw) {
            $html .= ' <a href="../rt'.$pageidx.'.htm">No JS</a>';
            $html .= ' <a href="../js/rt'.$pageidx.'.htm">Use JS</a>';
        } else {
            $html .= ' <a href="raw/rt'.$pageidx.'.htm">Use Raw</a>';
            $html .= ' <a href="js/rt'.$pageidx.'.htm">Use JS</a>';
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
        write_html('docs/'.($js?'js/':($raw?'raw/':''))."rt$pageidx.htm", "Routes: ".($pageidx+1)." of ".ceil(scalar(@lineshtml) / 9)
            .altRtViewHTML($pageidx)."<br>\n".$file);
        $file = '';
        $pageidx++;
    }
}
if($file){
    write_html('docs/'.($js?'js/':($raw?'raw/':''))."rt$pageidx.htm", "Routes: ".($pageidx+1)." of ".ceil(scalar(@lineshtml) / 9)
        .altRtViewHTML($pageidx)."<br>\n".$file);
}
sub write_html { #$filename, $string
    write_file($_[0], {binmode => ':raw'}, '<html><head><meta name=mobileoptimized content=0></head><body>'.$_[1].'</body></html>');
    system('html-minifier --collapse-boolean-attributes --collapse-whitespace --html5 --remove-attribute-quotes --remove-comments --remove-empty-attributes --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-tag-whitespace --sort-attributes --sort-class-name --trim-custom-fragments --use-short-doctype -o '.$_[0].' '.$_[0]) if $minifyhtml;
}
