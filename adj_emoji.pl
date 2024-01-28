use strict;
use File::Slurp;

my $file = read_file( $ARGV[0], { binmode => ':raw' } );
#replace raindrop back to JS escape b/c Win32 openwave emulator crashes on
#non-BMP raw utf8 crashes openwave emulator
#
#Debug console
# DevSocketWrite
# RequestManagerSink::onEvent Event: Type[6] Sink[0xC]
# DevSocketRead
# DevDrmIsCopyright called for content text/html 
# Created new debug stream 'dbgMMVerbose'
# DevWaitReason(1)
# DevWaitEnd
# Exception thrown at 0x7700C5AF in phone.exe: Microsoft C++ exception: std::bad_alloc at memory location 0x048EFB9C.

# The program '[15292] phone.exe' has exited with code 0 (0x0).



 	# [External Code]	
 	# msvcp71.dll!std::_Nomemory() Line 9	C++
 	# msvcp71.dll!operator new(unsigned int size) Line 12	C++ #not using debuggung version but size is 745,425,344
# >	msvcp71.dll!std::basic_string<unsigned short,std::char_traits<unsigned short>,std::allocator<unsigned short>>::_Copy(unsigned int _Newsize, unsigned int _Oldlen) Line 1454	C++
 	# msvcp71.dll!std::basic_string<unsigned short,std::char_traits<unsigned short>,std::allocator<unsigned short>>::_Grow(unsigned int _Newsize, bool _Trim) Line 1485	C++
 	# msvcp71.dll!std::basic_string<unsigned short,std::char_traits<unsigned short>,std::allocator<unsigned short>>::append(unsigned int _Count, unsigned short _Ch) Line 547	C++
 	# msvcp71.dll!std::wstring::operator+=(wchar_t _Ch) Line 493	C++
 	# phone.exe!004672e1()	Unknown


my $pos = index($file,"\xF0\x9F\x92\xA7",0);
die "bad utf8 raindrop emoji match" if $pos == -1;
#turn raw utf8 back into escape
substr($file, $pos, 4, '\ud83d\udca7');
write_file($ARGV[0], {binmode => ':raw'}, $file);
