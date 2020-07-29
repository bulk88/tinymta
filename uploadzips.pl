use Net::GitHub::V3;
use DateTime;
use Net::SSLeay;
use Data::Dumper;
use File::Slurp;

package Net::GitHub::V3::GitData;
__build_methods(__PACKAGE__,
    delete_ref => { url => "/repos/%s/%s/git/refs/%s", method => 'DELETE', args => 1, check_status => 204}
);
package main;

die unless $ENV{GITHUB_ACCESS_TOKEN};

my $gh = Net::GitHub::V3->new(
access_token => $ENV{GITHUB_ACCESS_TOKEN},
);
my $repos = $gh->repos;
$repos->RaiseError(0);

# set :user/:repo for simple calls
my $dt = DateTime->now();
my $tag = $dt->month_abbr().'_'.$dt->day().'_'.$dt->year();
$repos->set_default_user_repo('bulk88', 'tinymta');
my @releases = $repos->releases();
#delete same day tags from repushes/etc
foreach(@releases) {
    if($_->{name} eq $tag){
        my $r = $repos->delete_release($_->{id});
    }
}
my $git_data = $gh->git_data;
$git_data->set_default_user_repo('bulk88', 'tinymta');
my $response = $git_data->delete_ref('tags/'.$tag); #$response is integer 1
my $release = $repos->create_release({
  "tag_name" => $tag,
  "target_commitish" => "master",
  "name" => $tag,
  "body" => "Tinymta offline release",
});
if($release->{errors}) {
    print Dumper($release);
} else {
    my $text = read_file("full.zip", { binmode => ':raw' });
    my $asset = $repos->upload_asset($release->{id}, "full.zip", 'application/zip', $text);
    if($asset->{errors}) {
        print Dumper($asset);
    }
    $text = read_file("light.zip", { binmode => ':raw' });
    $asset = $repos->upload_asset($release->{id}, "light.zip", 'application/zip', $text);
    if($asset->{errors}) {
        print Dumper($asset);
    }
}
print "Done Uploading Release Zips to GH\n";
