use Data::Dumper;
use Path::Tiny;
$Data::Dumper::Useqq =1;
@p1;
@paths = path("../neighborhoodMaps")->children();
foreach(@paths) {push @p1, $_->children()}
foreach(@p1) {
  $file = $_->slurp();
  # if( -s $file == 8,158) {
    # print "bfs ".$_->canonpath();
  # }
  #print(Dumper(substr($file, 0, 60)));
  if(index($file, "\376\377\0<\0!\0D\0O\0C\0T\0Y\0P\0E\0 \0H\0T\0M\0L\0 \0P\0U\0B\0L\0I\0C\0 \0\"\0-\0/\0/\0W\0003\0C") == 0) {
    print "bf ".$_->canonpath()."\n";
    unlink($_->canonpath());
  }
}