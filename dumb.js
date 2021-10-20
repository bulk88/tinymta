function kph(e) {
  var realkey;
  switch (e.keyCode) {
    case 38: //up arrow
      realkey = 'Up';
      break;
    case 39: //right arrow
      realkey = 'Right';
      break;
    case 40: //down arrow
      realkey = 'Down';
      break;
    case 37: //left arrow
      realkey = 'Left';
      break;
    case 13: //center
      realkey = 'Enter';
      break;
    case 8: //C button
      realkey = "Backspace";
      break;
    case 49: //asci 1
      realkey = 1;
      break;
    case 50: //asci 2
    case 65: //asci A
    case 97: //asci a
      realkey = 2;
      break
    case 51: //asci 3
    case 68: //ascii D
    case 100: //ascii d
      realkey = 3;
      break;
    case 52: //asci 4
    case 71: //asci G
    case 103: //asci g
      realkey = 4;
      break;
    case 53: //asci 5
    case 74: //asci J
    case 106: //asci j
      realkey = 5;
      break;
    case 54: //asci 6
    case 77: //asci M
    case 109: //asci m
      realkey = 6;
      break;
    case 55: //asci 7
    case 80: //asci P
    case 112: //asci p
      realkey = 7;
      break;
    case 56: //asci 8
    case 84: //asci T
    case 116: //asci t
      realkey = 8;
      break;
    case 57: //asci 9
    case 87: //asci W
    case 119: //asci w
      realkey = 9;
      break;
    case 32: //asci SPACE
      realkey = 0;
      break;
    case 190: //asci period
    case 46: //asci peroid
      realkey = '*';
      break;

  }
  if (/^\d+$/.test(realkey)) {
    document.querySelector('[accesskey="' + realkey + '"]').click()
  }
}
document.addEventListener('keyup', kph);
document.addEventListener('keypress', kph);
document.addEventListener('keypress', kph);
