/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 23.02.2015
 */


//@target "illustrator-15"
////@targetengine "sess-33"
//@include "fastRelink_v1.0.js"
//@include "selTxt.js"
//@include "recolSpotsSG.js"
//@include "libPalet_v0.0.1.js"
//@include "moveExt_v1.0.js"

var wind = setPalette ();
/*w.onResizing =*/
/*w.onResize = function () {
  this.layout.resize ();
}*/
wind.show ();

if ( documents.length != 0 ) {
  _focusToFile ();
}

function setPalette () {

  var targ = "illustrator-15";
/*  if ( (app.version).slice ( 0, 2 ) == '15' ) {
    targ += '-15';
  } else if ( (app.version).slice ( 0, 2 ) == '16' ) {
    targ += '-16';
  } else if ( (app.version).slice ( 0, 2 ) == '17' ) {
    targ += '-17';
  } else if ( (app.version).slice ( 0, 2 ) == '18' ) {
    targ += '-18';
  }*/

  var w = new Window ( 'palette', 'Set Tabs v' + ($.fileName.slice ( -9, -4 )), undefined, { resizeable: true } );

  w.margins = w.spacing = 0;

  var tab = w.add ( 'tabbedpanel' );
  var other = tab.add ( 'tab', undefined, 'other' );
  var press = tab.add ( 'tab', undefined, 'layout' );
  var side = tab.add ( 'tab', undefined, 'side' );
  var test = tab.add ( 'tab', undefined, 'test' );
//  var opts = tab.add ( 'tab', undefined, 'opts' );

 /* if ( (app.version).slice ( 0, 2 ) == '18' ) {
    other.maximumSize.height = press.maximumSize.height =
      side.maximumSize.height = test.maximumSize.height = *//*opts.maximumSize.height = *//*30;
  }*/

  tab.margins = tab.spacing =
    other.margins = other.spacing =
      press.margins = press.spacing =
        side.margins = side.spacing =
          test.margins = test.spacing = /*
           opts.margins = opts.spacing =*/ 0;

  other.orientation = press.orientation =
    side.orientation = test.orientation = /*
     opts.orientation =*/ 'row';

  _isIni () != false ? w.location = _r_w_ini ( 'r' ) : "";

  var imgPath = /*"/C/Users/design10/Documents/Dropbox/jsx/rastr-vector/" || */"/E/Documents/Dropbox/Scripts/rastr-vector/"

  var butt = w.add ( 'group' ),
      reload = other.add (
        "iconbutton", undefined, File ( imgPath + 'Reload-01.png' ),
        { style: "toolbutton" } ),
      setZero = other.add (
        "iconbutton", undefined, File ( imgPath + 'Zx-01.png' ),
        { style: "toolbutton" } ),
      closeAll = other.add (
        "iconbutton", undefined, File ( imgPath + 'CloseAll-01.png' ),
        { style: "toolbutton" } ),
      delEmptyLays = other.add (
        "iconbutton", undefined, File ( imgPath + 'delEmptyLays-01.png' ),
        { style: "toolbutton" } ),
      selTxt = other.add (
        "iconbutton", undefined, File ( imgPath + 'SelTxt-01.png' ),
        { style: "toolbutton" } ),
      delWhiteOver = press.add (
        "iconbutton", undefined, File ( imgPath + 'WhiteOverprint-01.png' ),
        { style: "toolbutton" } ),
      relink = press.add (
        "iconbutton", undefined, File ( imgPath + 'Relink-01.png' ),
        { style: "toolbutton" } ),
      recolSpotsSG = press.add (
        "iconbutton", undefined, File ( imgPath + 'Sg-01.png' ),
        { style: "toolbutton" } ),
      moveExt = press.add (
        "iconbutton", undefined, File ( imgPath + 'MoveExt-01.png' ),
        { style: "toolbutton" } );

  butt.margins = butt.spacing = 0;

  setZero.onClick = function () {
    var bt = new BridgeTalk ();
    bt.target = targ;
    bt.body = _focusToFile.toString () + ";" +
    "activeDocument.artboards[ activeDocument.artboards.getActiveArtboardIndex () ].rulerOrigin = [ 0, 0 ];" +
    "_focusToFile()";
    bt.send ();
  }
  closeAll.onClick = function () {
    var bt = new BridgeTalk ();
    bt.target = targ;
    bt.body = _focusToFile.toString () + ";" + _closeAll.toString () + ";" + "_closeAll();_focusToFile();";
    bt.send ();
  }
  relink.onClick = function () {
    var bt = new BridgeTalk ();
    bt.target = targ;
    bt.body = _focusToFile.toString () + ";" + _fastRelink.toString () + "_fastRelink();_focusToFile();";
    bt.send ();
  }
  delEmptyLays.onClick = function () {
    var bt = new BridgeTalk ();
    bt.target = targ;
    bt.body = _focusToFile.toString () + ";" + _killEmptyLays.toString () + "_killEmptyLays();_focusToFile();";
    bt.send ();
  }
  delWhiteOver.onClick = function () {
    var bt = new BridgeTalk ();
    bt.target = targ;
    bt.body = _focusToFile.toString () + ";" + _delWhiteOver.toString () + "_delWhiteOver();_focusToFile();";
    bt.send ();
  }
  selTxt.onClick = function () {
    var bt = new BridgeTalk ();
    bt.target = targ;
    bt.body = _focusToFile.toString () + ";" + _selTxt.toString () + "_selTxt();_focusToFile();";
    bt.send ();
  }
  recolSpotsSG.onClick = function () {
    var bt = new BridgeTalk ();
    bt.target = targ;
    bt.body = _focusToFile.toString () + ";" + _recolSpotsSG.toString () + "_recolSpotsSG();_focusToFile();";
    bt.send ();
  }
  moveExt.onClick = function () {
    var bt = new BridgeTalk ();
    bt.target = targ;
    bt.body = _focusToFile.toString() + ";" + _moveExt.toString () + "_moveExt();_focusToFile();";
    bt.send ();
  }
  reload.onClick = function () {
    w.close ();
    $.evalFile ( new File ( $.fileName ) );
  }
  w.addEventListener ( 'close', function () {
    _r_w_ini ( "w", [ w.location[ 0 ], w.location[ 1 ] ] );
  } )

  function _closeAll () {
    if ( confirm ( 'EXIT ALL? NO SAVE?', '', 'EXIT All NO SAVE' ) ) {
      for ( var i = 0; i < documents.length; i++ ) {
        documents[ i ].close ( SaveOptions.DONOTSAVECHANGES );
        i--;
      }
    }
  }

  /**
   * ф-ция удаления всех пустых слоёв/подслоёв
   */
  function _killEmptyLays () {

    for ( var i = 0; i < activeDocument.layers.length; i++ ) {
      var lay = activeDocument.layers[ i ];
      if ( _hasSubs ( lay ) ) {
        _delSubs ( lay );
      }
      if ( _isEmpty ( lay ) && activeDocument.layers.length > 1 ) { // попытка удалить единственный слой приведёт к его переименованию в <layer>
        lay.locked == true ? lay.locked = false : '';
        lay.visible == false ? lay.visible = true : '';
        lay.remove ();
        i--;
      }
    }

    /**
     * рекурсивная ф-ция удаления подслоя
     * @param {Object} lay - объект класса Layer
     * @return {Object} lay - объект класса Layer
     */
    function _delSubs ( lay ) {
      for ( var i = 0; i < lay.layers.length; i++ ) {
        var thisSubLay = _getSubs ( lay )[ i ];

        if ( _isEmpty ( thisSubLay ) ) {
          thisSubLay.locked == true ? thisSubLay.locked = false : '';
          thisSubLay.visible == false ? thisSubLay.visible = true : '';
          thisSubLay.remove ();
          i--;
        }

        if ( _hasSubs ( thisSubLay ) ) {
          var parent = _delSubs ( thisSubLay );
          if ( _isEmpty ( parent ) ) {
            thisSubLay.locked == true ? thisSubLay.locked = false : '';
            thisSubLay.visible == false ? thisSubLay.visible = true : '';
            thisSubLay.remove ();
            i--;
          }
        }
      }
      return lay;
    }

    /**
     * содержит ли слой объекты класса Layer
     * @param  {Object} lay - объект класса Layer
     * @return {Boolean} true, если есть подслои
     */
    function _hasSubs ( lay ) {
      try {
        return (lay.layers.length > 0);
      } catch ( e ) {
        return false;
      }
    }

    /**
     * содержит ли слой объекты классов PageItem или Layer
     * @param  {Object} lay - объект класса Layer
     * @return {Boolean} true, если слой пуст
     */
    function _isEmpty ( lay ) {
      try {
        return lay.pageItems.length == 0 && lay.layers.length == 0;
      } catch ( e ) {
        return false;
      }
    }

    /**
     * получить коллекцию layers данного layer
     * @param  {Object} lay - объект класса Layer
     * @return {Object/Boolean} - коллекция layers / false
     */
    function _getSubs ( lay ) {
      try {
        return lay.layers;
      } catch ( e ) {
        return false;
      }
    }
  }

  /** killWhiteOver_beta0.2.jsx
   * for Adobe Illustrator. Marat Shagiev. marat_js@bk.ru. Date ~ 26.05.14
   * MODE:
   * moveExt active document for white overprints
   * IF FIND:
   * - recolor grey-white and spot-white to CMYK-white,
   * - remove white overprints
   * - support color models: CMYK, SPOT and GRAYSCALE
   * - support elements: paths, compound paths, text
   * CHANGES VERSUS beta0.1:
   * - repair some buggs
   * - text-frames processed as indivisible single objects
   * rather then characters collections (couse it was a slow tempo)
   */
  function _delWhiteOver () {

    var doc = activeDocument;
    var cmykWhite = new CMYKColor (); // cmyk-white

    // START PROCESS
    killer ();

    function killer () {
      // collect all support elements
      var pathCollect = doc.pathItems;
      var compCollect = doc.compoundPathItems;
      var txtCollect = doc.textFrames;

      // if current document  have no supported elements, out function
      if ( pathCollect.length == 0 && compCollect.length == 0 && txtCollect.length == 0 ) {
        alert ( 'No supported elements' );
        return;
      }

      // the array for all collected elements
      var elemArr = [];

      // push all elems to array
      for ( var p = 0; p < pathCollect.length; p++ ) {
        if ( pathCollect[ p ].parent.typename == "CompoundPathItem" ) continue; // avoid duplicating objects
        elemArr.push ( pathCollect[ p ] );
      }
      for ( var c = 0; c < compCollect.length; c++ ) {
        elemArr.push ( compCollect[ c ] );
      }
      for ( var t = 0; t < txtCollect.length; t++ ) {
        elemArr.push ( txtCollect[ t ] );
      }

      // scanning, finding and killing
      for ( var j = 0; j < elemArr.length; j++ ) {
        //  depending on the typename of elems define vars elem.fillColor and elem.strokeColor
        try {
          switch ( elemArr[ j ].typename ) {
            case 'PathItem':
              killerWeapon ( elemArr[ j ] );
              break;
            case 'CompoundPathItem':
              killerWeapon ( elemArr[ j ].pathItems[ 0 ] );
              break;
            case 'TextFrame':
              // textFrame as a collection of characters
              /*
               var frameChars = elemArr[j].textRange.characters;
               for (var i = 0; i < frameChars.length; i++) {
               killerWeapon(frameChars[i].characterAttributes);
               }
               */
              // textFrame as a single indivisible object
              var frameChars = elemArr[ j ].textRange;
              killerWeapon ( frameChars.characterAttributes );
              break;
            default:
              // default action
              break;
          }
        } catch ( e ) {
        }
      }

      // COMMON TOOL
      function killerWeapon ( elem ) {
        // SPOT
        // fill
        try {
          if ( (elem.fillColor + '' ) == '[SpotColor]' && elem.fillColor.tint < 1 &&
            (elem.fillOverprint == true || elem.overprintFill == true) ) {
            elem.fillColor.colorType = ColorModel.PROCESS;
            elem.fillColor = cmykWhite;
            elem.fillOverprint = false;
            elem.overprintFill = false;
          }
        } catch ( e ) {
        }
        // stroke
        try {
          if ( (elem.strokeColor + '' ) == '[SpotColor]' && elem.strokeColor.tint < 1 &&
            (elem.strokeOverprint == true || elem.overprintStroke == true) ) {
            elem.strokeColor.colorType = ColorModel.PROCESS;
            elem.strokeColor = cmykWhite;
            elem.strokeOverprint = false;
            elem.overprintStroke = false;
          }
        } catch ( e ) {
        }
        // CMYK
        // fill
        try {
          if ( (elem.fillColor + '' ) == '[CMYKColor]' &&
            (elem.fillOverprint == true || elem.overprintFill == true) ) {
            for ( var l = 0; l < 3; l++ ) {
              if ( elem.fillColor.cyan < 1 && elem.fillColor.magenta < 1 &&
                elem.fillColor.yellow < 1 && elem.fillColor.black < 1 ) {
                elem.fillOverprint = false;
                elem.overprintFill = false;
              }
            }
          }
        } catch ( e ) {
        }
        //stroke
        try {
          if ( (elem.strokeColor + '' ) == '[CMYKColor]' &&
            (elem.strokeOverprint == true || elem.overprintStroke == true) ) {
            for ( var l = 0; l < 3; l++ ) {
              if ( elem.strokeColor.cyan < 1 && elem.strokeColor.magenta < 1 &&
                elem.strokeColor.yellow < 1 && elem.strokeColor.black < 1 ) {
                elem.strokeOverprint = false;
                elem.overprintStroke = false;
              }
            }
          }
        } catch ( e ) {
        }
        // GRAYSCALE
        // fill
        try {
          if ( (elem.fillColor + '' ) == '[GrayColor]' && elem.fillColor.gray < 1 &&
            (elem.fillOverprint == true || elem.overprintFill == true) ) {
            elem.fillOverprint = false;
            elem.overprintFill = false;
            elem.fillColor = cmykWhite;
          }
        } catch ( e ) {
        }
        //stroke
        try {
          if ( (elem.strokeColor + '' ) == '[GrayColor]' && elem.strokeColor.gray < 1 &&
            (elem.strokeOverprint == true || elem.overprintStroke == true) ) {
            elem.strokeOverprint = false;
            elem.overprintStroke = false;
            elem.strokeColor = cmykWhite;
          }
        } catch ( e ) {
        }
      }
    }
  }


  function _evalTest ( fileName ) {
    $.evalFile ( new File ( fileName ) );
  }


  return w;
}

function _isIni () {
  return File ( $.fileName.slice ( 0, -3 ) + "ini" ).exists;
}

function _r_w_ini ( mode, data ) {
  data = data || [ '' ];

  var ini = File ( $.fileName.slice ( 0, -3 ) + "ini" );

  switch ( mode ) {
    case "r":
      if ( !(ini.exists) ) {
        ini.open ( 'w' );
        ini.writeln ( '' );
        ini.close ();
        return false;
      } else {
        var location = [];
        ini.open ( 'r' );
        for ( var i = 0; i < 2; i++ ) {
          location.push ( ini.readln () );
        }
        return location;
      }
      break;
    case "w":
      ini.open ( 'w' );
      for ( var i = 0; i < data.length; i++ ) {
        ini.writeln ( data[ i ] );
      }
      ini.close ();
      break;
    case "e":
      //
      break;
    default:
      break;
  }
}
