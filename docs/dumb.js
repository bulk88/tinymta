function e(e){var a;switch(e.keyCode){case 38:a="Up";break;case 39:a="Right";break;case 40:a="Down";break;case 37:a="Left";break;case 13:a="Enter";break;case 8:a="Backspace";break;case 49:a=1;break;case 50:case 65:case 97:a=2;break;case 51:case 68:case 100:a=3;break;case 52:case 71:case 103:a=4;break;case 53:case 74:case 106:a=5;break;case 54:case 77:case 109:a=6;break;case 55:case 80:case 112:a=7;break;case 56:case 84:case 116:a=8;break;case 57:case 87:case 119:a=9;break;case 32:a=0;break;case 190:case 46:a="*"}/^\d+$/.test(a)&&document.querySelector('[accesskey="'+a+'"]').click()}document.addEventListener("keyup",e),document.addEventListener("keypress",e),document.addEventListener("keypress",e);