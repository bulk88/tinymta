
use strict;
use Data::Dumper;
$Data::Dumper::Sortkeys = 1;
use Sort::Naturally;
use Cpanel::JSON::XS;
use File::Slurp;
use Readonly;

our $VAR1;
do '.\routedatafinal.pl';
my $nmap_stations;
Readonly::Scalar($nmap_stations, decode_json(read_file('nmap_stations.json')));
#print Dumper($nmap_stations);
my %etasid;
my %exp_sta = (
'Hoyt - Schermerhorn Sts' => 'Hoyt Schermerhorn',
'47-50 Sts - Rockefeller Ctr' => '47-50 Sts Rockefeller Center',
'34 St - 11 Av' => "34 St-Hudson Yards",
'Woodside - 61 St' => "61 St Woodside",
'Brooklyn Bridge - City Hall' => "Bklyn Br City Hall",
'Briarwood - Van Wyck Blvd' => "Briarwood",
'42 St - Bryant Pk' => "42 St Bryant Park",
'85 St - Forest Pkwy' => "85 St Forest Parkway",
'Kew Gardens - Union Tpke' => "Kew Gardens Union Turnpike",
'Far Rockaway - Mott Av' => "Far Rockaway Mott Ave",
'Lexington Av/53 St' => "Lex Av-53 St",
'Lexington Av/59 St' => "Lexington Av 59 St",
'Lexington Av/63 St' => "Lexington Av 63 St",
'Sutphin Blvd - Archer Av - JFK Airport' => "Sutphin Blvd-Archer Av JFK Airport",
'Morrison Av- Sound View' => "Morrison Av Soundview",
'E 143 St - St Mary\'s St' => "E 143 St St Mary’s St",
'Bedford Park Blvd - Lehman College' => "Bedford Pk Blvd Lehman College",
'Crown Hts - Utica Av' => "Crown Heights Utica Av",
'5 Av/59 St' => '5 Av-59 St',
'5 Av/53 St' => '5 Av-53 St',
'Union Sq - 14 St' => "14 St - Union Sq",
'Aqueduct - N Conduit Av' => "Aqueduct North Conduit Av",
'West Farms Sq - E Tremont Av' => "West Farms Sq East Tremont Av",
'Westchester Sq - E Tremont Av' => "Westchester Sq East Tremont Av",
'57 St - 7 Av' => "57 St-7Av",
'E 105 St' => "East 105 St",
'34 St - Penn Station' => "34 St Penn Stn",
"Prince's Bay" => "Princes Bay",
'168 St - Washington Hts' => "168 St",
#new station doesnt exist on old map
'Arthur Kill' => "Nassau",
#23 E/M, #7 at 33, #7 at 46 were fixed in nmapnidsdata.pl by hand
#this file can't be used now
);

foreach(keys %$VAR1) {
  my $route = $VAR1->{$_};
  foreach my $eta_sta (@$route) {

    my $eta_full_name = $eta_sta->{name};
    if($eta_sta->{stop_id} eq 'B14') {
      0;
    }
    if($eta_full_name eq "Pelham Pkwy" && $eta_sta->{stop_id} eq '504') {
      $eta_full_name = "Pelham Pkwy (5)";
    }
    elsif($eta_full_name eq "Pelham Pkwy" && $eta_sta->{stop_id} eq '211') {
      $eta_full_name = "Pelham Pkwy (2;5)";
    }
    elsif($eta_full_name eq "Gun Hill Rd" && $eta_sta->{stop_id} eq '503') {
      $eta_full_name = "Gun Hill Rd (5)";
    }
    elsif($eta_full_name eq "Gun Hill Rd" && $eta_sta->{stop_id} eq '208') {
      $eta_full_name = "Gun Hill Rd (2;5)";
    }
    elsif($eta_full_name eq 'Woodhaven Blvd' && $eta_sta->{stop_id} eq 'G11') {
      $eta_full_name = "Woodhaven Blvd (M;R)";
    }
    elsif($eta_full_name eq "34 St - Penn Station") {
      $eta_full_name = "34 St Penn Stn";
    }
    elsif($eta_full_name eq "Grand St" && $eta_sta->{stop_id} eq 'D22') {
      $eta_full_name = "Grand St (B;D)";
    }
    elsif($eta_full_name eq "36 St" && $eta_sta->{stop_id} eq 'G20') {
      $eta_full_name = "36 St (M;R)";
    }
    elsif($eta_full_name eq "36 St" && $eta_sta->{stop_id} eq 'R36') {
      $eta_full_name = "36 St (D;N;R)";
    }
    elsif($eta_full_name eq "86 St" && $eta_sta->{stop_id} eq 'R44') {
      $eta_full_name = "86 St (R)";
    }
    #50 St vs Bay 50 conflict
    elsif($eta_full_name eq "50 St" && $eta_sta->{stop_id} eq 'B14') {
      $eta_full_name = "50 St (D)";
    }
    #7 Av B/Q vs 7 Av manhat 53 conflict
    elsif($eta_full_name eq "7 Av" && $eta_sta->{stop_id} eq 'D14') {
      $eta_full_name = "7 Av (E;B;D)";
    }
    elsif($eta_full_name eq "7 Av" && $eta_sta->{stop_id} eq 'D25') {
      $eta_full_name = "7 Av (B;Q)";
    }
    elsif($eta_full_name eq "Atlantic Av - Barclays Ctr" && $eta_sta->{stop_id} eq 'D24') {
      $eta_full_name = "Atlantic Av-Barclays Ctr (D;N;R)";
    }
    #"8 Av (N)" vs "18 Av (N)" conflict
    elsif($eta_full_name eq "8 Av" && $eta_sta->{stop_id} eq 'N02') {
      $eta_full_name = "8 Av (N)";
    }
    #9st/4 ave matches a ton of 59 st 49 st 169 st etc
    elsif($eta_full_name eq "9 St" && $eta_sta->{stop_id} eq 'R33') {
      $eta_full_name = "4 Av-9 St";
    }
    #14 st orange vs "14 St - Union Sq" conflict
    elsif($eta_full_name eq "14 St" && $eta_sta->{stop_id} eq 'D19') {
      $eta_full_name = "14 St (F;M)";
    }
    elsif($eta_full_name eq "23 St" && $eta_sta->{stop_id} eq 'D18') {
      $eta_full_name = "23 St (F;M)";
    }
    #conflict against "Rockaway Park Beach 116 St" "A" station
    elsif($eta_full_name eq "116 St" && $eta_sta->{stop_id} eq 'A16') {
      $eta_full_name = "116 St (B;C)";
    }
    #dont guess to 86 Street N brooklyn
    elsif($eta_full_name eq "86 St" && $eta_sta->{stop_id} eq 'Q04') {
      $eta_full_name = "86 St (4;5;6)";
    }
    elsif($eta_full_name eq "72 St" && $eta_sta->{stop_id} eq 'Q03') {
      $eta_full_name = "68 St Hunter College";
    }
    elsif($eta_full_name eq "96 St" && $eta_sta->{stop_id} eq 'Q05') {
      $eta_full_name = "96 St (6)";
    }
    
    my $alt_eta_full_name = $eta_full_name;
    $alt_eta_full_name =~ s/ - /-/;
    my $alt2_eta_full_name = $eta_full_name;
    $alt2_eta_full_name =~ s/ - / /;
    die "bad ".$eta_full_name if $nmap_stations->{'Canal St'};
    if($nmap_stations->{$exp_sta{$eta_full_name}}) {
      $etasid{$eta_sta->{stop_id}} = $nmap_stations->{$exp_sta{$eta_full_name}}[0];
    }
    elsif($nmap_stations->{$eta_full_name}) {
      $etasid{$eta_sta->{stop_id}} = $nmap_stations->{$eta_full_name}[0];
    }
    elsif($nmap_stations->{$alt_eta_full_name}) {
      $etasid{$eta_sta->{stop_id}} = $nmap_stations->{$alt_eta_full_name}[0];
    }
    elsif($nmap_stations->{$alt2_eta_full_name}) {
      $etasid{$eta_sta->{stop_id}} = $nmap_stations->{$alt2_eta_full_name}[0];
    }
    else {
      my $eta_route = substr($eta_sta->{stop_id},0,1);
      if($eta_route eq 'A') {
        $eta_route = 'A|C';
      }
      #west end line internal is B, D to public
      elsif($eta_route eq 'B') {
        $eta_route = 'D';
      }
      #brighton internal is D, Q to public
      elsif($eta_route eq 'D') {
        #D18 name 23 St 6th ave
        $eta_route = 'D|Q|M';
      }
      #new lots ave internally is 2, 3 to public
      elsif($eta_route eq '2') {
        $eta_route = '2|3';
      }
      #lower nassau is M internal, J to public
      elsif($eta_route eq 'M') {
        #essex is "FMZ" no J
        $eta_route = 'J|Z';
      }
      elsif($eta_route eq 'R') {
        #broadway G and broadway N
        $eta_route = 'R|N';
      }
      my $found = 0;
      foreach my $nmap_sta_name (keys %$nmap_stations) {
        #autoviviy hazaard fix tomorrow
        my $nmap_routes = $nmap_stations->{$nmap_sta_name}[1];
        #parens exist in some names
        if($nmap_sta_name =~ /\Q$eta_full_name\E/) {
          if ($nmap_routes =~ /$eta_route/) {
            $etasid{$eta_sta->{stop_id}} = $nmap_stations->{$nmap_sta_name}[0];
            $found = 1;
            last;
          }
          else {
            0;
          }
        }
        elsif($nmap_sta_name =~ /\Q$alt_eta_full_name\E/) {
          if ($nmap_routes =~ /$eta_route/) {
            $etasid{$eta_sta->{stop_id}} = $nmap_stations->{$nmap_sta_name}[0];
            $found = 1;
            last;
          }
          else {
            0;
          }
        }
      }
      if(!$found) {
        print "not found SID ".$eta_sta->{stop_id}." name ".$eta_sta->{name}."\n";
      }
    }
  }
}
unlink('nmapnidsdata.pl');
open(NID, ">", 'nmapnidsdata.pl')
        || die "$0: can't open nmapidsdata.pl for writing: $!";
select(NID);
binmode(NID);
print Dumper(\%etasid);
