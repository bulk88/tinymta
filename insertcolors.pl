# usage: mand-TAG mand-foo.htm optional-routes.txt optional-bool-long_name
use strict;
use File::Slurp;
use Text::CSV::Hashify;
use JSON::PP;
#use Data::Dumper;
my $tag = $ARGV[0];
my $obj = Text::CSV::Hashify->new( {
    file        => $ARGV[2] ? $ARGV[2] : 'routes.txt',
    format      => 'hoh',
    key         => $ARGV[3] ? "route_long_name" : "route_id",
    quote_char          => '"',
    escape_char          => undef,
    allow_loose_quotes=>1,
    auto_diag => 1,
} );
my $color;
my @routesObj;
my %colors;
my %colors_hits;
my @color_str_tab;
my %color_str_tab_map;
my $routes = $obj->all;
my $coder = JSON::PP->new->ascii;

if (exists $routes->{SI}) {
  if(!length $routes->{SI}{route_color}) {
    $routes->{SI}{route_color} = "0078c6";
  }
  #in alerts, both route names are used
  if(!exists $routes->{SIR}) {
    $routes->{SIR} = {route_color => "0078c6"};
  }
}

foreach(keys %$routes) {
    $color = $routes->{$_}{route_color};
    if(!length $color) {
      if($_ eq "SI") {
        $color = "0078c6"
      } elsif ($_ eq "FS" || $_ eq "H") {
        #same color as GS 42 shuttle
        $color = "6d6e71";
      }
    }
    if(length $color){
        #optimize to 3 digit hex color, only J/Z pass right now
        #decided to not "round" the colors of the other routes
        #REMOVED OPTIMIZATION <font color=E67> invalid for font tag
        #but valid for <span style=color:, egh, dont want to upgrade whole
        #code base and since J/Z only lines, with this optimizatoin, longer tag
        #template in JS wont win vs jus 2 lines of wire bytes of color IMO
        #if (substr($color,0,1) eq substr($color,1,1)
        #    && substr($color,2,1) eq substr($color,3,1)
        #    && substr($color,4,1) eq substr($color,5,1)) {
        #    $color = substr($color,1,1).substr($color,3,1).substr($color,5,1);
        #}

        $colors_hits{$colors{$_} = lc($color)}++;
    } else {
      die "route $_ has no color in ".($ARGV[2] ? $ARGV[2] : 'routes.txt');
    }
}

my @colors_pop_keys = sort { $colors_hits{$b} <=> $colors_hits{$a} } keys(%colors_hits);
foreach(@colors_pop_keys) {
  if($colors_hits{$_} > 1) {
    $color_str_tab_map{$_} = push(@color_str_tab,$_)-1;
  }
}
#print Dumper(\%colors_hits);
#print Dumper(\@color_str_tab);
#print Dumper(\%color_str_tab_map);

foreach(keys %colors) {
  $color = $colors{$_};
  if(exists $color_str_tab_map{$color}) {
    $colors{$_} = $color_str_tab_map{$color};
  }
}

#if this code reused, make sure there is ALWAYS a default hex color
#for colorStrs[colorRoutes[unk_undef_rt]|0]
if(scalar(@color_str_tab) == 0) {
   push(@color_str_tab, "000000"); #black
}

@colors_pop_keys = sort { length($colors{$a}."") <=> length($colors{$b}."") || $colors{$a} cmp $colors{$b} } keys(%colors);
foreach (@colors_pop_keys) {
  $color = $coder->encode($_."").':'.$coder->encode($colors{$_}).',';
  if($colors{$_} ne "0") {
    push(@routesObj, $color);
  } else {
    push(@routesObj, '/*'.$color.'*/');
  }
}



my $file = read_file( $ARGV[1], { binmode => ':raw' } );
my $pos = index($file,"/*START".$tag."COLOR*/
",0);
die "bad starttag match" if $pos == -1;
$pos += length("/*START".$tag."COLOR*/
");
my $endpos = index($file,"
/*END".$tag."COLOR*/", $pos);
die "bad endtag match" if $endpos == -1;

substr($file,$pos, $endpos-$pos, "var colorStrs".$tag." = ".$coder->encode(\@color_str_tab).";\nvar colorRoutes".$tag." = {".substr(join('' , @routesObj), 0, -1)."};");
write_file($ARGV[1], {binmode => ':raw'}, $file);

