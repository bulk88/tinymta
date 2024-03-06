//bulk88 note, this unchanged from from "Qomo.V1(f4).p1.zip", a very old
//chinese lang early web framework, this file is saved for RESEARCH ONLY,
//mentally read and eval each PF here before use
var undefined = void null;

// for Array Object
Array.prototype.push = function() {
  var i=this.length, j=0, jmax=arguments.length;
  this.length += jmax;
  while (j<jmax) this[i++]=arguments[j++];

  return this.length;
}

Array.prototype.pop = function() {
  if (this.length > 0) {
    var v = this[this.length-1];
    this.length--;
    return v;
  }
}

Array.prototype.splice = function(start, deleteCount) {
  var arr = arr2 = this.slice(start, start+deleteCount);
  if (arguments.length > 2) {
    arguments.slice = Array.prototype.slice;
    arr2 = arguments.slice(2).concat(arr);
  }

  // push all
  var j=0, jmax = arr2.length;
  this.length = start;
  while (j<jmax) this[start++]=arr2[j++];

  return arr;
}

Array.prototype.shift = function() {
  this.reverse();
  this.length--;
  this.reverse();
}

Array.prototype.unshift = function() {
  this.reverse();
  arguments.reverse = Array.prototype.reverse;
  arguments.reverse();

  // push all
  var i=this.length, j=0, jmax=arguments.length;
  this.length += jmax;
  while (j<jmax) this[i++]=arguments[j++];

  return this.reverse();
}

// for Function Object
void function() {
  var _f_apply_foo = ['this', ''];
  var _f_apply_obj = ['var r=obj[""]', '', 'delete obj[""]; r;'];
  var _f_args = function(n){
    var i=1, s='(';
    if (n>0) for (s+='v[0]'; i<n; i++) s += ', v[' + i +']';
    return _f_args[n] = s+');'
  }

  function _apply(obj, args) {
    if (arguments.length=0) return this();

    var v = args, a = _f_args;
    var n = v?v.length.valueOf():0;
    var cmd = (obj ? _f_apply_obj : _f_apply_foo).slice(0);

    switch (typeof obj) {
      case 'string': obj = new String(obj); break;
      case 'number': obj = new Number(obj); break;
      case 'boolean': obj = new Boolean(obj); break;
      case 'function':;
    }

    // a reference of 'this' Function object
    if (!(obj===undefined || obj===null)) obj[''] = this;
    if (!(cmd[1]=a[n])) cmd[1]=a(n); // make arguments string
    return eval(cmd.join(''));       // call and return
  }

  Function.prototype.call = function (obj) {
    arguments.slice = Array.prototype.slice;
    return this.apply(obj, arguments.slice(1));
  }

  Function.prototype.apply = _apply;
}();

// for RegExp Object
void function() {
  var _exec = RegExp.prototype.exec;
  var NONE = new Array('');
  var _len = 0;

  //RegExp global object fixed by regexp.exec(), test() and
  //string.match(), replace(), split(), search() method.

  function _SetRegExp(arr) {
    // set RegExp.$1..$9
    for (var i=1, n=Math.min(10, arr.length); i<n; i++) RegExp['$'+i] = arr[i];
    // clear old value
    while (n<10) RegExp['$'+n++] = '';

    RegExp["$_"] = RegExp.input;
    RegExp["$&"] = RegExp.lastMatch = arr[0];
    RegExp["$+"] = RegExp.lastParen = arr[arr.length-1];
  }

  RegExp.prototype.exec = function (str){
    var arr = _exec.call(this, str);
    if (arr === null) arr = NONE;
    _SetRegExp(arr, RegExp.input);
    RegExp["$`"] = RegExp.leftContext = RegExp.input.substr(0, RegExp.index);
    RegExp["$'"] = RegExp.rightContext = RegExp.input.substr(RegExp.lastIndex);

    this.lastIndex = RegExp.lastIndex;
    return (arr == NONE ? null : arr);
  }

  String.prototype.search = function (r){
    r.lastIndex = 0;
    return (r.exec(this) ? RegExp.index : -1);
  }

  var _pattern, _strReplace = function() {
    var n,c,s=_pattern[0], m=Math.min(arguments.length-3, 99);
    for (var i=1,imax=_pattern.length; i<imax; i++) {
      if (isNaN(n=parseInt(_pattern[i]))) {
        switch (c=_pattern[i].charAt(0)) {
          case "&":
          case "'": s += RegExp['$'+c] + _pattern[i].substr(1); break;
          case "" : break;
          case "`": // $debug('warning: is very inefficient in IE5.0x
          default : s += '$' + _pattern[i];   //'$' and other
        }
      }
      else {
        s += (n>m ? _pattern[i] : arguments[n] + _pattern[i].substr(n.toString.length));
      }
    }
    return s;
  }

  var _replace = String.prototype.replace;
  String.prototype.replace = function (r, f){
    if (!(r instanceof RegExp)) return _replace.call(this, r, f);

    if ((typeof f == 'function') || (f instanceof Function)) {
      var flags = r.toString();
      flags = flags.substr(flags.lastIndexOf('/'));
      var arr, args, s=this, p=0, v=[], global = flags.indexOf('g') > 0;

      r.exec = _exec;
      try {
        do {
          arr = r.exec(s);
          if (!arr) {
            v[v.length] = s;  // push
            break;
          }
          else {
            // BUG: in replaceFunction, next value is faked!!!
            //  RegExp.index, RegExp.lastIndex, RegExp.input
            _SetRegExp(arr);
            RegExp["$'"] = RegExp.rightContext = s.substr(RegExp.lastIndex);

            // inefficient! so skip...
            // RegExp["$`"] = RegExp.leftContext = this.substr(0, RegExp.index+p); //fix left

            args = arr.concat([RegExp.index+p, this]);
            v[v.length] = s.substr(0, RegExp.index);  // push, left string
            p += RegExp.lastIndex;                    // move position
            s = RegExp.rightContext;                  // next is rightContext
            v[v.length] = f.apply(null, args);        // push, replace match string
          }
        } while (global);
      }
      finally {
        r.exec = RegExp.prototype.exec;
      }
      return v.join('');
    }
    else {
      if (f.indexOf('$') == -1) {
        return _replace.call(this, r, f);
      }
      else {
        _pattern = f.toString().split('$');
        return this.replace(r, _strReplace);
      }
    }
  }
}();

Object.prototype.propertyIsEnumerable = function(proName) {
  for (var i in this) if (i==proName) break;
  if (i != proName) return false;

  // clone by prototype?
  return this[proName] !== this.constructor.prototype[proName];
}

Object.prototype.hasOwnProperty = function(proName) {
  if (typeof this[proName] != 'undefined') {
    return this[proName] !== this.constructor.prototype[proName];
  }
  else {
    // if delete obj.proName;
    if (typeof this.constructor.prototype[proName] != 'undefined') return false;

    // has not proName
    for (var i in this) if (i==proName) break;
    if (i != proName) return false;

    // check: this[proName] === prototype[proName] === undefined;
    for (i in this.constructor.prototype) if (i==proName) return false;
    return true;
  }
}

Object.prototype.isPrototypeOf = function(object2) {
  var c = this.constructor;
  while (c !== Function) {
    if (c.prototype==object2) return true;
    c = c.prototype;
  }
  return false;
}

// for other Object types
Error.prototype.name = '';
Error.prototype.message = '';


/* can't implement
  Function.prototype.length = 0;
  Arguments.prototype.callee = null;
*/

/* TODO
  String.prototype.charCodeAt = function() {}
  String.prototype.toLocaleUppercase = function() {}
  String.prototype.toLocaleLowercase = function() {}
  String.prototype.localeCompare = function() {}
  Date.prototype.toTimeString = function() {}
  Date.prototype.toLocaleTimeString = function() {}
  Date.prototype.toLocaleDateString = function() {}
  Date.prototype.toDateString = function() {}
  Number.prototype.toPrecision = function() {}
  Number.prototype.toFixed = function() {}
  Number.prototype.toExponential = function() {}


  // for Global Object
  function encodeURI(URIString) {}
  function decodeURI(URIString) {}
  function decodeURIComponent(encodedURIString) {}
*/

// reformative vbs_JoinBytes(), by aimingoo
window.execScript(''+
'Function vbs_JoinBytes(body) \n'+
'  Dim i, l, n, c1, c2, S, SS() \n'+
'  S = CStr(body) \n'+
'  l = LenB(S) \n'+
'  ReDim SS(l) \n'+

'  n = 0 \n'+
'  For i = 1 To l \n'+
'    c1 = AscB(MidB(S, i, 1)) \n'+
'    If c1 < &H80 Then \n'+
'      SS(n) = Chr(c1) \n'+
'    Else \n'+
'      c2 = AscB(MidB(S, i+1, 1)) \n'+
'      SS(n) = Chr(CLng(c1) * &H100 + c2) \n'+
'      i = i + 1  \n'+
'    End If \n'+
'    n = n + 1 \n'+
'  Next \n'+

'  vbs_JoinBytes = Join(SS, vbNullString) \n'+
'End Function','VBScript');

void function() {
  var _exec = window.execScript;
  var _r_in = /\(\s*([$\w\.]+)\s+in\s+([$\w\.]+)\s*\)/gi;

  _$in$ = function(p,o) {
    for (var i in o) if (p==i) return true
  }

  function _p_in_o(s) {
    return s.replace(_r_in, '(_$$in$$($1, $2))');
  }

  ie5_parser = function(str) {
    return _p_in_o(str);
  }
/*
  window.execScript = function(str, type) {
    _exec(ie5_parser(str), type);
  }
*/
}();

$import('common_ie55.js');