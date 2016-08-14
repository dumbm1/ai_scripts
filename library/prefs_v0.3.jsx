/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 10.08.2015
 */


//@target illustrator
//@targetengine 'session'

if ( typeof JSON !== 'object' ) {
  JSON = {};
}
(function () {
  'use strict';

  var rx_one       = /^[\],:{}\s]*$/,
      rx_two       = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
      rx_three     = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
      rx_four      = /(?:^|:|,)(?:\s*\[)+/g,
      rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  function f ( n ) {
    return n < 10
      ? '0' + n
      : n;
  }

  function this_value () {
    return this.valueOf ();
  }

  if ( typeof Date.prototype.toJSON !== 'function' ) {

    Date.prototype.toJSON = function () {

      return isFinite ( this.valueOf () )
        ? this.getUTCFullYear () + '-' +
             f ( this.getUTCMonth () + 1 ) + '-' +
             f ( this.getUTCDate () ) + 'T' +
             f ( this.getUTCHours () ) + ':' +
             f ( this.getUTCMinutes () ) + ':' +
             f ( this.getUTCSeconds () ) + 'Z'
        : null;
    };

    Boolean.prototype.toJSON = this_value;
    Number.prototype.toJSON = this_value;
    String.prototype.toJSON = this_value;
  }

  var gap,
      indent,
      meta,
      rep;

  function quote ( string ) {

    rx_escapable.lastIndex = 0;
    return rx_escapable.test ( string )
      ? '"' + string.replace ( rx_escapable, function ( a ) {
      var c = meta[ a ];
      return typeof c === 'string'
        ? c
        : '\\u' + ('0000' + a.charCodeAt ( 0 ).toString ( 16 )).slice ( -4 );
    } ) + '"'
      : '"' + string + '"';
  }

  function str ( key, holder ) {

    var i,
        k,
        v,
        length,
        mind  = gap,
        partial,
        value = holder[ key ];

    if ( value && typeof value === 'object' &&
      typeof value.toJSON === 'function' ) {
      value = value.toJSON ( key );
    }

    if ( typeof rep === 'function' ) {
      value = rep.call ( holder, key, value );
    }

    switch ( typeof value ) {
      case 'string':
        return quote ( value );

      case 'number':

        return isFinite ( value )
          ? String ( value )
          : 'null';

      case 'boolean':
      case 'null':

        return String ( value );

      case 'object':

        if ( !value ) {
          return 'null';
        }

        gap += indent;
        partial = [];

        if ( Object.prototype.toString.apply ( value ) === '[object Array]' ) {

          length = value.length;
          for ( i = 0; i < length; i += 1 ) {
            partial[ i ] = str ( i, value ) || 'null';
          }

          v = partial.length === 0
            ? '[]'
            : gap
                ? '[\n' + gap + partial.join ( ',\n' + gap ) + '\n' + mind + ']'
                : '[' + partial.join ( ',' ) + ']';
          gap = mind;
          return v;
        }

        if ( rep && typeof rep === 'object' ) {
          length = rep.length;
          for ( i = 0; i < length; i += 1 ) {
            if ( typeof rep[ i ] === 'string' ) {
              k = rep[ i ];
              v = str ( k, value );
              if ( v ) {
                partial.push ( quote ( k ) + (
                                 gap
                                   ? ': '
                                   : ':'
                               ) + v );
              }
            }
          }
        } else {

          for ( k in value ) {
            if ( Object.prototype.hasOwnProperty.call ( value, k ) ) {
              v = str ( k, value );
              if ( v ) {
                partial.push ( quote ( k ) + (
                                 gap
                                   ? ': '
                                   : ':'
                               ) + v );
              }
            }
          }
        }

        v = partial.length === 0
          ? '{}'
          : gap
              ? '{\n' + gap + partial.join ( ',\n' + gap ) + '\n' + mind + '}'
              : '{' + partial.join ( ',' ) + '}';
        gap = mind;
        return v;
    }
  }

  if ( typeof JSON.stringify !== 'function' ) {
    meta = {    // table of character substitutions
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"':  '\\"',
      '\\': '\\\\'
    };
    JSON.stringify = function ( value, replacer, space ) {

      var i;
      gap = '';
      indent = '';

      if ( typeof space === 'number' ) {
        for ( i = 0; i < space; i += 1 ) {
          indent += ' ';
        }

      } else if ( typeof space === 'string' ) {
        indent = space;
      }

      rep = replacer;
      if ( replacer && typeof replacer !== 'function' &&
        (typeof replacer !== 'object' ||
        typeof replacer.length !== 'number') ) {
        throw new Error ( 'JSON.stringify' );
      }

      return str ( '', { '': value } );
    };
  }

  if ( typeof JSON.parse !== 'function' ) {
    JSON.parse = function ( text, reviver ) {

      var j;

      function walk ( holder, key ) {

        var k, v, value = holder[ key ];
        if ( value && typeof value === 'object' ) {
          for ( k in value ) {
            if ( Object.prototype.hasOwnProperty.call ( value, k ) ) {
              v = walk ( value, k );
              if ( v !== undefined ) {
                value[ k ] = v;
              } else {
                delete value[ k ];
              }
            }
          }
        }
        return reviver.call ( holder, key, value );
      }

      text = String ( text );
      rx_dangerous.lastIndex = 0;
      if ( rx_dangerous.test ( text ) ) {
        text = text.replace ( rx_dangerous, function ( a ) {
          return '\\u' +
            ('0000' + a.charCodeAt ( 0 ).toString ( 16 )).slice ( -4 );
        } );
      }

      if (
        rx_one.test (
          text
            .replace ( rx_two, '@' )
            .replace ( rx_three, ']' )
            .replace ( rx_four, '' )
        )
      ) {

        j = eval ( '(' + text + ')' );

        return typeof reviver === 'function'
          ? walk ( { '': j }, '' )
          : j;
      }

      throw new SyntaxError ( 'JSON.parse' );
    };
  }
} ());

(function Prefs () {
  var defaults = {
        statText:    'static text:',
        editText:    '',
        ch:          false,
        chSavePrefs: false,
        radio:       false,
        list:        [ 0 ],
        drList:      0,
        location:    undefined
      },
      lib      = new Lib ( 'Prefs_v0.3' ),
      w        = addPalette ();
  w.show ();

  function addPalette () {
    var w = new Window ( 'palette', 'Template' );

    w.statText = w.add ( 'statictext', undefined, 'static text\relement:' );
    w.editText = w.add ( 'edittext', [ 0, 0, 80, 60 ], '', { multiline: true } );
    w.ch = w.add ( 'checkbox', undefined, 'check this' );
    w.list = w.add ( "listbox", undefined, [ "one", "two", "three" ], { multiselect: true } );
    w.drList = w.add ( "dropdownlist", undefined, [ 1000, 2000, 3000 ] );
    w.radio = w.add ( 'radiobutton', undefined, 'radio' );
    w.chSavePrefs = w.add ( 'checkbox', undefined, 'save preferenses' );
    var btnSave  = w.add ( 'button', undefined, 'Save' ),
        btnReset = w.add ( 'button', undefined, 'Reset' );

    /* w.list.selection = [ 0 ];
     w.drList.selection = 0;*/

    if ( lib.isIni () ) {
      var jsonStr = lib.readIni ();
      var opts = JSON.parse ( jsonStr );
      lib.setValues ( opts, w );
    } else {
      lib.setValues ( defaults, w );
    }

    w.drList.onChange = function () {
//      alert ( this.selection.index )
    }

    btnSave.onClick = function () {
      var opts = lib.getValues ( defaults, w );
      var optsString = JSON.stringify ( opts );
      lib.writeIni ( optsString );
    }

    btnReset.onClick = function () {
      lib.setValues ( defaults, w );
    }

    function _bt ( btBody ) {
      var bt = new BridgeTalk ();
      bt.target = "illustrator-" + (app.version).slice ( 0, 2 );
      bt.body = _focusToFile.toString () + ';' + btBody + ';_focusToFile()';
      bt.send ();
    }

    function _focusToFile () {
      illustrator.reveal ( new File ( activeDocument.fullName ) );
    }

    return w;
  }

  /**
   * The library to work with interface preferences
   *
   * @param {String} jsName - the name of this jsx-file without extension and path
   * @constructor
   */
  function Lib ( jsName ) {

    var iniFile = init ();

    function init () {

      var localStoreFolderPath = Folder.userData + '/LocalStore/',
          iniFolder,
          iniFile;

      iniFolder = new Folder ( localStoreFolderPath + jsName );
      iniFolder.exists == false ? iniFolder.create () : '';
      iniFile = new File ( iniFolder + '/' + jsName + '.ini' );

      return iniFile;
    }

    this.isIni = function () {
      return iniFile.exists;
    }

    this.readIni = function () {
      var str = '';

      iniFile.open ( 'r' );
      str = iniFile.read ();
      iniFile.close ();

      return str;
    }

    this.writeIni = function ( str ) {
      if ( iniFile.exists ) {
        var iniFullName = iniFile.fullName;
        iniFile.remove ();
        iniFile = new File ( iniFullName );
      }

      iniFile.open ( 'e' );
      iniFile.writeln ( str );
      iniFile.close ();

      return iniFile;
    }

    this.getValues = function ( defaults, w ) {
      var o = {},
          val,
          key;
      for ( key in w ) {

        try {
          switch ( w[ key ].type ) {
            case 'statictext':
            case 'edittext' :
              for ( val in defaults ) {
                if ( val == key ) {
                  o[ val ] = w[ key ].text;
                }
              }
              break;
            case 'checkbox' :
            case 'radiobutton' :
              for ( val in defaults ) {
                if ( val == key ) {
                  o[ val ] = w[ key ].value;
                }
              }
              break;
            case 'listbox' :
              for ( val in defaults ) {
                if ( val == key ) {
                  try {
                    if ( w[ key ].selection.length ) {
                      var tmpArr = [];
                      for ( var i = 0; i < w[ key ].selection.length; i++ ) {
                        tmpArr.push ( w[ key ].selection[ i ].index );
                      }
                      o[ val ] = tmpArr;
                    }
                  } catch ( e ) {
                    o[ val ] = w[ key ].selection;
                  }
                }
              }
              break;
            case 'dropdownlist' :
              for ( val in defaults ) {
                if ( val == key ) {
                  o[ val ] = w[ key ].selection.index;
                }
              }
              break;
            case 'palette' :
              o.location = [ w.location[ 0 ], w.location[ 1 ] ];
              break;
            default:
              break;
          }
        } catch ( e ) {
//          alert ( e.line + '\n' + e.message );
        }
      }
      return o;
    }

    this.setValues = function ( opts, w ) {
      var val, key;
      for ( key in w ) {
        try {
          switch ( w[ key ].type ) {
            case 'statictext':
            case 'edittext' :
              for ( val in opts ) {
                if ( val == key ) {
                  w[ key ].text = opts[ val ];
                }
              }
              break;
            case 'checkbox' :
            case 'radiobutton' :
              for ( val in opts ) {
                if ( val == key ) {
                  w[ key ].value = opts[ val ];
                }
              }
              break;
            case 'listbox' :
              for ( val in opts ) {
                if ( val == key ) {
                  w[ key ].selection = null;
                  w[ key ].selection = opts[ val ];
                }
              }
              break;
            case 'dropdownlist' :
              for ( val in opts ) {
                if ( val == key ) {
                  w[ key ].selection = null;
                  w[ key ].selection = opts[ val ];
                }
              }
              break;
            case 'palette' :
              w.location = [ opts.location[ 0 ], opts.location[ 1 ] ];
              break;
            default:
              break;
          }
        } catch ( e ) {
//          alert ( e.line + '\n' + e.message );
        }
      }
    }
  }
} ())

var win = createWindow ();
win.show ();
function createWindow () {
  var w = new Window ( 'palette' );
  var m = w.add ( 'statictext' );
  m.text = 'Hello, world!';
  return w;
}
