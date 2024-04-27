#Wireshark filter gen tool

my @domains = qw (
tinymta.com
tinymta.us.to
gh.tinymta.us.to
tiles1.tinymta.us.to
tiles2.tinymta.us.to
wvoice.us.to
api.weather.com
collector-otp-prod.camsys-apps.com
otp-mta-prod.camsys-apps.com
backend-unified.mylirr.org
);
my %blocks = ('1.1.1' => 1, '4.2.2' => 1, '8.8.8' => 1);
my $o;
my @ips;
my @nets;
foreach my $domain (@domains) {
$o = `nslookup $domain`;
$o =~ s/^Address:  .+$//m;
@ips = $o =~ /(\d{1,3}(?:\.\d{1,3}){3})/g;
foreach my $ip (@ips) {
  $ip =~ /^(\d{1,3}.\d{1,3}.\d{1,3})/;
  $blocks{$1} = 1;
}
}
#run 2x to deal with DNS LBs, aka CF
foreach my $domain (@domains) {
$o = `nslookup $domain`;
$o =~ s/^Address:  .+$//m;
@ips = $o =~ /(\d{1,3}(?:\.\d{1,3}){3})/g;
foreach my $ip (@ips) {
  $ip =~ /^(\d{1,3}.\d{1,3}.\d{1,3})/;
  $blocks{$1} = 1;
}
}

foreach( keys %blocks ) {
  push @nets, "net ".$_.".0/24";
}

print join(' or ', @nets);

